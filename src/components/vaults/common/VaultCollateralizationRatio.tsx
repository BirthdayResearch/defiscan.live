import { LoanScheme, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

interface VaultCollateralizationRatioProps {
  collateralizationRatio: string // collateralizationRatio = collateralRatio
  loanScheme: LoanScheme
  vaultState: LoanVaultState
  className?: string
  testId?: string
}

export function VaultCollateralizationRatio (props: VaultCollateralizationRatioProps): JSX.Element {
  const minColRatio = new BigNumber(props.loanScheme.minColRatio)
  const collateralRatio = new BigNumber(props.collateralizationRatio)
  const currentPercentage = collateralRatio.div(minColRatio)

  return (
    <div
      className={
        classNames(props.className, (props.vaultState === LoanVaultState.FROZEN
          ? ('text-gray-200')
          : {
              'text-red-500': currentPercentage.gt(new BigNumber(0)) && currentPercentage.lte(new BigNumber(0.5)),
              'text-orange-500': currentPercentage.gt(new BigNumber(0.5)) && currentPercentage.lte(new BigNumber(1.5)),
              'text-green-500': currentPercentage.gt(new BigNumber(1.5))
            }))
      }
      data-testid={props.testId}
    >
      {collateralRatio.lt(0) ? 'N/A' : `${props.collateralizationRatio}%`}
    </div>
  )
}
