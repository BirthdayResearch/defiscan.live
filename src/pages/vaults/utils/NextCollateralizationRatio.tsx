import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import BigNumber from 'bignumber.js'

export function getNextCollateralizationRatio (collateralAmounts: LoanVaultTokenAmount[], loanAmounts: LoanVaultTokenAmount[]): BigNumber | undefined {
  const collaterals = collateralAmounts?.map(collateral => {
    const price = getActivePrice(collateral.symbol, collateral.activePrice?.next?.amount)
    if (price === '-1') {
      return new BigNumber('-1')
    }

    return new BigNumber(collateral.amount).multipliedBy(price)
  })

  const loans = loanAmounts?.map(loan => {
    const price = getActivePrice(loan.symbol, loan.activePrice?.next?.amount)
    if (price === '-1') {
      return new BigNumber('-1')
    }

    return new BigNumber(loan.amount).multipliedBy(price)
  })

  if (collaterals.filter(item => item.eq('-1')).length !== 0 || loans.filter(item => item.eq('-1')).length !== 0 || collaterals?.length === 0 || loans?.length === 0) {
    return undefined
  }

  return collaterals?.reduce((prev, next) => prev.plus(next)).dividedBy(
    loans?.reduce((prev, next) => prev.plus(next))
  ).multipliedBy(100)
}

export function getActivePrice (symbol: string, amount?: string): string {
  if (symbol !== 'DUSD') {
    return amount ?? '-1'
  }

  return '1'
}
