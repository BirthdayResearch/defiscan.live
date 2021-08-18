import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { Link } from '@components/commons/Link'
import { OverflowTable } from '@components/commons/OverflowTable'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { formatDistanceToNow } from 'date-fns'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import NumberFormat from 'react-number-format'

interface BlocksPageData {
  blocks: {
    items: Block[]
    pages: CursorPage[]
  }
}

export default function Blocks ({ blocks }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Head title='Blocks' />
      <h1 className='text-2xl font-semibold'>Blocks</h1>

      <div className='my-6'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head sticky>HEIGHT</OverflowTable.Head>
            <OverflowTable.Head>AGE</OverflowTable.Head>
            <OverflowTable.Head>TRANSACTIONS</OverflowTable.Head>
            <OverflowTable.Head>MASTERNODE</OverflowTable.Head>
            <OverflowTable.Head>SIZE (B)</OverflowTable.Head>
            <OverflowTable.Head>DIFFICULTY</OverflowTable.Head>
          </OverflowTable.Header>

          {blocks.items.map(block => (
            <BlockRow block={block} key={block.height} />
          ))}
        </OverflowTable>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={blocks.pages} path='/blocks' />
      </div>
    </div>
  )
}

function BlockRow ({ block }: { block: Block }): JSX.Element {
  return (
    <OverflowTable.Row key={block.id}>
      <OverflowTable.Cell sticky>
        <Link href={{ pathname: `/blocks/${block.id}/transactions` }}>
          <a>{block.height}</a>
        </Link>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='whitespace-nowrap'>
        {formatDistanceToNow(block.medianTime * 1000)} ago
      </OverflowTable.Cell>
      <OverflowTable.Cell>{block.transactionCount}</OverflowTable.Cell>
      <OverflowTable.Cell>{block.minter}</OverflowTable.Cell>
      <OverflowTable.Cell>
        <NumberFormat
          value={block.size}
          fixedDecimalScale
          thousandSeparator=','
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <UnitSuffix value={block.difficulty} units={{ 0: 'K', 3: 'M', 6: 'B', 9: 'T' }} />
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlocksPageData>> {
  const next = CursorPagination.getNext(context)
  const items = await getWhaleApiClient(context).blocks.list(50, next)
  return {
    props: {
      blocks: {
        items,
        pages: CursorPagination.getPages(context, items)
      }
    }
  }
}
