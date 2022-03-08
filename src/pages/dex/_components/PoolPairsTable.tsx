import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { OverflowTable } from '@components/commons/OverflowTable'
import { APRInfo } from './APRInfo'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'
import { Link } from '@components/commons/link/Link'

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
        <OverflowTable.Head title='Total Liquidity' alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.TOTAL_LIQUIDITY}
            onClick={() => changeSort(SortKeys.TOTAL_LIQUIDITY)}
            {...{
              sortOrder,
              sortKey
            }}
          />
        </OverflowTable.Head>
        <OverflowTable.Head title='Volume (24H)' alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.VOLUME}
            onClick={() => changeSort(SortKeys.VOLUME)}
            {...{
              sortOrder,
              sortKey
            }}
          />
        </OverflowTable.Head>
        <OverflowTable.Head title='Liquidity' alignRight />
        <OverflowTable.Head title='Price Ratio' alignRight />
        <OverflowTable.Head title='APR' infoDesc='APR includes commission.' alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.APR}
            onClick={() => changeSort(SortKeys.APR)}
            {...{
              sortOrder,
              sortKey
            }}
          />
        </OverflowTable.Head>
      </OverflowTable.Header>
      {sortedData().map((data) => (
        <Link href={{ pathname: `/dex/${data.id}` }} key={data.id}>
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

  const sortedData = poolPairs.map(value => ({
    sort: (
      sortKey === SortKeys.VOLUME
        ? value.volume?.h24 ?? 0
        : (sortKey === SortKeys.APR
            ? value.apr?.total ?? 0
            : Number.parseFloat(value.totalLiquidity.usd ?? '0'))
    ),
    value
  }))
    .sort((a, b) => a.sort - b.sort)
    .map(value => value.value)

  if (reverse) {
    return sortedData.reverse()
  }

  return sortedData
}

function PoolPairRow ({ data }: { data: PoolPairData }): JSX.Element {
  if (data.symbol === 'BURN-DFI') {
    return <></>
  }

  return (
    <OverflowTable.Row className='hover:text-primary-500'>
      <OverflowTable.Cell className='align-middle'>
        <PoolPairSymbolLocal
          tokenA={data.tokenA} tokenB={data.tokenB} symbolSizeClassName='h-8 w-8'
          symbolMarginClassName='ml-5' textClassName='ml-16 font-medium'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle lg:text-right'>
        {data.totalLiquidity.usd !== undefined ? (
          <NumberFormat
            value={data.totalLiquidity.usd}
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
        <div>
          <NumberFormat
            value={data.tokenA.reserve}
            displayType='text'
            thousandSeparator
            decimalScale={0}
            suffix={` ${data.tokenA.displaySymbol}`}
          />
        </div>
        <div>
          <NumberFormat
            value={data.tokenB.reserve}
            displayType='text'
            thousandSeparator
            decimalScale={0}
            suffix={` ${data.tokenB.displaySymbol}`}
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle lg:text-right'>
        <div>
          <NumberFormat
            value={Number(new BigNumber(data.priceRatio.ab).toPrecision(4))}
            displayType='text'
            thousandSeparator
            suffix={` ${data.tokenA.displaySymbol}/${data.tokenB.displaySymbol}`}
          />
        </div>
        <div>
          <NumberFormat
            value={Number(new BigNumber(data.priceRatio.ba).toPrecision(4))}
            displayType='text'
            thousandSeparator
            suffix={` ${data.tokenB.displaySymbol}/${data.tokenA.displaySymbol}`}
          />
        </div>
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
