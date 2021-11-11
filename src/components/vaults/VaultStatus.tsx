import classNames from 'classnames'
import { LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'

interface VaultStatusProps {
  state: LoanVaultState.ACTIVE | LoanVaultState.FROZEN | LoanVaultState.MAY_LIQUIDATE | LoanVaultState.UNKNOWN | LoanVaultState.IN_LIQUIDATION
  className?: string
  testId?: string
}

export function VaultStatus (props: VaultStatusProps): JSX.Element {
  switch (props.state) {
    case LoanVaultState.ACTIVE:
      return (
        <span
          className={classNames(props.className, 'text-blue-500 bg-blue-100')}
          data-testid={props.testId}
        >ACTIVE
        </span>
      )
    case LoanVaultState.FROZEN:
      return (
        <span
          className={classNames(props.className, 'text-red-300 bg-red-100')}
          data-testid={props.testId}
        >HALTED
        </span>
      )
    case LoanVaultState.MAY_LIQUIDATE:
      return <span className={classNames(props.className, 'text-orange-500 bg-orange-100')} data-testid={props.testId}>AT RISK</span>
    case LoanVaultState.IN_LIQUIDATION:
      return (
        <span
          className={classNames(props.className, 'text-gray-500 bg-gray-100')}
          data-testid={props.testId}
        >LIQUIDATED
        </span>
      )
    case LoanVaultState.UNKNOWN:
      return (
        <span
          className={classNames(props.className, 'text-white bg-gray-400')}
          data-testid={props.testId}
        >UNKNOWN
        </span>
      )
  }
}
