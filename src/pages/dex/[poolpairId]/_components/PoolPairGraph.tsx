import React, { useEffect, useState } from 'react'
import {
  PoolPairData,
  PoolSwapAggregated,
  PoolSwapAggregatedInterval
} from '@defichain/whale-api-client/dist/api/poolpairs'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { WhaleApiClient } from '@defichain/whale-api-client'
import BigNumber from 'bignumber.js'
import { JSX } from '@babel/types'
import { Bar, BarChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { format, fromUnixTime } from 'date-fns'
import { UnitSuffix } from '@components/commons/UnitSuffix'

interface PoolSwapAggregatedWithTotal extends PoolSwapAggregated {
  total: number
}

export function PoolPairGraph (props: { poolpair: PoolPairData }): JSX.Element {
  const api = useWhaleApiClient()
  const [feed, setFeed] = useState<PoolSwapAggregatedWithTotal[] | undefined>(undefined)

  useEffect(() => {
    void fetchDailySwaps(api, props.poolpair.id).then(setFeed)
  }, [])

  if (feed === undefined) {
    return (
      <div className='animate-pulse py-64 rounded-md w-full bg-gray-100' />
    )
  }

  return (
    <div className='bg-gray-50 rounded-lg py-6 px-8 flex flex-col' data-testid='PoolPairGraph'>
      <span className='block w-full font-medium text-lg' data-testid='Title'>Volume</span>
      <div className='w-full h-96'>
        <PriceAreaChart feed={feed} />
      </div>
    </div>
  )
}

function PriceAreaChart ({ feed }: { feed: PoolSwapAggregatedWithTotal[] }): JSX.Element {
  const data = feed.map(value => ({
    feed: value,
    time: value.block.medianTime * 1000
  }))

  function formatXAxis (tickItem): string {
    const units = {
      3: 'k',
      6: 'm',
      9: 'b'
    }
    const value = new BigNumber(tickItem)
    const places = Math.floor(value.e! / 3)

    return `$${
      value.dividedBy(Math.pow(1000, places))
        .toFormat(2, {
          decimalSeparator: '.',
          suffix: units[places * 3]
        })
    }`
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={data}
      >
        <YAxis
          allowDataOverflow
          domain={[0, 'dataMax']}
          axisLine={false}
          tickFormatter={formatXAxis}
          orientation='right'
          fontSize='13'
          tickMargin={8}
          tickLine={false}
        />

        <XAxis
          dataKey='time'
          domain={['dataMin', 'dataMax']}
          tickFormatter={time => format(time, 'dd')}
          tickMargin={8}
        />

        <Tooltip content={props => <TooltipDialog {...props} />} />

        <Bar
          dataKey='feed.total'
          fill='#ff00af'
          barSize={1.5}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function TooltipDialog ({ payload }: TooltipProps<any, any>): JSX.Element | null {
  const feed = payload?.[0]?.payload.feed as PoolSwapAggregatedWithTotal
  if (feed === undefined) {
    return null
  }
  const blockTime = format(fromUnixTime(feed.block.medianTime), 'PPpp')

  return (
    <div className='table p-5 rounded shadow-lg bg-white ring-1 ring-gray-500 ring-opacity-5'>
      <div className='text-2xl font-medium text-gray-900'>$
        <UnitSuffix
          value={Number(feed.total)}
          units={{
            3: 'k',
            6: 'm',
            9: 'b'
          }}
          noSuffixSpacing
        />
      </div>
      <div>
        {blockTime}
      </div>
    </div>
  )
}

async function fetchDailySwaps (api: WhaleApiClient, poolpairId: string): Promise<PoolSwapAggregatedWithTotal[]> {
  const aggregates: PoolSwapAggregated[] = []

  let response = await api.poolpairs.listPoolSwapAggregates(poolpairId, PoolSwapAggregatedInterval.ONE_DAY, 200)
  aggregates.push(...response)

  if (response.hasNext) {
    response = await api.poolpairs.listPoolSwapAggregates(poolpairId, PoolSwapAggregatedInterval.ONE_DAY, 165, response.nextToken)
    aggregates.push(...response)
  }

  return aggregates.map(aggregate => {
    let total = new BigNumber(0)
    for (const value of Object.values(aggregate.aggregated.amounts
    )) {
      total = total.plus(value)
    }

    return {
      ...aggregate,
      total: Number(total.toFixed(8))
    }
  }).reverse()
}
