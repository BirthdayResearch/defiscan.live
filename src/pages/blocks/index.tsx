import { useState, useEffect } from 'react'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { formatDistanceToNow } from 'date-fns'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import NumberFormat from 'react-number-format'
import { Container } from '@components/commons/Container'
import { Link } from '@components/commons/Link'

interface BlocksPageData {
  blocks: {
    items: Block[]
    pages: CursorPage[]
  }
}

export default function Blocks ({ blocks }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <Head title='Blocks' />

      <h1 className='text-2xl font-medium'>Blocks</h1>

      <div className='my-6'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head title='HEIGHT' sticky />
            <OverflowTable.Head title='AGE' />
            <OverflowTable.Head title='TRANSACTIONS' />
            <OverflowTable.Head title='MINTER' />
            <OverflowTable.Head title='SIZE (B)' />
            <OverflowTable.Head title='DIFFICULTY' />
          </OverflowTable.Header>

          {blocks.items.map(block => (
            <Link href={{ pathname: `/blocks/${block.height}` }} key={block.height}>
              <a className='contents'>
                <BlockRow block={block} />
              </a>
            </Link>
          ))}
        </OverflowTable>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={blocks.pages} path='/blocks' />
      </div>
    </Container>
  )
}

function BlockRow ({ block }: { block: Block }): JSX.Element {
  const [age, setAge] = useState(`${formatDistanceToNow(block.medianTime * 1000)} ago`)
  useEffect(() => {
    const interval = setInterval(() => {
      setAge(`${formatDistanceToNow(block.medianTime * 1000)} ago`)
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [block.medianTime])

  return (
    <OverflowTable.Row key={block.id} className='hover:text-primary-500'>
      <OverflowTable.Cell sticky>
        {block.height}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {age}
      </OverflowTable.Cell>
      <OverflowTable.Cell>{block.transactionCount}</OverflowTable.Cell>
      <OverflowTable.Cell>{block.minter}</OverflowTable.Cell>
      <OverflowTable.Cell>
        <NumberFormat
          value={block.size}
          fixedDecimalScale
          thousandSeparator=','
          displayType='text'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <UnitSuffix
          value={block.difficulty}
          units={{
            3: 'K',
            6: 'M',
            9: 'G',
            12: 'T'
          }}
        />
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
