import { Head } from '@components/commons/Head'
import { PriceFeed } from '@components/prices/PriceFeed'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { prices } from '@defichain/whale-api-client'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'

interface PricesPageProps {
  prices: {
    items: prices.PriceTicker[]
  }
}

export default function PricesPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <Head title='Prices' />

      <div>
        <div className='flex flex-wrap justify-between'>
          <h1 className='text-2xl font-medium'>
            Price Feeds
          </h1>

          <div className='flex flex-wrap gap-x-2'>
            <div className='rounded p-2 border border-gray-300 cursor-pointer'>
              All
            </div>
            <div className='rounded p-2 border border-gray-300 cursor-pointer'>
              Stocks
            </div>
            <div className='rounded p-2 border border-gray-300 cursor-pointer'>
              ETF
            </div>
            <div className='rounded p-2 border border-gray-300 cursor-pointer'>
              Commodity
            </div>
          </div>
        </div>

        <div className='mt-4 -m-4 flex flex-wrap'>
          {props.prices.items.map(item => (
            <PriceFeed price={item} key={item.id} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const prices: prices.PriceTicker[] = []

  let pricesResponse = await getWhaleApiClient(context).prices.list(200)
  prices.push(...pricesResponse)
  while (pricesResponse.hasNext) {
    pricesResponse = await getWhaleApiClient(context).prices.list(200, pricesResponse.nextToken)
    prices.push(...pricesResponse)
  }

  return {
    props: {
      prices: {
        items: prices
      }
    }
  }
}
