import { OverflowTable } from '@components/commons/OverflowTable'
import { Link } from '@components/commons/link/Link'
import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import { VaultTokenSymbols } from './VaultTokenSymbols'
import { calculateCollateralsValue } from '../../utils/CalculateCollateralsValue'
import { LoanVaultLiquidated, LoanVaultLiquidationBatch } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets/tokens'
import { VaultDetailsListItem } from './VaultDetailsListItem'
import React from 'react'
import { AuctionTimeLeft } from '../../../auctions/_components/commons/AuctionTimeLeft'
import { BidAmountValue } from '../../../auctions/_components/commons/BidAmountValue'

interface VaultAuctionDetailsProps {
  batch: LoanVaultLiquidationBatch
  vault: LoanVaultLiquidated
}

export function AuctionsTableRow (props: VaultAuctionDetailsProps): JSX.Element {
  const TokenSymbol = getAssetIcon(props.batch.loan.symbol)

  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <AuctionTimeLeft liquidationHeight={props.vault.liquidationHeight} />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <div className='flex'>
          <TokenSymbol className='w-6 h-6 mr-1.5' />
          <span>{props.batch.loan.displaySymbol}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <VaultTokenSymbols className='justify-end' tokens={props.batch.collaterals} />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='text-right'>
          <ReactNumberFormat
            value={calculateCollateralsValue(props.batch.collaterals).value.toFixed(2, BigNumber.ROUND_HALF_UP)}
            thousandSeparator
            decimalScale={2}
            prefix='$'
            displayType='text'
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <BidAmountValue
          displaySymbol={props.batch.loan.displaySymbol}
          loan={props.batch.loan}
          highestBid={props.batch.highestBid}
        />
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

export function MobileAuctionDetailsCard (props: VaultAuctionDetailsProps): JSX.Element {
  const TokenSymbol = getAssetIcon(props.batch.loan.symbol)

  return (
    <div
      className='w-full flex flex-col rounded border border-gray-200 p-4 text-gray-500'
      data-testid='MobileAuctionDetailCard'
    >
      <div className='w-full flex justify-between'>
        <div className='flex items-center font-medium text-gray-900' data-testid='MobileAuctionDetailCard.Token'>
          <TokenSymbol className='w-6 h-6 mr-1.5' />
          <span>{props.batch.loan.displaySymbol}</span>
        </div>
        <div
          className='cursor-pointer text-primary-500'
          data-testid='MobileAuctionDetailCard.View'
        >
          <Link href={{ pathname: `/vaults/${props.vault.vaultId}/auctions/${props.batch.index}` }}>
            <a className='contents'>
              VIEW
            </a>
          </Link>
        </div>
      </div>
      <div className='text-sm mt-1 mb-4' data-testid='MobileAuctionDetailCard.TimeLeft'>
        <AuctionTimeLeft
          liquidationHeight={props.vault.liquidationHeight} className='text-sm text-gray-500'
          showApproximateSymbol
        />
      </div>

      <VaultDetailsListItem
        title='Min. Next Bid'
        titleClassNames='text-sm'
        testId='MobileAuctionDetailCard.MinNextBid'
      >
        <BidAmountValue
          displaySymbol={props.batch.loan.displaySymbol}
          loan={props.batch.loan}
          highestBid={props.batch.highestBid}
          valueClassName='text-right text-sm'
          valueSuffix
        />
      </VaultDetailsListItem>

      <div className='w-full mt-2 space-y-2'>
        <VaultDetailsListItem
          title='Collateral For Auction'
          titleClassNames='text-sm'
          testId='AuctionsMobileCard.CollateralsForAuction'
        >
          <VaultTokenSymbols className='justify-end' tokens={props.batch.collaterals} />
        </VaultDetailsListItem>
        <VaultDetailsListItem
          title='Collateral Value (USD)'
          titleClassNames='text-sm'
          testId='AuctionsMobileCard.CollateralValue'
        >
          <ReactNumberFormat
            value={calculateCollateralsValue(props.batch.collaterals).value.toFixed(2, BigNumber.ROUND_HALF_UP)}
            thousandSeparator
            decimalScale={2}
            prefix='$'
            displayType='text'
          />
        </VaultDetailsListItem>
      </div>
    </div>
  )
}
