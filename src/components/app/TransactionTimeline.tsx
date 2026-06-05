"use client";

import { formatDeadlineLabel } from "@/lib/date-format";
import { getDeadlineStatus } from "@/lib/deadlines";
import { DeadlineBadge } from "./DeadlineBadge";
import { Button } from "@/components/ui/button";
import { toggleDeadline } from "@/app/app/transactions/actions";
import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Deadline {
  id: string;
  title: string;
  category: string;
  dueAt: Date;
  completedAt: Date | null;
}

interface TransactionTimelineProps {
  deadlines: Deadline[];
}

export function TransactionTimeline({ deadlines }: TransactionTimelineProps) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleToggle(id: string) {
    setPendingId(id);
    try {
      const result = await toggleDeadline(id);
      if (result?.error) {
        toast.error(result.error);
      }
    } catch {
      toast.error("Failed to update deadline.");
    } finally {
      setPendingId(null);
    }
  }

  if (deadlines.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No deadlines calculated yet. Edit the transaction to add deadline days.
      </div>
    );
  }

  const sorted = [...deadlines].sort(
    (a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Deadline</th>
            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Due Date</th>
            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
            <th className="text-right py-2 px-3 font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((deadline) => {
            const status = getDeadlineStatus(new Date(deadline.dueAt), deadline.completedAt);
            return (
              <tr key={deadline.id} className="border-b last:border-0 hover:bg-muted/20">
                <td className="py-3 px-3 font-medium">{deadline.title}</td>
                <td className="py-3 px-3 text-muted-foreground">
                  {formatDeadlineLabel(new Date(deadline.dueAt))}
                </td>
                <td className="py-3 px-3">
                  <DeadlineBadge status={status} />
                </td>
                <td className="py-3 px-3 text-right">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5"
                    disabled={pendingId === deadline.id}
                    onClick={() => handleToggle(deadline.id)}
                  >
                    {deadline.completedAt ? (
                      <>
                        <RotateCcw className="h-3.5 w-3.5" /> Reopen
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" /> Complete
                      </>
                    )}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
