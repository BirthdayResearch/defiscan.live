import React, { useCallback, useState } from 'react'
import { CardList } from '@components/commons/CardList'
import NumberFormat from 'react-number-format'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import BigNumber from 'bignumber.js'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { APRInfo } from './APRInfo'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import { sortData } from './PoolPairsTable'

enum SortKeys {
  VOLUME = 'volume',
  TOTAL_LIQUIDITY = 'totalLiquidity',
  APR = 'apr'
}

const sortTypes = [{
  sortKey: SortKeys.TOTAL_LIQUIDITY,
  sortOrder: 'desc',
  value: 'Total Liquidity (High to Low)'
}, {
  sortKey: SortKeys.TOTAL_LIQUIDITY,
  sortOrder: 'asc',
  value: 'Total Liquidity (Low to High)'
}, {
  sortKey: SortKeys.VOLUME,
  sortOrder: 'desc',
  value: 'Volume (High to Low)'
}, {
  sortKey: SortKeys.VOLUME,
  sortOrder: 'asc',
  value: 'Volume (Low to High)'
}, {
  sortKey: SortKeys.APR,
  sortOrder: 'desc',
  value: 'APR (High to Low)'
}, {
  sortKey: SortKeys.APR,
  sortOrder: 'asc',
  value: 'APR (Low to High)'
}]

export function PoolPairsCards ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
  type SortOrder = 'asc' | 'desc'
  const [sortKey, setSortKey] = useState<SortKeys>(SortKeys.TOTAL_LIQUIDITY)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const sortedData = useCallback(
    () => sortData({
      poolPairs,
      sortKey,
      reverse: sortOrder === 'desc'
    }),
    [poolPairs, sortKey, sortOrder]
  )

  function changeSort (sortType: { sortKey: SortKeys, sortOrder: string, value: string }): void {
    setSortOrder(sortType.sortOrder === 'asc' ? 'asc' : 'desc')
    setSortKey(sortType.sortKey)
  }

  return (
    <CardList>
      <div className='w-full flex justify-end items-center'>
        <CardList.DropDownSortButton>
          {sortTypes.map(sortType => {
            return (
              <CardList.DropDownSortOption
                key={sortType.sortKey + sortType.sortOrder}
                sortType={sortType}
                isSelected={sortType.sortKey === sortKey && sortType.sortOrder === sortOrder}
                onClick={() => changeSort(sortType)}
              />
            )
          })}
        </CardList.DropDownSortButton>
      </div>

      {sortedData().map(poolPair => {
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
      <CardList.Header path={`/dex/${poolPair.id}`}>
        <div className='font-medium text-gray-900'>
          <PoolPairSymbolLocal
            tokenA={poolPair.tokenA} tokenB={poolPair.tokenB} symbolSizeClassName='h-6 w-6'
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
