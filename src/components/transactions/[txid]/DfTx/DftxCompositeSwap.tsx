import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { CompositeSwap, DfTx, PoolSwap } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { AddressLink } from '@components/commons/link/AddressLink'
import { TokenSymbol } from '@components/commons/TokenSymbol'

interface DftxCompositeSwapProps {
  dftx: DfTx<CompositeSwap>
}

export function DftxCompositeSwap ({ dftx: { data } }: DftxCompositeSwapProps): JSX.Element {
  const network = useNetwork().name

  const toAddress = fromScript(data.poolSwap.toScript, network)
  const fromAddress = fromScript(data.poolSwap.fromScript, network)

  return (
    <div>
      <DfTxHeader name='Composite Swap' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <PoolFrom poolswap={data.poolSwap} address={fromAddress?.address} />
        <PoolTo poolswap={data.poolSwap} address={toAddress?.address} />
      </div>
    </div>
  )
}

function PoolFrom ({
  poolswap,
  address
}: { poolswap: PoolSwap, address: string | undefined }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
      <h2 className='my-3 font-medium text-lg mt-6' data-testid='DftxCompositeSwap.SwapFromTitle'>Swap From</h2>
      <AdaptiveList>
        <AdaptiveList.Row name='Address'>
          {(() => {
            if (address !== undefined) {
              return (
                <AddressLink
                  address={address}
                  testId='DftxCompositeSwap.FromAddress'
                  className='break-all'
                />
              )
            }
            return 'N/A'
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token' testId='DftxCompositeSwap.TokenFrom'>
          <TokenSymbol tokenId={poolswap.fromTokenId} testId='DftxCompositeSwap.FromTokenSymbol' />
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Amount' testId='DftxCompositeSwap.FromAmount'>
          {poolswap.fromAmount.toFixed(8)}
        </AdaptiveList.Row>
      </AdaptiveList>
    </div>
  )
}

function PoolTo ({
  poolswap,
  address
}: { poolswap: PoolSwap, address: string | undefined }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
      <h2 className='my-3 font-medium text-lg mt-6' data-testid='DftxCompositeSwap.SwapToTitle'>Swap To</h2>
      <AdaptiveList>
        <AdaptiveList.Row name='Address'>
          {(() => {
            if (address !== undefined) {
              return (
                <AddressLink
                  address={address}
                  testId='DftxCompositeSwap.ToAddress'
                  className='break-all'
                />
              )
            }
            return 'N/A'
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token' testId='DftxCompositeSwap.TokenTo'>
          <TokenSymbol tokenId={poolswap.toTokenId} testId='DftxCompositeSwap.ToTokenSymbol' />
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Max Amount' testId='DftxCompositeSwap.MaxPrice'>
          {poolswap.maxPrice.toFixed(8)}
        </AdaptiveList.Row>
      </AdaptiveList>
    </div>
  )
}
