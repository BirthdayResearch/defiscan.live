import { PropsWithChildren, ReactNode } from 'react'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { Link } from '@components/commons/link/Link'
import ReactNumberFormat from 'react-number-format'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'

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
            VIEW FULL DETAILS
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
                poolId={pool.id}
                apr={pool.apr != null ? pool.apr.total * 100 : undefined}
                totalLiquidity={pool.totalLiquidity.usd !== undefined ? pool.totalLiquidity.usd : ''}
                priceRatio={pool.priceRatio.ba}
                tokenASymbol={pool.tokenA.displaySymbol}
                tokenBSymbol={pool.tokenB.displaySymbol}
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
    poolId: string
    apr: number | undefined
    totalLiquidity: string
    priceRatio: string
    tokenASymbol: string
    tokenBSymbol: string
  }): JSX.Element {
  return (
    <div className='flex flex-col p-4 rounded border border-gray-200 space-y-3'>
      <PoolPairSymbol
        poolPairId={props.poolId} symbolSizeClassName='h-6 w-6' symbolMarginClassName='ml-3.5'
        textClassName='ml-11 font-medium'
      />
      <div className='my-auto'>
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
