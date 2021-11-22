import { SetLoanScheme, DfTx } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface DfTxCreateLoanSchemeProps {
  dftx: DfTx<SetLoanScheme>
}

export function DfTxCreateLoanScheme (props: DfTxCreateLoanSchemeProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Create Loan Scheme' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <div className='w-full lg:w-1/2'>
          <AdaptiveList>
            <AdaptiveList.Row name='Identifier' testId='DfTxCreateLoanScheme.Identifier'>
              {props.dftx.data.identifier}
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Ratio' testId='DfTxCreateLoanScheme.Ratio'>
              {props.dftx.data.rate.toFixed(8)}
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
        <div className='w-full lg:w-1/2'>
          <AdaptiveList>
            <AdaptiveList.Row name='Rate' testId='DfTxCreateLoanScheme.Rate'>
              {props.dftx.data.rate.toFixed(8)}
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Update' testId='DfTxCreateLoanScheme.Update'>
              {props.dftx.data.update.toFixed(8)}
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
      </div>
    </div>
  )
}
