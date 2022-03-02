import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React from 'react'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { OverflowTable } from '@components/commons/OverflowTable'
import { APRInfo } from './APRInfo'
import { Link } from '@components/commons/link/Link'

export function PoolPairsTable ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title='Pair' />
        <OverflowTable.Head title='Total Liquidity' alignRight />
        <OverflowTable.Head title='Volume (24H)' alignRight />
        <OverflowTable.Head title='Liquidity' alignRight />
        <OverflowTable.Head title='Price Ratio' alignRight />
        <OverflowTable.Head title='APR' infoDesc='APR includes commission.' alignRight />
      </OverflowTable.Header>

      {poolPairs.map((data) => (
        <Link href={{ pathname: `/dex/${data.id}` }} key={data.id}>
          <a className='contents'>
            <PoolPairRow data={data} />
          </a>
        </Link>
      ))}
    </OverflowTable>

  )
}

function PoolPairRow ({ data }: { data: PoolPairData }): JSX.Element {
  if (data.symbol === 'BURN-DFI') {
    return <></>
  }

  return (
    <OverflowTable.Row>
      <OverflowTable.Cell className='align-middle'>
        <PoolPairSymbol
          poolPairId={data.id} symbolSizeClassName='h-8 w-8'
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
