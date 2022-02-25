
export function CalculatePercentage (value1: number, value2: number): string {
  return `${(value1 / value2 * 100).toFixed(2)}%`
}
