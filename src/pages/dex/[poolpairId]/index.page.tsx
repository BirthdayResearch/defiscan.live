import { Head } from '@components/commons/Head'
import { getWhaleApiClient, useWhaleApiClient } from '@contexts/WhaleContext'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { PoolPairData, PoolSwapData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { SwapCards } from './_components/SwapCards'
import { PoolPairDetails } from './_components/PoolPairDetails'
import { SwapTable } from './_components/SwapTable'
import { PoolPairDetailsBar } from './_components/PoolPairDetailsBar'
import { isAlphanumeric, isNumeric } from '../../../utils/commons/StringValidator'
import { WhaleApiClient } from '@defichain/whale-api-client'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BigNumber from 'bignumber.js'
import { PoolPairInfo } from './_components/PoolPairInfo'

interface PoolPairPageProps {
  poolpair: PoolPairData
  averageStableCoinPriceInDUSD: string
  swaps: {
    items: PoolSwapData[]
    pages: CursorPage[]
  }
}

export default function PoolPairPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const api = useWhaleApiClient()
  const [swapItems, setSwapItems] = useState<PoolSwapData[]>(props.swaps.items)
  const [poolpairs, setPoolpairs] = useState<PoolPairData>(props.poolpair)
  const router = useRouter()

  const dexStabilizationFee = poolpairs.tokenA.displaySymbol === 'DUSD' ? poolpairs.tokenA.fee?.pct : poolpairs.tokenB.fee?.pct

  useEffect(() => {
    setPoolpairs(props.poolpair)
    setSwapItems(props.swaps.items)

    const next = router.query.cursors as string

    // Only auto refreshes when at page 1
    if (next === undefined) {
      const interval = setInterval(() => {
        void api.poolpairs.get(props.poolpair.id).then((data) => {
          setPoolpairs(data)
        })
        void api.poolpairs.listPoolSwapsVerbose(props.poolpair.id, 10).then((data) => {
          setSwapItems(data)
        })
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [props, router.query])

  return (
    <>
      <Head
        title='DEX'
        description='Supply liquidity to BTC, ETH, USDT, USDC and many other pool pairs to power the Decentralized Exchange. Earn fees and block rewards in return for providing liquidity to the pool, you can withdraw your liquidity at any time.'
      />
      <Container className='pt-4 pb-20'>
        <Breadcrumb items={[
          {
            path: '/dex',
            name: 'DEX'
          },
          {
            path: `/dex/${props.poolpair.tokenA.displaySymbol}`,
            name: `${props.poolpair.tokenA.displaySymbol}`,
            canonical: true,
            isCurrentPath: true
          }
        ]}
        />
        <div className='flex flex-wrap flex-row lg:space-x-4'>
          <PoolPairDetailsBar poolpair={poolpairs} />
          {['DUSD-DFI', 'dUSDC-DUSD', 'dUSDT-DUSD'].includes(poolpairs.displaySymbol) &&
            <PoolPairInfo
              testId='DexStabilizationFee'
              lhsComponent={() => <span className='flex items-center dark:text-gray-400 mr-2'>DEX stabilization fee</span>}
              popoverDescription='There is currently a high DEX Stabilization fee imposed on DUSD-DFI swaps due to DFIP 2206-D.'
              rhs={{
                value: dexStabilizationFee === undefined ? undefined : new BigNumber(dexStabilizationFee).multipliedBy(100).toFixed(2, BigNumber.ROUND_HALF_UP),
                suffix: '%'
              }}
            />}
        </div>
        <div className='flex flex-wrap space-y-12 lg:space-y-0 lg:flex-nowrap mt-8'>
          <div className='lg:flex lg:flex-col lg:mr-4 w-full lg:w-1/4 min-w-[320px]'>
            <h3 className='text-lg font-semibold dark:text-dark-gray-900'>
              Pool Details
            </h3>
            <PoolPairDetails poolpair={poolpairs} />
          </div>
          <div className='w-full lg:w-3/4 overflow-hidden'>
            <h3 className='text-lg font-semibold dark:text-dark-gray-900'>
              Swap History
            </h3>
            <div className='hidden lg:block'>
              <SwapTable swaps={swapItems} />
            </div>
            <div className='my-6 lg:hidden'>
              <SwapCards swaps={swapItems} />
            </div>
          </div>
        </div>
        <div className='flex justify-end mt-8'>
          <CursorPagination pages={props.swaps.pages} path={`/dex/${props.poolpair.id}`} />
        </div>
      </Container>
    </>
  )
}

async function getPoolPairs (api: WhaleApiClient): Promise<PoolPairData[]> {
  const poolpairs: PoolPairData[] = []

  let poolpairsResponse = await api.poolpairs.list(200)
  poolpairs.push(...poolpairsResponse)
  while (poolpairsResponse.hasNext) {
    poolpairsResponse = await api.poolpairs.list(200, poolpairsResponse.nextToken)
    poolpairs.push(...poolpairsResponse)
  }

  return poolpairs
}

function getPoolPairsByParam (param: string, poolpairs: PoolPairData[]): PoolPairData | undefined {
  const [tokenA, tokenB] = param.split('-')
  return poolpairs.filter(pair => {
    if (tokenB !== undefined) {
      return pair.tokenA.displaySymbol.toLowerCase() === tokenA.toLowerCase() && pair.tokenB.displaySymbol.toLowerCase() === tokenB.toLowerCase()
    } else {
      return pair.tokenA.displaySymbol.toLowerCase() === param.toLowerCase() || pair.tokenA.symbol.toLowerCase() === param.toLowerCase()
    }
  }).pop()
}

function getAverageStableCoinPrice (poolpairs: PoolPairData[]): string {
  const stableCoinPoolPairs = poolpairs.filter(pair => ['dUSDT-DUSD', 'dUSDC-DUSD'].includes(pair.displaySymbol))
  let totalTokenBReserve = new BigNumber(0)
  let totalTokenAReserve = new BigNumber(0)

  stableCoinPoolPairs.forEach(pair => {
    totalTokenBReserve = new BigNumber(pair.tokenB.reserve).plus(totalTokenBReserve)
    totalTokenAReserve = new BigNumber(pair.tokenA.reserve).plus(totalTokenAReserve)
  })

  return new BigNumber(totalTokenAReserve).div(totalTokenBReserve).toFixed(8)
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PoolPairPageProps>> {
  const poolpairId = context.params?.poolpairId?.toString().trim() as string
  if (!isAlphanumeric(poolpairId, '-.')) {
    return { notFound: true }
  }

  const api = getWhaleApiClient(context)
  const poolPairs = await getPoolPairs(api)

  let poolPair: PoolPairData | undefined

  if (poolpairId.includes('-')) {
    poolPair = getPoolPairsByParam(poolpairId, poolPairs)
  } else if (isNumeric(poolpairId)) {
    try {
      poolPair = await api.poolpairs.get(poolpairId)
    } catch (e) {
      return { notFound: true }
    }
  } else {
    poolPair = getPoolPairsByParam(poolpairId, poolPairs)
  }

  if (poolPair === undefined) {
    return { notFound: true }
  }

  /* DUSD price based on stablecoin pools - (USDC & USDT)-DUSD */
  const averageStableCoinPriceInDUSD = getAverageStableCoinPrice(poolPairs)

  const next = CursorPagination.getNext(context)
  const swaps = await api.poolpairs.listPoolSwapsVerbose(poolPair.id, 10, next)

  return {
    props: {
      poolpair: poolPair,
      averageStableCoinPriceInDUSD,
      swaps: {
        items: swaps,
        pages: CursorPagination.getPages(context, swaps)
      }
    }
  }
}
