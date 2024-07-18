export function tokenSymbolRename(symbol: string): string {
  return symbol.includes("dUSDT") ? symbol.replace("dUSDT", "csUSDT") : symbol;
}
