import classNames from 'classnames'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import BigNumber from 'bignumber.js'

interface VaultStatusProps {
  vault: LoanVaultActive | LoanVaultLiquidated
  className?: string
  testId?: string
}

export function VaultStatus (props: VaultStatusProps): JSX.Element {
  let textClassName = ''
  let text = ''

  switch (props.vault.state) {
    case LoanVaultState.ACTIVE: {
      if (Number(props.vault.loanAmounts.length) === 0) {
        textClassName = 'text-blue-500 bg-blue-100'
        text = 'ACTIVE'
        break
      }

      const minColRatio = new BigNumber(props.vault.loanScheme.minColRatio)
      const collateralRatio = new BigNumber(props.vault.collateralRatio)
      const currentPercentage = collateralRatio.div(minColRatio)

      if (currentPercentage > new BigNumber(1.5)) {
        textClassName = 'text-green-500 bg-green-100'
        text = 'HEALTHY'
      } else {
        textClassName = 'text-orange-500 bg-orange-100'
        text = 'AT RISK'
      }
      break
    }

    case LoanVaultState.FROZEN: {
      textClassName = 'text-gray-400 bg-gray-100'
      text = 'HALTED'
      break
    }

    case LoanVaultState.MAY_LIQUIDATE: {
      textClassName = 'text-orange-500 bg-orange-100'
      text = 'AT RISK'
      break
    }

    case LoanVaultState.IN_LIQUIDATION: {
      textClassName = 'text-red-500 bg-red-100'
      text = 'IN LIQUIDATION'
      break
    }

    case LoanVaultState.UNKNOWN: {
      textClassName = 'text-white bg-gray-400'
      text = 'UNKNOWN'
      break
    }
  }

  return (
    <div className={classNames('min-w-max', props.className, textClassName)} data-testid={props.testId}>
      {text}
    </div>
  )
}
