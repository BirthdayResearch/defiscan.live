import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Container } from '@components/commons/Container'
import { AddressAggregation, AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { AddressHeading, AddressNotFoundHeading } from '@components/address/[addressid]/AddressHeadings'
import { AddressSummaryTable } from '@components/address/[addressid]/AddressSummaryTable'
import { AddressTransactionTable } from '@components/address/[addressid]/AddressTransactionTable'

interface AddressPageProps {
  addressId: string
  tokens?: AddressToken[]
  aggregation?: AddressAggregation
}

export default function AddressPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  if (props.tokens === undefined || props.aggregation === undefined) {
    return (
      <Container className='pt-12 pb-20'>
        <AddressNotFoundHeading addressId={props.addressId} />
      </Container>
    )
  }

  return (
    <Container className='pt-12 pb-20'>
      <AddressHeading addressId={props.addressId} />
      <AddressSummaryTable aggregation={props.aggregation} tokens={props.tokens} />
      <AddressTransactionTable addressId={props.addressId} />
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AddressPageProps>> {
  const api = getWhaleApiClient(context)
  const addressId = context.params?.addressid as string

  try {
    return {
      props: {
        addressId: addressId,
        tokens: await api.address.listToken(addressId),
        aggregation: await api.address.getAggregation(addressId)
      }
    }
  } catch (e) {
    return {
      props: {
        addressId: addressId
      }
    }
  }
}
