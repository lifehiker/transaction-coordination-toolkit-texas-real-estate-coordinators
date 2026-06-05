import { addDays, isBefore, differenceInDays } from "date-fns";

export function calculateOptionPeriodDeadline({
  effectiveDate,
  optionPeriodDays,
}: {
  effectiveDate: Date;
  optionPeriodDays: number;
}): Date {
  return addDays(effectiveDate, optionPeriodDays);
}

export interface DeadlineItem {
  title: string;
  dueAt: Date;
  category: string;
}

export function calculateContractTimeline({
  effectiveDate,
  closingDate,
  optionPeriodDays,
  financingDeadlineDays,
  titleCommitmentDays,
  surveyDeadlineDays,
  hoaTargetDate,
}: {
  effectiveDate: Date;
  closingDate?: Date;
  optionPeriodDays?: number;
  financingDeadlineDays?: number;
  titleCommitmentDays?: number;
  surveyDeadlineDays?: number;
  hoaTargetDate?: Date;
}): DeadlineItem[] {
  const deadlines: DeadlineItem[] = [];

  if (optionPeriodDays != null && optionPeriodDays > 0) {
    deadlines.push({
      title: "Option Period Expires",
      dueAt: addDays(effectiveDate, optionPeriodDays),
      category: "OPTION_PERIOD",
    });
  }

  if (financingDeadlineDays != null && financingDeadlineDays > 0) {
    deadlines.push({
      title: "Financing Approval Deadline",
      dueAt: addDays(effectiveDate, financingDeadlineDays),
      category: "FINANCING",
    });
  }

  if (titleCommitmentDays != null && titleCommitmentDays > 0) {
    deadlines.push({
      title: "Title Commitment Delivery Deadline",
      dueAt: addDays(effectiveDate, titleCommitmentDays),
      category: "ESCROW_TITLE",
    });
  }

  if (surveyDeadlineDays != null && surveyDeadlineDays > 0) {
    deadlines.push({
      title: "Survey Delivery Deadline",
      dueAt: addDays(effectiveDate, surveyDeadlineDays),
      category: "ESCROW_TITLE",
    });
  }

  if (hoaTargetDate) {
    deadlines.push({
      title: "HOA Documents Target Date",
      dueAt: hoaTargetDate,
      category: "HOA_DOCUMENTS",
    });
  }

  if (closingDate) {
    deadlines.push({
      title: "Closing Date",
      dueAt: closingDate,
      category: "CLOSING_WEEK",
    });
  }

  deadlines.sort((a, b) => a.dueAt.getTime() - b.dueAt.getTime());

  return deadlines;
}

export type DeadlineStatus = "completed" | "overdue" | "due-soon" | "upcoming";

export function getDeadlineStatus(
  dueAt: Date,
  completedAt?: Date | null
): DeadlineStatus {
  if (completedAt) return "completed";
  const now = new Date();
  if (isBefore(dueAt, now)) return "overdue";
  const daysUntil = differenceInDays(dueAt, now);
  if (daysUntil <= 7) return "due-soon";
  return "upcoming";
}
