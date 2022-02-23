import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import React from 'react'

export function PoolPairsTable ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
  return (
    <AdaptiveTable>
      <AdaptiveTable.Header>
        <AdaptiveTable.Head>PAIR</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>TOTAL LIQUIDITY</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>VOLUME (24H)</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>VOLUME (30D)</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>LIQUIDITY</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>PRICE RATIO</AdaptiveTable.Head>
        <AdaptiveTable.Head>
          <div className='flex items-center justify-end'>
            <div>APR</div>
            <HoverPopover
              popover='APR includes commission.'
            >
              <div className='p-1 cursor-help'>
                <IoAlertCircleOutline
                  className='h-4 w-4'
                />
              </div>
            </HoverPopover>
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
      <AdaptiveTable.Cell title='VOLUME (30D)' className='align-middle lg:text-right'>
        {data.volume?.d30 !== undefined ? (
          <NumberFormat
            value={data.volume?.d30}
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
              <NumberFormat
                value={data.apr.total * 100}
                displayType='text'
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                suffix=' %'
              />
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
