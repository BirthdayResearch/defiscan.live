import { LoanVaultLiquidationBatch, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { Transition } from '@headlessui/react'
import BigNumber from 'bignumber.js'
import { VaultCollapsibleSection } from '@components/vaults/[vaultid]/VaultCollapsibleSection'

export function VaultAuctionsTable ({ batches }: { batches: LoanVaultLiquidationBatch[] }): JSX.Element {
  return (
    <>
      <VaultAuctionsDesktop batches={batches} />
      <VaultLoanDetailsMobile batches={batches} />
    </>
  )
}

function VaultAuctionsDesktop ({ batches }: { batches: LoanVaultLiquidationBatch[] }): JSX.Element {
  return (
    <div className='hidden md:block mt-8 ' data-testid='VaultLoansDesktop'>
      <h2 className='text-xl font-semibold' data-testid='VaultLoansDesktop.Heading'>In Auction</h2>
      <div className='mt-4 mb-8 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {batches.map((batch) => (
          batch.collaterals.map((collateral) => (
            <VaultAuctionsDetailsCard batchIndex={batch.index} collateral={collateral} key={batch.index} />
          ))
        ))}
      </div>
    </div>
  )
}

function VaultLoanDetailsMobile ({ batches }: { batches: LoanVaultLiquidationBatch[] }): JSX.Element {
  return (
    <VaultCollapsibleSection heading='In Auction' className='block md:hidden'>
      <div className='flex flex-col items-center gap-y-2'>
        {batches.map((batch) => (
          batch.collaterals.map((collateral) => (
            <VaultAuctionsDetailsCard batchIndex={batch.index} collateral={collateral} key={batch.index} />
          ))
        ))}
      </div>
    </VaultCollapsibleSection>
  )
}

function VaultAuctionsDetailsCard (props: { batchIndex: number, collateral: LoanVaultTokenAmount }): JSX.Element {
  const LoanSymbol = getAssetIcon(props.collateral.symbol)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className='p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
      data-testid='VaultLoanDetailsCard'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6' />
          <span className='ml-1.5 font-medium text-gray-900'>{props.collateral.name}</span>
        </div>
        <div className='hidden flex items-center text-primary-500 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <span className='font-medium text-gray-500 text-xs'>{`BATCH ${props.batchIndex}`}</span>
      </div>

      <div className='flex items-center justify-between mt-10'>
        <span className='text-gray-500 text-sm'>Amount</span>
        {new BigNumber(props.collateral.amount).toFixed(8)}
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
        {/* <div className='w-full mt-2 flex flex-col gap-y-1'> */}
        {/*  <div className='w-full flex justify-between'> */}
        {/*    <span className='text-gray-500 text-sm'>Loan ID</span> */}
        {/*    <span className='text-gray-900'>{`${loan.id}`}</span> */}
        {/*  </div> */}
        {/* </div> */}
      </Transition>
    </div>
  )
}
