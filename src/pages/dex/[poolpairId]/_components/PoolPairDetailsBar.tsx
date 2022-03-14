import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import ReactNumberFormat from 'react-number-format'

export function PoolPairDetailsBar (props: {poolpair: PoolPairData}): JSX.Element {
  return (
    <div className='flex justify-between items-center border border-gray-200 rounded-lg py-3.5 px-6' data-testid='PoolPairDetailsBar'>
      <div>
        <PoolPairSymbolLocal
          tokenA={props.poolpair.tokenA} tokenB={props.poolpair.tokenB} symbolSizeClassName='h-8 w-8'
          symbolMarginClassName='ml-5' textClassName='ml-16 font-medium'
        />
      </div>
      <div className='flex'>
        <div className='flex flex-col'>
          <div className='flex items-center text-primary-900'>
            <span className='text-sm font-normal mr-2'>
              {`1${props.poolpair.tokenA.displaySymbol} =`}
            </span>
            <ReactNumberFormat
              value={Number(props.poolpair.priceRatio.ba).toFixed(2)}
              suffix={` ${props.poolpair.tokenB.displaySymbol}`}
              displayType='text'
              thousandSeparator
              className='text-2xl font-medium'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
