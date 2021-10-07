import { DfTx, PoolSwap } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import BigNumber from 'bignumber.js'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxPoolSwapProps {
  dftx: DfTx<PoolSwap>
}

export function DfTxPoolSwap (props: DfTxPoolSwapProps): JSX.Element {
  const network = useNetworkObject().name

  const from = props.dftx.data.fromScript !== undefined ? fromScript(props.dftx.data.fromScript, network) : undefined
  const to = props.dftx.data.toScript !== undefined ? fromScript(props.dftx.data.toScript, network) : undefined

  return (
    <div>
      <DfTxHeader name='Pool Swap' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <TableLeft
          fromAddress={from?.address}
          fromTokenId={props.dftx.data.fromTokenId}
          fromAmount={props.dftx.data.fromAmount}
        />
        <TableRight
          toAddress={to?.address}
          toTokenId={props.dftx.data.toTokenId}
          maxPrice={props.dftx.data.maxPrice}
        />
      </div>
    </div>
  )
}

function TableLeft (props: {
  fromAddress?: string
  fromTokenId: number
  fromAmount: BigNumber
}): JSX.Element {
  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='From' testId='transaction-detail-total-amount'>
        {props.fromAddress ?? 'N/A'}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='ID Token from' testId='transaction-detail-total-amount'>
        {props.fromTokenId}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Amount from' testId='transaction-detail-total-amount'>
        {`${props.fromAmount.toString()} DFI`}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function TableRight (props: {
  toAddress?: string
  toTokenId: number
  maxPrice: BigNumber
}): JSX.Element {
  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='To' testId='transaction-detail-total-amount'>
        {props.toAddress ?? 'N/A'}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='ID Token from' testId='transaction-detail-total-amount'>
        {props.toTokenId}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Max Price' testId='transaction-detail-total-amount'>
        {`${props.maxPrice.toString()} DFI`}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}
