import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { parseAge } from '../../utils'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { Link } from '@components/commons/Link'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'

const largeNumberSymbols = ['K', 'M', 'B', 'T']

function convertToLargeNumberNotation (num: number): string {
  return num < 1000 ? num.toString() : getLargeNumberNotation(num / 1000, 0)
}

function getLargeNumberNotation (num: number, level: number): string {
  return num < 1000 ? `${num} ${largeNumberSymbols[level]}` : getLargeNumberNotation(num / 1000, level + 1)
}

interface BlocksPageData {
  blocks: {
    items: Block[]
    pages: CursorPage[]
  }
}

export default function Blocks ({ blocks }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  function renderBlocks (): JSX.Element[] {
    return blocks.items.map(block => (
      <AdaptiveTable.Row key={block.id}>
        <AdaptiveTable.Cell className='text-primary'>
          <Link href={{ pathname: `/blocks/${block.id}/transactions` }}>
            <a>{block.height}</a>
          </Link>
        </AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{parseAge(block.medianTime)}</AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{block.transactionCount}</AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{block.size}</AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{convertToLargeNumberNotation(block.difficulty)}</AdaptiveTable.Cell>
      </AdaptiveTable.Row>
    ))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='font-bold text-2xl'>Blocks</h1>
      <div className='my-6'>
        <AdaptiveTable>
          <AdaptiveTable.Header>
            <AdaptiveTable.Head className='uppercase'>height</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>age</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>transactions</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>size</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>difficulty</AdaptiveTable.Head>
          </AdaptiveTable.Header>
          {renderBlocks()}
        </AdaptiveTable>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={blocks.pages} path='/blocks' />
      </div>
    </div>
  )
}
export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlocksPageData>> {
  const next = CursorPagination.getNext(context)
  const items = await getWhaleApiClient(context).blocks.list(30, next)
  return {
    props: {
      blocks: {
        items,
        pages: CursorPagination.getPages(context, items)
      }
    }
  }
}
