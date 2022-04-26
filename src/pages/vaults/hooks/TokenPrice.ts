/**
 * Reference: https://github.com/DeFiCh/wallet/blob/main/mobile-app/app/screens/AppNavigator/screens/Balances/hooks/TokenPrice.ts
 */

import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { useCallback } from 'react'
import { DexPrice } from '@defichain/whale-api-client/dist/api/poolpairs'

interface DexTokenPrice {
  getTokenPrice: (symbol: string, amount: string, poolPairPrices?: { [symbol: string]: DexPrice }, isLPS?: boolean) => BigNumber
}

export function useTokenPrice (denominationTokenSymbol = 'USDT'): DexTokenPrice {
  let prices = useSelector((state: RootState) => state.dex.dexPrices)
  const { poolpairs } = useSelector((state: RootState) => state.poolpairs)

  /**
   * @param symbol {string} token symbol
   * @param amount {string} token amount
   * @param isLPS {boolean} is liquidity pool token
   * @return BigNumber
   */
  const getTokenPrice = useCallback((symbol: string, amount: string, poolPairPrices: { [symbol: string]: DexPrice }, isLPS: boolean = false): BigNumber => {
    if (symbol === denominationTokenSymbol || new BigNumber(amount).isZero()) {
      return new BigNumber(amount)
    }
    if (poolPairPrices !== undefined) {
      prices = poolPairPrices
    }

    if (isLPS) {
      const pair = poolpairs.find(pair => pair.symbol === symbol)
      if (pair === undefined) {
        return new BigNumber('')
      }
      const ratioToTotal = new BigNumber(amount).div(pair.totalLiquidity.token)
      const tokenAAmount = ratioToTotal.times(pair.tokenA.reserve).decimalPlaces(8, BigNumber.ROUND_DOWN)
      const tokenBAmount = ratioToTotal.times(pair.tokenB.reserve).decimalPlaces(8, BigNumber.ROUND_DOWN)
      const usdTokenA = getTokenPrice(pair.tokenA.symbol, tokenAAmount.toFixed(8), poolPairPrices)
      const usdTokenB = getTokenPrice(pair.tokenB.symbol, tokenBAmount.toFixed(8), poolPairPrices)
      return usdTokenA.plus(usdTokenB)
    }
    return new BigNumber(prices[symbol]?.denominationPrice ?? 0).multipliedBy(amount)
  }, [prices, poolpairs])

  return {
    getTokenPrice
  }
}
