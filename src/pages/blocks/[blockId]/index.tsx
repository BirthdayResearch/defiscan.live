import { useSelector } from 'react-redux'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { format, fromUnixTime } from 'date-fns'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { RootState } from '@store/index'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { OverflowTable } from '@components/commons/OverflowTable'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { CopyButton } from '@components/commons/CopyButton'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Head } from '@components/commons/Head'
import { Container } from '@components/commons/Container'
import { BsArrowRight } from 'react-icons/bs'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface BlockDetailsPageProps {
  block: Block
  transactions: {
    items: Transaction[]
    pages: CursorPage[]
  }
}

export default function BlockDetails (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-8 pb-20'>
      <BlockHeading {...props} />
      <BlockDetailTable {...props} />
      <BlockTransactions {...props} />
    </Container>
  )
}

function BlockHeading ({ block }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title={`Block #${block.height}`} />

      <Breadcrumb items={[
        {
          path: '/blocks',
          name: 'Blocks'
        },
        {
          path: `/blocks/${block.height}`,
          name: `#${block.height}`,
          canonical: true
        }
      ]}
      />

      <h1 className='font-medium text-2xl mt-1'>Block #{block.height}</h1>

      <div className='flex items-center my-1'>
        <div className='font-semibold'>Hash:&nbsp;</div>
        <div className='ml-1 text-primary-500 text-lg' data-testid='block-hash'>{block.hash}</div>
        <CopyButton className='ml-2' content={block.hash} />
      </div>

      <div className='flex items-center justify-center py-4'>
        <div className='bg-orange-100 rounded p-3'>
          🚧 Work in progress, this is an early iteration of defiscan.live/blocks/*. Some features are not available and
          may not work as expected.
        </div>
      </div>
    </>
  )
}

function BlockDetailTable (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { block } = props
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - block.height : blocks
  const blockTime = format(fromUnixTime(block.medianTime), 'PPpp')

  return (
    <div className='mt-5 flex flex-wrap -mx-3'>
      <div className='w-1/2 px-3'>
        <AdaptiveList>
          <AdaptiveList.Row name='Block Reward' testId='block-detail-block-reward'>
            xxxx DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Height' testId='block-detail-height'>
            {block.height}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Transactions' testId='block-detail-transaction-count'>
            {block.transactionCount}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Timestamp' testId='block-detail-timestamp'>
            {blockTime}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Confirmations' testId='block-detail-confirmations'>
            {confirmations}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Merkle Root'>
            <div className='break-all' data-testid='block-detail-merkle-root'>{block.merkleroot}</div>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>

      <div className='w-1/2 px-3'>
        <AdaptiveList>
          <AdaptiveList.Row name='Difficulty' testId='block-detail-difficulty'>
            {block.difficulty}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Bits' testId='block-detail-bits'>
            {block.weight}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Size (bytes)' testId='block-detail-size'>
            {block.size}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Version' testId='block-detail-version'>
            {block.version}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Next Block' testId='block-detail-next-block'>
            next block (placeholder)
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Previous Block' testId='block-detail-previous-block'>
            previous block (placeholder)
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}

function BlockTransactions (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const {
    block,
    transactions
  } = props
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - block.height : blocks
  const blockTime = format(fromUnixTime(block.medianTime), 'PPpp')

  function TransactionRow ({ transaction }: { transaction: Transaction }): JSX.Element {
    return (
      <OverflowTable.Row key={transaction.txid}>
        <OverflowTable.Cell>
          <div className='break-all w-80 md:w-full'>
            {transaction.txid}
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <div className='flex items-center space-x-1'>
            <div>{transaction.vinCount}</div>
            <div><BsArrowRight /></div>
            <div>{transaction.voutCount}</div>
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <div className='w-24 md:w-full'>
            {blockTime}
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          {confirmations}
        </OverflowTable.Cell>
      </OverflowTable.Row>
    )
  }

  return (
    <div>
      <h1 className='font-medium text-2xl mt-6'>Transactions</h1>

      <OverflowTable className='mt-3'>
        <OverflowTable.Header>
          <OverflowTable.Head>TXID</OverflowTable.Head>
          <OverflowTable.Head>VIN/VOUT</OverflowTable.Head>
          <OverflowTable.Head>TIMESTAMP</OverflowTable.Head>
          <OverflowTable.Head>CONFIRMATIONS</OverflowTable.Head>
        </OverflowTable.Header>

        {transactions.items.map(transaction => {
          return <TransactionRow transaction={transaction} key={transaction.txid} />
        })}
      </OverflowTable>

      <div className='flex justify-end mt-4'>
        <CursorPagination pages={transactions.pages} path={`/blocks/${block.hash}`} />
      </div>
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const api = getWhaleApiClient(context)
  const idOrHeight = context.params?.blockId?.toString() as string
  const block = await api.blocks.get(idOrHeight)

  const next = CursorPagination.getNext(context)
  const transactions = await api.blocks.getTransactions(block.id, 50, next)

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
