import { format } from "date-fns";

export function getCurrentYearMonth() {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.toLocaleString("en-US", { month: "long" });

  return {
    currentYear: currentYear,
    currentMonth: currentMonth,
  };
}

export function formatMedianTime(
  medianTime: number,
  dateFormat: string = "MMM dd, yyyy, HH:mm:ss aa",
  approximation: boolean = false
): string {
  if (approximation === true) {
    dateFormat = `'≈ '${dateFormat}`;
  }
  const date = new Date(medianTime * 1000);
  return format(date, dateFormat);
}
