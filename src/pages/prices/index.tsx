import { PriceFeed } from '@components/prices/PriceFeed'
import { getWhaleApiClient } from '@contexts'
import { prices } from '@defichain/whale-api-client'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import { OracleCopy, ORACLES } from '../../cms/oracles'

interface PricesPageProps {
  prices: {
    items: prices.PriceTicker[]
    nextToken: string | null
  }
  oracles: OracleCopy[]
}

export default function PricesPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [items] = useState(props.prices.items)
  // const [nextToken, setNextToken] = useState(prices.nextToken)

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <div>
        <h1 className='text-2xl font-semibold'>
          Price Feeds
        </h1>

        <div className='mt-4 -m-4 flex flex-wrap'>
          {items.map(item => (
            <PriceFeed price={item} key={item.id} />
          ))}
        </div>

        {/* TODO(fuxingloh): Show more */}
      </div>

      <div className='mt-20'>
        <h1 className='text-2xl font-semibold'>
          Decentralized by the following
        </h1>

        <div className='mt-4 -m-4 flex flex-wrap'>
          {props.oracles.map(item => (
            // TODO: oracle
            <div className='w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-4' key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const prices = await getWhaleApiClient(context).prices.list(60)
  const oracles = Object.values(ORACLES).sort(a => a.order)
  return {
    props: {
      prices: {
        items: prices,
        nextToken: prices.nextToken ?? null
      },
      oracles: oracles
    }
  }
}
