import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { MasternodeData, MasternodeState } from '@defichain/whale-api-client/dist/api/masternodes'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
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

      <div className='flex items-center justify-center pb-6'>
        <div className='bg-pink-50 rounded p-3'>
          🚧 Work in progress, this is an early iteration of defiscan.live/masternodes. Some features are not available
          and
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
          <OverflowTable.Head>TIMELOCK</OverflowTable.Head>
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

function MasternodeRow ({ data }: { data: MasternodeData }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell sticky className='break-all' width='w-64'>
        {data.owner.address}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='break-all' width='w-64'>
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
          value={data.resign?.height}
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
        {(() => {
          switch (data.state) {
            case MasternodeState.PRE_ENABLED:
              return 'Pre-Enabled'
            case MasternodeState.ENABLED:
              return 'Enabled'
            case MasternodeState.PRE_RESIGNED:
              return 'Pre-Resigned'
            case MasternodeState.RESIGNED:
              return 'Resigned'
            case MasternodeState.PRE_BANNED:
              return 'Pre-Banned'
            case MasternodeState.BANNED:
              return 'Banned'
            default:
              return data.state
          }
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {(() => {
          switch (data.timelock) {
            case 0:
              return <div>0 year</div>
            case 260:
              return <div>5 years</div>
            case 520:
              return <div>10 years</div>
            default:
              return <div>{data.timelock} Weeks</div>
          }
        })()}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<MasternodesPageProps>> {
  const next = CursorPagination.getNext(context)
  const items = await getWhaleApiClient(context).masternodes.list(30, next)
  return {
    props: {
      masternodes: {
        items,
        pages: CursorPagination.getPages(context, items)
      }
    }
  }
}
