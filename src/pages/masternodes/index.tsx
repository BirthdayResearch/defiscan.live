import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { MasternodeData, MasternodeState } from '@defichain/whale-api-client/dist/api/masternodes'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import NumberFormat from 'react-number-format'
import { Container } from '@components/commons/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { AddressLink } from '@components/commons/AddressLink'

interface MasternodesPageProps {
  masternodes: {
    items: MasternodeData[]
    pages: CursorPage[]
  }
}

export default function MasternodesPage ({ masternodes }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const tvl = useSelector((state: RootState) => state.stats.tvl)
  const locked = useSelector((state: RootState) => state.stats.masternodes.locked)

  return (
    <>
      <Head title='Masternodes' />

      <div className='bg-orange-50 py-3'>
        <Container>
          <div className='flex flex-wrap -mx-3'>
            <div className='flex mx-3 my-1'>
              <div className='text-gray-900'>Total value locked in Masternodes:</div>
              <NumberFormat
                className='ml-2 text-orange-600 font-medium'
                value={tvl?.masternodes}
                displayType='text'
                decimalScale={0}
                thousandSeparator
                prefix='$'
              />
            </div>
            <div className='flex mx-3 my-1'>
              <div className='text-gray-900'>0 year locked:</div>
              <NumberFormat
                className='ml-2 text-orange-600 font-medium'
                value={locked?.find(l => l.weeks === 0)?.count}
                displayType='text'
                decimalScale={0}
                thousandSeparator
              />
            </div>
            <div className='flex mx-3 my-1'>
              <div className='text-gray-900'>5 year locked:</div>
              <NumberFormat
                className='ml-2 text-orange-600 font-medium'
                value={locked?.find(l => l.weeks === 260)?.count}
                displayType='text'
                decimalScale={0}
                thousandSeparator
              />
            </div>
            <div className='flex mx-3 my-1'>
              <div className='text-gray-900'>10 year locked:</div>
              <NumberFormat
                className='ml-2 text-orange-600 font-medium'
                value={locked?.find(l => l.weeks === 520)?.count}
                displayType='text'
                decimalScale={0}
                thousandSeparator
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className='pt-12 pb-20'>
        <h1 className='text-2xl font-medium'>Masternodes</h1>

        <OverflowTable className='mt-6'>
          <OverflowTable.Header>
            <OverflowTable.Head title='OWNER' sticky />
            <OverflowTable.Head title='OPERATOR' />
            <OverflowTable.Head title='CREATION HEIGHT' />
            <OverflowTable.Head title='RESIGN HEIGHT' />
            <OverflowTable.Head title='MINTED BLOCKS' />
            <OverflowTable.Head title='STATE' />
            <OverflowTable.Head title='TIMELOCK' />
          </OverflowTable.Header>
          {masternodes.items.map((mn) => (
            <MasternodeRow data={mn} key={mn.id} />
          ))}
        </OverflowTable>
        <div className='flex justify-end mt-8'>
          <CursorPagination pages={masternodes.pages} path='/masternodes' />
        </div>
      </Container>
    </>
  )
}

function MasternodeRow ({ data }: { data: MasternodeData }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell sticky>
        <div className='break-all w-24 md:w-64'>
          <AddressLink address={data.owner.address} />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <div className='break-all w-64'>
          {data.operator.address}
        </div>
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
        {data.resign?.height !== undefined ? (
          <NumberFormat
            value={data.resign?.height}
            fixedDecimalScale
            displayType='text'
            thousandSeparator=','
          />
        ) : (
          <>-</>
        )}
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
              return <div>0 Yrs</div>
            case 260:
              return <div>5 Yrs</div>
            case 520:
              return <div>10 Yrs</div>
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
