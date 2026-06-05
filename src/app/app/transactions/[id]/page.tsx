import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TransactionTimeline } from "@/components/app/TransactionTimeline";
import { ChecklistPanel } from "@/components/app/ChecklistPanel";
import { archiveTransaction, deleteTransaction } from "@/app/app/transactions/actions";
import { formatDeadlineLabel } from "@/lib/date-format";
import { Edit, Archive, Trash2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const session = await auth();
  const tx = await db.transaction.findFirst({
    where: { id, userId: session?.user?.id ?? "" },
  });
  return { title: tx ? `${tx.name} | Texas TC Toolkit` : "Transaction" };
}

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const transaction = await db.transaction.findFirst({
    where: { id, userId },
    include: {
      deadlines: true,
      checklistItems: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!transaction) notFound();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <nav className="text-sm text-muted-foreground mb-1">
            <Link href="/app/transactions" className="hover:text-foreground">Transactions</Link>
            {" / "}
            <span>{transaction.name}</span>
          </nav>
          <h1 className="text-2xl font-bold">{transaction.name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <Badge variant="outline">{transaction.side}</Badge>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                transaction.status === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : transaction.status === "CLOSED"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.status}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/app/transactions/${id}/edit`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-3.5 w-3.5" /> Edit
            </Button>
          </Link>
          {transaction.status === "ACTIVE" && (
            <form
              action={async () => {
                "use server";
                await archiveTransaction(id);
              }}
            >
              <Button variant="outline" size="sm" type="submit" className="gap-2">
                <Archive className="h-3.5 w-3.5" /> Close
              </Button>
            </form>
          )}
          <form
            action={async () => {
              "use server";
              await deleteTransaction(id);
            }}
          >
            <Button variant="outline" size="sm" type="submit" className="gap-2 text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
          </form>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Property Address</p>
            <p className="font-medium mt-0.5">{transaction.propertyAddress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Effective Date</p>
            <p className="font-medium mt-0.5">
              {formatDeadlineLabel(new Date(transaction.effectiveDate))}
            </p>
          </CardContent>
        </Card>
        {transaction.closingDate && (
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Closing Date</p>
              <p className="font-medium mt-0.5">
                {formatDeadlineLabel(new Date(transaction.closingDate))}
              </p>
            </CardContent>
          </Card>
        )}
        {transaction.notes && (
          <Card className="col-span-full">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Notes</p>
              <p className="text-sm mt-0.5 whitespace-pre-wrap">{transaction.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transaction Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionTimeline deadlines={transaction.deadlines} />
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contract-to-Close Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ChecklistPanel items={transaction.checklistItems} />
        </CardContent>
      </Card>
    </div>
  );
}
