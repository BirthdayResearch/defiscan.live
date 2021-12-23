import React from 'react'
import { LoanVaultLiquidationBatch, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import BigNumber from 'bignumber.js'
import { getAssetIcon } from '@components/icons/assets/tokens'
import ReactNumberFormat from 'react-number-format'
import { VaultLink } from '@components/commons/link/VaultLink'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { BidAmountValue } from '../../../../auctions/_components/commons/BidAmountValue'
import { AuctionTimeLeft } from '../../../../auctions/_components/commons/AuctionTimeLeft'

interface AuctionDetailsProps {
  vaultId: string
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
  liquidationHeight: number
}

export function DesktopAuctionDetails (props: AuctionDetailsProps): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol)

  return (
    <div className='mt-8 hidden md:block'>
      <div className='flex border border-gray-200 rounded-lg p-6'>
        <div className='flex items-center self-start mr-10'>
          <LoanSymbol className='h-8 w-8' data-testid='DesktopAuctionDetails.LoanSymbol' />
          <span
            className='ml-1.5 font-medium text-gray-900'
            data-testid='DesktopAuctionDetails.displaySymbol'
          >{props.liquidationBatch.loan.displaySymbol}
          </span>
        </div>
        <div className='flex flex-wrap'>
          <div className='w-full flex flex-wrap -m-4 items-start'>
            <div className='flex flex-wrap w-1/2 lg:w-1/4 p-4'>
              <div
                className='w-full text-sm text-gray-500 mb-0.5'
                data-testid='DesktopAuctionDetails.BatchNumber'
              >{`BATCH #${Number(props.batchIndex) + 1}`}
              </div>
              <AuctionTimeLeft
                liquidationHeight={props.liquidationHeight} className='text-sm text-gray-500'
                showApproximateSymbol
                testId='DesktopAuctionDetails.AuctionTimeLeft'
              />
            </div>
            <div className='w-1/2 lg:w-1/4 flex flex-wrap p-4' data-testid='DesktopAuctionDetails.MinNextBid'>
              <div
                className='w-full text-gray-500 text-sm mb-0.5'
                data-testid='DesktopAuctionDetails.MinNextBid.Label'
              >Min. Next Bid
              </div>
              <BidAmountValue
                displaySymbol={props.liquidationBatch.loan.displaySymbol}
                loan={props.liquidationBatch.loan}
                highestBid={props.liquidationBatch.highestBid}
                valueSuffix
                valueClassName='text-left text-sm'
              />
            </div>
            <div className='w-1/2 lg:w-1/4 p-4 flex flex-wrap' data-testid='DesktopAuctionDetails.MinStartingBid'>
              <div
                className='w-full text-gray-500 text-sm mb-0.5'
                data-testid='DesktopAuctionDetails.MinStartingBid.Label'
              >Min. Starting Bid
              </div>
              <BidAmountValue
                isStartingBid
                displaySymbol={props.liquidationBatch.loan.displaySymbol}
                loan={props.liquidationBatch.loan}
                valueSuffix
                valueClassName='text-left text-sm'
              />
            </div>
            <div className='w-1/2 lg:w-1/4 p-4 flex flex-wrap' data-testid='DesktopAuctionDetails.VaultID'>
              <div className='w-full text-sm text-gray-500 mb-0.5' data-testid='DesktopAuctionDetails.VaultID.Label'>
                Vault ID
              </div>
              <VaultLink
                vault={props.vaultId} className='overflow-hidden overflow-ellipsis'
                testId='DesktopAuctionDetails.VaultID.Value'
              >
                {props.vaultId}
              </VaultLink>
            </div>
          </div>
          <div
            className='w-full flex flex-wrap border-t mt-4'
            data-testid='DesktopAuctionDetails.CollateralsForAuctions'
          >
            <div
              className='text-sm text-gray-500 mt-4'
              data-testid='DesktopAuctionDetails.CollateralsForAuctions.Label'
            >
              Collaterals For Auction
            </div>
            <div className='w-full flex flex-wrap mt-1 -my-2'>
              {
                props.liquidationBatch.collaterals.map(collateral => (
                  <DesktopCollateralListItem collateral={collateral} key={collateral.id} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MobileAuctionDetails (props: AuctionDetailsProps): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol)

  return (
    <div className='mt-8 md:hidden'>
      <div
        className='p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
        data-testid='VaultLoanDetailsCard'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <LoanSymbol className='h-6 w-6' data-testid='MobileAuctionDetails.LoanSymbol' />
            <span
              className='ml-1.5 font-medium text-gray-900'
              data-testid='MobileAuctionDetails.displaySymbol'
            >{props.liquidationBatch.loan.displaySymbol}
            </span>
          </div>
        </div>

        <div className='items-center mt-2'>
          <div
            className='font-medium text-gray-500 text-xs'
            data-testid='MobileAuctionDetails.BatchNumber'
          >{`BATCH #${Number(props.batchIndex) + 1}`}
          </div>
          <AuctionTimeLeft
            liquidationHeight={props.liquidationHeight} className='text-sm text-gray-500'
            showApproximateSymbol
            testId='MobileAuctionDetails.AuctionTimeLeft'
          />
        </div>

        <div className='flex justify-between mt-4' data-testid='MobileAuctionDetails.MinNextBid'>
          <span
            className='text-gray-500 text-sm'
            data-testid='MobileAuctionDetails.MinNextBid.Label'
          >Min. Next Bid
          </span>
          <BidAmountValue
            displaySymbol={props.liquidationBatch.loan.displaySymbol}
            loan={props.liquidationBatch.loan}
            highestBid={props.liquidationBatch.highestBid}
            valueClassName='text-right text-sm'
            valueSuffix
          />
        </div>

        <div className='flex justify-between mt-4' data-testid='MobileAuctionDetails.MinStartingBid'>
          <span className='text-gray-500 text-sm' data-testid='MobileAuctionDetails.MinStartingBid.Label'>Min. Starting Bid</span>
          <BidAmountValue
            isStartingBid
            displaySymbol={props.liquidationBatch.loan.displaySymbol}
            loan={props.liquidationBatch.loan}
            valueClassName='text-right text-sm'
            valueSuffix
          />
        </div>

        <div className='flex justify-between mt-4' data-testid='MobileAuctionDetails.VaultID'>
          <span className='text-gray-500 text-sm' data-testid='MobileAuctionDetails.VaultID.Label'>Vault ID</span>
          <VaultLink vault={props.vaultId} testId='MobileAuctionDetails.VaultID.Value'>
            <TextTruncate text={props.vaultId} />
          </VaultLink>
        </div>

        <div
          className='w-full mt-4 pt-4 flex flex-col border-t-2 border-gray-100'
          data-testid='MobileAuctionDetails.CollateralsForAuctions'
        >
          <div className='flex items-center mb-2'>
            <span className='text-sm text-gray-500' data-testid='MobileAuctionDetails.CollateralsForAuctions.Label'>Collaterals For Auction</span>
          </div>
          {
            props.liquidationBatch.collaterals.map(collateral => (
              <MobileCollateralListItem collateral={collateral} key={collateral.id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

function DesktopCollateralListItem (props: { collateral: LoanVaultTokenAmount }): JSX.Element {
  const CollateralSymbol = getAssetIcon(props.collateral.symbol)
  let collateralValue: BigNumber | undefined

  if (props.collateral.activePrice?.active != null) {
    const price = new BigNumber(props.collateral.activePrice.active.amount)
    collateralValue = price.multipliedBy(props.collateral.amount)
  }

  return (
    <div className='w-1/2 lg:w-1/4 flex py-2 items-middle' data-testid='DesktopCollateralListItem'>
      <div className='flex'>
        <CollateralSymbol className='h-6 w-6' data-testid='DesktopCollateralListItem.CollateralSymbol' />
      </div>
      <div className='ml-1.5'>
        <div>
          <ReactNumberFormat
            value={props.collateral.amount}
            displayType='text'
            suffix={` ${props.collateral.displaySymbol}`}
            decimalScale={8}
            fixedDecimalScale
            thousandSeparator
            data-testid='DesktopCollateralListItem.Amount'
          />
        </div>
        <div className='text-sm text-gray-500'>
          {
            (collateralValue != null) && (
              <ReactNumberFormat
                value={collateralValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
                displayType='text'
                decimalScale={2}
                prefix='$'
                suffix=' USD'
                fixedDecimalScale
                thousandSeparator
                data-testid='DesktopCollateralListItem.Value'
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

function MobileCollateralListItem (props: { collateral: LoanVaultTokenAmount }): JSX.Element {
  const CollateralSymbol = getAssetIcon(props.collateral.symbol)
  let collateralValue: BigNumber | undefined

  if (props.collateral.activePrice?.active != null) {
    const price = new BigNumber(props.collateral.activePrice.active.amount)
    collateralValue = price.multipliedBy(props.collateral.amount)
  }

  return (
    <div className='flex justify-between mt-4' data-testid='MobileCollateralListItem'>
      <div className='flex'>
        <CollateralSymbol className='h-6 w-6 mr-1.5' data-testid='MobileCollateralListItem.CollateralSymbol' />
        <span
          className='font-medium text-gray-900'
          data-testid='MobileCollateralListItem.displaySymbol'
        >{props.collateral.displaySymbol}
        </span>
      </div>
      <div className='text-right text-gray-900'>
        <ReactNumberFormat
          value={props.collateral.amount}
          displayType='text'
          decimalScale={8}
          fixedDecimalScale
          thousandSeparator
          data-testid='MobileCollateralListItem.Amount'
        />
        <div className='text-sm text-gray-500'>
          {
            (collateralValue != null) && (
              <ReactNumberFormat
                value={collateralValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
                displayType='text'
                decimalScale={2}
                prefix='$'
                suffix=' USD'
                fixedDecimalScale
                thousandSeparator
                data-testid='MobileCollateralListItem.Value'
              />
            )
          }
        </div>
      </div>
    </div>
  )
}
