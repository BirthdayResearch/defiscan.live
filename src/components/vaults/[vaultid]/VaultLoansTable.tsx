import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import ReactNumberFormat from 'react-number-format'
import { AddressLink } from '@components/commons/AddressLink'
import { VaultDetailsCollapsibleSection } from '@components/vaults/[vaultid]/VaultDetailsCollapsibleSection'
import { OverflowTable } from '@components/commons/OverflowTable'
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { Transition } from '@headlessui/react'

export function VaultLoansTable ({ loans }: { loans: LoanVaultTokenAmount[] }): JSX.Element {
  return (
    <>
      <VaultLoanDetailsMobile loans={loans} />
      <VaultLoansDesktop loans={loans} />
    </>
  )
}

function VaultLoansDesktop ({ loans }: { loans: LoanVaultTokenAmount[] }): JSX.Element {
  return (
    <div className='hidden md:block mt-8' data-testid='VaultLoansDesktop'>
      <h2 className='text-xl font-semibold' data-testid='VaultLoansDesktop.Heading'>Loan Details</h2>
      <OverflowTable className='mt-4'>
        <OverflowTable.Header>
          <OverflowTable.Head title='Loan Taken' />
          <OverflowTable.Head title='Loan ID' />
          <OverflowTable.Head title='Loan Amount' testId='VaultLoansDesktop.LoanAmount' alignRight />
          <OverflowTable.Head
            title='Total Loan Interest (APR)'
            testId='VaultLoansDesktop.TotalLoanInterest'
            alignRight
          />
        </OverflowTable.Header>
        {loans.map((loan) => (
          <VaultLoansTableRow loan={loan} key={loan.id} />
        ))}
      </OverflowTable>
    </div>
  )
}

function VaultLoansTableRow ({ loan }: { loan: LoanVaultTokenAmount }): JSX.Element {
  const LoanSymbol = getAssetIcon(loan.displaySymbol)
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <div className='flex items-center space-x-1'>
          <LoanSymbol className='h-6 w-6' />
          <span>{loan.name}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <AddressLink address={loan.id} />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <ReactNumberFormat
          displayType='text'
          value={loan.amount}
          prefix='$'
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        N/A
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function VaultLoanDetailsCard ({ loan }: { loan: LoanVaultTokenAmount }): JSX.Element {
  const LoanSymbol = getAssetIcon(loan.displaySymbol)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className='p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
      data-testid='VaultLoanDetailsCard'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6' />
          <span className='ml-1.5 font-medium text-gray-900'>{loan.name}</span>
        </div>
        <div
          className='flex items-center text-primary-500 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>
      <div className='flex items-center justify-between mt-10'>
        <span className='text-gray-500 text-sm'>Loan Amount</span>
        <ReactNumberFormat
          displayType='text'
          value={loan.amount}
          thousandSeparator
        />
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
        <div className='w-full mt-2 flex flex-col gap-y-1'>
          <div className='w-full flex justify-between'>
            <span className='text-gray-500 text-sm'>Loan ID</span>
            <span className='text-gray-900'>{`${loan.id}`}</span>
          </div>
        </div>
      </Transition>
    </div>
  )
}

function VaultLoanDetailsMobile ({ loans }: { loans: LoanVaultTokenAmount[] }): JSX.Element {
  return (
    <VaultDetailsCollapsibleSection heading='Loan Details' className='mt-8 block md:hidden'>
      <div className='flex flex-col items-center'>
        {loans.map((loan) => (
          <VaultLoanDetailsCard loan={loan} key={loan.id} />
        ))}
      </div>
    </VaultDetailsCollapsibleSection>
  )
}
