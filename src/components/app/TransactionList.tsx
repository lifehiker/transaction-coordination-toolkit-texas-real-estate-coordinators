import Link from "next/link";
import { formatDeadlineLabel } from "@/lib/date-format";
import { getDeadlineStatus } from "@/lib/deadlines";
import { DeadlineBadge } from "./DeadlineBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Deadline {
  id: string;
  title: string;
  dueAt: Date;
  completedAt: Date | null;
}

interface Transaction {
  id: string;
  name: string;
  side: string;
  propertyAddress: string;
  status: string;
  effectiveDate: Date;
  deadlines: Deadline[];
}

type TransactionWithDeadlines = Transaction;

interface TransactionListProps {
  transactions: TransactionWithDeadlines[];
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-800",
};

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="mb-4">No transactions yet.</p>
        <Link href="/app/transactions/new">
          <Button size="sm">Create Your First Transaction</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => {
        const now = new Date();
        const upcomingDeadlines = tx.deadlines
          .filter((d) => !d.completedAt && new Date(d.dueAt) >= now)
          .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
        const nearestDeadline = upcomingDeadlines[0];
        const nearestStatus = nearestDeadline
          ? getDeadlineStatus(new Date(nearestDeadline.dueAt), nearestDeadline.completedAt)
          : null;

        return (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors bg-card gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-sm truncate">{tx.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[tx.status] ?? "bg-muted text-muted-foreground"}`}
                >
                  {tx.status}
                </span>
                <Badge variant="outline" className="text-xs font-normal">
                  {tx.side}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{tx.propertyAddress}</p>
              {nearestDeadline && nearestStatus && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    Next: {nearestDeadline.title} — {formatDeadlineLabel(new Date(nearestDeadline.dueAt))}
                  </span>
                  <DeadlineBadge status={nearestStatus} />
                </div>
              )}
            </div>
            <Link href={`/app/transactions/${tx.id}`}>
              <Button variant="ghost" size="sm" className="shrink-0 gap-1">
                View <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
