import { useSelector } from 'react-redux'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import {
  Transaction,
  TransactionVin,
  TransactionVout
} from '@defichain/whale-api-client/dist/api/transactions'

import { RootState } from '@store/index'
import { getWhaleApiClient } from '@contexts/WhaleContext'

import { Container } from '@components/commons/Container'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { CopyButton } from '@components/commons/CopyButton'
import { Link } from '@components/commons/Link'
import { format, fromUnixTime } from 'date-fns'
import BigNumber from 'bignumber.js'

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

      {/* <div className='font-mono'> */}
      {/*  <pre data-testid='raw-transaction'>{JSON.stringify(props.transaction, null, 2)}</pre> */}
      {/*  <pre data-testid='raw-vins'>VIN {JSON.stringify(props.vins, null, 2)}</pre> */}
      {/*  <pre data-testid='raw-vouts'>VOUT {JSON.stringify(props.vouts, null, 2)}</pre> */}
      {/* </div> */}

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
  const vins = props.vins
  const vouts = props.vouts

  return (
    <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <SummaryTableListLeft transaction={transaction} vins={vins} vouts={vouts} />
      <SummaryTableListRight transaction={transaction} vins={vins} vouts={vouts} />
    </div>
  )
}

function SummaryTableListLeft (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[] }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - props.transaction.block.height : blocks

  return (
    <AdaptiveList className=''>
      <AdaptiveList.Row name='Total Amount' testId='transaction-detail-total-amount'>
        {props.transaction.totalVoutValue} DFI
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Fee' testId='transaction-detail-fee'>
        {props.vins[0].vout === undefined ? 'No Inputs' : `${(getTransactionFee(props.transaction, props.vins)).decimalPlaces(8).toString()} mDFI`}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Confirmations' testId='transaction-detail-confirmations'>
        {confirmations}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Block Height'>
        <Link href={{ pathname: `/blocks/${props.transaction.block.height}` }}>
          <a className='cursor-pointer hover:text-primary-500' data-testid='transaction-detail-block-height'>
            {props.transaction.block.height}
          </a>
        </Link>
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function SummaryTableListRight (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[] }): JSX.Element {
  const blockTime = format(fromUnixTime(props.transaction.block.medianTime), 'PPpp')

  return (
    <AdaptiveList className='w-full md:w-1/2'>
      <AdaptiveList.Row name='Fee Rate' testId='transaction-detail-fee-rate'>
        {props.vins[0].vout === undefined ? 'No Inputs' : `${(getTransactionFee(props.transaction, props.vins).dividedBy(props.transaction.size)).decimalPlaces(8).toString()} mDFI/byte`}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Size' testId='transaction-detail-size'>
        {props.transaction.size} bytes
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Received Time' testId='transaction-detail-received-time'>
        {blockTime}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function getTransactionFee (transaction: Transaction, vins: TransactionVin[]): BigNumber {
  const fee = getTotalVinsValue(vins) - parseFloat(transaction.totalVoutValue)
  return new BigNumber(fee).multipliedBy(1000)
}

function getTotalVinsValue (vins: TransactionVin[]): number {
  let value = 0
  vins.forEach(vin => {
    if (vin.vout !== undefined) {
      value += parseFloat(vin.vout.value)
    }
  })
  return value
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TransactionPageProps>> {
  const api = getWhaleApiClient(context)
  const txid = context.params?.txid as string

  // Will improve with newer iteration of whale api
  const vins: TransactionVin[] = []
  let vinsResponse = await api.transactions.getVins(txid, 60)
  vins.push(...vinsResponse)
  while (vinsResponse.hasNext) {
    vinsResponse = await api.transactions.getVins(txid, 60, vinsResponse.nextToken)
    vins.push(...vinsResponse)
  }

  const vouts: TransactionVout[] = []
  let voutsResponse = await api.transactions.getVouts(txid, 60)
  vouts.push(...voutsResponse)
  while (voutsResponse.hasNext) {
    voutsResponse = await api.transactions.getVouts(txid, 60, voutsResponse.nextToken)
    vouts.push(...voutsResponse)
  }

  return {
    props: {
      transaction: await api.transactions.get(txid),
      vins,
      vouts
    }
  }
}
