import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { AddressHeading, AddressNotFoundHeading } from './_components/AddressHeadings'
import { AddressSummaryTable } from './_components/AddressSummaryTable'
import { AddressTransactionTable } from './_components/AddressTransactionTable'
import { AddressTokenTable } from './_components/AddressTokenTable'
import { fromAddress } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { isAlphanumeric } from '../../utils/commons/StringValidator'
import { Head } from '@components/commons/Head'
import { AddressVaults } from './_components/AddressVaults'

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
    <>
      <Head title={`Address #${props.address}`} />

      <Container className='pt-12 pb-20'>
        <AddressHeading address={props.address} />
        <AddressSummaryTable address={props.address} />
        <AddressTokenTable address={props.address} />
        <AddressVaults address={props.address} />
        <AddressTransactionTable address={props.address} />
      </Container>
    </>
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
