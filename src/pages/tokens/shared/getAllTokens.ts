import { WhaleApiClient } from "@defichain/whale-api-client";
import { TokenData } from "@defichain/whale-api-client/dist/api/tokens";

export async function getAllTokens(api: WhaleApiClient) {
  const result: TokenData[] = [];
  let hasNext = false;
  let nextToken: string | undefined;

  try {
    do {
      const tokenResponse = await api.tokens.list(200, nextToken);
      hasNext = tokenResponse.hasNext;
      nextToken = tokenResponse.nextToken;
      result.push(...tokenResponse);
    } while (hasNext);
  } catch (e) {
    console.error("Error while retrieving all tokens", e);
  }

  return result;
}
