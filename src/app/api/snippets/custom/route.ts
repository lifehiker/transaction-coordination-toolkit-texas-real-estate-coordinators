import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { canCreateCustomSnippet, type SubscriptionTier } from "@/lib/subscription";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).max(200),
  category: z.string().min(1),
  channel: z.string().min(1),
  audience: z.string().min(1),
  body: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const user = await db.user.findUnique({ where: { id: userId } });
  const tier = (user?.subscriptionTier ?? "free") as SubscriptionTier;

  const currentCount = await db.customSnippet.count({ where: { userId } });
  if (!canCreateCustomSnippet(tier, currentCount)) {
    return NextResponse.json(
      { error: tier === "free" ? "Upgrade to create custom snippets." : "Custom snippet limit reached." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const snippet = await db.customSnippet.create({
    data: { userId, ...parsed.data },
  });

  return NextResponse.json({ ok: true, id: snippet.id });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const snippet = await db.customSnippet.findFirst({ where: { id, userId } });
  if (!snippet) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.customSnippet.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = await req.json();
  const parsed = schema.extend({ id: z.string().min(1) }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { id, ...data } = parsed.data;
  const snippet = await db.customSnippet.findFirst({ where: { id, userId } });
  if (!snippet) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.customSnippet.update({
    where: { id },
    data,
  });

  return NextResponse.json({ ok: true, id });
}
