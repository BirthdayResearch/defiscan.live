import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import ReactNumberFormat from 'react-number-format'
import { useTokenPrice } from '../../../vaults/hooks/TokenPrice'

export function PoolPairDetailsBar (props: {poolpair: PoolPairData}): JSX.Element {
  const { getTokenPrice } = useTokenPrice()
  return (
    <div className='flex flex-col p-6 rounded-lg border border-gray-200 md:flex-row md:items-center' data-testid='PoolPairDetailsBar'>
      <PoolPairSymbolLocal
        tokenA={props.poolpair.tokenA}
        tokenB={props.poolpair.tokenB}
        symbolSizeClassName='h-4 w-4 md:h-8 md:w-8'
        symbolMarginClassName='ml-2 -mb-3 md:ml-5 md:-mb-0'
        textClassName='ml-7 md:ml-16 font-normal text-lg md:text-xl'
        testId='PoolPairSymbol'
      />
      <div className='flex text-primary-900 md:items-baseline mt-6 md:ml-auto md:mt-0' data-testid='PriceRatio'>
        <span className='mr-2 text-sm font-normal'>
          {`1${props.poolpair.tokenA.displaySymbol}  =`}
        </span>
        <div className='flex flex-col'>
          <ReactNumberFormat
            value={props.poolpair.priceRatio.ba}
            suffix={` ${props.poolpair.tokenB.displaySymbol}`}
            displayType='text'
            thousandSeparator
            className='text-sm font-medium md:text-2xl'
            decimalScale={Number(props.poolpair.priceRatio.ba) > 1 ? 2 : 8}
            fixedDecimalScale
          />
          <ReactNumberFormat
            className='text-sm flex justify-end text-gray-400'
            displayType='text'
            thousandSeparator
            prefix='≈$'
            value={getTokenPrice(props.poolpair.tokenB.displaySymbol, props.poolpair.priceRatio.ba).toFixed(3)}
          />
        </div>
      </div>
    </div>
  )
}
