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
        <div className='mt-4 mb-8 items-start grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {props.batches.map((batch) => (
            <VaultAuctionsDetailsCard
              batchIndex={batch.index} loan={batch.loan} collaterals={batch.collaterals}
              key={batch.index}
            />
          ))}
        </div>
      </div>

      <VaultCollapsibleSection heading='In Auction' className='block md:hidden'>
        <div className='flex flex-col items-center space-y-2'>
          {props.batches.map((batch) => (
            <VaultAuctionsDetailsCard
              batchIndex={batch.index} loan={batch.loan} collaterals={batch.collaterals}
              key={batch.index}
            />
          ))}
        </div>
      </VaultCollapsibleSection>
    </>
  )
}

function VaultAuctionsDetailsCard (props: { batchIndex: number, loan: LoanVaultTokenAmount, collaterals: LoanVaultTokenAmount[] }): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.symbol)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className='p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
      data-testid='VaultLoanDetailsCard'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6' />
          <span className='ml-1.5 font-medium text-gray-900'>{props.loan.displaySymbol}</span>
        </div>
        <div className='flex items-center text-primary-500 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <span className='font-medium text-gray-500 text-xs'>{`BATCH ${props.batchIndex + 1}`}</span>
      </div>

      <div className='flex items-center justify-between mt-6'>
        <span className='text-gray-500 text-sm'>Amount</span>
        <div>
          <span>{new BigNumber(props.loan.amount).toFixed(8)}</span>
          <span className='ml-1'>{props.loan.displaySymbol}</span>
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
            props.collaterals.map(collateral => (
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

  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <CollateralSymbol className='h-6 w-6' />
        <span className='ml-1.5 font-medium text-gray-900'>{props.collateral.displaySymbol}</span>
      </div>
      <div>
        <ReactNumberFormat
          value={props.collateral.amount}
          displayType='text'
          decimalScale={8}
          fixedDecimalScale
          thousandSeparator
        />
      </div>
    </div>
  )
}
