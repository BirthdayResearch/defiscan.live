import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
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

interface PoolPairPageProps {
  poolpair: PoolPairData
  swaps: {
    items: PoolSwapData[]
    pages: CursorPage[]
  }
}

export default function PoolPairPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
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
        <PoolPairDetailsBar poolpair={props.poolpair} />
        <div className='flex flex-wrap space-y-12 lg:space-y-0 lg:flex-nowrap mt-8'>
          <div className='lg:flex lg:flex-col lg:mr-4 w-full lg:w-1/4 min-w-[320px]'>
            <h3 className='text-lg font-semibold'>
              Pool Details
            </h3>
            <PoolPairDetails poolpair={props.poolpair} />
          </div>
          <div className='w-full lg:w-3/4 overflow-hidden'>
            <h3 className='text-lg font-semibold'>
              Swap History
            </h3>
            <div className='hidden lg:block'>
              <SwapTable swaps={props.swaps.items} />
            </div>
            <div className='my-6 lg:hidden'>
              <SwapCards swaps={props.swaps.items} />
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

async function getPoolPairsByParam (param: string, api: WhaleApiClient): Promise<PoolPairData | undefined> {
  const [tokenA, tokenB] = param.split('-')
  const poolpairs: PoolPairData[] = []

  let poolpairsResponse = await api.poolpairs.list(200)
  poolpairs.push(...poolpairsResponse)
  while (poolpairsResponse.hasNext) {
    poolpairsResponse = await api.poolpairs.list(200, poolpairsResponse.nextToken)
    poolpairs.push(...poolpairsResponse)
  }
  return poolpairs.filter(pair => {
    if (tokenB !== undefined) {
      return pair.tokenA.displaySymbol.toLowerCase() === tokenA.toLowerCase() && pair.tokenB.displaySymbol.toLowerCase() === tokenB.toLowerCase()
    } else {
      return pair.tokenA.displaySymbol.toLowerCase() === param.toLowerCase() || pair.tokenA.symbol.toLowerCase() === param.toLowerCase()
    }
  }).pop()
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PoolPairPageProps>> {
  const param = context.params?.poolpairId?.toString().trim() as string
  if (!isAlphanumeric(param, '-.')) {
    return { notFound: true }
  }

  const api = getWhaleApiClient(context)

  let poolPair: PoolPairData | undefined

  if (param.includes('-')) {
    poolPair = await getPoolPairsByParam(param, api)
  } else if (isNumeric(param)) {
    try {
      poolPair = await api.poolpairs.get(param)
    } catch (e) {
      return { notFound: true }
    }
  } else {
    poolPair = await getPoolPairsByParam(param, api)
  }

  if (poolPair === undefined) {
    return { notFound: true }
  }

  const next = CursorPagination.getNext(context)
  const swaps = await api.poolpairs.listPoolSwapsVerbose(poolPair.id, 10, next)

  return {
    props: {
      poolpair: poolPair,
      swaps: {
        items: swaps,
        pages: CursorPagination.getPages(context, swaps)
      }
    }
  }
}
