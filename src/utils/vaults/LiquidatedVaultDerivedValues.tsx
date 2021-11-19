import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
  LoanVaultTokenAmount
} from '@defichain/whale-api-client/dist/api/loan'
import { LiquidatedVaultDerivedValues } from '../../pages/vaults'
import BigNumber from 'bignumber.js'

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
        if (batch.loan.id === '15') {
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
          if (collateral.id === '15') {
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

  if (isMissingActivePrice) {
    return undefined
  }

  return {
    loanTokens: loanTokens,
    collateralTokens: collateralTokens,
    totalLoanValue: totalLoanValue,
    totalCollateralValue: totalCollateralValue,
    totalCollateralRatio: totalCollateralRatio
  }
}
