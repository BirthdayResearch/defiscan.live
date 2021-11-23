import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'

import { getWhaleApiClient } from '@contexts/WhaleContext'

import { Container } from '@components/commons/Container'
import { IndexHeader } from '@components/index/IndexHeader'
import { LiquidityPoolList } from '@components/index/LiquidityPoolList'
import { BlocksList } from '@components/index/BlocksList'
import { TransactionsList } from '@components/index/TransactionsList'

interface HomePageProps {
  blocks: Block[]
  transactions: Transaction[]
  liquidityPools: PoolPairData[]
}

export default function HomePage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <IndexHeader />
      <Container className='mt-12 pb-20'>
        <div className='flex flex-col space-y-12 items-start lg:flex-row-reverse lg:space-x-4 lg:space-x-reverse lg:space-y-0'>
          <BlocksList blocks={props.blocks} />
          <TransactionsList transactions={props.transactions} />
        </div>
        <LiquidityPoolList liquidityPools={props.liquidityPools} />
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> {
  const api = getWhaleApiClient(context)
  const blocks = await api.blocks.list(8)

  let transactions: Transaction[] = []
  await Promise.all(
    blocks.map(async block =>
      await api.blocks.getTransactions(block.id, 8)
        .then(results => {
          return results
        })
    )
  ).then(results => {
    results.map(result =>
      transactions.push(...result)
    )
  })
  transactions = transactions.slice(0, 8)

  const liquidityPools = await api.poolpairs.list(8)

  return {
    props: {
      blocks,
      transactions,
      liquidityPools
    }
  }
}
