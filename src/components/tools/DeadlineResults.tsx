"use client";

import { formatDeadlineLabel } from "@/lib/date-format";
import { getDeadlineStatus } from "@/lib/deadlines";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Clock, Calendar } from "lucide-react";

interface Deadline {
  title: string;
  dueAt: Date;
  category: string;
}

interface DeadlineResultsProps {
  deadlines: Deadline[];
}

const categoryLabels: Record<string, string> = {
  OPTION_PERIOD: "Option Period",
  FINANCING: "Financing",
  ESCROW_TITLE: "Title / Escrow",
  HOA_DOCUMENTS: "HOA",
  CLOSING_WEEK: "Closing",
  CONTRACT: "Contract",
  INSPECTION: "Inspection",
  REPAIR_AMENDMENT: "Repairs",
};

export function DeadlineResults({ deadlines }: DeadlineResultsProps) {
  if (deadlines.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
        Calculated Deadlines
      </h3>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium">Deadline</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Due Date</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {deadlines.map((d, i) => {
              const status = getDeadlineStatus(d.dueAt);
              return (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{d.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <Badge variant="secondary" className="font-normal text-xs">
                      {categoryLabels[d.category] ?? d.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{formatDeadlineLabel(d.dueAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
        <CheckCircle2 className="h-3 w-3" /> Completed
      </span>
    );
  }
  if (status === "overdue") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
        <AlertTriangle className="h-3 w-3" /> Overdue
      </span>
    );
  }
  if (status === "due-soon") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
        <Clock className="h-3 w-3" /> Due Soon
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
      <Calendar className="h-3 w-3" /> Upcoming
    </span>
  );
}
