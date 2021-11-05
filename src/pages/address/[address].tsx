import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { AddressHeading, AddressNotFoundHeading } from '@components/address/[address]/AddressHeadings'
import { AddressSummaryTable } from '@components/address/[address]/AddressSummaryTable'
import { AddressTransactionTable } from '@components/address/[address]/AddressTransactionTable'
import { AddressTokenTable } from '@components/address/[address]/AddressTokenTable'
import { fromAddress } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { isAlphanumeric } from '../../utils/commons/StringValidator'

interface AddressPageProps {
  address: string
}

export default function AddressPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  if (fromAddress(props.address, useNetwork().name) === undefined) {
    return (
      <Container className='pt-12 pb-20'>
        <AddressNotFoundHeading address={props.address} />
      </Container>
    )
  }

  return (
    <Container className='pt-12 pb-20'>
      <AddressHeading address={props.address} />
      <AddressSummaryTable address={props.address} />
      <AddressTokenTable address={props.address} />
      <AddressTransactionTable address={props.address} />
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AddressPageProps>> {
  const address = context.params?.address?.toString().trim() as string

  if (!isAlphanumeric(address)) {
    return { notFound: true }
  }

  return {
    props: {
      address: address
    }
  }
}
