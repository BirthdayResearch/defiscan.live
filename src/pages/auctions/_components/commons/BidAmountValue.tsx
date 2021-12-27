import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React from 'react'
import { HighestBid, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'

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
  let minBidAmount: BigNumber
  let minBidValue: BigNumber | undefined

  if (props.highestBid?.amount === undefined || props.isStartingBid!) {
    minBidAmount = new BigNumber(props.loan.amount).multipliedBy(1.05)
    minBidValue = ((props.loan.activePrice?.active) != null) ? new BigNumber(props.loan.activePrice.active.amount).multipliedBy(minBidAmount) : undefined
  } else {
    minBidAmount = new BigNumber(props.highestBid.amount.amount).multipliedBy(1.01)
    minBidValue = ((props.highestBid.amount.activePrice?.active) != null) ? new BigNumber(props.highestBid.amount.activePrice.active.amount).multipliedBy(minBidAmount) : undefined
  }

  if (props.loan.displaySymbol === 'DUSD') {
    minBidValue = minBidAmount
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
          minBidValue === undefined ? (
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
