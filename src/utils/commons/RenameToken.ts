export function renameTokenSymbol(symbol: string): string {
  return symbol.includes("dUSDT") ? symbol.replace("dUSDT", "ex_USDT") : symbol;
}
