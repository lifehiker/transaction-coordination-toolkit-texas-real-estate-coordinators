import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { TransactionForm } from "@/components/app/TransactionForm";
import { updateTransaction } from "@/app/app/transactions/actions";
import { formatDateForInput } from "@/lib/date-format";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Transaction | Texas TC Toolkit",
};

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const transaction = await db.transaction.findFirst({ where: { id, userId } });
  if (!transaction) notFound();

  const boundAction = updateTransaction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/app/transactions" className="hover:text-foreground">Transactions</Link>
        {" / "}
        <Link href={`/app/transactions/${id}`} className="hover:text-foreground">
          {transaction.name}
        </Link>
        {" / "}
        <span>Edit</span>
      </nav>
      <h1 className="text-2xl font-bold mb-6">Edit Transaction</h1>
      <TransactionForm
        action={boundAction}
        submitLabel="Save Changes"
        initialData={{
          name: transaction.name,
          side: transaction.side,
          propertyAddress: transaction.propertyAddress,
          effectiveDate: formatDateForInput(new Date(transaction.effectiveDate)),
          closingDate: transaction.closingDate
            ? formatDateForInput(new Date(transaction.closingDate))
            : "",
          optionPeriodDays: transaction.optionPeriodDays,
          financingDeadlineDays: transaction.financingDeadlineDays,
          titleCommitmentDays: transaction.titleCommitmentDays,
          surveyDeadlineDays: transaction.surveyDeadlineDays,
          hoaTargetDate: transaction.hoaTargetDate
            ? formatDateForInput(new Date(transaction.hoaTargetDate))
            : "",
          notes: transaction.notes,
        }}
      />
    </div>
  );
}
