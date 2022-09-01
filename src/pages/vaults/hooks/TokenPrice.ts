/**
 * Reference: https://github.com/DeFiCh/wallet/blob/main/mobile-app/app/screens/AppNavigator/screens/Portfolio/hooks/TokenPrice.ts
 */

import BigNumber from "bignumber.js";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { dexPricesSelectorByDenomination } from "@store/dexPrices";
import { RootState } from "@store/index";

interface TokenPrice {
  getTokenPrice: (
    symbol: string,
    amount: BigNumber,
    isLPS?: boolean
  ) => BigNumber;
}

export function useTokenPrice(denominationTokenSymbol = "USDT"): TokenPrice {
  const blockCount = useSelector((state: RootState) => state.stats.count);
  const prices = useSelector((state: RootState) =>
    dexPricesSelectorByDenomination(state.dexPrices, denominationTokenSymbol)
  );
  const pairs = useSelector((state: RootState) => state.poolpairs.poolpairs);

  /**
   * @param symbol {string} token symbol
   * @param amount {string} token amount
   * @param isLPS {boolean} is liquidity pool token
   * @return BigNumber
   */
  const getTokenPrice = useCallback(
    (symbol: string, amount: BigNumber, isLPS: boolean = false): BigNumber => {
      if (
        symbol === denominationTokenSymbol ||
        new BigNumber(amount).isZero()
      ) {
        return new BigNumber(amount);
      }
      if (isLPS) {
        const pair = pairs.find((pair) => pair.symbol === symbol);
        if (pair === undefined) {
          return new BigNumber("");
        }
        const ratioToTotal = new BigNumber(amount).div(
          pair.totalLiquidity.token
        );
        const tokenAAmount = ratioToTotal
          .times(pair.tokenA.reserve)
          .decimalPlaces(8, BigNumber.ROUND_DOWN);
        const tokenBAmount = ratioToTotal
          .times(pair.tokenB.reserve)
          .decimalPlaces(8, BigNumber.ROUND_DOWN);
        const usdTokenA = getTokenPrice(pair.tokenA.symbol, tokenAAmount);
        const usdTokenB = getTokenPrice(pair.tokenB.symbol, tokenBAmount);
        return usdTokenA.plus(usdTokenB);
      }
      return new BigNumber(prices[symbol]?.denominationPrice ?? 0).multipliedBy(
        amount
      );
    },
    [prices, pairs, blockCount]
  );

  return {
    getTokenPrice,
  };
}
