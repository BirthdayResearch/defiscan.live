import { ReactNode, useState } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'

import { Breadcrumb } from '@components/commons/Breadcrumb'
import { OverflowTable } from '@components/commons/OverflowTable'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { IoCopyOutline } from 'react-icons/io5'

import { fromUnixTime, format } from 'date-fns'

interface BlockDetailsPageProps {
  block: Block
  confirmations: number
  transactions: {
    items: Transaction[]
    pages: CursorPage[]
  }
}

function CopyButton ({ text }: { text: string }): JSX.Element {
  const [open, setOpen] = useState<Boolean>(false)

  async function copy (): Promise<void> {
    await navigator.clipboard.writeText(text)
    setOpen(true)

    setTimeout(() => {
      setOpen(false)
    }, 500)
  }

  return (
    <div className='ml-1'>
      <button className='cursor-pointer outline-none p-1 bg-gray-100 rounded shadow-sm' onClick={copy}>
        <IoCopyOutline className='h-5 w-5 text-gray-500' />
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

function BlockDetail (props: { label: string, text: string, children?: ReactNode, testId?: string }): JSX.Element {
  const { label, text, children, testId } = props
  return (
    <div className='px-6 py-4 flex justify-between'>
      <span className='w-1/3 flex-shrink-0'>
        {label}
      </span>
      {
        (children !== undefined)
          ? children
          : (
            <span className='flex-grow' data-testid={testId}>
              {text}
            </span>
          )
      }
    </div>

  )
}

BlockDetail.defaultProps = {
  text: '',
  label: ''
}

export default function BlockDetails ({ block, confirmations, transactions }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const leftBlockDetails = [
    {
      label: 'Block Reward:',
      text: 'xxxx DFI'
    },
    {
      label: 'Height:',
      text: `${block.height}`,
      testId: 'block-detail-height'

    },
    {
      label: 'Transactions:',
      text: `${block.transactionCount}`,
      testId: 'block-detail-transactions'
    },
    {
      abel: 'Timestamp:',
      text: `${format(fromUnixTime(block.medianTime), 'PPpp')}`,
      testId: 'block-detail-timestamp'
    },
    {
      label: 'Confirmations:',
      text: `${confirmations}`,
      testId: 'block-detail-confirmations'
    },
    {
      label: 'Merkle Root:',
      children:
  <>
    <span className='flex-grow break-all' data-testid='block-detail-merkle-root'>{block.merkleroot}</span>
    <CopyButton text={block.merkleroot} />
  </>
    }
  ]

  const rightBlockDetails = [
    {
      label: 'Difficulty:', text: `${block.difficulty}`, testId: 'block-detail-difficulty'
    },
    {
      label: 'Bits:', text: `${block.weight}`
    },
    {
      label: 'Size (bytes):', text: `${block.size}`, testId: 'block-detail-size'
    },
    {
      label: 'Version:', text: `${block.version}`, testId: 'block-detail-version'
    },
    {
      label: 'Next Block:', text: 'next block (placeholder)'
    },
    {
      label: 'Previous Block:', text: 'previous block (placeholder)'
    }

  ]

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex items-center justify-center pb-6'>
        <div className='bg-pink-50 rounded p-3'>
          🚧 Work in progress, this is an early iteration of defiscan.live/blocks/[blockHash]. Some features are not available and
          may not work as expected.
        </div>
      </div>
      <Breadcrumb items={[
        { path: '/blocks', name: 'Blocks' },
        { path: `/blocks/${block.height}`, name: `#${block.height}`, canonical: true }

      ]}
      />

      <h1 className='font-semibold text-2xl'>Block #{block.height}</h1>
      <div className='flex items-center'><span className='font-semibold'>Hash:&nbsp;</span> <span className='text-primary' data-testid='block-hash'>{block.hash}</span> <CopyButton text={block.hash} /></div>
      <div className='flex mt-6 gap-x-6'>
        <div className='flex flex-col w-5/12 flex-grow rounded border divide-solid divide-y-2'>
          {
            leftBlockDetails.map(detail => <BlockDetail {...detail} key={detail.label} />)
          }
        </div>
        <div className='flex flex-col w-5/12 flex-grow rounded border divide-solid divide-y-2'>
          {
            rightBlockDetails.map(detail => <BlockDetail {...detail} key={detail.label} />)
          }
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
                <OverflowTable.Cell>
                  timestamp (placeholder)
                </OverflowTable.Cell>
                <OverflowTable.Cell>
                  {confirmations}
                </OverflowTable.Cell>
              </OverflowTable.Row>
            )
          })}
        </OverflowTable>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={transactions.pages} path={`/blocks/${block.hash}`} />
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
