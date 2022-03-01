import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React from 'react'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { OverflowTable } from '@components/commons/OverflowTable'

export function PoolPairsTable ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title='Pair' />
        <OverflowTable.Head title='Total Liquidity' alignRight />
        <OverflowTable.Head title='Volume (24H)' alignRight />
        <OverflowTable.Head title='Liquidity' alignRight />
        <OverflowTable.Head title='Price Ratio' alignRight />
        <OverflowTable.Head title='APR' alignRight infoDesc='APR includes commission.' />
      </OverflowTable.Header>

      {poolPairs.map((data) => (
        <PoolPairRow key={data.id} data={data} />
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
      <OverflowTable.Cell className='align-middle lg:text-right'>
        {(() => {
          if (data.apr !== undefined) {
            return (
              <div className='flex lg:justify-end'>
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

function APRInfo (props: {
  total: number
  reward: number
  commission: number
}): JSX.Element {
  return (
    <div
      className='font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md w-44'
    >
      <div className='p-3'>
        <div className='font-medium'>Total APR</div>
        <div className='flex mt-1'>
          <div className='w-1/2'>Reward</div>
          <div className='w-1/2 font-medium text-right'>
            <NumberFormat
              value={props.reward * 100}
              displayType='text'
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              suffix='%'
            />
          </div>
        </div>
        <div className='flex mt-0.5'>
          <div className='w-1/2'>Commission</div>
          <div className='w-1/2 font-medium text-right'>
            <NumberFormat
              value={props.commission * 100}
              displayType='text'
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              suffix='%'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
