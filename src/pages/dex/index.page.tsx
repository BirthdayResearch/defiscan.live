import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { poolpairs } from '@defichain/whale-api-client'
import { RootState } from '@store/index'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { useSelector } from 'react-redux'
import { Container } from '@components/commons/Container'
import { StatItem } from '@components/commons/stats/StatItem'
import ReactNumberFormat from 'react-number-format'
import { StatsBar } from '@components/commons/stats/StatsBar'
import React, { useEffect, useState } from 'react'
import { DexPrice, PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairsTable, SortKeys, SortOrder } from './_components/PoolPairsTable'
import { PoolPairsCards } from './_components/PoolPairsCards'
import BigNumber from 'bignumber.js'
import { useTokenPrice } from '../vaults/hooks/TokenPrice'

interface DexPageProps {
  poolPairs: {
    items: poolpairs.PoolPairData[]
    prices: {[symbol: string]: DexPrice}
    pages: CursorPage[]
  }
  aggregate: {
    volume: {
      total24h: number
    }
  }
}

export default function DexPage ({
  poolPairs,
  aggregate
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const tvl = useSelector((state: RootState) => state.stats.tvl.dex)
  const [sortKey, setSortKey] = useState<SortKeys>(SortKeys.TOTAL_LIQUIDITY)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const { getTokenPrice } = useTokenPrice()
  const [poolPairsPrices, setPoolPairsPrices] = useState<Array<{ poolPair: PoolPairData, tokenPrice: BigNumber }> >([])
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
  const pricesState = useSelector((state: RootState) => state.dex.dexPrices)

  useEffect(() => {
    if (isInitialLoad) {
      setPoolPairsPrices(poolPairs.items.map(pair => {
        const tokenPrice = new BigNumber(getTokenPrice(pair.tokenA.symbol, '1', poolPairs.prices) ?? 0)
        return {
          poolPair: pair,
          tokenPrice: tokenPrice
        }
      }))
    }
  }, [setPoolPairsPrices, isInitialLoad])

  useEffect(() => {
    const interval = setInterval(() => {
      setPoolPairsPrices(poolPairs.items.map(pair => {
        const tokenPrice = new BigNumber(getTokenPrice(pair.tokenA.symbol, '1', undefined) ?? 0)
        return { poolPair: pair, tokenPrice: tokenPrice }
      }))
    }, 5000)
    setIsInitialLoad(false)
    return () => clearInterval(interval)
  }, [setPoolPairsPrices, pricesState])

  return (
    <>
      <Head
        title='DEX'
        description='Supply liquidity to BTC, ETH, USDT, USDC and many other pool pairs to power the Decentralized Exchange. Earn fees and block rewards in return for providing liquidity to the pool, you can withdraw your liquidity at any time.'
      />
      <StatsBar>
        <StatItem label='Total Value Locked in Pool Pairs' testId='Dex.Stats.TVL'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={tvl}
            decimalScale={0}
            prefix='$'
            suffix=' USD'
          />
        </StatItem>
        <StatItem label='Total 24H Volume' testId='Dex.Stats.24hVolume'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={aggregate.volume.total24h.toString()}
            decimalScale={0}
            prefix='$'
            suffix=' USD'
          />
        </StatItem>
      </StatsBar>

      <Container className='pt-12 pb-20'>
        <h1 className='text-2xl font-medium mb-6'>DEX Pool Pairs</h1>

        <div className='my-6 hidden md:block'>
          <PoolPairsTable poolPairsPrices={poolPairsPrices} sortKey={sortKey} setSortKey={setSortKey} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        <div className='my-6 md:hidden'>
          <PoolPairsCards poolPairsPrices={poolPairsPrices} sortKey={sortKey} setSortKey={setSortKey} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        <div className='flex justify-end mt-8'>
          <CursorPagination pages={poolPairs.pages} path='/dex' />
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<DexPageProps>> {
  const api = getWhaleApiClient(context)

  const next = CursorPagination.getNext(context)
  const items = await api.poolpairs.list(100, next)
  const sorted = items.map(value => ({
    sort: Number.parseFloat(value.totalLiquidity.usd ?? '0'),
    value
  }))
    .sort((a, b) => a.sort - b.sort)
    .reverse()
    .map(value => value.value)

  const result = await api.poolpairs.listDexPrices('USDT')
  return {
    props: {
      poolPairs: {
        items: sorted,
        prices: result.dexPrices,
        pages: CursorPagination.getPages(context, items)
      },
      aggregate: {
        volume: {
          total24h: await get24hSum()
        }
      }
    }
  }

  async function get24hSum (): Promise<number> {
    const poolpairs: PoolPairData[] = []

    let poolpairsResponse = await api.poolpairs.list(200)
    poolpairs.push(...poolpairsResponse)
    while (poolpairsResponse.hasNext) {
      poolpairsResponse = await api.poolpairs.list(200, poolpairsResponse.nextToken)
      poolpairs.push(...poolpairsResponse)
    }

    return poolpairs.reduce((a, b) => a + (b.volume?.h24 ?? 0), 0)
  }
}
