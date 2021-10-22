import { PropsWithChildren, ReactNode } from 'react'
import { getAssetIcon } from '@components/icons/assets'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { IoChevronForward } from 'react-icons/io5'
import { Link } from '@components/commons/Link'
import ReactNumberFormat from 'react-number-format'

export function LiquidityPoolList ({ liquidityPools }: { liquidityPools: PoolPairData[] }): JSX.Element {
  return (
    <div className='mt-12' data-testid='LiquidityPoolList'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold' data-testid='LiquidityPoolList.title'>Liquidity Pools</h1>
        <Link href={{ pathname: '/dex' }}>
          <a
            className='flex items-center font-medium cursor-pointer text-primary-500'
            data-testid='LiquidityPoolList.viewLiquidityPools'
          >
            VIEW FULL DETAILS <IoChevronForward size={18} className='inline' />
          </a>
        </Link>
      </div>
      <div
        className='mt-6 grid gap-1 lg:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
      >
        {
          liquidityPools.map(pool => {
            return (
              <LiquidityPoolCard
                key={pool.symbol}
                poolSymbol={pool.symbol}
                apr={pool.apr != null ? pool.apr.total * 100 : undefined}
                totalLiquidity={pool.totalLiquidity.usd !== undefined ? pool.totalLiquidity.usd : ''}
                priceRatio={pool.priceRatio.ba}
                tokenASymbol={pool.tokenA.symbol}
                tokenBSymbol={pool.tokenB.symbol}
              />
            )
          })
        }
      </div>
    </div>
  )
}

function LiquidityPoolCard (
  props: {
    poolSymbol: string
    apr: number | undefined
    totalLiquidity: string
    priceRatio: string
    tokenASymbol: string
    tokenBSymbol: string
  }): JSX.Element {
  const SymbolBIcon = getAssetIcon(props.tokenBSymbol)
  const SymbolAIcon = getAssetIcon(props.tokenASymbol)
  return (
    <div className='flex flex-col p-4 md:p-6 border border-gray-300 h-30'>
      <div className='flex flex-col justify-between my-auto w-1/4'>
        <div className='flex icons'>
          <SymbolAIcon className='h-6 w-6 z-10' />
          <SymbolBIcon className='h-6 w-6 -ml-2' />
        </div>
        <h1 className='font-semibold text-sm md:text-base'>{props.poolSymbol}</h1>
      </div>
      <div className='w-3/4 my-auto ml-2'>
        <LiquidityCardStat label='APR'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={props.apr}
            decimalScale={2}
            suffix='%'
          />
        </LiquidityCardStat>
        <LiquidityCardStat label='Liquidity'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={props.totalLiquidity}
            decimalScale={0}
            suffix=' USD'
          />
        </LiquidityCardStat>
        <LiquidityCardStat
          label='Ratio'
        >
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={props.priceRatio}
            decimalScale={2}
            suffix={` ${props.tokenBSymbol}/${props.tokenASymbol}`}
          />
        </LiquidityCardStat>
      </div>
    </div>
  )
}

function LiquidityCardStat ({
  label,
  children
}: PropsWithChildren<{ label: string, children: ReactNode }>): JSX.Element {
  return (
    <div className='table-row border-collapse text-sm'>
      <div className='table-cell opacity-40'>
        {label}
      </div>
      <div className='table-cell pl-2 md:pl-4'>{children}</div>
    </div>
  )
}
