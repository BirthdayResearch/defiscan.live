import { LoanVaultState, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import { VaultCollapsibleSection } from '@components/vaults/common/VaultCollapsibleSection'
import { OverflowTable } from '@components/commons/OverflowTable'
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { VaultDetailsListItem } from '@components/vaults/common/VaultDetailsListItem'
import { LoanTotalInterestRate } from '@components/vaults/[vaultid]/LoanTotalInterestRate'
import ReactNumberFormat from 'react-number-format'
import { HoverPopover } from '@components/commons/popover/HoverPopover'

interface VaultIdLoansDetailsProps {
  vault: {
    state: LoanVaultState
    interest: string
  }
  loans: LoanVaultTokenAmount[]
  interests: LoanVaultTokenAmount[]
}

export function VaultIdLoansDetails (props: VaultIdLoansDetailsProps): JSX.Element {
  return (
    <>
      <div className='hidden md:block mt-10' data-testid='VaultLoansDesktop'>
        <h2 className='text-xl font-semibold' data-testid='VaultLoansDesktop.Heading'>Loan Details</h2>

        {props.loans.length === 0
          ? (
            <div className='text-gray-400 flex w-full justify-center p-12'>
              There are no loans taken in the vault at this time
            </div>
            ) : (
              <OverflowTable className='mt-3'>
                <OverflowTable.Header>
                  <OverflowTable.Head title='Loan Token' testId='VaultLoansDesktop.LoanToken' />
                  <OverflowTable.Head
                    title='Total Loan Value (USD)' testId='VaultLoansDesktop.TotalLoanValue'
                    infoDesc='Total Loan Value = Loan Value + Accrued Interest Value'
                    alignRight
                  />
                  <OverflowTable.Head title='Loan Amount' testId='VaultLoansDesktop.LoanAmount' alignRight />
                  <OverflowTable.Head
                    title='Accrued Interest' testId='VaultLoansDesktop.AccruedInterest'
                    infoDesc='Amount of interest that has been incurred.'
                    alignRight
                  />
                  <OverflowTable.Head
                    title='Total Interest Rate (APR)'
                    infoDesc='Total annual interest rate = Vault Interest Rate + Token Interest Rate.'
                    testId='VaultLoansDesktop.TotalInterestRate'
                    alignRight
                  />
                </OverflowTable.Header>
                {props.loans.map((loan) => (
                  <VaultLoansTableRow
                    loan={loan}
                    interest={props.interests.filter(interest => interest.id === loan.id)[0]}
                    vault={props.vault}
                    key={loan.id}
                  />
                ))}
              </OverflowTable>
            )}
      </div>

      <VaultCollapsibleSection
        heading='Loan Details' className='block md:hidden'
        testId='VaultCollapsibleSection.LoanDetails'
      >
        <div className='flex flex-col items-center'>
          {props.loans.length === 0
            ? (
              <div className='text-gray-400 flex w-full justify-center p-12'>
                There are no loans taken in the vault at this time
              </div>
              ) : (
                <div className='w-full' data-testid='LoanDetailsMobile.Cards'>
                  {props.loans.map((loan) => (
                    <VaultLoanDetailsCard
                      loan={loan}
                      interest={props.interests.filter(interest => interest.id === loan.id)[0]}
                      vault={props.vault}
                      key={loan.id}
                    />
                  ))}
                </div>
              )}
        </div>
      </VaultCollapsibleSection>
    </>
  )
}

function calculateUsdValues (loan: LoanVaultTokenAmount, interest: LoanVaultTokenAmount): [BigNumber | undefined, BigNumber | undefined] {
  let totalLoanUsdAmount = ((loan?.activePrice?.active) != null) ? new BigNumber(loan.activePrice.active.amount).multipliedBy(new BigNumber(loan.amount)) : undefined
  let interestUsdAmount = ((loan?.activePrice?.active) != null) ? new BigNumber(loan.activePrice.active.amount).multipliedBy(new BigNumber(interest.amount)) : undefined

  if (loan.id === '15') {
    totalLoanUsdAmount = new BigNumber(loan.amount)
    interestUsdAmount = new BigNumber(interest.amount)
  }

  return [totalLoanUsdAmount, interestUsdAmount]
}

function TotalLoanValueInfoDesc (props: { totalLoanUsdAmount: BigNumber, interestUsdAmount: BigNumber }): JSX.Element {
  return (
    <div
      className='px-4 py-3 font-normal text-sm bg-white text-gray-900 rounded-lg border border-gray-100 shadow-md'
    >
      <div className='text-gray-900 grid grid-rows-3'>
        <div className='flex'>
          <span className='w-48 text-gray-500'>Loan Value (USD)</span>
          <span className='ml-3 text-right'>${props.totalLoanUsdAmount.minus(props.interestUsdAmount).toFixed(8)}</span>
        </div>
        <div className='flex'>
          <span className='w-48 text-gray-500'>Accrued Interest Value (USD)</span>
          <div className='ml-3 text-right'>${props.interestUsdAmount.toFixed(8)}</div>
        </div>
        <div className='flex'>
          <span className='w-48 text-gray-500'>Total Loan Value (USD)</span>
          <span className='ml-3 text-right'>${props.totalLoanUsdAmount.toFixed(8)}</span>
        </div>
      </div>
    </div>
  )
}

function VaultLoansTableRow (props: {
  loan: LoanVaultTokenAmount
  interest: LoanVaultTokenAmount
  vault: {
    state: LoanVaultState
    interest: string
  }
}): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.symbol)
  const [totalLoanUsdAmount, interestUsdAmount] = calculateUsdValues(props.loan, props.interest)

  return (
    <OverflowTable.Row
      className={classNames(props.vault.state === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900')}
    >
      <OverflowTable.Cell>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6 mr-1.5' />
          <span>{props.loan.name}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {totalLoanUsdAmount === undefined || interestUsdAmount === undefined
          ? ('N/A')
          : (
            <HoverPopover
              popover={<TotalLoanValueInfoDesc
                totalLoanUsdAmount={totalLoanUsdAmount}
                interestUsdAmount={interestUsdAmount}
                       />}
              placement='top-end'
            >
              <ReactNumberFormat
                value={totalLoanUsdAmount.toFixed(2, BigNumber.ROUND_HALF_UP)}
                prefix='$'
                displayType='text'
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator
              />
            </HoverPopover>
            )}
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <ReactNumberFormat
          value={new BigNumber(props.loan.amount).minus(props.interest.amount).toFixed(8)}
          displayType='text'
          decimalScale={8}
          fixedDecimalScale
          thousandSeparator
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <ReactNumberFormat
          value={new BigNumber(props.interest.amount).toFixed(8)}
          displayType='text'
          decimalScale={8}
          fixedDecimalScale
          thousandSeparator
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end'>
          <LoanTotalInterestRate vaultInterest={props.vault.interest} loanId={props.interest.id} />
        </div>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function VaultLoanDetailsCard (props: {
  loan: LoanVaultTokenAmount
  interest: LoanVaultTokenAmount
  vault: {
    state: LoanVaultState
    interest: string
  }
}): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.symbol)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [totalLoanUsdAmount, interestUsdAmount] = calculateUsdValues(props.loan, props.interest)

  return (
    <div
      className='mb-2 p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
      data-testid='LoanDetailsCard'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6' data-testid='LoanDetailsCard.AssetIcon' />
          <span
            className='ml-1.5 font-medium text-gray-900'
            data-testid='LoanDetailsCard.displaySymbol'
          >{props.loan.displaySymbol}
          </span>
        </div>
        <div
          className='flex items-center text-primary-500 cursor-pointer' data-testid='LoanDetailsCard.Toggle'
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>
      <div className='w-full flex flex-col mt-10'>
        <VaultDetailsListItem
          title='Total Loan Value (USD)'
          testId='LoanDetailsCard.TotalLoanValue'
          titleClassNames='text-sm'
          infoDesc='Total Loan Value = Loan Value + Accrued Interest Value'
        >
          {totalLoanUsdAmount === undefined || interestUsdAmount === undefined
            ? ('N/A')
            : (
              <HoverPopover
                popover={<TotalLoanValueInfoDesc
                  totalLoanUsdAmount={totalLoanUsdAmount}
                  interestUsdAmount={interestUsdAmount}
                         />}
                placement='top-end'
              >
                <ReactNumberFormat
                  value={totalLoanUsdAmount.toFixed(2, BigNumber.ROUND_HALF_UP)}
                  prefix='$'
                  displayType='text'
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator
                />
              </HoverPopover>
              )}
        </VaultDetailsListItem>
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
        <div className='w-full mt-1 flex flex-col gap-y-1 -mb-1.5'>
          <VaultDetailsListItem
            title='Loan Amount'
            testId='LoanDetailsCard.LoanAmount'
            titleClassNames='text-sm'
          >
            <ReactNumberFormat
              value={new BigNumber(props.loan.amount).minus(props.interest.amount).toFixed(8)}
              displayType='text'
              decimalScale={8}
              fixedDecimalScale
              thousandSeparator
            />
          </VaultDetailsListItem>

          <VaultDetailsListItem
            title='Accrued Interest'
            testId='LoanDetailsCard.AccruedInterest'
            infoDesc='Amount of interest that has been incurred.'
            titleClassNames='text-sm'
          >
            <ReactNumberFormat
              value={new BigNumber(props.interest.amount).toFixed(8)}
              displayType='text'
              decimalScale={8}
              fixedDecimalScale
              thousandSeparator
            />
          </VaultDetailsListItem>

          <VaultDetailsListItem
            title='Total Interest Rate (APR)'
            infoDesc='Total annual interest rate = Vault Interest Rate + Token Interest Rate.'
            testId='LoanDetailsCard.TotalInterestRate'
            titleClassNames='text-sm'
          >
            <LoanTotalInterestRate vaultInterest={props.vault.interest} loanId={props.interest.id} />
          </VaultDetailsListItem>
        </div>
      </Transition>
    </div>
  )
}
