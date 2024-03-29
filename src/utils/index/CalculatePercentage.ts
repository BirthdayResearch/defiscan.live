export function CalculatePercentage(
  value1: number | undefined,
  value2: number | undefined
): string {
  if (value1 === undefined || value2 === undefined) {
    return "";
  }

  return `${((value1 / value2) * 100).toFixed(2)}%`;
}
