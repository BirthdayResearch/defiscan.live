import { Link } from '@components/commons/Link'
import { PriceOracleTable } from '@components/prices/PriceOracleTable'
import { PriceTickerDetail } from '@components/prices/PriceTickerDetail'
import { getWhaleApiClient } from '@contexts'
import { PriceOracle, PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { MdChevronRight } from 'react-icons/md'

interface PricesPageProps {
  price: PriceTicker
  oracles: PriceOracle[]
}

export default function SymbolPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Breadcrumb />

      <div className='flex'>
        <div>
          <PriceTickerDetail {...props} />
        </div>
      </div>

      <div className='py-12 border-t border-gray-100'>
        <PriceOracleTable {...props} />
      </div>
    </div>
  )
}

function Breadcrumb (): JSX.Element {
  return (
    <div className='flex items-center text-black'>
      <Link href={{ pathname: '/' }}>
        <div className='cursor-pointer hover:text-primary opacity-60 hover:opacity-100'>Scan</div>
      </Link>
      <div className='px-1'>
        <MdChevronRight className='h-6 w-6 opacity-60' />
      </div>
      <Link href={{ pathname: '/prices' }}>
        <div className='cursor-pointer hover:text-primary opacity-60 hover:opacity-100'>Prices</div>
      </Link>
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
