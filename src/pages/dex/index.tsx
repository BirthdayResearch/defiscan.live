import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { poolpairs } from '@defichain/whale-api-client'
import { RootState } from '@store/index'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import { PoolPairsTable } from '@components/dex/PoolPairs'
import { Container } from '@components/commons/Container'

interface DexPageProps {
  poolPairs: {
    items: poolpairs.PoolPairData[]
    pages: CursorPage[]
  }
}

export default function DexPage ({ poolPairs }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const tvl = useSelector((state: RootState) => state.stats.tvl.dex)

  return (
    <Container className='pt-12 pb-20'>
      <Head
        title='DEX'
        description='Supply liquidity to BTC, ETH, USDT, USDC and many other pool pairs to power the Decentralized Exchange. Earn fees and block rewards in return for providing liquidity to the pool, you can withdraw your liquidity at any time.'
      />
      <div>
        <h1 className='text-2xl font-semibold'>Decentralized Exchange</h1>
        {tvl !== undefined && (
          <div className='mt-1'>
            <h3 className='text-sm font-medium'>Total Value Locked:</h3>
            <NumberFormat
              className='font-medium text-black opacity-80'
              value={tvl}
              displayType='text'
              decimalScale={0}
              thousandSeparator
              prefix='$'
            />
          </div>
        )}
      </div>

      <div className='mt-12'>
        <h1 className='text-xl font-semibold'>DEX Pool Pairs</h1>
        <PoolPairsTable poolPairs={poolPairs.items} />
        <div className='flex justify-end mt-8'>
          <CursorPagination pages={poolPairs.pages} path='/dex' />
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<DexPageProps>> {
  const next = CursorPagination.getNext(context)
  const items = await getWhaleApiClient(context).poolpairs.list(30, next)
  const sorted = items.map(value => ({
    sort: Number.parseFloat(value.totalLiquidity.usd ?? '0'),
    value
  }))
    .sort((a, b) => a.sort - b.sort)
    .reverse()
    .map(value => value.value)

  return {
    props: {
      poolPairs: {
        items: sorted,
        pages: CursorPagination.getPages(context, items)
      }
    }
  }
}
