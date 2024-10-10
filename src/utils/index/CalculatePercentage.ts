export function CalculatePercentage(
  value1: number | undefined,
  value2: number | undefined,
): string {
  if (value1 === undefined || value2 === undefined) {
    return "";
  }

  const result = value1 / value2;
  if (isNaN(result)) {
    return "0.00%";
  }

  return `${(result * 100).toFixed(2)}%`;
}
