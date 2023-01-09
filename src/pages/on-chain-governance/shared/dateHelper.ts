import { format, fromUnixTime } from "date-fns";

export function getCurrentYearMonth() {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.toLocaleString("en-US", { month: "long" });

  return {
    currentYear: currentYear,
    currentMonth: currentMonth,
  };
}

export function formatUnixTime(
  medianTime: number,
  dateFormat: string = "MM/dd/yyyy"
): string {
  return format(fromUnixTime(medianTime), dateFormat);
}
