import { ReactNode, useState, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { MdContentCopy } from 'react-icons/md'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Container } from '@components/commons/Container'
import { RootState } from '@store/index'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { Link } from '@components/commons/Link'
import { getWhaleApiClient } from '@contexts/WhaleContext'

interface TransactionPageProps {
  transaction: Transaction
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
        open === true
          ? (
            <span className='bg-gray-100 p-1 rounded absolute mr-4'>
              Copied!
            </span>
          )
          : null
      }
    </div>
  )
}

function BlockDetail (props: PropsWithChildren<{ label: string, children?: ReactNode, testId?: string }>): JSX.Element {
  const { label, children, testId } = props
  return (
    <div className='px-6 py-3 flex justify-between'>
      <span className='w-1/3 flex-shrink-0'>
        {label}
      </span>
      <span className='flex-grow' data-testid={testId}>
        {children}
      </span>
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

export default function TransactionPage ({ transaction }: TransactionPageProps): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - transaction.block.height : blocks
  return (
    <Container className='py-6'>
      <h1 className='text-2xl font-medium mb-6'>
        Transaction (Playground Temporary Page)
      </h1>
      <h2 className='text-xl font-medium mb-6' data-testid='summary-subtitle'>Summary</h2>
      <div className='flex items-center'><span className='font-semibold'>Hash:&nbsp;</span> <span className='text-primary' data-testid='block-hash'>{transaction.hash}</span> <CopyButton value={transaction.hash} /></div>
      <div className='flex mt-6 gap-x-6'>
        <div className='flex flex-col w-5/12 flex-grow'>
          {renderBlockDetails(leftDetails)}
        </div>
        <div className='flex-1'>
          <div className='flex flex-col rounded-md border divide-solid divide-y'>
            <BlockDetail label='Fee Rate:' testId='fee-rate'>
              xxxx DFI
            </BlockDetail>
            <BlockDetail label='Size:' testId='size'>
              {transaction.size}
            </BlockDetail>
            <BlockDetail label='Received time:' testId='received-time'>
              (received time)
            </BlockDetail>
            <BlockDetail label='Mined time:' testId='mined-time'>
              (mined time)
            </BlockDetail>
          </div>
        </div>
      </div>
      <h2 className='text-xl font-medium mt-6' data-testid='details-subtitle'>Details</h2>
      <div className='flex justify-between mt-2'>
        <div className='flex-1 flex flex-col gap-y-0.5'>
          <InputOutputBlock label='INPUT'>
            <span className='opacity-60'>No Inputs (Newly generated coins)</span>
          </InputOutputBlock>
        </div>
        <div className='h-20 flex items-center justify-center w-14 flex-grow-0'>
          <IoArrowForwardOutline size={16} />
        </div>
        <div className='flex-1 flex flex-col gap-y-0.5'>
          <InputOutputBlock
            label='OUTPUT'
          >
            <span className='text-primary'>dm6EUeoYyVDV6HUcVeSxJGfRapN3wsctVk</span>
            <span>100 DFI (U)</span>
          </InputOutputBlock>
          <InputOutputBlock
            label='OUTPUT'
          >
            <span className='text-primary'>dm6EUeoYyVDV6HUcVeSxJGfRapN3wsctVk</span>
            <span>100 DFI (U)</span>
          </InputOutputBlock>
        </div>
      </div>

      <div className='flex flex-col items-end justify-between h-16 mt-8'>
        <div className='flex justify-between  gap-x-3'>
          <div>Fees: </div>
          <div>0.00004404 DFI</div>
        </div>
        <div className='flex justify-between gap-x-3'>
          <div>Total: </div>
          <div>140.0123245 DFI</div>
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

  return {
    props: {
      transaction: await api.transactions.get(txid)
    }
  }
}
