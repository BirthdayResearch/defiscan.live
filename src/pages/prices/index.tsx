import { Head } from '@components/commons/Head'
import { PriceFeed } from '@components/prices/PriceFeed'
import { getWhaleApiClient } from '@contexts'
import { prices } from '@defichain/whale-api-client'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { ORACLES } from '../../cms/oracles'

interface PricesPageProps {
  prices: {
    items: prices.PriceTicker[]
    nextToken: string | null
  }
}

export default function PricesPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [items] = useState(props.prices.items)
  // const [nextToken, setNextToken] = useState(prices.nextToken)

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Head title='Prices' />

      <div>
        <h1 className='text-2xl font-semibold'>
          Price Feeds
        </h1>

        <div className='mt-4 -m-4 flex flex-wrap'>
          {items.map(item => (
            <PriceFeed price={item} key={item.id} />
          ))}
        </div>
      </div>

      <div className='mt-20'>
        <PricingFeedsBySection />
      </div>
    </div>
  )
}

function PricingFeedsBySection (): JSX.Element {
  const oracles = Object.values(ORACLES)

  return (
    <section>
      <h1 className='text-2xl font-semibold'>
        Pricing feeds by
      </h1>

      <div className='mt-6 -m-2 flex flex-wrap'>
        {oracles.map(item => (
          <div className='w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-2' key={item.name}>
            <div className='border border-black border-opacity-5 flex items-center justify-center p-4' key={item.name}>
              <a href={item.url} target='_blank' rel='nofollow noopener noreferrer'>
                <Image src={item.image} width={150} height={90} alt={item.name} objectFit='contain' />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const prices = await getWhaleApiClient(context).prices.list(60)
  return {
    props: {
      prices: {
        items: prices,
        nextToken: prices.nextToken ?? null
      }
    }
  }
}
