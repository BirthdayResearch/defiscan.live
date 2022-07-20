/**
 * Reference: https://github.com/DeFiCh/wallet/blob/main/mobile-app/app/screens/AppNavigator/screens/Balances/hooks/TokenPrice.ts
 */

import BigNumber from 'bignumber.js'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { checkIfPair, findPath, GraphProps } from '../utils/path-finding'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { useMemo } from 'react'

interface CalculatePriceRatesI {
  aToBPrice: BigNumber
  bToAPrice: BigNumber
  estimated: BigNumber
}

interface DexTokenPrice {
  getTokenPrice: (symbol: string, amount: string, isLPS?: boolean) => BigNumber
  calculatePriceRates: (fromTokenSymbol: string, pairs: PoolPairData[], amount: string) => CalculatePriceRatesI
  getArbitraryPoolPair: (tokenASymbol: string, tokenBSymbol: string) => PoolPairData[]
}

export function useTokenPrice (): DexTokenPrice {
  const { poolpairs: rawPoolPairs } = useSelector((state: RootState) => state.poolpairs)

  const poolpairs = useMemo(() => {
    return rawPoolPairs.filter(poolpair => !poolpair.displaySymbol.includes('/'))
  }, [rawPoolPairs])

  const graph: GraphProps[] = poolpairs.map(pair => {
    return {
      pairId: pair.id,
      a: pair.tokenA.symbol,
      b: pair.tokenB.symbol
    }
  })

  function getTokenPrice (symbol: string, amount: string, isLPS: boolean = false): BigNumber {
    if (isLPS) {
      const pair = poolpairs.find(pair => pair.symbol === symbol)
      if (pair === undefined) {
        return new BigNumber('')
      }
      const ratioToTotal = new BigNumber(amount).div(pair.totalLiquidity.token)
      const tokenAAmount = ratioToTotal.times(pair.tokenA.reserve).decimalPlaces(8, BigNumber.ROUND_DOWN)
      const tokenBAmount = ratioToTotal.times(pair.tokenB.reserve).decimalPlaces(8, BigNumber.ROUND_DOWN)
      const usdTokenA = getTokenPrice(pair.tokenA.symbol, tokenAAmount.toFixed(8))
      const usdTokenB = getTokenPrice(pair.tokenB.symbol, tokenBAmount.toFixed(8))
      return usdTokenA.plus(usdTokenB)
    }
    // active price for walletTokens based on USDT
    const arbitraryPoolPair = getArbitraryPoolPair(symbol, 'USDT')

    if (symbol === 'USDT') {
      return new BigNumber(amount)
    } else if (arbitraryPoolPair.length > 0) {
      const { estimated } = calculatePriceRates(symbol, arbitraryPoolPair, amount)
      return estimated
    }
    return new BigNumber('')
  }

  function getArbitraryPoolPair (tokenASymbol: string, tokenBSymbol: string): PoolPairData[] {
    // TODO - Handle cheapest path with N hops, currently this logic finds the shortest path
    const { path } = findPath(graph, tokenASymbol, tokenBSymbol)
    return path.reduce((poolPairs: PoolPairData[], token, index): PoolPairData[] => {
      const pair = poolpairs.find(pair => checkIfPair({
        a: pair.tokenA.symbol,
        b: pair.tokenB.symbol
      }, token, path[index + 1]))
      if ((pair == null) || index === path.length) {
        return poolPairs
      }
      return [...poolPairs, pair]
    }, [])
  }

  function calculatePriceRates (fromTokenSymbol: string, pairs: PoolPairData[], amount: string): CalculatePriceRatesI {
    let lastTokenBySymbol = fromTokenSymbol
    let lastAmount = new BigNumber(amount)
    const priceRates = pairs.reduce((priceRates, pair): { aToBPrice: BigNumber, bToAPrice: BigNumber, estimated: BigNumber } => {
      const [reserveA, reserveB] = pair.tokenB.symbol === lastTokenBySymbol ? [pair.tokenB.reserve, pair.tokenA.reserve] : [pair.tokenA.reserve, pair.tokenB.reserve]
      const [tokenASymbol, tokenBSymbol] = pair.tokenB.symbol === lastTokenBySymbol ? [pair.tokenB.symbol, pair.tokenA.symbol] : [pair.tokenA.symbol, pair.tokenB.symbol]

      const priceRateA = new BigNumber(reserveB).div(reserveA)
      const priceRateB = new BigNumber(reserveA).div(reserveB)
      // To sequentially convert the token from its last token
      const aToBPrice = tokenASymbol === lastTokenBySymbol ? priceRateA : priceRateB
      const bToAPrice = tokenASymbol === lastTokenBySymbol ? priceRateB : priceRateA
      const estimated = new BigNumber(lastAmount).times(aToBPrice)

      lastAmount = estimated
      lastTokenBySymbol = tokenBSymbol
      return {
        aToBPrice: priceRates.aToBPrice.times(aToBPrice),
        bToAPrice: priceRates.bToAPrice.times(bToAPrice),
        estimated
      }
    }, {
      aToBPrice: new BigNumber(1),
      bToAPrice: new BigNumber(1),
      estimated: new BigNumber(0)
    })

    return {
      aToBPrice: priceRates.aToBPrice,
      bToAPrice: priceRates.bToAPrice,
      estimated: priceRates.estimated
    }
  }

  return {
    getTokenPrice,
    calculatePriceRates,
    getArbitraryPoolPair
  }
}
