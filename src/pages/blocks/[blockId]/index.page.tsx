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
import { Link } from '@components/commons/link/Link'
import { AddressLink } from '@components/commons/link/AddressLink'
import { isAlphanumeric } from '../../../utils/commons/StringValidator'
import { BlockLink } from '@components/commons/link/BlockLink'

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
        <div className='ml-1 text-primary-500 text-lg break-all' data-testid='block-hash'>{block.hash}</div>
        <CopyButton className='ml-2' content={block.hash} />
      </div>
    </>
  )
}

function BlockDetailTable (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { block } = props
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)

  return (
    <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <ListLeft block={block} nBlocks={blocks} />
      <ListRight block={block} />
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
      <OverflowTable.Row key={transaction.txid} className='hover:text-primary-500'>
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
          <OverflowTable.Head title='TX ID' />
          <OverflowTable.Head title='VIN/VOUT' />
          <OverflowTable.Head title='TIMESTAMP' />
          <OverflowTable.Head title='CONFIRMATIONS' />
        </OverflowTable.Header>

        {transactions.items.map(transaction => {
          return (
            <Link href={{ pathname: `/transactions/${transaction.txid}` }} key={transaction.txid}>
              <a className='contents'>
                <TransactionRow transaction={transaction} />
              </a>
            </Link>
          )
        })}
      </OverflowTable>

      <div className='flex justify-end mt-4'>
        <CursorPagination pages={transactions.pages} path={`/blocks/${block.hash}`} />
      </div>
    </div>
  )
}

function ListLeft (props: { block: Block, nBlocks: number | undefined }): JSX.Element {
  const confirmations = props.nBlocks !== undefined ? props.nBlocks - props.block.height : props.nBlocks
  const blockTime = format(fromUnixTime(props.block.medianTime), 'PPpp')
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Height' testId='block-detail-height'>
        {props.block.height}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Transactions' testId='block-detail-transaction-count'>
        {props.block.transactionCount}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Timestamp' testId='block-detail-timestamp'>
        {blockTime}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Confirmations' testId='block-detail-confirmations'>
        {confirmations}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Minter' testId='block-detail-minter'>
        {(props.block.minter === undefined || props.block.minter.length === 0) ? ('N/A') : (<AddressLink address={props.block.minter} className='break-all' />)}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Masternode' testId='block-detail-masternode'>
        <div className='break-all'>
          {props.block.masternode ?? 'N/A'}
        </div>
      </AdaptiveList.Row>
      {/* TODO(fuxingloh): need to properly expose this variable on whale */}
      {/* <AdaptiveList.Row name='Block Reward' testId='block-detail-block-reward'> */}
      {/*  {reward} DFI */}
      {/* </AdaptiveList.Row> */}
    </AdaptiveList>
  )
}

function ListRight (props: { block: Block }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Difficulty' testId='block-detail-difficulty'>
        {props.block.difficulty}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Bits' testId='block-detail-bits'>
        {props.block.weight}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Size (bytes)' testId='block-detail-size'>
        {props.block.size}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Version' testId='block-detail-version'>
        {props.block.version}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Merkle Root' testId='block-detail-merkle-root'>
        <div className='break-all'>
          {props.block.merkleroot}
        </div>
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Previous Block' testId='block-detail-previous-block'>
        {(props.block.previousHash === undefined || props.block.previousHash.length === 0) ? ('N/A') : (<BlockLink block={props.block.previousHash} className='break-all' />)}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Next Block' testId='block-detail-next-block'>
        <BlockLink block={(props.block.height + 1).toString()} className='break-all' />
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const api = getWhaleApiClient(context)
  const idOrHeight = context.params?.blockId?.toString().trim() as string

  if (!isAlphanumeric(idOrHeight)) {
    return { notFound: true }
  }

  const block = await api.blocks.get(idOrHeight)

  if (block === undefined) {
    return { notFound: true }
  }

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
