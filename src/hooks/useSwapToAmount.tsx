import { useWhaleApiClient } from "@contexts/WhaleContext";

export function useSwapToAmount() {
  const api = useWhaleApiClient();
  return async function getSwapToAmount({
    tokenId,
    address,
    txnHeight,
    order,
  }): Promise<string | undefined> {
    const toTokenDetails = await api.tokens.get(tokenId);
    const accountHistory = await api.address.getAccountHistory(
      address,
      txnHeight,
      order
    );
    return accountHistory?.amounts?.reduce((toAmount, current) => {
      const [amount, symbol] = current.split("@");
      if (toAmount === undefined && symbol === toTokenDetails.symbol) {
        return amount;
      }
      return toAmount;
    }, undefined);
  };
}
