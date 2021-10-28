import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Container } from '@components/commons/Container'
import { AddressAggregation, AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { AddressHeading, AddressNotFoundHeading } from '@components/address/[address]/AddressHeadings'
import { AddressSummaryTable } from '@components/address/[address]/AddressSummaryTable'
import { AddressTransactionTable } from '@components/address/[address]/AddressTransactionTable'
import { AddressTokenTable } from '@components/address/[address]/AddressTokenTable'

interface AddressPageProps {
  address: string
  tokens?: AddressToken[]
  aggregation?: AddressAggregation
}

export default function AddressPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  if (props.tokens === undefined || props.aggregation === undefined) {
    return (
      <Container className='pt-12 pb-20'>
        <AddressNotFoundHeading address={props.address} />
      </Container>
    )
  }

  return (
    <Container className='pt-12 pb-20'>
      <AddressHeading address={props.address} />
      <AddressSummaryTable aggregation={props.aggregation} />
      <AddressTokenTable tokens={props.tokens} />
      <AddressTransactionTable address={props.address} />
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AddressPageProps>> {
  const api = getWhaleApiClient(context)
  const address = context.params?.address as string

  try {
    return {
      props: {
        address: address,
        tokens: await api.address.listToken(address),
        aggregation: await api.address.getAggregation(address)
      }
    }
  } catch (e) {
    return {
      props: {
        address: address
      }
    }
  }
}
