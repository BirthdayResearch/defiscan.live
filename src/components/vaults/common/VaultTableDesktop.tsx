import { OverflowTable } from '@components/commons/OverflowTable'
import { VaultStatusInfo } from '@components/vaults/common/VaultStatusInfo'
import { CollateralizationRatioMinInfo } from '@components/vaults/common/CollateralizationRatioMinInfo'
import { VaultRow } from '@components/vaults/common/VaultRow'
import { Link } from '@components/commons/link/Link'
import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { calculateLiquidationValues } from '../../../utils/vaults/LiquidatedVaultDerivedValues'

interface VaultTableDesktopProps {
  vaults: Array<(LoanVaultActive | LoanVaultLiquidated)>
}

export function VaultTableDesktop (props: VaultTableDesktopProps): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head
          title='Vault ID'
          testId='VaultsTable.VaultID'
          sticky
        />

        <OverflowTable.Head
          title='Status'
          infoDesc={<VaultStatusInfo />}
          testId='VaultsTable.Status'
        />

        <OverflowTable.Head
          alignRight
          title='Loan Taken'
          testId='VaultsTable.Loans'
        />

        <OverflowTable.Head
          alignRight
          title='Loan Value (USD)'
          infoDesc='Loan token(s) and value (in USD) taken by a vault.'
          testId='VaultsTable.LoansValue'
        />

        <OverflowTable.Head
          alignRight
          title='Collaterals'
          testId='VaultsTable.Collaterals'
        />

        <OverflowTable.Head
          alignRight
          title='Collateral Value (USD)'
          infoDesc='Value of tokens (in USD) deposited as collateral in a vault.'
          testId='VaultsTable.CollateralValue'
        />

        <OverflowTable.Head
          alignRight
          title='Collateralization Ratio / Min.'
          infoDesc={<CollateralizationRatioMinInfo />}
          testId='VaultsTable.CollateralizationRatios'
        />
      </OverflowTable.Header>

      {props.vaults.map(vault => {
        return (
          <Link href={{ pathname: `/vaults/${vault.vaultId}` }} key={vault.vaultId}>
            <a className='contents'>
              <VaultRow vault={vault} liquidatedVaultDerivedValues={calculateLiquidationValues(vault)} />
            </a>
          </Link>
        )
      })}
    </OverflowTable>
  )
}
