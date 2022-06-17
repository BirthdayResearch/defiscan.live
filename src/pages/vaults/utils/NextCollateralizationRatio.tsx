import { LoanVaultTokenAmount, CollateralToken } from '@defichain/whale-api-client/dist/api/loan'
import { ActivePrice } from '@defichain/whale-api-client/dist/api/prices'
import BigNumber from 'bignumber.js'

type ActivePriceType = 'ACTIVE' | 'NEXT'

export function useNextCollateralizationRatio (collateralAmounts: LoanVaultTokenAmount[], loanAmounts: LoanVaultTokenAmount[], collateralTokens: CollateralToken[]): BigNumber {
  const collaterals = collateralAmounts?.map(collateral => {
    const priceFactor = collateralTokens.find(token => token.token.id === collateral.id)?.factor ?? '1'
    return new BigNumber(collateral.amount).multipliedBy(getActivePrice(collateral.symbol, collateral.activePrice, priceFactor, 'NEXT'))
  })
  const loans = loanAmounts?.map(loan => {
    return new BigNumber(loan.amount).multipliedBy(getActivePrice(loan.symbol, loan.activePrice, '1', 'NEXT'))
  })

  if (collaterals === undefined || loans === undefined || collaterals?.length === 0 || loans?.length === 0) {
    return new BigNumber(-1)
  }
  return collaterals?.reduce((prev, next) => prev.plus(next)).dividedBy(
    loans?.reduce((prev, next) => prev.plus(next))
  ).multipliedBy(100)
}

// oracle prices
export function getActivePrice (symbol: string, activePrice?: ActivePrice, priceFactor: string = '1', type: ActivePriceType = 'ACTIVE'): string {
  if (symbol === 'DUSD') {
    return new BigNumber('1').multipliedBy(priceFactor).toFixed(8)
  }
  return (type === 'ACTIVE' ? activePrice?.active?.amount : activePrice?.next?.amount) ?? '0'
}
