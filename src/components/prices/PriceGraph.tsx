import { JSX } from '@babel/types'
import { useWhaleApiClient } from '@contexts'
import { ApiPagedResponse, WhaleApiClient } from '@defichain/whale-api-client'
import { PriceFeed } from '@defichain/whale-api-client/dist/api/prices'
import { format } from 'date-fns'
import { InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { getServerSideProps } from '../../pages/prices/[symbol]'

export function PriceGraph (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { token, currency } = props.price.price
  const api = useWhaleApiClient()
  const [feed, setFeed] = useState<PriceFeed[] | undefined>(undefined)

  useEffect(() => {
    void fetch24HourPriceFeed(api, token, currency).then(setFeed)
  }, [])

  if (feed === undefined) {
    return (
      <div className='animate-pulse py-64 rounded-md w-full bg-gray-100' />
    )
  }

  return (
    <PriceAreaChart feed={feed} />
  )
}

function PriceAreaChart ({ feed }: { feed: PriceFeed[] }): JSX.Element {
  return (
    <ResponsiveContainer width='100%' height='100%' className='bg-gray-50 rounded-md'>
      <AreaChart
        width={600}
        height={400}
        data={feed}
        margin={{ top: 48, right: 64, bottom: 48, left: 32 }}
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
          dataKey='block.medianTime'
          minTickGap={64}
          tickMargin={12}
          scale='time'
          tickFormatter={time => format(time * 1000, 'hh:mm aa')}
        />
        <YAxis
          dataKey='aggregated.amount'
          type='number'
          allowDataOverflow
          tickMargin={12}
          scale='linear'
          domain={[m => (m * 0.99).toPrecision(3), m => (m * 1.01).toPrecision(3)]}
          tickFormatter={value => value.toPrecision(4)}
        />
        <Tooltip content={props => <TooltipDialog {...props} />} />

        <Area
          type='monotone'
          dataKey='aggregated.amount'
          stroke='#ff00af'
          strokeWidth={2}
          fill='url(#gradient)'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function TooltipDialog ({ payload }: TooltipProps<any, any>): JSX.Element | null {
  const feed = payload?.[0]?.payload as PriceFeed
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

async function fetch24HourPriceFeed (api: WhaleApiClient, token: string, currency: string): Promise<PriceFeed[]> {
  const after = (Date.now() / 1000) - (24 * 60 * 60)
  const prices: PriceFeed[] = []

  let response: ApiPagedResponse<PriceFeed> = await api.prices.getFeed(token, currency, 60)
  prices.push(...response)

  while (response.hasNext && response[response.length - 1].block.time > after) {
    response = await api.paginate(response)
    prices.push(...response)
  }

  return prices.reverse()
}
