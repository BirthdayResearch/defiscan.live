import NumberFormat from 'react-number-format'
import React from 'react'
import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { useTokenPrice } from '../../../hooks/TokenPrice'
import BigNumber from 'bignumber.js'

export function RewardsCollateralInfo (props: {
  collaterals: LoanVaultTokenAmount[]
}): JSX.Element {
  const { getTokenPrice } = useTokenPrice()
  return (
    <div
      className='font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md w-100'
    >
      <div className='p-3'>
        <div className='font-medium mb-1'>Rewards / Collaterals Breakdown</div>
        {props.collaterals.map(collateral => {
          return (
            <div key={collateral.id} className='flex mt-0.5'>
              <div className='w-1/2'>{collateral.displaySymbol}</div>
              <div className='w-1/2 text-right'>
                <div className='font-medium text-gray-700'>
                  <NumberFormat
                    value={collateral.amount}
                    displayType='text'
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </div>
                <div>
                  <NumberFormat
                    value={getTokenPrice(collateral.symbol, collateral.amount).toFixed(2, BigNumber.ROUND_HALF_UP)}
                    displayType='text'
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    prefix='≈$'
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
