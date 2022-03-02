import React from 'react'
import { CardList } from '@components/commons/CardList'
import NumberFormat from 'react-number-format'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import BigNumber from 'bignumber.js'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { APRInfo } from './APRInfo'

export function PoolPairsCards ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
  return (
    <CardList>
      {poolPairs.map(poolPair => {
        return (
          <PoolPairsCard
            poolPair={poolPair}
            key={poolPair.id}
          />
        )
      })}
    </CardList>
  )
}

export function PoolPairsCard ({ poolPair }: { poolPair: PoolPairData }): JSX.Element {
  return (
    <CardList.Card testId='PoolPairsCard'>
      <CardList.Header isView path={`/dex/${poolPair.id}`}>
        <div className='font-medium text-gray-900'>
          <PoolPairSymbol
            poolPairId={poolPair.id} symbolSizeClassName='h-6 w-6'
            symbolMarginClassName='ml-4' textClassName='ml-12 font-medium'
          />
        </div>
      </CardList.Header>

      <CardList.List>
        <CardList.ListItem
          title='Total Liquidity'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.TotalLiquidity'
        >
          {poolPair.totalLiquidity.usd !== undefined ? (
            <NumberFormat
              value={poolPair.totalLiquidity.usd}
              displayType='text'
              thousandSeparator
              decimalScale={0}
              prefix='$'
            />
          ) : (
            <div className='text-yellow-500'>
              Error
            </div>
          )}
        </CardList.ListItem>

        <CardList.ListItem
          title='Volume (24H)'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.24hVolume'
        >
          {poolPair.volume?.h24 !== undefined ? (
            <NumberFormat
              value={poolPair.volume?.h24}
              displayType='text'
              thousandSeparator
              decimalScale={0}
              prefix='$'
            />
          ) : (
            <div className='text-yellow-500'>
              Error
            </div>
          )}
        </CardList.ListItem>

        <CardList.ListItem
          title='Liquidity'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.Liquidity'
        >
          <div className='text-right'>
            <NumberFormat
              value={poolPair.tokenA.reserve}
              displayType='text'
              thousandSeparator
              decimalScale={0}
              suffix={` ${poolPair.tokenA.displaySymbol}`}
            />
          </div>
          <div className='text-right'>
            <NumberFormat
              value={poolPair.tokenB.reserve}
              displayType='text'
              thousandSeparator
              decimalScale={0}
              suffix={` ${poolPair.tokenB.displaySymbol}`}
            />
          </div>
        </CardList.ListItem>

        <CardList.ListItem
          title='Price Ratio'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.PriceRatio'
        >
          <div className='text-right'>
            <NumberFormat
              value={Number(new BigNumber(poolPair.priceRatio.ab).toPrecision(4))}
              displayType='text'
              thousandSeparator
              suffix={` ${poolPair.tokenA.displaySymbol}/${poolPair.tokenB.displaySymbol}`}
            />
          </div>
          <div className='text-right'>
            <NumberFormat
              value={Number(new BigNumber(poolPair.priceRatio.ba).toPrecision(4))}
              displayType='text'
              thousandSeparator
              suffix={` ${poolPair.tokenB.displaySymbol}/${poolPair.tokenA.displaySymbol}`}
            />
          </div>
        </CardList.ListItem>

        <CardList.ListItem
          title='APR'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.APR'
          infoDesc='APR includes commission.'
        >
          {(() => {
            if (poolPair.apr !== undefined) {
              return (
                <MoreHoverPopover className='ml-1' description={<APRInfo {...poolPair.apr} />} placement='left'>
                  <NumberFormat
                    value={poolPair.apr.total * 100}
                    displayType='text'
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    suffix='%'
                  />
                </MoreHoverPopover>
              )
            } else {
              return (
                <div className='text-yellow-500'>
                  Error
                </div>
              )
            }
          })()}
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  )
}
