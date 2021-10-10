import { NumberFormat } from './NumberFormat'
import { ReactNode, PropsWithChildren } from 'react'
import { getAssetIcon } from '@components/icons/assets'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'

export function LiquidityPools ({ liquidityPools }: { liquidityPools: PoolPairData[] }): JSX.Element {
  return (
    <div className='mt-12' data-testid='liquidity-pools'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold' data-testid='liquidity-pools-title'>Liquidity Pools</h1>
      </div>
      <div className='mt-6 grid gap-1 lg:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {
          liquidityPools.map(pool => {
            return (
              <LiquidityPoolDetails
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

function LiquidityPoolDetails (
  {
    poolSymbol,
    apr,
    totalLiquidity,
    priceRatio,
    tokenASymbol,
    tokenBSymbol
  }: {
    poolSymbol: string
    apr: number | undefined
    totalLiquidity: string
    priceRatio: string
    tokenASymbol: string
    tokenBSymbol: string
  }): JSX.Element {
  const SymbolBIcon = getAssetIcon(tokenBSymbol)
  const SymbolAIcon = getAssetIcon(tokenASymbol)
  return (
    <div className='flex p-4 md:p-6 border border-gray-300 h-30'>
      <div className='flex justify-between w-1/4'>
        <div className='flex my-auto flex-col'>
          <div className='flex icons'>
            <SymbolAIcon className='h-6 w-6 z-10' />
            <SymbolBIcon className='h-6 w-6 -ml-2' />
          </div>
          <h1 className='font-semibold text-sm md:text-base'>{poolSymbol}</h1>
        </div>
      </div>
      <div className='w-3/4 my-auto ml-2'>
        <LiquidityCardStat label='APR'>
          <NumberFormat
            value={apr}
            decimalScale={2}
            suffix='%'
          />
        </LiquidityCardStat>
        <LiquidityCardStat label='Liquidity'>
          <NumberFormat
            value={totalLiquidity}
            decimalScale={0}
            suffix=' USD'
          />
        </LiquidityCardStat>
        <LiquidityCardStat
          label='Ratio'
        >
          <NumberFormat
            value={priceRatio}
            decimalScale={2}
            suffix={` ${tokenBSymbol}/${tokenASymbol}`}
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
        {label}:
      </div>
      <div className='table-cell pl-2 md:pl-4'>{children}</div>
    </div>
  )
}
