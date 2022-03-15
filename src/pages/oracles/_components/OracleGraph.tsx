import { JSX } from '@babel/types'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { ApiPagedResponse, WhaleApiClient } from '@defichain/whale-api-client'
import { PriceFeed, PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { format } from 'date-fns'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

interface PriceGraphProps {
  price: PriceTicker
}

export enum GraphPeriod {
  ONE_DAY = '1D',
  ONE_WEEK = '7D',
  ONE_MONTH = '30D',
  ONE_YEAR = '1Y'
}

export function OracleGraph ({
  price: {
    price: {
      token,
      currency
    }
  }
}: PriceGraphProps): JSX.Element {
  const api = useWhaleApiClient()
  const [feed, setFeed] = useState<PriceFeed[] | undefined>(undefined)
  const [graphPeriod, setGraphPeriod] = useState<GraphPeriod>(GraphPeriod.ONE_DAY)

  useEffect(() => {
    switch (graphPeriod) {
      case GraphPeriod.ONE_YEAR:
        void fetchTimeFramePriceFeed(api, token, currency, 365 * 24 * 60 * 60).then(setFeed)
        break
      case GraphPeriod.ONE_MONTH:
        void fetchTimeFramePriceFeed(api, token, currency, 30 * 24 * 60 * 60).then(setFeed)
        break
      case GraphPeriod.ONE_WEEK:
        void fetchTimeFramePriceFeed(api, token, currency, 7 * 24 * 60 * 60).then(setFeed)
        break
      case GraphPeriod.ONE_DAY:
      default:
        void fetchTimeFramePriceFeed(api, token, currency, 24 * 60 * 60).then(setFeed)
        break
    }
  }, [graphPeriod])

  if (feed === undefined) {
    return (
      <div className='animate-pulse py-64 rounded-md w-full bg-gray-100' />
    )
  }

  return (
    <div
      className='rounded-lg flex flex-col bg-gray-50' style={{
        height: '32rem',
        maxHeight: '80vh'
      }}
    >
      <div className='pt-2 pr-2 md:pr-4 flex flex-col'>
        <div
          className='flex justify-end flex-wrap text-sm mt-8 lg:mt-0 space-x-0 lg:space-x-4 space-y-4 lg:space-y-0'
        >
          <div className='flex lg:max-w-max flex-wrap -mx-0.5'>
            <GraphPeriodButton
              current={graphPeriod} graphPeriod={GraphPeriod.ONE_DAY}
              onClick={() => setGraphPeriod(GraphPeriod.ONE_DAY)}
            />
            <GraphPeriodButton
              current={graphPeriod} graphPeriod={GraphPeriod.ONE_WEEK}
              onClick={() => setGraphPeriod(GraphPeriod.ONE_WEEK)}
            />
            <GraphPeriodButton
              current={graphPeriod} graphPeriod={GraphPeriod.ONE_MONTH}
              onClick={() => setGraphPeriod(GraphPeriod.ONE_MONTH)}
            />
          </div>
        </div>
      </div>
      <PriceAreaChart feed={feed} current={graphPeriod} />
    </div>
  )
}

function GraphPeriodButton ({
  current,
  graphPeriod,
  onClick
}: {
  current: GraphPeriod
  graphPeriod: GraphPeriod
  onClick: MouseEventHandler<HTMLDivElement>
}): JSX.Element {
  return (
    <div
      className={classNames('rounded p-2 border cursor-pointer mx-0.5 mt-1 lg:mt-0', graphPeriod === current ? 'text-white bg-primary-500 border-primary-500' : 'border-gray-300 text-gray-900 hover:bg-primary-50')}
      onClick={onClick}
      key={graphPeriod}
    >
      {graphPeriod}
    </div>
  )
}

function PriceAreaChart ({
  feed,
  current
}: { feed: PriceFeed[], current: GraphPeriod }): JSX.Element {
  const data = feed.map(value => ({
    feed: value,
    time: value.block.medianTime * 1000
  }))

  function formatXAxis (tickItem): string {
    switch (current) {
      case GraphPeriod.ONE_YEAR:
        return format(tickItem, 'MM')
      case GraphPeriod.ONE_MONTH:
        return format(tickItem, 'dd/MM')
      case GraphPeriod.ONE_WEEK:
        return format(tickItem, 'dd/MM')
      case GraphPeriod.ONE_DAY:
      default:
        return format(tickItem, 'hh aa')
    }
  }

  function formatYAxis (tickItem): string {
    const units = {
      3: 'k',
      6: 'm',
      9: 'b'
    }
    const value = new BigNumber(tickItem)
    const places = Math.floor(value.e! / 3)

    return `$${
      value.dividedBy(Math.pow(1000, places))
        .toFormat(1, {
          decimalSeparator: '.',
          suffix: units[places * 3]
        })
    }`
  }

  return (
    <ResponsiveContainer width='100%' height='100%' className='rounded-md'>
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 48,
          right: 64,
          bottom: 48,
          left: 32
        }}
      >
        <defs>
          <linearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#ff00af' stopOpacity={0.2} />
            <stop offset='50%' stopColor='#ff00af' stopOpacity={0.1} />
            <stop offset='95%' stopColor='#ff00af' stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke='#EEEEEE' />

        <XAxis
          dataKey='time'
          type='number'
          minTickGap={64}
          tickMargin={12}
          scale='time'
          domain={['dataMin', 'dataMax']}
          tickFormatter={formatXAxis}
        />
        <YAxis
          dataKey='feed.aggregated.amount'
          type='number'
          allowDataOverflow
          tickMargin={12}
          scale='linear'
          domain={[m => (m * 0.99).toPrecision(3), m => (m * 1.01).toPrecision(3)]}
          tickFormatter={formatYAxis}
        />

        <Tooltip content={props => <TooltipDialog {...props} />} />

        <Area
          type='monotone'
          dataKey='feed.aggregated.amount'
          stroke='#ff00af'
          strokeWidth={2}
          fill='url(#gradient)'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function TooltipDialog ({ payload }: TooltipProps<any, any>): JSX.Element | null {
  const feed = payload?.[0]?.payload.feed as PriceFeed
  if (feed === undefined) {
    return null
  }

  function Row (props: { title: string, content: any }): JSX.Element {
    return (
      <div className='table-row'>
        <div className='table-cell opacity-60 pr-3 py-0.5'>{props.title}:</div>
        <div className='table-cell'>{props.content}</div>
      </div>
    )
  }

  return (
    <div className='table p-5 rounded shadow-lg bg-white ring-1 ring-gray-500 ring-opacity-5'>
      <Row title='Block' content={feed.block.height} />
      <Row title='Date' content={format(feed.block.medianTime * 1000, 'MMM dd, hh:mm:ss aa')} />
      <Row title='Price' content={feed.aggregated.amount} />
      <Row title='Oracles' content={`${feed.aggregated.oracles.active}/${feed.aggregated.oracles.total} responded`} />
    </div>
  )
}

async function fetchTimeFramePriceFeed (api: WhaleApiClient, token: string, currency: string, timeRange: number): Promise<PriceFeed[]> {
  const prices: PriceFeed[] = []
  const after = (Date.now() / 1000) - timeRange

  let response: ApiPagedResponse<PriceFeed> = await api.prices.getFeed(token, currency, 60)
  prices.push(...response)

  while (response.hasNext && response[response.length - 1].block.time > after) {
    response = await api.paginate(response)
    prices.push(...response)
  }

  return prices.reverse()
}
