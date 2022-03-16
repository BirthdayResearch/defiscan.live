import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import ReactNumberFormat from 'react-number-format'
import { useTokenPrice } from '../../../vaults/hooks/TokenPrice'

export function PoolPairDetailsBar (props: {poolpair: PoolPairData}): JSX.Element {
  const { getTokenPrice } = useTokenPrice()
  return (
    <div className='flex flex-col md:flex-row md:items-center border border-gray-200 rounded-lg p-6' data-testid='PoolPairDetailsBar'>
      <PoolPairSymbolLocal
        tokenA={props.poolpair.tokenA} tokenB={props.poolpair.tokenB} symbolSizeClassName='h-4 w-4 md:h-8 md:w-8'
        symbolMarginClassName='ml-2 -mb-3 md:ml-5 md:-mb-0' textClassName='ml-7 md:ml-16 font-normal text-lg md:text-xl'
        testId='PoolPairSymbol'
      />
      <div className='md:ml-auto mt-6 md:mt-0'>
        <div className='flex flex-col'>
          <div className='flex items-center text-primary-900' data-testid='PriceRatio'>
            <span className='text-sm font-normal mr-2'>
              {`1${props.poolpair.tokenA.displaySymbol}  =`}
            </span>
            <ReactNumberFormat
              value={props.poolpair.priceRatio.ba}
              suffix={` ${props.poolpair.tokenB.displaySymbol}`}
              displayType='text'
              thousandSeparator
              className='text-sm md:text-2xl font-medium'
              decimalScale={Number(props.poolpair.priceRatio.ba) > 1 ? 2 : 8}
              fixedDecimalScale
            />
          </div>
        </div>
        <div className='flex md:justify-end' data-testid='TokenUsdPrice'>
          <ReactNumberFormat
            className='text-gray-400 text-sm'
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
