import { LoanVaultLiquidationBatch, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import BigNumber from 'bignumber.js'
import { VaultCollapsibleSection } from '@components/vaults/common/VaultCollapsibleSection'
import { Transition } from '@headlessui/react'
import ReactNumberFormat from 'react-number-format'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'

export function VaultAuctions (props: { batches: LoanVaultLiquidationBatch[] }): JSX.Element {
  return (
    <>
      <div className='hidden md:block mt-10' data-testid='VaultLoansDesktop'>
        <h2 className='text-xl font-semibold' data-testid='VaultLoansDesktop.Heading'>In Auction</h2>
        <div
          className='mt-4 mb-8 items-start grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
        >
          {props.batches.map((batch) => (
            <VaultAuctionsDetailsCard
              batch={batch}
              key={batch.index}
            />
          ))}
        </div>
      </div>

      <VaultCollapsibleSection heading='In Auction' className='block md:hidden'>
        <div className='flex flex-col items-center space-y-2'>
          {props.batches.map((batch) => (
            <VaultAuctionsDetailsCard
              batch={batch}
              key={batch.index}
            />
          ))}
        </div>
      </VaultCollapsibleSection>
    </>
  )
}

function VaultAuctionsDetailsCard (props: { batch: LoanVaultLiquidationBatch }): JSX.Element {
  const LoanSymbol = getAssetIcon(props.batch.loan.symbol)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const minStartingBid = new BigNumber(props.batch.loan.amount).multipliedBy(1.05)
  let minStartingBidValue: BigNumber | undefined

  if (props.batch.loan.activePrice?.active != null) {
    minStartingBidValue = new BigNumber(props.batch.loan.activePrice.active.amount).multipliedBy(minStartingBid)
  }

  return (
    <div
      className='p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
      data-testid='VaultLoanDetailsCard'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6' />
          <span className='ml-1.5 font-medium text-gray-900'>{props.batch.loan.displaySymbol}</span>
        </div>
        <div className='flex items-center text-primary-500 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <span className='font-medium text-gray-500 text-xs'>{`BATCH ${props.batch.index + 1}`}</span>
      </div>

      <div className='flex justify-between mt-6'>
        <span className='text-gray-500 text-sm'>Current Highest Bid</span>
        <div>
          {
            props.batch.highestBid === undefined ? (
              <>N/A</>
            )
              : (
                <>
                  <span>{new BigNumber(props.batch.highestBid.amount.amount).toFixed(8)}</span>
                  <span className='ml-1'>{props.batch.loan.displaySymbol}</span>
                </>
                )
          }
        </div>
      </div>

      <div className='flex justify-between mt-6'>
        <span className='text-gray-500 text-sm'>Min. Starting Bid</span>
        <div>
          <div>
            <span>{minStartingBid.toFixed(8)}</span>
            <span className='ml-1'>{props.batch.loan.displaySymbol}</span>
          </div>
          <div className='text-sm text-gray-500 text-right'>
            {
              (minStartingBidValue != null) && (
                <ReactNumberFormat
                  value={minStartingBidValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
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

      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full'
        show={isOpen}
      >
        <div className='w-full mt-4 pt-4 flex flex-col border-t-2 border-gray-100'>
          <div className='flex items-center mb-2'>
            <span className='text-sm text-gray-500'>Collaterals</span>
            <InfoHoverPopover className='ml-1' description='Collateral token(s) for auction.' />
          </div>
          {
            props.batch.collaterals.map(collateral => (
              <CollateralListItem collateral={collateral} key={collateral.id} />
            ))
          }
        </div>
      </Transition>
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
    <div className='flex justify-between'>
      <div className='flex'>
        <CollateralSymbol className='h-6 w-6' />
        <span className='ml-1.5 font-medium text-gray-900'>{props.collateral.displaySymbol}</span>
      </div>
      <div>
        <div>
          <ReactNumberFormat
            value={props.collateral.amount}
            displayType='text'
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
