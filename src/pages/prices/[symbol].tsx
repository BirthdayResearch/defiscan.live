import { Breadcrumb } from '@components/commons/Breadcrumb'
import { PriceGraph } from '@components/prices/PriceGraph'
import { PriceOracleTable } from '@components/prices/PriceOracleTable'
import { PriceTickerDetail } from '@components/prices/PriceTickerDetail'
import { getWhaleApiClient } from '@contexts'
import { PriceOracle, PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { getPriceCopy, PriceCopy } from '../../cms/prices'

interface PricesPageProps {
  price: PriceTicker
  oracles: PriceOracle[]
}

export default function SymbolPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { price: { price: { token, currency } } } = props
  const copy: PriceCopy | undefined = getPriceCopy(props.price.id)

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Head>
        <title>{token}/{currency} – DeFi Scan</title>
        <meta key='og:title' name='og:title' content={`${token}/${currency} – DeFi Scan`} />
        <meta key='description' name='description' content={copy?.description} />
        <meta key='og:description' name='og:description' content={copy?.description} />
      </Head>

      <Breadcrumb items={[{ path: '/prices', name: 'Prices' }]} />

      <div className='flex flex-wrap -mx-6'>
        <div className='w-full lg:w-1/3 px-6'>
          <PriceTickerDetail {...props} />
        </div>

        <div className='w-full lg:w-2/3 lg:px-6' style={{ height: '32rem', maxHeight: '80vh' }}>
          <PriceGraph {...props} />
        </div>
      </div>

      <div className='mt-12 py-12 border-t border-gray-100'>
        <PriceOracleTable {...props} />
      </div>
    </div>
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
