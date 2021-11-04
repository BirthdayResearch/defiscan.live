import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { Container } from '@components/commons/Container'

interface VaultPageProps {
  vaults: Array<LoanVaultActive | LoanVaultLiquidated>
}

export default function VaultPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <div data-testid='TEST_JSON'>
        <pre>{JSON.stringify(props.vaults, null, 2)}</pre>
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultPageProps>> {
  const api = getWhaleApiClient(context)
  const vaults = await api.loan.listVault()

  return {
    props: {
      vaults: [...vaults]
    }
  }
}
