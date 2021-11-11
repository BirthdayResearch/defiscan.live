import classNames from 'classnames'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import BigNumber from 'bignumber.js'

interface VaultStatusProps {
  vault: LoanVaultActive | LoanVaultLiquidated
  className?: string
  testId?: string
}

export function VaultStatus (props: VaultStatusProps): JSX.Element {
  switch (props.vault.state) {
    case LoanVaultState.ACTIVE:

      if (Number(props.vault.loanValue) <= 0) {
        return (
          <div className={classNames(props.className, 'text-blue-500 bg-blue-100')} data-testid={props.testId}>
            ACTIVE
          </div>
        )
      }

      const minColRatio = new BigNumber(props.vault.loanScheme.minColRatio)
      const collateralRatio = new BigNumber(props.vault.collateralRatio!)
      const currentPercentage = collateralRatio.div(minColRatio)

      if (currentPercentage > new BigNumber(1.5)) {
        return (
          <div className={classNames(props.className, 'text-green-500 bg-green-100')} data-testid={props.testId}>
            HEALTHY
          </div>
        )
      } else {
        return (
          <div className={classNames(props.className, 'text-orange-500 bg-orange-100')} data-testid={props.testId}>
            AT RISK
          </div>
        )
      }
    case LoanVaultState.FROZEN:
      return (
        <div className={classNames(props.className, 'text-red-300 bg-red-100')} data-testid={props.testId}>
          HALTED
        </div>
      )
    case LoanVaultState.MAY_LIQUIDATE:
      return <div className={classNames(props.className, 'text-orange-500 bg-orange-100')} data-testid={props.testId}>AT
        RISK</div>
    case LoanVaultState.IN_LIQUIDATION:
      return (
        <div className={classNames(props.className, 'text-gray-500 bg-gray-100')} data-testid={props.testId}>
          LIQUIDATED
        </div>
      )
    case LoanVaultState.UNKNOWN:
      return (
        <div className={classNames(props.className, 'text-white bg-gray-400')} data-testid={props.testId}>
          UNKNOWN
        </div>
      )
  }
}
