import React, { useCallback } from 'react'
import { CardList } from '@components/commons/CardList'
import NumberFormat from 'react-number-format'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { APRInfo } from './APRInfo'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import { SortData, SortKeys } from './PoolPairsTable'
import { useTokenPrice } from '../../vaults/hooks/TokenPrice'
import { TotalLiquidityInfo } from './TotalLiquidityInfo'
import BigNumber from 'bignumber.js'

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
}, {
  sortKey: SortKeys.PRIMARY_TOKEN_PRICE,
  sortOrder: 'desc',
  value: 'Primary Token Price (High to Low)'
}, {
  sortKey: SortKeys.PRIMARY_TOKEN_PRICE,
  sortOrder: 'asc',
  value: 'Primary Token Price (Low to High)'
}]

export function PoolPairsCards ({ poolPairs, sortKey, setSortKey, sortOrder, setSortOrder }): JSX.Element {
  const { getTokenPrice } = useTokenPrice()

  const poolPairsPrices = poolPairs.map(pair => {
    const tokenPrice = new BigNumber(getTokenPrice(pair.tokenA.symbol, '1') ?? 0)
    return { poolPair: pair, tokenPrice: tokenPrice }
  })

  const sortedData = useCallback(
    () => SortData({
      poolPairsPrices: poolPairsPrices,
      sortKey,
      reverse: sortOrder === 'desc'
    }),
    [poolPairsPrices, sortKey, sortOrder]
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

      {sortedData().map(data => {
        return (
          <PoolPairsCard
            poolPair={data.poolPair}
            tokenPrice={data.tokenPrice}
            key={data.poolPair.id}
          />
        )
      })}
    </CardList>
  )
}

export function PoolPairsCard ({ poolPair, tokenPrice }: { poolPair: PoolPairData, tokenPrice: BigNumber }): JSX.Element {
  return (
    <CardList.Card testId='PoolPairsCard'>
      <CardList.Header path={`/dex/${poolPair.tokenA.displaySymbol}`}>
        <div className='font-medium text-gray-900'>
          <PoolPairSymbolLocal
            tokenA={poolPair.tokenA}
            tokenB={poolPair.tokenB}
            primarySymbolClassName='h-7 w-7'
            secondarySymbolClassName='ml-5 h-6 w-6'
            textClassName='ml-12'
            primaryTextClassName='font-medium dark:text-gray-100'
            secondaryTextClassName='text-gray-400'
          />
        </div>
      </CardList.Header>

      <CardList.List>
        <CardList.ListItem
          title='Primary Token Price (USD)'
          titleClassNames='text-sm'
          testId='PoolPairsCard.CardList.TokenPrice'
        >
          <NumberFormat
            value={tokenPrice.isGreaterThan(100) ? tokenPrice.toFixed(0, BigNumber.ROUND_HALF_UP) : tokenPrice.toFixed(2, BigNumber.ROUND_HALF_UP)}
            displayType='text'
            thousandSeparator
            prefix='$'
          />
        </CardList.ListItem>
        <CardList.ListItem
          title='Volume (24H)'
          titleClassNames='text-sm'
          testId='PoolPairsCard.CardList.24hVolume'
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
          title='Total Liquidity'
          titleClassNames='text-sm'
          testId='PoolPairsCard.CardList.TotalLiquidity'
        >
          {poolPair.totalLiquidity.usd !== undefined ? (
            <MoreHoverPopover className='ml-1' description={<TotalLiquidityInfo tokenA={poolPair.tokenA} tokenB={poolPair.tokenB} />} placement='left'>
              <NumberFormat
                value={poolPair.totalLiquidity.usd}
                displayType='text'
                thousandSeparator
                decimalScale={0}
                prefix='$'
              />
            </MoreHoverPopover>
          ) : (
            <div className='text-yellow-500'>
              Error
            </div>
          )}
        </CardList.ListItem>
        <CardList.ListItem
          title='APR'
          titleClassNames='text-sm'
          testId='PoolPairsCard.CardList.APR'
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
