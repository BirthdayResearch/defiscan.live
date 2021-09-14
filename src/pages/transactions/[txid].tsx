import { ReactNode, useState, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { MdContentCopy } from 'react-icons/md'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'

import { RootState } from '@store/index'
import { getWhaleApiClient } from '@contexts/WhaleContext'

import { Container } from '@components/commons/Container'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface TransactionPageProps {
  transaction: Transaction
  vins: TransactionVin[]
  vouts: TransactionVout[]
}

function CopyButton ({ value }: { value: string }): JSX.Element {
  const [open, setOpen] = useState<Boolean>(false)
  function copy (): void {
    const input = document.createElement('input')
    input.value = value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)

    setOpen(true)

    setTimeout(() => {
      setOpen(false)
    }, 500)
  }

  return (
    <div>

      <button
        className='p-2 rounded bg-gray-100' type='button' onClick={() => {
          copy()
        }}
      >
        <MdContentCopy />
      </button>
      {
        open === true ? (
          <span className='bg-gray-100 p-1 rounded absolute mr-4'>
            Copied!
          </span>
        )
          : null
      }
    </div>
  )
}

function InputOutputBlock ({ label, children }: PropsWithChildren<{label: 'INPUT'|'OUTPUT', children: ReactNode}>): JSX.Element {
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

export default function TransactionPage ({ transaction, vins, vouts }: TransactionPageProps): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - transaction.block.height : blocks

  return (
    <Container className='py-6'>
      <h1 className='leading-6 mb-6 opacity-60' data-testid='title'>
        Transaction Hash
      </h1>
      <h2 className='text-xl font-medium mb-6' data-testid='summary-subtitle'>Summary</h2>
      <div className='flex items-center'><span className='font-semibold'>Hash:&nbsp;</span> <span className='text-primary' data-testid='transaction-hash'>{transaction.hash}</span> <CopyButton value={transaction.hash} /></div>
      <div className='flex mt-4 gap-x-4'>
        <div className='flex-1'>
          <AdaptiveList>
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
              {transaction.block.height}
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Custom Transaction' testId='transaction-detail-custom-transaction'>
              {/* @TODO (aikchun) - custom transaction */}
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
        <div className='flex-1'>
          <AdaptiveList>
            <AdaptiveList.Row name='Fee Rate' testId='transaction-detail-fee-rate'>
              {/* @TODO (aikchun) - fee rate */}
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Size' testId='transaction-detail-size'>
              {transaction.size}
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Received Time' testId='transaction-detail-received-time'>
              {/* @TODO (aikchun) - received time */}
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Mined Time' testId='transaction-detail-mined-time'>
              {/* @TODO (aikchun) - mined time */}
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
      </div>
      <h2 className='text-xl font-medium mt-6' data-testid='details-subtitle'>Details</h2>
      <div className='flex justify-between mt-2'>
        <div className='flex-1 flex flex-col gap-y-0.5'>
          {vins.map((vin) => {
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
          {vouts.map((vout) => {
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
          <div>Fees: </div>
          {/* @TODO (aikchun) - sum up fees */}
        </div>
        <div className='flex justify-between gap-x-3'>
          <div>Total: </div>
          {/* @TODO (aikchun) - sum up total */}
        </div>
      </div>

      <div className='my-4 mt-6'>
        <h2 className='text-xl font-medium' data-testid='raw-transaction-subtitle'>Raw Transaction</h2>
      </div>

      <div className='font-mono'>
        <pre data-testid='raw-transaction'>{JSON.stringify(transaction, null, 2)}</pre>
      </div>
    </Container>
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
