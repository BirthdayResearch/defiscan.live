import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
// import { getWhaleApiClient } from '@contexts/WhaleContext'

interface VaultsPageData {
  vault: LoanVaultActive | LoanVaultLiquidated
}

export default function VaultDetails ({ vault }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <div>
        <pre>{JSON.stringify(vault, null, 2)}</pre>
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  // const api = getWhaleApiClient(context)
  // const vaults = await api.loan.getVault("")
  const vaults_active = {
    vaultId: "c9b19726d6ce42beec137f1fe85614ec3341aff83f797ccd51f6494e21ac9df4",
    loanSchemeId: 'scheme',
    ownerAddress: "8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8",
    state: LoanVaultState.ACTIVE,
    collateralRatio: '16667',
    collateralValue: '10000',
    informativeRatio: '16666.61600015',
    loanValue: '60.0001824',
    interestValue: '0.0001824',
    collateralAmounts: [
      {
        amount: '10000.00000000',
        displaySymbol: 'dDFI',
        id: '0',
        name: 'Default Defi token',
        symbol: 'DFI',
        symbolKey: 'DFI'
      }
    ],
    loanAmounts: [
      {
        amount: '30.00009120',
        displaySymbol: 'dTSLA',
        id: '1',
        name: '',
        symbol: 'TSLA',
        symbolKey: 'TSLA'
      }
    ],
    interestAmounts: [
      {
        amount: '0.00009120',
        displaySymbol: 'dTSLA',
        id: '1',
        name: '',
        symbol: 'TSLA',
        symbolKey: 'TSLA'
      }
    ]
  } as LoanVaultActive

  const vaults_liquidated = {
    vaultId: "c9b19726d6ce42beec137f1fe85614ec3341aff83f797ccd51f6494e21ac9df4",
    loanSchemeId: 'scheme',
    ownerAddress: "8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8",
    state: LoanVaultState.IN_LIQUIDATION,
    batchCount: 1,
    liquidationHeight: 162,
    liquidationPenalty: 5,
    batches: [
      {
        index: 0,
        collaterals: [
          {
            amount: '10000.00000000',
            displaySymbol: 'DFI',
            id: '0',
            name: 'Default Defi token',
            symbol: 'DFI',
            symbolKey: 'DFI'
          }
        ],
        loan: {
          amount: '30.00005130',
          displaySymbol: 'dAAPL',
          id: '2',
          name: '',
          symbol: 'AAPL',
          symbolKey: 'AAPL'
        }
      }
    ]
  } as LoanVaultLiquidated

  return {
    props: {
      vault: vaults_active
    }
  }
}
