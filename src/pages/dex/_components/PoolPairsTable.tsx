import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import NumberFormat from 'react-number-format'
import React, { useCallback, useState } from 'react'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { OverflowTable } from '@components/commons/OverflowTable'
import { APRInfo } from './APRInfo'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import { Link } from '@components/commons/link/Link'
import { useTokenPrice } from '../../vaults/hooks/TokenPrice'
import { TotalLiquidityInfo } from './TotalLiquidityInfo'

export enum SortKeys {
  VOLUME = 'volume',
  TOTAL_LIQUIDITY = 'totalLiquidity',
  APR = 'apr'
}

export type SortOrder = 'asc' | 'desc'

export function PoolPairsTable ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
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

  function changeSort (key: SortKeys): void {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    setSortKey(key)
  }

  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title='Pair' />
        <OverflowTable.Head title='Token Price (USD)' alignRight />
        <OverflowTable.Head title='Volume (24H)' alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.VOLUME}
            onClick={() => changeSort(SortKeys.VOLUME)}
            sortOrder={sortOrder}
            sortKey={sortKey}
          />
        </OverflowTable.Head>
        <OverflowTable.Head title='Total Liquidity' alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.TOTAL_LIQUIDITY}
            onClick={() => changeSort(SortKeys.TOTAL_LIQUIDITY)}
            sortOrder={sortOrder}
            sortKey={sortKey}
          />
        </OverflowTable.Head>
        <OverflowTable.Head title='APR' infoDesc='APR includes commission.' alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.APR}
            onClick={() => changeSort(SortKeys.APR)}
            sortOrder={sortOrder}
            sortKey={sortKey}
          />
        </OverflowTable.Head>
      </OverflowTable.Header>
      {sortedData().map((data) => (
        <Link href={{ pathname: `/dex/${data.tokenA.displaySymbol}` }} key={data.id}>
          <a className='contents'>
            <PoolPairRow data={data} />
          </a>
        </Link>
      ))}
    </OverflowTable>

  )
}

export function sortData ({
  poolPairs,
  sortKey,
  reverse
}: {
  poolPairs: PoolPairData[]
  sortKey: string
  reverse: boolean
}): PoolPairData[] {
  if (sortKey === undefined) {
    return poolPairs
  }

  const sortedData = poolPairs.sort((a, b) => {
    switch (sortKey) {
      case SortKeys.VOLUME:
        return (a.volume?.h24 ?? 0) - (b.volume?.h24 ?? 0)
      case SortKeys.APR:
        return (a.apr?.total ?? 0) - (b.apr?.total ?? 0)
      case SortKeys.TOTAL_LIQUIDITY:
        return Number(a.totalLiquidity?.usd ?? 0) - Number(b.totalLiquidity?.usd ?? 0)
      default:
        return b[sortKey] - a[sortKey]
    }
  })

  if (reverse) {
    return sortedData.reverse()
  }

  return sortedData
}

function PoolPairRow ({ data }: { data: PoolPairData }): JSX.Element {
  const { getTokenPrice } = useTokenPrice()
  if (data.symbol === 'BURN-DFI') {
    return <></>
  }

  return (
    <OverflowTable.Row className='hover:text-primary-500'>
      <OverflowTable.Cell className='align-middle'>
        <PoolPairSymbolLocal
          tokenA={data.tokenA}
          tokenB={data.tokenB}
          symbolSizeClassName='h-8 w-8'
          symbolMarginClassName='ml-5'
          textClassName='ml-16 font-medium'
          primaryTextClassName='font-semibold'
          secondaryTextClassName='text-gray-400'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle text-right'>
        {(() => {
          const tokenPrice = getTokenPrice(data.tokenA.symbol, '1').toString()
          return (
            <NumberFormat
              value={tokenPrice}
              displayType='text'
              thousandSeparator
              fixedDecimalScale
              decimalScale={Number(tokenPrice) >= 1 ? 0 : 3}
              prefix='$'
            />
          )
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle lg:text-right'>
        {data.volume?.h24 !== undefined ? (
          <NumberFormat
            value={data.volume?.h24}
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
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle lg:text-right'>
        {data.totalLiquidity.usd !== undefined ? (
          <div className='flex justify-end'>

            <MoreHoverPopover className='ml-1' description={<TotalLiquidityInfo tokenA={data.tokenA} tokenB={data.tokenB} />} placement='bottom'>
              <NumberFormat
                value={data.totalLiquidity.usd}
                displayType='text'
                thousandSeparator
                decimalScale={0}
                prefix='$'
              />
            </MoreHoverPopover>
          </div>
        ) : (
          <div className='text-yellow-500'>
            Error
          </div>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
        {(() => {
          if (data.apr !== undefined) {
            return (
              <div className='flex justify-end'>
                <MoreHoverPopover className='ml-1' description={<APRInfo {...data.apr} />} placement='bottom'>
                  <NumberFormat
                    value={data.apr.total * 100}
                    displayType='text'
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    suffix='%'
                  />
                </MoreHoverPopover>
              </div>
            )
          } else {
            return (
              <div className='text-yellow-500'>
                Error
              </div>
            )
          }
        })()}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
