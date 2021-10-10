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
import { Header } from '@components/index/Header'
import { Stats } from '@components/index/Stats'
import { LiquidityPools } from '@components/index/LiquidityPools'
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
      <Header />
      <Stats blocks={props.blocks} />
      <Container className='mt-12'>
        <div className='flex flex-col space-y-12 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
          <BlocksList blocks={props.blocks} />
          <TransactionsList transactions={props.transactions} />
        </div>
        <LiquidityPools liquidityPools={props.liquidityPools} />
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> {
  const api = getWhaleApiClient(context)
  const blocks = await api.blocks.list(8)

  // TODO: Update this..
  let index = 0
  let transactions: Transaction[] = []
  while (transactions.length < 6 && index < 8) {
    const _txn: Transaction[] = await api.blocks.getTransactions(blocks[index].id)
    transactions = transactions.concat(_txn)
    index += 1
  }
  transactions = transactions.slice(0, 6)

  const liquidityPools = await api.poolpairs.list()

  return {
    props: {
      blocks,
      transactions,
      liquidityPools
    }
  }
}
