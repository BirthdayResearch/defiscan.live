import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React from 'react'
import { HighestBid, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'

interface MinNextBidProps {
  displaySymbol: string
  highestBid: HighestBid | undefined
  loan: LoanVaultTokenAmount
  className?: string
  testId?: string
}

export function MinNextBid (props: MinNextBidProps): JSX.Element {
  const minStartingBid = new BigNumber(props.loan.amount).multipliedBy(1.05)
  let minStartingBidValue: BigNumber | undefined

  if (props.loan.activePrice?.active != null) {
    minStartingBidValue = new BigNumber(props.loan.activePrice.active.amount).multipliedBy(minStartingBid)
  }

  if (props.loan.displaySymbol === 'DUSD') {
    minStartingBidValue = new BigNumber(props.loan.amount)
  }

  if (props.highestBid?.amount === undefined) {
    return (
      <>
        <ReactNumberFormat
          value={minStartingBid.toFixed(8)}
          thousandSeparator
          decimalScale={8}
          suffix={` ${props.displaySymbol}`}
          displayType='text'
        />
        <div className='text-sm text-gray-500 text-right'>
          {
            minStartingBidValue === undefined ? (
              'N/A'
            ) : (
              <ReactNumberFormat
                value={minStartingBidValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
                thousandSeparator
                decimalScale={8}
                prefix='$'
                suffix=' USD'
                displayType='text'
              />
            )
          }
        </div>
      </>
    )
  }

  const minNextBid = new BigNumber(props.highestBid.amount.amount).multipliedBy(1.01)
  let minNextBidValue: BigNumber | undefined

  console.log(props.highestBid.amount.activePrice)

  if (props.highestBid.amount.activePrice?.active?.amount != null) {
    minNextBidValue = new BigNumber(props.highestBid.amount.activePrice.active.amount).multipliedBy(minNextBid)
  }

  if (props.highestBid.amount.displaySymbol === 'DUSD') {
    minNextBidValue = new BigNumber(props.highestBid.amount.amount)
  }

  return (
    <>
      <ReactNumberFormat
        value={minNextBid.toFixed(8)}
        thousandSeparator
        decimalScale={8}
        suffix={` ${props.displaySymbol}`}
        displayType='text'
      />
      <div className='text-sm text-gray-500 text-right'>
        {
          minNextBidValue === undefined ? (
            'N/A'
          ) : (
            <ReactNumberFormat
              value={minNextBidValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
              thousandSeparator
              decimalScale={8}
              prefix='$'
              suffix=' USD'
              displayType='text'
            />
          )
        }
      </div>
    </>
  )
}
