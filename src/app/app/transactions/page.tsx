import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/components/app/TransactionList";
import { type SubscriptionTier, canCreateTransaction } from "@/lib/subscription";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions | Texas TC Toolkit",
};

export default async function TransactionsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const user = await db.user.findUnique({ where: { id: userId } });
  const tier = (user?.subscriptionTier ?? "free") as SubscriptionTier;

  const [activeTransactions, allTransactions] = await Promise.all([
    db.transaction.findMany({
      where: { userId, status: "ACTIVE" },
      include: { deadlines: true },
      orderBy: { effectiveDate: "desc" },
    }),
    db.transaction.findMany({
      where: { userId },
      include: { deadlines: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const canCreate = canCreateTransaction(tier, activeTransactions.length);

  const sortedActiveTransactions = [...activeTransactions].sort((a, b) => {
    const now = new Date();
    const aNearest =
      a.deadlines
        .filter((d) => !d.completedAt && new Date(d.dueAt) >= now)
        .sort((d1, d2) => new Date(d1.dueAt).getTime() - new Date(d2.dueAt).getTime())[0]
        ?.dueAt ?? a.closingDate ?? a.effectiveDate;
    const bNearest =
      b.deadlines
        .filter((d) => !d.completedAt && new Date(d.dueAt) >= now)
        .sort((d1, d2) => new Date(d1.dueAt).getTime() - new Date(d2.dueAt).getTime())[0]
        ?.dueAt ?? b.closingDate ?? b.effectiveDate;

    return new Date(aNearest).getTime() - new Date(bNearest).getTime();
  });

  const closedTransactions = allTransactions.filter(
    (t) => t.status === "CLOSED" || t.status === "CANCELLED"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeTransactions.length} active
            {tier === "free" && " · Free plan: 1 transaction max"}
          </p>
        </div>
        {canCreate ? (
          <Link href="/app/transactions/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> New Transaction
            </Button>
          </Link>
        ) : (
          <Link href="/app/billing">
            <Button size="sm" variant="outline">
              Upgrade to Add More
            </Button>
          </Link>
        )}
      </div>

      <div>
        <h2 className="text-base font-semibold mb-3">Active Transactions</h2>
        <TransactionList transactions={sortedActiveTransactions} />
      </div>

      {closedTransactions.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-3 text-muted-foreground">
            Closed / Cancelled Transactions
          </h2>
          <TransactionList transactions={closedTransactions} />
        </div>
      )}
    </div>
  );
}
