import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { CompositeSwap, DfTx, PoolId, PoolSwap } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { AddressLink } from '@components/commons/link/AddressLink'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import { IoArrowForwardOutline } from 'react-icons/io5'

interface DftxCompositeSwapProps {
  dftx: DfTx<CompositeSwap>
}

export function DftxCompositeSwap ({ dftx: { data } }: DftxCompositeSwapProps): JSX.Element {
  const network = useNetwork().name

  const toAddress = fromScript(data.poolSwap.toScript, network)
  const fromAddress = fromScript(data.poolSwap.fromScript, network)

  const FromTokenSymbol = <TokenSymbol tokenId={data.poolSwap.fromTokenId} testId='DftxCompositeSwap.FromTokenSymbol' />
  const ToTokenSymbol = <TokenSymbol tokenId={data.poolSwap.toTokenId} testId='DftxCompositeSwap.ToTokenSymbol' />

  return (
    <div>
      <DfTxHeader name='Composite Swap' />
      <div className='mt-5 flex flex-wrap items-start lg:-mx-3'>
        <PoolFrom poolswap={data.poolSwap} FromTokenSymbol={FromTokenSymbol} address={fromAddress?.address} />
        <PoolTo poolswap={data.poolSwap} ToTokenSymbol={ToTokenSymbol} address={toAddress?.address} />
        <Path pools={data.pools} FromTokenSymbol={FromTokenSymbol} ToTokenSymbol={ToTokenSymbol} />
      </div>
    </div>
  )
}

function PoolFrom ({
  poolswap,
  FromTokenSymbol,
  address
}: { poolswap: PoolSwap, FromTokenSymbol: JSX.Element, address: string | undefined }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2 lg:pl-3 lg:pr-1.5'>
      <h2 className='my-3 font-medium' data-testid='DftxCompositeSwap.SwapFromTitle'>Swap From</h2>
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
          {FromTokenSymbol}
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
  ToTokenSymbol,
  address
}: { poolswap: PoolSwap, ToTokenSymbol: JSX.Element, address: string | undefined }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2 lg:pr-3 lg:pl-1.5 mt-4 lg:mt-0'>
      <h2 className='my-3 font-medium' data-testid='DftxCompositeSwap.SwapToTitle'>Swap To</h2>
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
          {ToTokenSymbol}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Max Amount' testId='DftxCompositeSwap.MaxPrice'>
          {poolswap.maxPrice.toFixed(8)}
        </AdaptiveList.Row>
      </AdaptiveList>
    </div>
  )
}

function Path (props: { pools: PoolId[], FromTokenSymbol: JSX.Element, ToTokenSymbol: JSX.Element }): JSX.Element {
  return (
    <div className='w-full lg:px-3 mt-4'>
      <h2 className='my-3 font-medium' data-testid='DftxCompositeSwap.SwapPathTitle'>Swap Path</h2>
      <div className='p-3 border-gray-200 border rounded-lg flex flex-wrap justify-center items-center space-x-4' data-testid='DftxCompositeSwap.SwapPathDiv'>
        {props.FromTokenSymbol}
        <IoArrowForwardOutline size={18} />
        {props.pools.map(pool =>
          (
            <div className='inline-block flex items-center space-x-4' key={pool.id}>
              <PoolPairSymbol
                poolPairId={pool.id} symbolSizeClassName='h-6 w-6' symbolMarginClassName='ml-3.5'
                textClassName='ml-11'
              />
              <IoArrowForwardOutline size={18} />
            </div>
          ))}
        {props.ToTokenSymbol}
      </div>
    </div>
  )
}
