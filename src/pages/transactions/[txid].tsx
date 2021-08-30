import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Container } from '@components/commons/Container'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { Link } from '@components/commons/Link'
import { VinVoutBlock } from './TransactionDetailBlock'
import { getWhaleApiClient } from '@contexts/WhaleContext'

interface TransactionPageProps {
  transaction: Transaction
  confirmations: number
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
    <div className='ml-1'>

      <button className='p-2 rounded bg-gray-100' type='button' onClick={() => { copy() }}>
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

export default function TransactionPage ({ transaction, confirmations }: TransactionPageProps): JSX.Element {
  console.log('transaction', transaction)
  const leftDetails = [
    {
      label: 'Total Amount:', value: ''
    },
    {
      label: 'Fee:', value: ''
    },
    {
      label: 'Confirmations:', value: `${confirmations}`
    },
    {
      label: 'Block Height:',
      content: (
        <div className='flex-grow'>
          <Link href={{ pathname: `/blocks/${transaction.block.height}` }}>
            <a className='cursor-pointer text-primary'>
              {transaction.block.height}
            </a>
          </Link>
        </div>
      )
    },
    {
      label: 'Custom Transaction:', value: ''
    }
  ]

  const rightDetails = [
    {
      label: 'Fee Rate:', value: ''
    },
    {
      label: 'Size', value: `${transaction.size} (bytes)`
    },
    {
      label: 'Received Time:', value: ''
    },
    {
      label: 'Mined Time:', value: ''
    }
  ]

  function renderBlockDetails (details: Array<{ label: string, content?: JSX.Element, value?: string, testId?: string }>): JSX.Element[] {
    return details.map((d) => (
      <div className='px-6 py-4 border first:rounded-t-md last:rounded-b-md flex justify-between' key={d.label}>
        <span className='w-1/3 flex-shrink-0'>
          {d.label}
        </span>
        {
          (d.content != null)
            ? d.content
            : (
              <span className='flex-grow break-all' data-testid={d.testId}>
                {d.value}
              </span>
            )
        }
      </div>
    ))
  }

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
        <div className='flex flex-col w-5/12 flex-grow'>
          {renderBlockDetails(rightDetails)}
        </div>
      </div>
      <h2 className='text-xl font-medium mt-6' data-testid='details-subtitle'>Details</h2>
      <div className='flex justify-between mt-4'>
        <div className='flex-1'>
          <VinVoutBlock type='INPUT' />
        </div>
        <div className='h-20 flex items-center justify-center w-16 flex-grow-0'>
          <IoArrowForwardOutline size={25} />
        </div>
        <div className='flex-1'>
          <VinVoutBlock
            type='OUTPUT'
            descriptionTextPrimary
            description='dm6EUeoYyVDV6HUcVeSxJGfRapN3wsctVk'
            amount={62.6433832}
          />
        </div>
      </div>

      <div className='flex justify-end mt-4 gap-x-4'>
        <div>
          <div>Fees: </div>
          <div>Total: </div>
        </div>
        <div className='w-min-content'>
          <div className='flex justify-end'>0 DFI</div>
          <div className='flex justify-end'>62.6433832 DFI</div>
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
  // const network = context.query.network?.toString()
  const txid = context.params?.txid as string

  // if (network === undefined) {
  //   return {
  //     redirect: {
  //       statusCode: 302,
  //       destination: `https://mainnet.defichain.io/#/DFI/mainnet/tx/${txid}`
  //     }
  //   }
  // }
  //
  // if (network === 'TestNet') {
  //   return {
  //     redirect: {
  //       statusCode: 302,
  //       destination: `https://testnet.defichain.io/#/DFI/testnet/tx/${txid}`
  //     }
  //   }
  // }
  const transaction = await api.transactions.get(txid)
  const [block] = await api.blocks.list()
  const confirmations = block.height - transaction.block.height

  return {
    props: {
      transaction,
      confirmations
    }
  }
}
