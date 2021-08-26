import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Container } from '@components/commons/Container'

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

export default function TransactionPage ({ transaction }: TransactionPageProps): JSX.Element {
  const leftDetails = [
    {
      label: 'Size', value: `${transaction.size}`, testId: 'transaction-size'
    },
    {
      label: 'Fee Rate', value: ''
    },
    {
      label: 'Received Time', value: ''
    },
    {
      label: 'Included in Block', value: ''
    },
    {
      label: 'Custom Transaction Info', value: ''
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
      <div className='my-4'>
        {renderBlockDetails(leftDetails)}
      </div>

      <h2 className='text-xl font-medium mb-6' data-testid='details-subtitle'>Details</h2>

      <div className='my-4'>
        <h2 className='text-xl font-medium mb-6' data-testid='raw-transaction-subtitle'>Raw Transaction</h2>
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

  return {
    props: {
      transaction: await api.transactions.get(txid)
    }
  }
}
