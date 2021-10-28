import { AdaptiveList } from '@components/commons/AdaptiveList'
import BigNumber from 'bignumber.js'
import { AddressAggregation } from '@defichain/whale-api-client/dist/api/address'

interface AddressSummaryTableProps {
  aggregation: AddressAggregation
}

export function AddressSummaryTable (props: AddressSummaryTableProps): JSX.Element {
  return (
    <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <div className='w-full lg:w-1/2'>
        <AdaptiveList>
          <AdaptiveList.Row name='Balance' className='text-left' testId='AddressSummaryTable.balance'>
            {new BigNumber(props.aggregation.amount.unspent).toFixed(8)} DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Total Sent' className='text-left' testId='AddressSummaryTable.totalSent'>
            {new BigNumber(props.aggregation.amount.txOut).toFixed(8)} DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Total Received' className='text-left' testId='AddressSummaryTable.totalReceived'>
            {new BigNumber(props.aggregation.amount.txIn).toFixed(8)} DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name='No. of Transaction' className='text-left'
            testId='AddressSummaryTable.txCount'
          >
            {props.aggregation.statistic.txCount}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
