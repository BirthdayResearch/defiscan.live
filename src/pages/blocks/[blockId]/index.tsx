import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'

import { Breadcrumb } from '@components/commons/Breadcrumb'
import { OverflowTable } from '@components/commons/OverflowTable'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { getWhaleApiClient } from '@contexts/WhaleContext'

interface BlockDetailsPageProps {
  block: Block
  confirmations: number
  transactions: {
    items: Transaction[]
    pages: CursorPage[]
  }
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

export default function BlockDetails ({ block, confirmations, transactions }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const leftBlockDetails = [
    // {
    //   label: 'Block Reward:',
    //   value: 'xxxx DFI'
    // },
    {
      label: 'Height:',
      value: `${block.height}`
    },
    {
      label: 'Transactions:',
      value: `${block.transactionCount}`
    },
    {
      label: 'Timestamp:',
      value: `${block.medianTime}`
    },
    {
      label: 'Confirmations:',
      value: `${confirmations}`
    },
    {
      label: 'Merkle Root:',
      content: (
        <>
          <span className='flex-grow break-all'>{block.merkleroot}</span>
          <CopyButton value={block.merkleroot} />
        </>
      )
    }
  ]

  const rightBlockDetails = [
    {
      label: 'Difficult:', value: `${block.difficulty}`
    },
    // {
    //   label: 'Bits:', value: `${block.weight}`
    // },
    {
      label: 'Size (bytes):', value: `${block.size}`
    },
    {
      label: 'Version:', value: `${block.version}`
    }
    // {
    //   label: 'Next Block:', value: `${block.nextBlock.height}`
    // },
    // {
    //   label: 'Previous Block:', value: `${block.prevBlock.height}`
    // }

  ]

  function renderBlockDetails (details: Array<{ label: string, content?: JSX.Element, value?: string }>): JSX.Element[] {
    return details.map((d) => (
      <div className='px-6 py-4 border first:rounded-t-md last:rounded-b-md flex justify-between' key={d.label}>
        <span className='w-1/3 flex-shrink-0'>
          {d.label}
        </span>
        {
          (d.content != null)
            ? d.content
            : (
              <span className='flex-grow'>
                {d.value}
              </span>
            )
        }
      </div>
    ))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb items={[
        { path: '/blocks', name: 'Blocks' },
        { path: `/blocks/${block.height}`, name: `#${block.height}`, canonical: true }

      ]}
      />
      <h1 className='font-semibold text-2xl'>Block #{block.height}</h1>
      <div className='flex items-center'><span className='font-semibold'>Hash:&nbsp;</span> <span className='text-primary' data-testid='block-hash'>{block.hash}</span> <CopyButton value={block.hash} /></div>
      <div className='flex mt-6 gap-x-6'>
        <div className='flex flex-col w-5/12 flex-grow'>
          {renderBlockDetails(leftBlockDetails)}
        </div>
        <div className='flex flex-col w-5/12 flex-grow'>
          {renderBlockDetails(rightBlockDetails)}
        </div>
      </div>
      <div className='my-6'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head>HASH</OverflowTable.Head>
            <OverflowTable.Head>TIMESTAMP</OverflowTable.Head>
            <OverflowTable.Head>CONFIRMATIONS</OverflowTable.Head>
          </OverflowTable.Header>

          {transactions.items.map(transaction => {
            return (
              <OverflowTable.Row key={transaction.hash}>
                <OverflowTable.Cell>
                  {transaction.hash}
                </OverflowTable.Cell>
                {/* <OverflowTable.Cell> */}
                {/*   {transaction.timestamp */}
                {/* </OverflowTable.Cell> */}
                {/* <OverflowTable.Cell> */}
                {/*   {transaction.confirmations */}
                {/* </OverflowTable.Cell> */}
              </OverflowTable.Row>
            )
          })}
        </OverflowTable>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={transactions.pages} path={`/blocks/${block.hash}/transactions`} />
      </div>
    </div>
  )
}

// first of all I need to fetch the block
//
export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const api = getWhaleApiClient(context)
  const blockId = context.params?.blockId?.toString() as string
  const block = await api.blocks.get(blockId)

  const next = CursorPagination.getNext(context)
  const transactions = await api.blocks.getTransactions(block.id, 50, next)
  const blocks = await api.blocks.list()

  return {
    props: {
      block,
      confirmations: blocks[0].height - block.height,
      transactions: {
        items: transactions,
        pages: CursorPagination.getPages(context, transactions)
      }
    }
  }
}
