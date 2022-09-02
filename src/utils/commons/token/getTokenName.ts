import { TokenData } from "@defichain/whale-api-client/dist/api/tokens";

export function getTokenName(token: TokenData): string {
  if (token.isDAT) {
    return token.name.replace("Default Defi token", "DeFiChain");
  }

  return `${token.name}#${token.id}`;
}
