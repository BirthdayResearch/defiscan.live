import React from 'react'
import { LoanVaultLiquidationBatch, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import BigNumber from 'bignumber.js'
import { getAssetIcon } from '@components/icons/assets/tokens'
import ReactNumberFormat from 'react-number-format'
import { VaultLink } from '@components/commons/link/VaultLink'
import { BidAmountValue } from '../../../../auctions/_components/commons/BidAmountValue'
import { AuctionTimeLeft } from '../../../../auctions/_components/commons/AuctionTimeLeft'
import { useTokenPrice } from '../../../hooks/TokenPrice'
import { AuctionTokenSymbols } from './AuctionTokenSymbols'
import { RewardsCollateralInfo } from './RewardsCollateralInfo'
import { HoverPopover } from '@components/commons/popover/HoverPopover'

interface DesktopAuctionDetailsProps {
  vaultId: string
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
  liquidationHeight: number
}

export function DesktopAuctionDetails (props: DesktopAuctionDetailsProps): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol)

  return (
    <div className='mt-8 hidden md:block'>
      <div className='flex md:flex-col lg:flex-row border border-gray-200 rounded-lg md:px-6 md:py-6'>
        <div className='flex md:w-full lg:flex-col lg:w-1/4 md:justify-between'>
          <div className='flex items-start h-1/3 order-1'>
            <LoanSymbol className='h-8 w-8' data-testid='DesktopAuctionDetails.LoanSymbol' />
            <span
              className='ml-1.5 font-medium text-gray-900 text-xl'
              data-testid='DesktopAuctionDetails.displaySymbol'
            >{props.liquidationBatch.loan.displaySymbol}
            </span>
          </div>

          <div className='flex justify-between md:w-2/5 lg:w-full lg:h-1/3 items-start md:order-3 lg:order-2'>
            <div>
              <span
                className='text-sm text-gray-700'
                data-testid='DesktopAuctionDetails.BatchNumber'
              >{`Batch #${Number(props.batchIndex) + 1}`}
              </span>
            </div>
            <AuctionTimeLeft
              liquidationHeight={props.liquidationHeight} className='text-sm text-gray-700'
              testId='DesktopAuctionDetails.AuctionTimeLeft'
            />
          </div>

          <div className='md:w-2/5 lg:w-full lg:h-1/3 items-start md:order-2 lg:order-3'>
            <div className='md:w-2/3 lg:w-full bg-primary-50 rounded p-1.5 inline-flex' data-testid='DesktopAuctionDetails.VaultID'>
              <div className='text-sm text-gray-700' data-testid='DesktopAuctionDetails.VaultID.Label'>
                Vault ID
              </div>
              <VaultLink
                vault={props.vaultId} className='text-sm overflow-hidden overflow-ellipsis'
                testId='DesktopAuctionDetails.VaultID.Value'
              />
            </div>
          </div>
        </div>
        <VerticalDivider />
        <div className='md:flex md:flex-row md:border-t md:border-gray-200 md:my-4 md:pt-4 lg:border-0 lg:my-0 lg:pt-0'>
          <div className='flex flex-wrap md:w-1/3 lg:w-1/4'>
            <div className='w-full flex flex-wrap items-center'>
              <div className='flex flex-wrap p-2'>
                <div
                  className='text-sm text-gray-700'
                  data-testid='DesktopAuctionDetails.CollateralsForAuctions.Label'
                >
                  Pay in
                </div>
                <div className='w-full flex flex-wrap mt-1 ml-0.5'>
                  <LoanSymbol className='h-6 w-6' data-testid='DesktopAuctionDetails.LoanSymbol' />
                  <span className='font-sm text-gray-700 ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
                </div>
              </div>
            </div>
            <div className='w-full flex flex-wrap items-center'>
              <div className='flex flex-wrap p-2'>
                <div
                  className='text-sm text-gray-700'
                  data-testid='DesktopAuctionDetails.CollateralsForAuctions.Label'
                >
                  Rewards / Collateral
                </div>
                <div className='w-full flex flex-wrap mt-1 ml-0.5'>
                  <AuctionTokenSymbols
                    className='justify-end space-x-1' tokens={props.liquidationBatch.collaterals}
                    testId='AuctionsTableRow.CollateralSymbols'
                  />
                  <HoverPopover className='ml-1' popover={<RewardsCollateralInfo collaterals={props.liquidationBatch.collaterals} />} placement='bottom'>
                    <span className='font-sm text-gray-700 ml-1'>{props.liquidationBatch.collaterals.map(collateral => collateral.displaySymbol).join(', ')}</span>
                  </HoverPopover>
                </div>
              </div>
            </div>
          </div>
          <VerticalDivider />
          <div className='flex flex-wrap md:w-2/3 lg:w-2/4'>
            <div className='w-full p-2 flex justify-between' data-testid='DesktopAuctionDetails.MinStartingBid'>
              <div
                className='w-1/2 text-gray-700 text-sm ml-0.5'
                data-testid='DesktopAuctionDetails.MinStartingBid.Label'
              >Min Bid
              </div>
              <BidAmountValue
                isStartingBid
                batch={props.liquidationBatch}
                valueClassName='text-gray-700 text-right font-medium'
                subValueClassName='text-xs text-right'
              />
            </div>
            <div className='w-full p-2 flex justify-between' data-testid='DesktopAuctionDetails.MinNextBid'>
              <div
                className='w-1/2 text-gray-700 text-sm ml-0.5'
                data-testid='DesktopAuctionDetails.MinNextBid.Label'
              >Min Next Bid
              </div>
              <BidAmountValue
                batch={props.liquidationBatch}
                valueClassName='text-gray-700 text-right font-medium'
                subValueClassName='text-xs text-right'
              />
            </div>

            <div className='w-full p-2 flex justify-between' data-testid='DesktopAuctionDetails.CollateralValue'>
              <div
                className='w-1/2 text-gray-700 text-sm ml-0.5'
                data-testid='DesktopAuctionDetails.MinNextBid.Label'
              >Collateral Value
              </div>
              <HoverPopover className='ml-1' popover={<RewardsCollateralInfo collaterals={props.liquidationBatch.collaterals} />} placement='bottom'>
                <TotalCollateralValue collaterals={props.liquidationBatch.collaterals} />
              </HoverPopover>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TotalCollateralValue (props: { collaterals: LoanVaultTokenAmount[] }): JSX.Element {
  const { getTokenPrice } = useTokenPrice()

  let totalCollateralValue: BigNumber = new BigNumber(0)
  props.collaterals.forEach(collateral => {
    totalCollateralValue = totalCollateralValue.plus(getTokenPrice(collateral.symbol, collateral.amount))
  })
  return (
    <div className='text-gray-700 text-right font-medium'>
      <ReactNumberFormat
        value={totalCollateralValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
        displayType='text'
        decimalScale={2}
        prefix='$'
        fixedDecimalScale
        thousandSeparator
        data-testid='TotalCollateralValue.Value'
      />
    </div>
  )
}

function VerticalDivider (): JSX.Element {
  return (
    <div className='border-r border-gray-200 md:mx-5 lg:mx-12' />
  )
}
