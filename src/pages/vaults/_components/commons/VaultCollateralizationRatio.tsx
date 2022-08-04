import { LoanScheme, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'
import ReactNumberFormat from 'react-number-format'

interface VaultCollateralizationRatioProps {
  collateralizationRatio?: string
  loanScheme: LoanScheme
  vaultState: LoanVaultState
  className?: string
  testId?: string
  suffix?: string
}

export function VaultCollateralizationRatio (props: VaultCollateralizationRatioProps): JSX.Element {
  if (props.collateralizationRatio === undefined) {
    return <span>N/A</span>
  }

  const minColRatio = new BigNumber(props.loanScheme.minColRatio)
  const collateralRatio = new BigNumber(props.collateralizationRatio)
  const currentPercentage = collateralRatio.div(minColRatio)

  return (
    <div
      className={
        classNames(props.className, (props.vaultState === LoanVaultState.FROZEN
          ? ('text-gray-200')
          : {
              'text-red-500': currentPercentage.gte(1) && currentPercentage.lt(1.25),
              'text-orange-500': currentPercentage.gte(1.25) && currentPercentage.lte(1.5),
              'text-green-500': currentPercentage.gt(1.5)
            }))
      }
      data-testid={props.testId}
    >
      {collateralRatio.lt(0)
        ? ('N/A')
        : (<ReactNumberFormat
            value={new BigNumber(props.collateralizationRatio).toFixed(2)}
            suffix={props.suffix === undefined ? '%' : ''}
            displayType='text'
            thousandSeparator
           />)}
    </div>
  )
}
