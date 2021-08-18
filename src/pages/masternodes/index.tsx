import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { MasternodeData } from '@defichain/whale-api-client/dist/api/masternodes'
import { Head } from '@components/commons/Head'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import NumberFormat from 'react-number-format'

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
      <h1 className='text-2xl font-semibold'>Masternodes</h1>
      <AdaptiveTable className='mt-6'>
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>OWNER</AdaptiveTable.Head>
          <AdaptiveTable.Head>OPERATOR</AdaptiveTable.Head>
          <AdaptiveTable.Head>CREATION HEIGHT</AdaptiveTable.Head>
          <AdaptiveTable.Head>RESIGN HEIGHT</AdaptiveTable.Head>
          <AdaptiveTable.Head>MINTED BLOCKS</AdaptiveTable.Head>
          <AdaptiveTable.Head>STATE</AdaptiveTable.Head>
          <AdaptiveTable.Head>TIMELOCK</AdaptiveTable.Head>
        </AdaptiveTable.Header>
        {masternodes.items.map((mn) => (
          <MasternodeRow data={mn} key={mn.id} />
        ))}
      </AdaptiveTable>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={masternodes.pages} path='/masternodes' />
      </div>
    </div>
  )
}

function MasternodeRow ({ data }: {data: MasternodeData}): JSX.Element {
  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='OWNER' className='break-all'>
        {data.owner.address}
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='OPERATOR' className='break-all'>
        {data.operator.address}
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='CREATION HEIGHT' className='align-middle'>
        {data.creation.height}
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='RESIGN HEIGHT' className='align-middle'>
        {data.resign.height}
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='MINTED BLOCKS' className='align-middle'>
        <NumberFormat
          value={data.mintedBlocks}
          displayType='text'
          thousandSeparator
          decimalScale={2}
        />
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell className='align-middle'>
        {data.state}
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
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
