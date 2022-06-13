import React, { PropsWithChildren, ReactNode } from 'react'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { Link } from '@components/commons/link/Link'
import ReactNumberFormat from 'react-number-format'
import { PoolPairSymbol } from '@components/commons/token/PoolPairSymbol'

export function LiquidityPoolList ({ liquidityPools }: { liquidityPools: PoolPairData[] }): JSX.Element {
  return (
    <div className='mt-12' data-testid='LiquidityPoolList'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold dark:text-dark-gray-900' data-testid='LiquidityPoolList.title'>Liquidity Pools</h1>
      </div>
      <div
        className='mt-6 flex flex-wrap -m-1'
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
      <div className='flex justify-center mt-1.5'>
        <Link href={{ pathname: '/dex' }}>
          <a
            className='font-medium cursor-pointer text-primary-500 dark:text-dark-primary-500'
            data-testid='LiquidityPoolList.viewAllPoolsButton'
          >
            <button
              type='button'
              className='mt-2 py-2 px-14 border border-gray-200 dark:border-gray-700 rounded-sm hover:shadow-md'
            >
              VIEW ALL POOLS
            </button>
          </a>
        </Link>
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
    <div className='w-full sm:w-1/2 xl:w-1/4 2xl:w-1/4 p-1'>
      <div className='flex flex-col p-4 rounded border border-gray-200 space-y-3 dark:bg-gray-800 dark:border-gray-700' data-testid='LiquidityPoolCard'>
        <PoolPairSymbol
          poolPairId={props.poolId} symbolSizeClassName='h-6 w-6' symbolMarginClassName='ml-3.5'
          textClassName='ml-11 font-medium dark:text-dark-gray-900'
          testId='LiquidityPoolCard.PoolPairSymbol'
        />
        <div className='my-auto'>
          {(() => {
            if (props.apr !== undefined) {
              return (
                <LiquidityCardStat
                  label='APR'
                  testid='LiquidityCardStat.APR.Label'
                >
                  <ReactNumberFormat
                    displayType='text'
                    thousandSeparator
                    value={props.apr}
                    decimalScale={2}
                    suffix='%'
                    data-testid='LiquidityCardStat.APR.Value'
                  />
                </LiquidityCardStat>
              )
            } else {
              return (
                <div className='text-yellow-500'>
                  Error
                </div>
              )
            }
          })()}
          <LiquidityCardStat
            label='Liquidity'
            testid='LiquidityCardStat.Liquidity.Label'
          >
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={props.totalLiquidity}
              decimalScale={0}
              suffix=' USD'
              data-testid='LiquidityCardStat.Liquidity.Value'
            />
          </LiquidityCardStat>
          <LiquidityCardStat
            label='Ratio'
            testid='LiquidityCardStat.Ratio.Label'
          >
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={props.priceRatio}
              decimalScale={2}
              suffix={` ${props.tokenBSymbol}/${props.tokenASymbol}`}
              data-testid='LiquidityCardStat.Ratio.Value'
            />
          </LiquidityCardStat>
        </div>
      </div>
    </div>
  )
}

function LiquidityCardStat ({
  label,
  testid,
  children
}: PropsWithChildren<{ label: string, testid?: string, children: ReactNode }>): JSX.Element {
  return (
    <div className='table-row border-collapse text-sm'>
      <div className='table-cell opacity-40 dark:opacity-100 dark:text-gray-400' data-testid={testid}>
        {label}
      </div>
      <div className='table-cell pl-2 md:pl-4 dark:text-gray-100'>{children}</div>
    </div>
  )
}
