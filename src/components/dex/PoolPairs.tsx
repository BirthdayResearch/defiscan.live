import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React from 'react'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'

export function PoolPairsTable ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
  return (
    <AdaptiveTable>
      <AdaptiveTable.Header>
        <AdaptiveTable.Head>PAIR</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>TOTAL LIQUIDITY</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>VOLUME (24H)</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>LIQUIDITY</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>PRICE RATIO</AdaptiveTable.Head>
        <AdaptiveTable.Head>
          <div className='flex items-center justify-end'>
            <div>APR</div>
            <InfoHoverPopover description='APR includes commission.' className='ml-1' />
          </div>
        </AdaptiveTable.Head>
      </AdaptiveTable.Header>

      {poolPairs.map((data) => (
        <PoolPairRow key={data.id} data={data} />
      ))}
    </AdaptiveTable>

  )
}

function PoolPairRow ({ data }: { data: PoolPairData }): JSX.Element {
  if (data.symbol === 'BURN-DFI') {
    return <></>
  }

  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='PAIR' className='align-middle'>
        <PoolPairSymbol
          poolPairId={data.id} symbolSizeClassName='h-8 w-8'
          symbolMarginClassName='ml-5' textClassName='ml-16 font-medium'
        />
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='TOTAL LIQUIDITY' className='align-middle lg:text-right'>
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
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='VOLUME (24H)' className='align-middle lg:text-right'>
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
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='LIQUIDITY' className='align-middle lg:text-right'>
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
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='PRICE RATIO' className='align-middle lg:text-right'>
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
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='APR' className='align-middle lg:text-right'>
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
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}

function APRInfo (props: {
  total: number
  reward: number
  commission: number
}): JSX.Element {
  return (
    <div
      className='font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md w-48'
    >
      <div className='border-b-2 border-gray-200'>
        <div className='p-3'>
          <div className='font-medium text-gray-400'>Total APR</div>
          <div className='font-medium text-lg'>
            <NumberFormat
              value={props.total * 100}
              displayType='text'
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              suffix='%'
            />
          </div>
        </div>
      </div>
      <div className='px-3 pt-3'>
        <div className='font-medium text-base inline-block'>
          <NumberFormat
            value={props.reward * 100}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            suffix='%'
          />
        </div>
        <span className='ml-1 font-medium text-gray-400'>Reward</span>
      </div>
      <div className='px-3 pt-1 pb-3'>
        <div className='font-medium text-base inline-block'>
          <NumberFormat
            value={props.commission * 100}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            suffix='%'
          />
        </div>
        <span className='ml-1 font-medium text-gray-400'>Commission</span>
      </div>
    </div>
  )
}
