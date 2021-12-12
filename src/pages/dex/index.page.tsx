import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { poolpairs } from '@defichain/whale-api-client'
import { RootState } from '@store/index'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { useSelector } from 'react-redux'
import { PoolPairsTable } from '@components/dex/PoolPairs'
import { Container } from '@components/commons/Container'
import { StatItem } from '@components/commons/stats/StatItem'
import ReactNumberFormat from 'react-number-format'
import { StatsBar } from '@components/commons/stats/StatsBar'
import React from 'react'

interface DexPageProps {
  poolPairs: {
    items: poolpairs.PoolPairData[]
    pages: CursorPage[]
  }
}

export default function DexPage ({ poolPairs }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const tvl = useSelector((state: RootState) => state.stats.tvl.dex)

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
      </StatsBar>
      <Container className='pt-12 pb-20'>
        <h1 className='text-2xl font-medium mb-6'>DEX Pool Pairs</h1>
        <PoolPairsTable poolPairs={poolPairs.items} />

        <div className='flex justify-end mt-8'>
          <CursorPagination pages={poolPairs.pages} path='/dex' />
        </div>
      </Container>
    </>
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
