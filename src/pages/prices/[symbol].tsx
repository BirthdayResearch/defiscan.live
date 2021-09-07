import { Breadcrumb } from '@components/commons/Breadcrumb'
import { Head } from '@components/commons/Head'
import { PricingFeedsBySection } from '@components/prices/PriceFeedBySection'
import { PriceGraph } from '@components/prices/PriceGraph'
import { PriceOracleTable } from '@components/prices/PriceOracleTable'
import { PriceTickerDetail } from '@components/prices/PriceTickerDetail'
import { getPriceCopy, PriceCopy } from '@content/prices'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { PriceOracle, PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'

interface PricesPageProps {
  price: PriceTicker
  oracles: PriceOracle[]
}

export default function SymbolPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { price: { price: { token, currency } } } = props
  const copy: PriceCopy | undefined = getPriceCopy(props.price.id)

  return (
    <Container className='pt-12 pb-20'>
      <Head title={`${token}/${currency}`} description={copy?.description} />
      <Breadcrumb items={[
        { path: '/prices', name: 'Prices' },
        { path: `/prices/${token}-${currency}`, name: `${token}/${currency}`, hide: true, canonical: true }
      ]}
      />

      <div className='flex flex-wrap -mx-6'>
        <div className='w-full lg:w-1/3 px-6'>
          <PriceTickerDetail price={props.price} />
        </div>

        <div className='w-full lg:w-2/3 lg:px-6' style={{ height: '32rem', maxHeight: '80vh' }}>
          <PriceGraph {...props} />
        </div>
      </div>

      <div className='mt-12 py-12 border-t border-gray-100'>
        <PriceOracleTable {...props} />
      </div>
      <div className='mt-20'>
        <PricingFeedsBySection />
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const api = getWhaleApiClient(context)
  const symbol = context.params?.symbol?.toString() as string
  const [token, currency] = symbol.split('-')
  const price = await api.prices.get(token, currency)
  const oracles = await api.prices.getOracles(token, currency, 60)

  return {
    props: {
      price: price,
      oracles: oracles
    }
  }
}
