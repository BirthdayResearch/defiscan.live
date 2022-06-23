import { DfTxHeader } from './DfTxHeader'
import { CompositeSwap, DfTx, PoolId, PoolSwap } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { AddressLink } from '@components/commons/link/AddressLink'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { PoolPairSymbol } from '@components/commons/token/PoolPairSymbol'
import { IoArrowForwardOutline } from 'react-icons/io5'
import NumberFormat from 'react-number-format'

interface DftxCompositeSwapProps {
  dftx: DfTx<CompositeSwap>
}

export function DfTxCompositeSwap ({ dftx: { data } }: DftxCompositeSwapProps): JSX.Element {
  const network = useNetwork().name

  const toAddress = fromScript(data.poolSwap.toScript, network)
  const fromAddress = fromScript(data.poolSwap.fromScript, network)

  const FromTokenSymbol = (
    <TokenSymbol
      tokenId={data.poolSwap.fromTokenId} testId='DfTxCompositeSwap.FromTokenSymbol'
      symbolLeft
    />
  )
  const ToTokenSymbol = (
    <TokenSymbol
      tokenId={data.poolSwap.toTokenId} testId='DfTxCompositeSwap.ToTokenSymbol'
      symbolLeft
    />
  )

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
    <div className='w-full lg:w-1/2 lg:pl-3 lg:pr-1.5' data-testid='DfTxCompositeSwap.SwapFrom'>
      <h2 className='my-3 font-medium dark:text-gray-100' data-testid='DfTxCompositeSwap.SwapFromTitle'>Swap From</h2>
      <AdaptiveList>
        <AdaptiveList.Row name='Address'>
          {(() => {
            if (address !== undefined) {
              return (
                <AddressLink
                  address={address}
                  testId='DfTxCompositeSwap.FromAddress'
                  className='break-all'
                />
              )
            }
            return 'N/A'
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token' testId='DfTxCompositeSwap.TokenFrom'>
          {FromTokenSymbol}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Amount' testId='DfTxCompositeSwap.FromAmount'>
          <NumberFormat
            value={poolswap.fromAmount.toFixed(8)}
            thousandSeparator
            displayType='text'
          />
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
    <div className='w-full lg:w-1/2 lg:pr-3 lg:pl-1.5 mt-4 lg:mt-0' data-testid='DfTxCompositeSwap.SwapTo'>
      <h2 className='my-3 font-medium dark:text-gray-100' data-testid='DfTxCompositeSwap.SwapToTitle'>Swap To</h2>
      <AdaptiveList>
        <AdaptiveList.Row name='Address'>
          {(() => {
            if (address !== undefined) {
              return (
                <AddressLink
                  address={address}
                  testId='DfTxCompositeSwap.ToAddress'
                  className='break-all'
                />
              )
            }
            return 'N/A'
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token' testId='DfTxCompositeSwap.TokenTo'>
          {ToTokenSymbol}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Max Amount' testId='DfTxCompositeSwap.MaxPrice'>
          <NumberFormat
            value={poolswap.maxPrice.toFixed(8)}
            thousandSeparator
            displayType='text'
          />
        </AdaptiveList.Row>
      </AdaptiveList>
    </div>
  )
}

function Path (props: { pools: PoolId[], FromTokenSymbol: JSX.Element, ToTokenSymbol: JSX.Element }): JSX.Element {
  return (
    <div className='w-full lg:px-3 mt-4' data-testid='DfTxCompositeSwap.SwapPath'>
      <h2 className='my-3 font-medium dark:text-dark-gray-900' data-testid='DfTxCompositeSwap.SwapPathTitle'>Swap Path</h2>
      <div
        className='px-2 py-1.5 border-gray-200 border rounded-lg flex flex-wrap justify-center items-center space-x-4 dark:border-gray-700 dark:bg-gray-800'
        data-testid='DfTxCompositeSwap.SwapPathDiv'
      >
        <div className='my-1.5 dark:text-gray-100'>{props.FromTokenSymbol}</div>
        <IoArrowForwardOutline size={18} className='dark:text-gray-100' />
        {props.pools.map(pool =>
          (
            <div className='inline-block flex items-center space-x-4 dark:text-gray-100' key={pool.id}>
              <PoolPairSymbol
                poolPairId={pool.id} symbolSizeClassName='h-6 w-6' symbolMarginClassName='ml-3.5'
                textClassName='ml-11'
              />
              <IoArrowForwardOutline size={18} />
            </div>
          ))}
        <div className='my-1.5 dark:text-gray-100'>{props.ToTokenSymbol}</div>
      </div>
    </div>
  )
}
