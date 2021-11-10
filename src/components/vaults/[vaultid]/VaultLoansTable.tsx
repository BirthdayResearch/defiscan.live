import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { getAssetIcon } from '@components/icons/assets'
import ReactNumberFormat from 'react-number-format'
import { AddressLink } from '@components/commons/AddressLink'
import { InformationPopOver } from '@components/vaults/[vaultid]/VaultDetailsTable'
import { Collapsible } from '@components/commons/Collapsible'
import { IoIosArrowDown } from 'react-icons/io'

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
    <div className='hidden md:block'>
      <h2 className='text-xl font-semibold'>Loan Details</h2>
      <AdaptiveTable className='mt-6'>
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>Loan Taken</AdaptiveTable.Head>
          <AdaptiveTable.Head className='align-middle md:text-right'>Loan Id</AdaptiveTable.Head>
          <AdaptiveTable.Head>
            <InformationPopOver className='justify-end' heading='Loan Amount' description='Loan Amount' />
          </AdaptiveTable.Head>
          <AdaptiveTable.Head>
            <InformationPopOver className='justify-end' heading='Total Loan Interest (APR)' description='Total Loan Interest (APR)' />
          </AdaptiveTable.Head>
        </AdaptiveTable.Header>
        {loans.map((loan) => (
          <VaultLoansTableRow loan={loan} key={loan.id} />
        ))}
      </AdaptiveTable>
    </div>
  )
}

function VaultLoansTableRow ({ loan }: {loan: LoanVaultTokenAmount}): JSX.Element {
  const LoanSymbol = getAssetIcon(loan.displaySymbol)
  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='Loan Token'>
        <div className='flex items-center space-x-1'>
          <LoanSymbol className='h-6 w-6' />
          <span>{loan.name}</span>
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell className='md:text-right' title='Loan ID'>
        <AddressLink address={loan.id} />
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell className='md:text-right' title='Loan Amount'>
        <ReactNumberFormat
          displayType='text'
          value={loan.amount}
          prefix='$'
          thousandSeparator
        />
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell className='md:text-right' title='Loan Interest Rate'>
        N/A
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}

function VaultLoanDetailsCard ({ loan }: {loan: LoanVaultTokenAmount}): JSX.Element {
  const LoanSymbol = getAssetIcon(loan.displaySymbol)
  return (
    <div className='p-4 border border-gray-300 h-28 rounded w-80 justify-self-center md:justify-self-stretch'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <LoanSymbol className='h-6 w-6' />
          <span>{loan.name} </span>
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
