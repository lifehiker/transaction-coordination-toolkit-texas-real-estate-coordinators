"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { defaultChecklist } from "@/data/default-checklist";
import { calculateContractTimeline } from "@/lib/deadlines";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const transactionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  side: z.enum(["BUYER", "SELLER", "DUAL", "OTHER"]),
  propertyAddress: z.string().min(1, "Property address is required"),
  effectiveDate: z.string().min(1, "Effective date is required"),
  closingDate: z.string().optional(),
  optionPeriodDays: z.string().optional(),
  financingDeadlineDays: z.string().optional(),
  titleCommitmentDays: z.string().optional(),
  surveyDeadlineDays: z.string().optional(),
  hoaTargetDate: z.string().optional(),
  notes: z.string().optional(),
});

async function getSession() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  return session;
}

export async function createTransaction(formData: FormData) {
  const session = await getSession();
  const userId = session.user!.id!;

  const raw = Object.fromEntries(formData.entries());
  const parsed = transactionSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  // Check free tier limit
  const user = await db.user.findUnique({ where: { id: userId } });
  const tier = (user?.subscriptionTier ?? "free") as string;
  if (tier === "free") {
    const count = await db.transaction.count({
      where: { userId, status: { in: ["ACTIVE", "PENDING"] } },
    });
    if (count >= 1) {
      return {
        error:
          "Free accounts can only have 1 active transaction. Upgrade to create unlimited transactions.",
      };
    }
  }

  const data = parsed.data;
  const effectiveDate = new Date(data.effectiveDate);
  const closingDate = data.closingDate ? new Date(data.closingDate) : undefined;
  const optionPeriodDays = data.optionPeriodDays ? parseInt(data.optionPeriodDays) : undefined;
  const financingDeadlineDays = data.financingDeadlineDays
    ? parseInt(data.financingDeadlineDays)
    : undefined;
  const titleCommitmentDays = data.titleCommitmentDays
    ? parseInt(data.titleCommitmentDays)
    : undefined;
  const surveyDeadlineDays = data.surveyDeadlineDays
    ? parseInt(data.surveyDeadlineDays)
    : undefined;
  const hoaTargetDate = data.hoaTargetDate ? new Date(data.hoaTargetDate) : undefined;

  // Calculate deadlines
  const calculatedDeadlines = calculateContractTimeline({
    effectiveDate,
    closingDate,
    optionPeriodDays,
    financingDeadlineDays,
    titleCommitmentDays,
    surveyDeadlineDays,
    hoaTargetDate,
  });

  const transaction = await db.transaction.create({
    data: {
      userId,
      name: data.name,
      side: data.side,
      propertyAddress: data.propertyAddress,
      effectiveDate,
      closingDate,
      optionPeriodDays,
      financingDeadlineDays,
      titleCommitmentDays,
      surveyDeadlineDays,
      hoaTargetDate,
      notes: data.notes ?? null,
      deadlines: {
        create: calculatedDeadlines.map((d) => ({
          title: d.title,
          category: d.category,
          dueAt: d.dueAt,
        })),
      },
      checklistItems: {
        create: defaultChecklist.map((item) => ({
          title: item.title,
          category: item.category,
          sortOrder: item.sortOrder,
        })),
      },
    },
  });

  redirect(`/app/transactions/${transaction.id}`);
}

