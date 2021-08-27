import { ReactNode, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { fromUnixTime, format } from 'date-fns'

import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'

import { RootState } from '@store/index'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { OverflowTable } from '@components/commons/OverflowTable'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { CopyButton } from '@components/commons/CopyButton'
import { getWhaleApiClient } from '@contexts/WhaleContext'


interface BlockDetailsPageProps {
  block: Block
  transactions: {
    items: Transaction[]
    pages: CursorPage[]
  }
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

export default function BlockDetails ({ block, transactions }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - block.height : blocks
  const blockTime = format(fromUnixTime(block.medianTime), 'PPpp')

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex items-center justify-center pb-6'>
        <div className='bg-pink-50 rounded p-3'>
          🚧 Work in progress, this is an early iteration of defiscan.live/blocks/*. Some features are not available and
          may not work as expected.
        </div>
      </div>
      <Breadcrumb items={[
        { path: '/blocks', name: 'Blocks' },
        { path: `/blocks/${block.height}`, name: `#${block.height}`, canonical: true }
      ]}
      />
      <h1 className='font-semibold text-2xl mt-1'>Block #{block.height}</h1>
      <div className='flex items-center my-0.5'>
        <span className='font-semibold'>Hash:&nbsp;</span>
        <span className='text-primary' data-testid='block-hash'>{block.hash}</span>
        <CopyButton text={block.hash} />
      </div>
      <div className='flex mt-4 gap-x-6'>
        <div className='flex flex-col flex-1 rounded-md border divide-solid divide-y'>
          <BlockDetail label='Block Reward:' testId='block-detail-block-reward'>
            xxxx DFI
          </BlockDetail>
          <BlockDetail label='Height:' testId='block-detail-height'>
            {block.height}
          </BlockDetail>
          <BlockDetail label='Transactions:' testId='block-detail-transaction-count'>
            {block.transactionCount}
          </BlockDetail>
          <BlockDetail label='Timestamp:' testId='block-detail-timestamp'>
            {blockTime}
          </BlockDetail>
          <BlockDetail label='Confirmations:' testId='block-detail-confirmations'>
            {confirmations}
          </BlockDetail>
          <BlockDetail label='Merkle Root:'>
            <div className='flex'>
              <span className='break-all' data-testid='block-detail-merkle-root'>{block.merkleroot}</span>
              <CopyButton text={block.merkleroot} />
            </div>
          </BlockDetail>
        </div>
        <div className='flex-1'>
          <div className='flex flex-col rounded-md border divide-solid divide-y w-100'>
            <BlockDetail label='Difficulty:' testId='block-detail-difficulty'>
              {block.difficulty}
            </BlockDetail>
            <BlockDetail label='Bits:' testId='block-detail-bits'>
              {block.weight}
            </BlockDetail>
            <BlockDetail label='Size (bytes):' testId='block-detail-size'>
              {block.size}
            </BlockDetail>
            <BlockDetail label='Version:' testId='block-detail-version'>
              {block.version}
            </BlockDetail>
            <BlockDetail label='Next Block:' testId='block-detail-next-block'>
              next block (placeholder)
            </BlockDetail>
            <BlockDetail label='Previous Block:' testId='block-detail-previous-block'>
              previous block (placeholder)
            </BlockDetail>
          </div>
        </div>
      </div>
      <h1 className='font-semibold text-2xl mt-6'>Transactions</h1>
      <div className='my-3'>
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
                  {blockTime}
                </OverflowTable.Cell>
                <OverflowTable.Cell>
                  {confirmations}
                </OverflowTable.Cell>
              </OverflowTable.Row>
            )
          })}
        </OverflowTable>
      </div>
      <div className='flex justify-end mt-4'>
        <CursorPagination pages={transactions.pages} path={`/blocks/${block.hash}`} />
      </div>
    </div>
  )
}

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
      transactions: {
        items: transactions,
        pages: CursorPagination.getPages(context, transactions)
      }
    }
  }
}
