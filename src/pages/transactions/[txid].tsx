import { useSelector } from 'react-redux'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'

import { RootState } from '@store/index'
import { getWhaleApiClient } from '@contexts/WhaleContext'

import { Container } from '@components/commons/Container'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { CopyButton } from '@components/commons/CopyButton'

interface TransactionPageProps {
  transaction: Transaction
  vins: TransactionVin[]
  vouts: TransactionVout[]
}

export default function TransactionPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <TransactionHeading {...props} />
      <TransactionSummaryTable {...props} />
    </Container>
  )
}

function TransactionHeading ({ transaction }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <div className='flex items-center justify-center pb-6'>
        <div className='bg-orange-100 rounded p-3 text-center'>
          🚧 Work in progress, this is an early iteration of defiscan.live/transactions/*. Some features are not
          available and may not work as expected.
          <br />In the meantime, you can use
          <a href='https://explorer.defichain.io/' className='cursor-pointer hover:text-primary-500 break-all ml-1'>
            DeFi Blockchain Explorer
          </a>
        </div>
      </div>

      <span className='leading-6 opacity-60' data-testid='title'>
        Transaction Hash
      </span>

      <div className='flex items-center mt-1'>
        <h1 className='text-2xl font-medium break-all' data-testid='transaction-hash'>{transaction.hash}</h1>
        <CopyButton className='ml-2' content={transaction.hash} />
      </div>
    </>
  )
}

function TransactionSummaryTable (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const transaction = props.transaction

  return (
    <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <SummaryTableListLeft transaction={transaction} />
      <SummaryTableListRight transaction={transaction} />
    </div>
  )
}

function SummaryTableListLeft (props: { transaction: Transaction }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - props.transaction.block.height : blocks

  return (
    <AdaptiveList className='w-1/2'>
      <AdaptiveList.Row name='Total Amount' testId='transaction-detail-total-amount'>
        {/* @TODO (aikchun) - Get total amount */}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Fee' testId='transaction-detail-fee'>
        {/* @TODO (aikchun) - Get fee */}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Confirmations' testId='transaction-detail-confirmations'>
        {confirmations}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Block Height' testId='transaction-detail-block-height'>
        {props.transaction.block.height}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Custom Transaction' testId='transaction-detail-custom-transaction'>
        {/* @TODO (aikchun) - custom transaction */}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function SummaryTableListRight (props: { transaction: Transaction }): JSX.Element {
  return (
    <AdaptiveList className='w-1/2'>
      <AdaptiveList.Row name='Fee Rate' testId='transaction-detail-fee-rate'>
        {/* @TODO (aikchun) - fee rate */}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Size' testId='transaction-detail-size'>
        {props.transaction.size}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Received Time' testId='transaction-detail-received-time'>
        {/* @TODO (aikchun) - received time */}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Mined Time' testId='transaction-detail-mined-time'>
        {/* @TODO (aikchun) - mined time */}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TransactionPageProps>> {
  const api = getWhaleApiClient(context)
  const txid = context.params?.txid as string

  const vins = await api.transactions.getVins(txid)
  const vouts = await api.transactions.getVouts(txid)

  return {
    props: {
      transaction: await api.transactions.get(txid),
      vins,
      vouts
    }
  }
}
