import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { MasternodeData } from '@defichain/whale-api-client/dist/api/masternodes'
import { Head } from '@components/commons/Head'
import NumberFormat from 'react-number-format'
import { OverflowTable } from '@components/commons/OverflowTable'

interface MasternodesPageProps {
  masternodes: {
    items: MasternodeData[]
    pages: CursorPage[]
  }
}

export default function MasternodesPage ({ masternodes }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Head title='Masternodes' />

      <div className='flex items-center justify-center pb-6'>
        <div className='bg-pink-50 rounded p-3'>
          🚧 Work in progress, this is an early iteration of defiscan.live/masternodes. Some features are not available and
          may not work as expected.
        </div>
      </div>

      <h1 className='text-2xl font-semibold'>Masternodes</h1>
      <OverflowTable className='mt-6'>
        <OverflowTable.Header>
          <OverflowTable.Head sticky>OWNER</OverflowTable.Head>
          <OverflowTable.Head>OPERATOR</OverflowTable.Head>
          <OverflowTable.Head>CREATION HEIGHT</OverflowTable.Head>
          <OverflowTable.Head>RESIGN HEIGHT</OverflowTable.Head>
          <OverflowTable.Head>MINTED BLOCKS</OverflowTable.Head>
          <OverflowTable.Head>STATE</OverflowTable.Head>
        </OverflowTable.Header>
        {masternodes.items.map((mn) => (
          <MasternodeRow data={mn} key={mn.id} />
        ))}
      </OverflowTable>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={masternodes.pages} path='/masternodes' />
      </div>
    </div>
  )
}

function MasternodeRow ({ data }: {data: MasternodeData}): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell sticky className='break-all' width='w-72'>
        {data.owner.address}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='break-all' width='w-72'>
        {data.operator.address}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <NumberFormat
          value={data.creation.height}
          fixedDecimalScale
          displayType='text'
          thousandSeparator=','
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <NumberFormat
          value={data.resign.height}
          fixedDecimalScale
          displayType='text'
          thousandSeparator=','
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <NumberFormat
          value={data.mintedBlocks}
          fixedDecimalScale
          thousandSeparator=','
          displayType='text'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {data.state}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<MasternodesPageProps>> {
  const next = CursorPagination.getNext(context)
  const items = await getWhaleApiClient(context).masternodes.list(20, next)
  return {
    props: {
      masternodes: {
        items,
        pages: CursorPagination.getPages(context, items)
      }
    }
  }
}
