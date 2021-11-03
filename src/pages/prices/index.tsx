import { Head } from '@components/commons/Head'
import { PriceFeed } from '@components/prices/PriceFeed'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { prices } from '@defichain/whale-api-client'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'

interface PricesPageProps {
  prices: {
    items: prices.PriceTicker[]
    pages: CursorPage[]
  }
}

export default function PricesPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <Head title='Prices' />

      <div>
        <h1 className='text-2xl font-medium'>
          Price Feeds
        </h1>

        <div className='mt-4 -m-4 flex flex-wrap'>
          {props.prices.items.map(item => (
            <PriceFeed price={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={props.prices.pages} path='/prices' />
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const next = CursorPagination.getNext(context)
  const prices = await getWhaleApiClient(context).prices.list(60, next)
  return {
    props: {
      prices: {
        items: prices,
        pages: CursorPagination.getPages(context, prices)
      }
    }
  }
}
