import { format, parseISO } from "date-fns";

export function formatDeadlineLabel(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export function formatDateForInput(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function parseDateInput(value: string): Date {
  // parseISO handles "YYYY-MM-DD" strings correctly without timezone shift
  return parseISO(value);
}
