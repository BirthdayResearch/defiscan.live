import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import ReactNumberFormat from 'react-number-format'
import { useTokenPrice } from '../../../vaults/hooks/TokenPrice'
import BigNumber from 'bignumber.js'

export function PoolPairDetailsBar (props: {poolpair: PoolPairData}): JSX.Element {
  const { getTokenPrice } = useTokenPrice()
  return (
    <div className='mt-8 flex flex-col p-6 rounded-lg border border-gray-200 md:flex-row md:items-center' data-testid='PoolPairDetailsBar'>
      <PoolPairSymbolLocal
        tokenA={props.poolpair.tokenA}
        tokenB={props.poolpair.tokenB}
        primarySymbolClassName='h-6 w-6 md:h-8 md:w-8'
        secondarySymbolClassName='ml-4 -mb-5 h-4 w-4 md:ml-6 md:-mb-0 md:h-6 md:w-6'
        textClassName='ml-10 md:ml-16 font-normal text-lg md:text-xl'
        primaryTextClassName='font-medium'
        secondaryTextClassName='text-gray-400'
        testId='PoolPairSymbol'
      />
      <div className='text-gray-900 md:items-baseline mt-6 md:ml-auto md:mt-0' data-testid='PriceRatio'>
        <div className='flex flex-col'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            className='text-sm font-medium md:text-xl'
            prefix='$'
            value={getTokenPrice(props.poolpair.tokenB.displaySymbol, props.poolpair.priceRatio.ba).toFixed(2, BigNumber.ROUND_HALF_UP)}
          />
          <ReactNumberFormat
            value={props.poolpair.priceRatio.ba}
            displayType='text'
            thousandSeparator
            decimalScale={Number(props.poolpair.priceRatio.ba) > 1 ? 2 : 8}
            fixedDecimalScale
            className='text-sm flex justify-end text-gray-400'
            prefix='≈ '
            suffix={` ${props.poolpair.tokenB.displaySymbol} `}
          />
        </div>
      </div>
    </div>
  )
}
