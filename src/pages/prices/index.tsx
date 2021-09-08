import { Head } from '@components/commons/Head'
import { PriceFeed } from '@components/prices/PriceFeed'
import { PricingFeedsBySection } from '@components/prices/PriceFeedBySection'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { prices } from '@defichain/whale-api-client'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import { Container } from '@components/commons/Container'

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
    <Container className='pt-12 pb-20'>
      <Head title='Prices' />

      <div>
        <h1 className='text-2xl font-medium'>
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
    </Container>
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
