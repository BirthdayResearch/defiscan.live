import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
  LoanVaultTokenAmount
} from '@defichain/whale-api-client/dist/api/loan'
import BigNumber from 'bignumber.js'

export interface LiquidatedVaultDerivedValues {
  loanAmounts: LoanVaultTokenAmount[]
  collateralAmounts: LoanVaultTokenAmount[]
  loanValue: BigNumber
  collateralValue: BigNumber
  collateralRatio: BigNumber
}

export function calculateLiquidationValues (vault: LoanVaultActive | LoanVaultLiquidated): LiquidatedVaultDerivedValues | undefined {
  const loanTokens: LoanVaultTokenAmount[] = []
  const collateralTokens: LoanVaultTokenAmount[] = []
  let totalLoanValue = new BigNumber(0)
  let totalCollateralValue = new BigNumber(0)
  let totalCollateralRatio = new BigNumber(0)

  let isMissingActivePrice = false

  if (vault.state === LoanVaultState.IN_LIQUIDATION) {
    vault.batches.forEach(batch => {
      if (batch.loan?.activePrice?.active == null) {
        if (batch.loan.symbol === 'DUSD') {
          loanTokens.push(batch.loan)
          totalLoanValue = totalLoanValue.plus(new BigNumber(batch.loan.amount))
        } else {
          isMissingActivePrice = true
        }
      } else {
        loanTokens.push(batch.loan)
        totalLoanValue = totalLoanValue.plus(new BigNumber(batch.loan.amount).multipliedBy(batch.loan.activePrice.active.amount))
      }

      batch.collaterals.forEach(collateral => {
        if (collateral.activePrice?.active == null) {
          if (collateral.symbol === 'DUSD') {
            collateralTokens.push(collateral)
            totalCollateralValue = totalCollateralValue.plus(new BigNumber(collateral.amount))
          } else {
            isMissingActivePrice = true
          }
        } else {
          collateralTokens.push(collateral)
          totalCollateralValue = totalCollateralValue.plus(new BigNumber(collateral.amount).multipliedBy(collateral.activePrice?.active.amount))
        }
      })
    })

    totalCollateralRatio = totalCollateralValue.div(totalLoanValue).multipliedBy(100)
  }

  if (isMissingActivePrice || totalLoanValue.lte(0) || totalCollateralValue.lte(0) || totalCollateralRatio.lt(0)) {
    return undefined
  }

  return {
    loanAmounts: loanTokens,
    collateralAmounts: collateralTokens,
    loanValue: totalLoanValue,
    collateralValue: totalCollateralValue,
    collateralRatio: totalCollateralRatio
  }
}
