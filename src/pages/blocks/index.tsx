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

      <div className='flex items-center justify-center pb-6'>
        <div className='bg-pink-50 rounded p-3'>
          🚧 Work in progress, this is an early iteration of defiscan.live/blocks. Some features are not available and
          may not work as expected.
        </div>
      </div>

      <h1 className='text-2xl font-semibold'>Blocks</h1>

      <div className='my-6'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head sticky>HEIGHT</OverflowTable.Head>
            <OverflowTable.Head>AGE</OverflowTable.Head>
            <OverflowTable.Head>TRANSACTIONS</OverflowTable.Head>
            <OverflowTable.Head>MINTER</OverflowTable.Head>
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

function OverflowTableIntervalUpdateCell (props: { callback: (setState: (value: any) => void) => () => void, interval: number }): JSX.Element {
  const { callback, interval } = props
  const [value, setValue] = useState()

  useEffect(() => {
    const i = setInterval(callback(setValue), interval)
    return () => {
      clearInterval(i)
    }
  })

  return <OverflowTable.Cell>{value}</OverflowTable.Cell>
}

function BlockRow ({ block }: { block: Block }): JSX.Element {
  function intervalDistanceToNowUpdate (setState: (value: any) => void) {
    return () => {
      setState(`${formatDistanceToNow(block.medianTime * 1000)} ago`)
    }
  }

  return (
    <OverflowTable.Row key={block.id}>
      <OverflowTable.Cell sticky>
        {block.height}
        {/* <Link href={{ pathname: `/blocks/${block.id}/transactions` }}> */}
        {/*  <a>{block.height}</a> */}
        {/* </Link> */}
      </OverflowTable.Cell>
      <OverflowTableIntervalUpdateCell
        callback={intervalDistanceToNowUpdate}
        interval={3000}
      />
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
