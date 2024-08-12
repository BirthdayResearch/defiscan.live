export function CalculatePercentage(
  value1: number | undefined,
  value2: number | undefined,
): string {
  if (value1 === undefined || value2 === undefined) {
    return "";
  }
  if (value2 === 0) {
    return "0.00%";
  }
  console.log(((value1 / value2) * 100).toFixed(2));

  return `${((value1 / value2) * 100).toFixed(2)}%`;
}
