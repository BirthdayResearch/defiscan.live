import { DfTx, PoolSwap } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from './DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import BigNumber from 'bignumber.js'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { AddressLink } from '@components/commons/link/AddressLink'

interface DfTxPoolSwapProps {
  dftx: DfTx<PoolSwap>
}

export function DfTxPoolSwap (props: DfTxPoolSwapProps): JSX.Element {
  const network = useNetwork().name

  const from = props.dftx.data.fromScript !== undefined ? fromScript(props.dftx.data.fromScript, network) : undefined
  const to = props.dftx.data.toScript !== undefined ? fromScript(props.dftx.data.toScript, network) : undefined

  return (
    <div>
      <DfTxHeader name='Pool Swap' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <PoolSwapDetailsTable
          fromAddress={from?.address}
          fromTokenId={props.dftx.data.fromTokenId}
          fromAmount={props.dftx.data.fromAmount}
          toAddress={to?.address}
          toTokenId={props.dftx.data.toTokenId}
          maxPrice={props.dftx.data.maxPrice}
        />
      </div>
    </div>
  )
}

function PoolSwapDetailsTable (props: {
  fromAddress?: string
  fromTokenId: number
  fromAmount: BigNumber
  toAddress?: string
  toTokenId: number
  maxPrice: BigNumber
}): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='From'>
          {(() => {
            if (props.fromAddress !== undefined) {
              return <AddressLink address={props.fromAddress} testId='DfTxPoolSwap.fromAddress' />
            }
            return 'N/A'
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token'>
          <TokenSymbol tokenId={props.fromTokenId} testId='DfTxPoolSwap.fromAmountSymbol' />
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Amount'>
          <span data-testid='DfTxPoolSwap.fromAmount'>{props.fromAmount.toFixed(8)}</span>
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='To'>
          {(() => {
            if (props.toAddress !== undefined) {
              return <AddressLink address={props.toAddress} testId='DfTxPoolSwap.toAddress' />
            }
            return 'N/A'
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token'>
          <TokenSymbol tokenId={props.toTokenId} testId='DfTxPoolSwap.maxPriceSymbol' />
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Max Price'>
          <span data-testid='DfTxPoolSwap.maxPrice'>{props.maxPrice.toFixed(8)}</span>
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  )
}
