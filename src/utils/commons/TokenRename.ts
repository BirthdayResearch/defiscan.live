export function tokenSymbolRename(symbol: string): string {
  return symbol.includes("dUSDT") ? symbol.replace("dUSDT", "ex_USDT") : symbol;
}
