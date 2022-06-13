import { OverflowTable } from '@components/commons/OverflowTable'
import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import { VaultTokenSymbols } from './VaultTokenSymbols'
import { LoanVaultLiquidated, LoanVaultLiquidationBatch } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets/tokens'
import React from 'react'
import { AuctionTimeLeft } from '../../../auctions/_components/commons/AuctionTimeLeft'
import { BidAmountValue } from '../../../auctions/_components/commons/BidAmountValue'
import { useCalculateAuctionsValue } from '../../hooks/CalculateAuctionsValue'
import { CardList } from '@components/commons/CardList'

interface VaultAuctionDetailsProps {
  batch: LoanVaultLiquidationBatch
  vault: LoanVaultLiquidated
}

export function AuctionsTableRow (props: VaultAuctionDetailsProps): JSX.Element {
  const TokenSymbol = getAssetIcon(props.batch.loan.symbol)

  return (
    <OverflowTable.Row className='dark:text-gray-100'>
      <OverflowTable.Cell>
        <AuctionTimeLeft liquidationHeight={props.vault.liquidationHeight} testId='AuctionsTableRow.AuctionTimeLeft' />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <div className='flex'>
          <TokenSymbol className='w-6 h-6 mr-1.5' data-testid='AuctionsTableRow.LoanToken.TokenSymbol' />
          <span data-testid='AuctionsTableRow.LoanToken.displaySymbol'>{props.batch.loan.displaySymbol}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <VaultTokenSymbols
          className='justify-end' tokens={props.batch.collaterals}
          testId='AuctionsTableRow.CollateralSymbols'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='text-right'>
          <ReactNumberFormat
            value={useCalculateAuctionsValue(props.batch.collaterals).value.toFixed(2, BigNumber.ROUND_HALF_UP)}
            thousandSeparator
            decimalScale={2}
            prefix='$'
            displayType='text'
            data-testid='AuctionsTableRow.CollateralValue'
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <BidAmountValue
          batch={props.batch}
          testId='AuctionsTableRow.MinNextBid'
        />
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

export function MobileAuctionDetailsCard (props: VaultAuctionDetailsProps): JSX.Element {
  const TokenSymbol = getAssetIcon(props.batch.loan.symbol)

  return (
    <CardList.Card testId='MobileAuctionDetailCard'>
      <CardList.Header path={`/vaults/${props.vault.vaultId}/auctions/${props.batch.index}`}>
        <div className='flex items-center font-medium text-gray-900 dark:text-gray-100'>
          <TokenSymbol className='w-6 h-6 mr-1.5' data-testid='MobileAuctionDetailCard.TokenSymbol' />
          <span data-testid='MobileAuctionDetailCard.displaySymbol'>{props.batch.loan.displaySymbol}</span>
        </div>
      </CardList.Header>

      <div className='text-sm mt-1' data-testid='MobileAuctionDetailCard.AuctionTimeLeft'>
        <AuctionTimeLeft
          liquidationHeight={props.vault.liquidationHeight} className='text-sm text-gray-500 dark:text-gray-400'
          showApproximateSymbol
        />
      </div>

      <CardList.List className='mt-4'>
        <CardList.ListItem
          title='Min. Next Bid'
          titleClassNames='text-sm'
          testId='MobileAuctionDetailCard.MinNextBid'
        >
          <BidAmountValue
            batch={props.batch}
            valueClassName='text-right text-sm'
            valueSuffix
          />
        </CardList.ListItem>

        <div className='w-full mt-2 space-y-2'>
          <CardList.ListItem
            title='Collateral For Auction'
            titleClassNames='text-sm'
            testId='MobileAuctionDetailCard.CollateralsForAuction'
          >
            <VaultTokenSymbols
              className='justify-end' tokens={props.batch.collaterals}
              testId='MobileAuctionDetailCard.CollateralSymbols'
            />
          </CardList.ListItem>
          <CardList.ListItem
            title='Collateral Value (USD)'
            titleClassNames='text-sm'
            testId='MobileAuctionDetailCard.CollateralValue'
          >
            <ReactNumberFormat
              value={useCalculateAuctionsValue(props.batch.collaterals).value.toFixed(2, BigNumber.ROUND_HALF_UP)}
              thousandSeparator
              decimalScale={2}
              prefix='$'
              displayType='text'
              data-testid='MobileAuctionDetailCard.CollateralValue.Value'
            />
          </CardList.ListItem>
        </div>
      </CardList.List>
    </CardList.Card>
  )
}
