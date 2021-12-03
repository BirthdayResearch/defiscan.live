import React from 'react'
import { LoanVaultLiquidationBatch, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import BigNumber from 'bignumber.js'
import { getAssetIcon } from '@components/icons/assets'
import ReactNumberFormat from 'react-number-format'
import { VaultLink } from '@components/commons/link/VaultLink'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'

interface AuctionDetailsProps {
  vaultId: string
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
  timeRemaining: string | undefined
  minStartingBid: {
    amount: BigNumber
    value: BigNumber | undefined
  }
}

export function DesktopAuctionDetails (props: AuctionDetailsProps): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol)

  return (
    <div className='mt-8 hidden md:block'>
      <div className='flex border border-gray-200 rounded-lg p-6'>
        <div className='flex items-center self-start mr-10'>
          <LoanSymbol className='h-8 w-8' />
          <span className='ml-1.5 font-medium text-gray-900'>{props.liquidationBatch.loan.displaySymbol}</span>
        </div>
        <div className='flex flex-wrap'>
          <div className='w-full flex flex-wrap -m-4'>
            <div className='flex flex-wrap w-1/2 lg:w-1/4 p-4'>
              <div className='w-full text-sm text-gray-500'>{`BATCH #${Number(props.batchIndex) + 1}`}</div>
              <div className='text-sm text-gray-500'>{props.timeRemaining ?? '0 hr 0 mins'} left</div>
            </div>
            <div className='w-1/2 lg:w-1/4 flex flex-wrap p-4'>
              <div className='w-full text-gray-500 text-sm'>Current Highest Bid</div>
              <div>
                {
                  props.liquidationBatch.highestBid === undefined ? (
                    <span>N/A</span>
                  )
                    : (
                      <>
                        <span>{new BigNumber(props.liquidationBatch.highestBid.amount.amount).toFixed(8)}</span>
                        <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
                      </>
                      )
                }
              </div>
            </div>
            <div className='w-1/2 lg:w-1/4 p-4 flex flex-wrap'>
              <div className='w-full text-gray-500 text-sm'>Min. Starting Bid</div>
              <div>
                <div>
                  <span>{props.minStartingBid.amount.toFixed(8)}</span>
                  <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
                </div>
                <div className='text-sm text-gray-500 text-right'>
                  {
                    (props.minStartingBid.value != null) && (
                      <ReactNumberFormat
                        value={props.minStartingBid.value.toFixed(2, BigNumber.ROUND_HALF_UP)}
                        displayType='text'
                        decimalScale={2}
                        prefix='$'
                        suffix=' USD'
                        fixedDecimalScale
                        thousandSeparator
                      />
                    )
                  }
                </div>
              </div>
            </div>
            <div className='w-1/2 lg:w-1/4 p-4 flex flex-wrap'>
              <div className='w-full text-sm text-gray-500'>
                Vault ID
              </div>
              <VaultLink vault={props.vaultId} className='overflow-hidden overflow-ellipsis'>
                {props.vaultId}
              </VaultLink>
            </div>
          </div>
          <div className='w-full flex flex-wrap border-t mt-4'>
            <div className='text-sm text-gray-500 mt-4'>
              Collaterals for Auction
            </div>
            <div className='w-full flex flex-wrap mt-1 -my-2'>
              {
                props.liquidationBatch.collaterals.map(collateral => (
                  <CollateralListItem collateral={collateral} key={collateral.id} />
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
            <LoanSymbol className='h-6 w-6' />
            <span className='ml-1.5 font-medium text-gray-900'>{props.liquidationBatch.loan.displaySymbol}</span>
          </div>
        </div>

        <div className='items-center mt-2'>
          <div className='font-medium text-gray-500 text-xs'>{`BATCH #${Number(props.batchIndex) + 1}`}</div>
          <div className='text-sm text-gray-500'>{props.timeRemaining ?? '0 hr 0 mins'} left</div>
        </div>

        <div className='flex justify-between mt-6'>
          <span className='text-gray-500 text-sm'>Current Highest Bid</span>
          <div>
            {
              props.liquidationBatch.highestBid === undefined ? (
                <span>N/A</span>
              )
                : (
                  <>
                    <span>{new BigNumber(props.liquidationBatch.highestBid.amount.amount).toFixed(8)}</span>
                    <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
                  </>
                  )
            }
          </div>
        </div>

        <div className='flex justify-between mt-6'>
          <span className='text-gray-500 text-sm'>Min. Starting Bid</span>
          <div>
            <div>
              <span>{props.minStartingBid.amount.toFixed(8)}</span>
              <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
            </div>
            <div className='text-sm text-gray-500 text-right'>
              {
                (props.minStartingBid.value != null) && (
                  <ReactNumberFormat
                    value={props.minStartingBid.value.toFixed(2, BigNumber.ROUND_HALF_UP)}
                    displayType='text'
                    decimalScale={2}
                    prefix='$'
                    suffix=' USD'
                    fixedDecimalScale
                    thousandSeparator
                  />
                )
              }
            </div>
          </div>
        </div>

        <div className='flex justify-between mt-6'>
          <span className='text-gray-500 text-sm'>Vault ID</span>
          <VaultLink vault={props.vaultId}>
            <TextTruncate text={props.vaultId} />
          </VaultLink>
        </div>

        <div className='w-full mt-4 pt-4 flex flex-col border-t-2 border-gray-100'>
          <div className='flex items-center mb-2'>
            <span className='text-sm text-gray-500'>Collaterals for Auction</span>
            <InfoHoverPopover className='ml-1' description='The winning bidder will receive the tokens listed here.' />
          </div>
          {
            props.liquidationBatch.collaterals.map(collateral => (
              <CollateralListItem collateral={collateral} key={collateral.id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

function CollateralListItem (props: { collateral: LoanVaultTokenAmount }): JSX.Element {
  const CollateralSymbol = getAssetIcon(props.collateral.symbol)
  let collateralValue: BigNumber | undefined

  if (props.collateral.activePrice?.active != null) {
    const price = new BigNumber(props.collateral.activePrice.active.amount)
    collateralValue = price.multipliedBy(props.collateral.amount)
  }

  return (
    <div className='w-1/2 lg:w-1/4 flex py-2 items-middle'>
      <div className='flex'>
        <CollateralSymbol className='h-6 w-6' />
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
          />
        </div>
        <div className='text-sm text-gray-500 text-right'>
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
              />
            )
          }
        </div>
      </div>
    </div>
  )
}
