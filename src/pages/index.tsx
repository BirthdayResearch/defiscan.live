import { GetServerSidePropsContext } from 'next'
import PricesPage, { getServerSideProps as getSSP } from './prices'

export default function IndexPage (props: any): JSX.Element {
  return PricesPage(props)
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<any> {
  return await getSSP(context)
}
