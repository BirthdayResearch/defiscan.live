import BigNumber from "bignumber.js";
import { useTokenPrice } from "pages/vaults/hooks/TokenPrice";

export function usePoolPairPrices(poolPairs) {
  const { getTokenPrice } = useTokenPrice();

  return poolPairs.map((pair) => {
    const tokenPrice = getTokenPrice(
      pair.tokenB.symbol,
      new BigNumber(pair.priceRatio.ba)
    );
    return {
      poolPair: pair,
      tokenPrice: tokenPrice,
    };
  });
}
