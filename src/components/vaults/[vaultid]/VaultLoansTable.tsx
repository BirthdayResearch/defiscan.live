import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { getAssetIcon } from '@components/icons/assets'
import ReactNumberFormat from 'react-number-format'
import { AddressLink } from '@components/commons/AddressLink'

export function VaultLoansTable ({ loans }: {loans: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <div className='mt-11'>
      <h2 className='text-xl font-semibold'>Loan Details</h2>
      <AdaptiveTable>
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>
            Loan Taken
          </AdaptiveTable.Head>
          <AdaptiveTable.Head className='text-center'>
            Loan Id
          </AdaptiveTable.Head>
          <AdaptiveTable.Head className='text-center'>
            Loan Amount
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
      <AdaptiveTable.Cell>
        <div className='flex items-center space-x-1'>
          <LoanSymbol className='h-6 w-6' />
          <span>{loan.name}</span>
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell className='text-center'>
        <AddressLink address={loan.id} />
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell className='text-center'>
        <ReactNumberFormat
          displayType='text'
          value={loan.amount}
          prefix='$'
          thousandSeparator
        />
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}
