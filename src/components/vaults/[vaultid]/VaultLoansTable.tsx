import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import ReactNumberFormat from 'react-number-format'
import { AddressLink } from '@components/commons/AddressLink'
import { InformationPopOver } from '@components/vaults/[vaultid]/VaultDetailsTable'
import { Collapsible } from '@components/commons/Collapsible'
import { IoIosArrowDown } from 'react-icons/io'
import { OverflowTable } from '@components/commons/OverflowTable'

export function VaultLoansTable ({ loans }: {loans: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <div className='mt-10'>
      <VaultLoanDetailsMobile loans={loans} />
      <VaultLoansDesktop loans={loans} />
    </div>
  )
}

function VaultLoansDesktop ({ loans }: {loans: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <div className='hidden md:block' data-testid='VaultLoansDesktop'>
      <h2 className='text-xl font-semibold' data-testid='VaultLoansDesktop.Heading'>Loan Details</h2>
      <OverflowTable className='mt-6'>
        <OverflowTable.Header>
          <OverflowTable.Head>Loan Taken</OverflowTable.Head>
          <OverflowTable.Head className='align-middle md:text-right'>Loan Id</OverflowTable.Head>
          <OverflowTable.Head>
            <InformationPopOver
              className='justify-end'
              heading='Loan Amount'
              description='Loan Amount'
              testId='VaultLoansDesktop.LoanAmount'
            />
          </OverflowTable.Head>
          <OverflowTable.Head>
            <InformationPopOver
              className='justify-end'
              heading='Total Loan Interest (APR)'
              description='Total Loan Interest (APR)'
              testId='VaultLoansDesktop.TotalLoanInterest'
            />
          </OverflowTable.Head>
        </OverflowTable.Header>
        {loans.map((loan) => (
          <VaultLoansTableRow loan={loan} key={loan.id} />
        ))}
      </OverflowTable>
    </div>
  )
}

function VaultLoansTableRow ({ loan }: {loan: LoanVaultTokenAmount}): JSX.Element {
  const LoanSymbol = getAssetIcon(loan.displaySymbol)
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <div className='flex items-center space-x-1'>
          <LoanSymbol className='h-6 w-6' />
          <span>{loan.name}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='md:text-right'>
        <AddressLink address={loan.id} />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='md:text-right'>
        <ReactNumberFormat
          displayType='text'
          value={loan.amount}
          prefix='$'
          thousandSeparator
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='md:text-right'>
        N/A
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function VaultLoanDetailsCard ({ loan }: {loan: LoanVaultTokenAmount}): JSX.Element {
  const LoanSymbol = getAssetIcon(loan.displaySymbol)
  return (
    <div className='p-4 border border-gray-300 h-28 rounded w-80 justify-self-center md:justify-self-stretch' data-testid='VaultLoanDetailsCard'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <LoanSymbol className='h-6 w-6' />
          <span>{loan.name}</span>
        </div>
        <div className='flex items-center text-primary-500 underline'>
          <span>View</span>
          <IoIosArrowDown className='h-4 w-4' />
        </div>
      </div>
      <div className='flex items-center justify-between text-sm font-normal mt-10'>
        <span className=''>Loan Amount</span>
        <ReactNumberFormat
          displayType='text'
          value={loan.amount}
          suffix={loan.symbol}
          thousandSeparator
        />
      </div>
    </div>
  )
}

function VaultLoanDetailsMobile ({ loans }: {loans: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <Collapsible heading='Loan Details' className='block md:hidden mt-6'>
      <div className='flex flex-col items-center'>
        {loans.map((loan) => (
          <VaultLoanDetailsCard loan={loan} key={loan.id} />
        ))}
      </div>
    </Collapsible>
  )
}
