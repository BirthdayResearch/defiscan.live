import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React from 'react'
import { HighestBid, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'
import { useTokenPrice } from '../../../vaults/hooks/TokenPrice'

interface MinNextBidProps {
  displaySymbol: string
  loan: LoanVaultTokenAmount
  highestBid?: HighestBid | undefined
  isStartingBid?: boolean
  valueClassName?: string
  valueSuffix?: boolean
  testId?: string
}

export function BidAmountValue (props: MinNextBidProps): JSX.Element {
  const { getTokenPrice } = useTokenPrice()

  let minBidAmount: BigNumber
  let minBidValue: BigNumber

  if (props.highestBid?.amount === undefined || props.isStartingBid!) {
    minBidAmount = new BigNumber(props.loan.amount).multipliedBy(1.05)
    minBidValue = getTokenPrice(props.loan.symbol, minBidAmount.toFixed(8))
  } else {
    minBidAmount = new BigNumber(props.highestBid.amount.amount).multipliedBy(1.01)
    minBidValue = getTokenPrice(props.loan.symbol, minBidAmount.toFixed(8))
  }

  return (
    <div data-testid={props.testId}>
      <ReactNumberFormat
        value={minBidAmount.toFixed(8)}
        thousandSeparator
        decimalScale={8}
        suffix={` ${props.displaySymbol}`}
        displayType='text'
        data-testid='BidAmountValue.MinBidAmount'
      />
      <div
        className={classNames('text-gray-500', props.valueClassName)} data-testid='BidAmountValue.MinBidValue'
      >
        {
          minBidValue.eq(0) ? (
            'N/A'
          ) : (
            <ReactNumberFormat
              value={minBidValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
              thousandSeparator
              decimalScale={8}
              prefix='$'
              suffix={props.valueSuffix! ? ' USD' : ''}
              displayType='text'
            />
          )
        }
      </div>
    </div>
  )
}