export async function updateTransaction(id: string, formData: FormData) {
  const session = await getSession();
  const userId = session.user!.id!;

  const existing = await db.transaction.findFirst({ where: { id, userId } });
  if (!existing) {
    return { error: "Transaction not found" };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = transactionSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const data = parsed.data;
  const effectiveDate = new Date(data.effectiveDate);
  const closingDate = data.closingDate ? new Date(data.closingDate) : undefined;
  const optionPeriodDays = data.optionPeriodDays ? parseInt(data.optionPeriodDays) : undefined;
  const financingDeadlineDays = data.financingDeadlineDays
    ? parseInt(data.financingDeadlineDays)
    : undefined;
  const titleCommitmentDays = data.titleCommitmentDays
    ? parseInt(data.titleCommitmentDays)
    : undefined;
  const surveyDeadlineDays = data.surveyDeadlineDays
    ? parseInt(data.surveyDeadlineDays)
    : undefined;
  const hoaTargetDate = data.hoaTargetDate ? new Date(data.hoaTargetDate) : undefined;

  // Recalculate deadlines
  const calculatedDeadlines = calculateContractTimeline({
    effectiveDate,
    closingDate,
    optionPeriodDays,
    financingDeadlineDays,
    titleCommitmentDays,
    surveyDeadlineDays,
    hoaTargetDate,
  });

  // Delete old deadlines and recreate
  await db.deadline.deleteMany({ where: { transactionId: id } });

  await db.transaction.update({
    where: { id },
    data: {
      name: data.name,
      side: data.side,
      propertyAddress: data.propertyAddress,
      effectiveDate,
      closingDate: closingDate ?? null,
      optionPeriodDays: optionPeriodDays ?? null,
      financingDeadlineDays: financingDeadlineDays ?? null,
      titleCommitmentDays: titleCommitmentDays ?? null,
      surveyDeadlineDays: surveyDeadlineDays ?? null,
      hoaTargetDate: hoaTargetDate ?? null,
      notes: data.notes ?? null,
      deadlines: {
        create: calculatedDeadlines.map((d) => ({
          title: d.title,
          category: d.category,
          dueAt: d.dueAt,
        })),
      },
    },
  });

  revalidatePath(`/app/transactions/${id}`);
  redirect(`/app/transactions/${id}`);
}

export async function deleteTransaction(id: string) {
  const session = await getSession();
  const userId = session.user!.id!;

  const existing = await db.transaction.findFirst({ where: { id, userId } });
  if (!existing) return { error: "Not found" };

  await db.transaction.delete({ where: { id } });
  revalidatePath("/app/transactions");
  redirect("/app/transactions");
}

export async function archiveTransaction(id: string) {
  const session = await getSession();
  const userId = session.user!.id!;

  const existing = await db.transaction.findFirst({ where: { id, userId } });
  if (!existing) return { error: "Not found" };

  await db.transaction.update({ where: { id }, data: { status: "CLOSED" } });
  revalidatePath("/app/transactions");
  revalidatePath(`/app/transactions/${id}`);
  redirect("/app/transactions");
}

export async function cancelTransaction(id: string) {
  const session = await getSession();
  const userId = session.user!.id!;

  const existing = await db.transaction.findFirst({ where: { id, userId } });
  if (!existing) return { error: "Not found" };

  await db.transaction.update({ where: { id }, data: { status: "CANCELLED" } });
  revalidatePath("/app/transactions");
  revalidatePath(`/app/transactions/${id}`);
}

export async function toggleChecklistItem(itemId: string) {
  const session = await getSession();
  const userId = session.user!.id!;

  const item = await db.checklistItem.findFirst({
    where: { id: itemId, transaction: { userId } },
    include: { transaction: true },
  });
  if (!item) return { error: "Not found" };

  await db.checklistItem.update({
    where: { id: itemId },
    data: { completedAt: item.completedAt ? null : new Date() },
  });

  revalidatePath(`/app/transactions/${item.transactionId}`);
}

export async function updateChecklistItemNotes(itemId: string, notes: string) {
  const session = await getSession();
  const userId = session.user!.id!;

  const item = await db.checklistItem.findFirst({
    where: { id: itemId, transaction: { userId } },
    include: { transaction: true },
  });
  if (!item) return { error: "Not found" };

  await db.checklistItem.update({ where: { id: itemId }, data: { notes } });
  revalidatePath(`/app/transactions/${item.transactionId}`);
}

export async function addChecklistItem(
  transactionId: string,
  title: string,
  category: string
) {
  const session = await getSession();
  const userId = session.user!.id!;

  const transaction = await db.transaction.findFirst({ where: { id: transactionId, userId } });
  if (!transaction) return { error: "Not found" };

  const maxOrder = await db.checklistItem.aggregate({
    where: { transactionId },
    _max: { sortOrder: true },
  });

  await db.checklistItem.create({
    data: {
      transactionId,
      title,
      category,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath(`/app/transactions/${transactionId}`);
}

export async function toggleDeadline(deadlineId: string) {
  const session = await getSession();
  const userId = session.user!.id!;

  const deadline = await db.deadline.findFirst({
    where: { id: deadlineId, transaction: { userId } },
  });
  if (!deadline) return { error: "Not found" };

  await db.deadline.update({
    where: { id: deadlineId },
    data: { completedAt: deadline.completedAt ? null : new Date() },
  });

  revalidatePath(`/app/transactions/${deadline.transactionId}`);
  revalidatePath("/app");
  revalidatePath("/app/transactions");
}
