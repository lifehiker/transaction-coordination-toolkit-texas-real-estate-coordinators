import { type DeadlineStatus } from "@/lib/deadlines";
import { CheckCircle2, AlertTriangle, Clock, Calendar } from "lucide-react";

interface DeadlineBadgeProps {
  status: DeadlineStatus;
}

export function DeadlineBadge({ status }: DeadlineBadgeProps) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium">
        <CheckCircle2 className="h-3 w-3" /> Completed
      </span>
    );
  }
  if (status === "overdue") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-full font-medium">
        <AlertTriangle className="h-3 w-3" /> Overdue
      </span>
    );
  }
  if (status === "due-soon") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
        <Clock className="h-3 w-3" /> Due Soon
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-medium">
      <Calendar className="h-3 w-3" /> Upcoming
    </span>
  );
}
