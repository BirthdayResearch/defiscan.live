import { ReactNode, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { IoArrowForwardOutline } from 'react-icons/io5'
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

function InputOutputBlock ({
  label,
  children
}: PropsWithChildren<{ label: 'INPUT' | 'OUTPUT', children: ReactNode }>): JSX.Element {
  return (
    <div className='bg-gray-100 h-20 p-3 rounded flex justify-between'>
      <div className='flex flex-col justify-between h-full w-full'>
        <span className='bg-gray-200 rounded text-xs px-2 py-1 font-medium w-min'>
          {label}
        </span>
        <div className='flex justify-between'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function TransactionPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <TransactionHeading {...props} />
      <TransactionSummaryTable {...props} />
      <TransactionDetails {...props} />

      <div className='my-4 mt-6'>
        <h2 className='text-xl font-medium' data-testid='raw-transaction-subtitle'>Raw Transaction</h2>
      </div>

      <div className='font-mono'>
        <pre data-testid='raw-transaction'>{JSON.stringify(props.transaction, null, 2)}</pre>
        <pre data-testid='raw-vins'>VIN {JSON.stringify(props.vins, null, 2)}</pre>
        <pre data-testid='raw-vouts'>VOUT {JSON.stringify(props.vouts, null, 2)}</pre>
      </div>
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

function TransactionDetails (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <h1 className='font-medium text-2xl mt-6' data-testid='details-subtitle'>Details</h1>
      <div className='flex justify-between mt-2'>
        <div className='flex-1 flex flex-col gap-y-0.5'>
          {props.vins.map((vin) => {
            return (
              <InputOutputBlock label='INPUT' key={vin.sequence}>
                <span className='opacity-60'>{/* @TODO (aikchun) - some description */}</span>
                <span>{/* @TODO (aikchun) - in value */}</span>
              </InputOutputBlock>
            )
          })}
        </div>
        <div className='h-20 flex items-center justify-center w-14 flex-grow-0'>
          <IoArrowForwardOutline size={16} />
        </div>
        <div className='flex-1 flex flex-col gap-y-0.5'>
          {props.vouts.map((vout) => {
            return (
              <InputOutputBlock
                label='OUTPUT'
                key={vout.script.hex}
              >
                <span className='text-primary'>{/* @TODO (aikchun) - some OP_CODE or hash */}</span>
                <span>{vout.value}</span>
              </InputOutputBlock>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col items-end justify-between h-16 mt-8'>
        <div className='flex justify-between  gap-x-3'>
          <div>Fees:</div>
          {/* @TODO (aikchun) - sum up fees */}
        </div>
        <div className='flex justify-between gap-x-3'>
          <div>Total:</div>
          {/* @TODO (aikchun) - sum up total */}
        </div>
      </div>
    </>
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
