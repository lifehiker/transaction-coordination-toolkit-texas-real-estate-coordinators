import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionBanner } from "@/components/app/SubscriptionBanner";
import { DeadlineBadge } from "@/components/app/DeadlineBadge";
import { formatDeadlineLabel } from "@/lib/date-format";
import { getDeadlineStatus } from "@/lib/deadlines";
import { type SubscriptionTier } from "@/lib/subscription";
import { ArrowRight, Plus, FileText, MessageSquare } from "lucide-react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Texas TC Toolkit",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const user = await db.user.findUnique({ where: { id: userId } });
  const tier = (user?.subscriptionTier ?? "free") as SubscriptionTier;

  const transactionsRaw = await db.transaction.findMany({
    where: { userId, status: "ACTIVE" },
    include: { deadlines: true },
    orderBy: { effectiveDate: "desc" },
  });

  type TxWithDeadlines = (typeof transactionsRaw)[number];
  type DeadlineItem = TxWithDeadlines["deadlines"][number];
  type TxMapped = TxWithDeadlines & { nearestDueAt: Date };
  const mapped: TxMapped[] = transactionsRaw.map((tx: TxWithDeadlines) => {
    const nearestDueAt =
      tx.deadlines
        .filter((d: DeadlineItem) => !d.completedAt && new Date(d.dueAt) >= new Date())
        .sort((a: DeadlineItem, b: DeadlineItem) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())[0]?.dueAt ??
      tx.closingDate ??
      tx.effectiveDate;
    return { ...tx, nearestDueAt };
  });
  const transactions = mapped.sort(
    (a: TxMapped, b: TxMapped) => new Date(a.nearestDueAt).getTime() - new Date(b.nearestDueAt).getTime()
  );

  // Get deadlines within 3 days for the high-priority dashboard view.
  const now = new Date();
  const threeDaysOut = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const upcomingDeadlines = transactions
    .flatMap((tx: TxMapped) =>
      tx.deadlines
        .filter(
          (d: DeadlineItem) =>
            !d.completedAt &&
            new Date(d.dueAt) >= now &&
            new Date(d.dueAt) <= threeDaysOut
        )
        .map((d: DeadlineItem) => ({ ...d, transactionName: tx.name, transactionId: tx.id }))
    )
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {transactions.length} active transaction{transactions.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/app/transactions/new">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Transaction
          </Button>
        </Link>
      </div>

      <SubscriptionBanner tier={tier} />

      {upcomingDeadlines.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-800">
              Deadlines in the Next 3 Days ({upcomingDeadlines.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingDeadlines.map((d) => {
                const status = getDeadlineStatus(new Date(d.dueAt), d.completedAt);
                return (
                  <div key={d.id} className="flex items-center justify-between gap-3 text-sm">
                    <div>
                      <span className="font-medium">{d.title}</span>
                      <span className="text-muted-foreground"> — {d.transactionName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-muted-foreground text-xs">
                        {formatDeadlineLabel(new Date(d.dueAt))}
                      </span>
                      <DeadlineBadge status={status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" /> Active Transactions
              </CardTitle>
              <Link href="/app/transactions">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-3">No active transactions.</p>
                <Link href="/app/transactions/new">
                  <Button size="sm" variant="outline">
                    Create First Transaction
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.slice(0, 5).map((tx) => (
                  <Link
                    key={tx.id}
                    href={`/app/transactions/${tx.id}`}
                    className="block p-2 rounded-md hover:bg-muted/30 transition-colors"
                  >
                    <p className="text-sm font-medium truncate">{tx.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {tx.propertyAddress}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/app/snippets">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Snippet Library
              </Button>
            </Link>
            <Link href="/app/snippets/custom">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> My Custom Snippets
              </Button>
            </Link>
            <Link href="/tools/texas-option-period-deadline-calculator">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Option Period Calculator
              </Button>
            </Link>
            <Link href="/tools/texas-real-estate-contract-deadline-calculator">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Contract Deadline Calculator
              </Button>
            </Link>
            <Link href="/app/billing">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                <ArrowRight className="h-3 w-3" /> Billing & Subscription
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
