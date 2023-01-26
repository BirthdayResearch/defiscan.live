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

export function formatUnixTime(
  medianTime: number,
  dateFormat: string = "MM/dd/yyyy"
): string {
  const date = new Date(medianTime * 1000);
  const utcDate = new Date(
    date.valueOf() + date.getTimezoneOffset() * 60 * 1000
  );
  return format(utcDate, dateFormat);
}
