import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { MasternodeData } from '@defichain/whale-api-client/dist/api/masternodes'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { StatsBar } from '@components/commons/stats/StatsBar'
import ReactNumberFormat from 'react-number-format'
import React from 'react'
import { StatItem } from '@components/commons/stats/StatItem'
import { MasternodeTable } from './_components/MasternodeTable'
import { MasternodeCards } from './_components/MasternodeCards'

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

      <StatsBar>
        <StatItem label='Total Value Locked in Masternodes' testId='Masternodes.Stats.TVL'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={tvl?.masternodes}
            decimalScale={0}
            prefix='$'
            suffix=' USD'
          />
        </StatItem>
        <StatItem label='0 Year Locked' testId='Masternodes.Stats.ZeroYearLock'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={locked?.find(l => l.weeks === 0)?.count}
            decimalScale={0}
          />
        </StatItem>
        <StatItem label='5 Year Locked' testId='Masternodes.Stats.FiveYearLock'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={locked?.find(l => l.weeks === 260)?.count}
            decimalScale={0}
          />
        </StatItem>
        <StatItem label='10 Year Locked' testId='Masternodes.Stats.TenYearLock'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={locked?.find(l => l.weeks === 520)?.count}
            decimalScale={0}
          />
        </StatItem>
      </StatsBar>

      <Container className='pt-12 pb-20'>
        <h1 className='text-2xl font-medium dark:text-dark-gray-900'>Masternodes</h1>

        <div className='my-6 hidden md:block'>
          <MasternodeTable masternodes={masternodes.items} />
        </div>

        <div className='my-6 md:hidden'>
          <MasternodeCards masternodes={masternodes.items} />
        </div>

        <div className='flex justify-end mt-8'>
          <CursorPagination pages={masternodes.pages} path='/masternodes' />
        </div>
      </Container>
    </>
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
