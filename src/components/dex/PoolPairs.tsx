import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { IoAlertCircle } from 'react-icons/io5'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import React from 'react'

export function PoolPairsTable ({ poolPairs }: { poolPairs: PoolPairData[] }): JSX.Element {
  return (
    <AdaptiveTable>
      <AdaptiveTable.Header>
        <AdaptiveTable.Head>PAIR</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>TOTAL LIQUIDITY</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>LIQUIDITY</AdaptiveTable.Head>
        <AdaptiveTable.Head className='text-right'>PRICE RATIO</AdaptiveTable.Head>
        <AdaptiveTable.Head>
          <div className='flex items-center justify-end'>
            <div>APR</div>
            <HoverPopover
              popover='On defiscan.live, only block rewards are included in the APR calculation. With commission, the expected APR is much higher. We will update this soon.'
            >
              <div className='p-1 cursor-help'>
                <IoAlertCircle
                  className='h-4 w-4 text-black opacity-60 group-hover:text-primary-500 group-hover:opacity-100'
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
  const emissionTotal = useSelector((state: RootState) => state.stats.emission.total)
  const dfiPrice = useSelector((state: RootState) => state.stats.price.usdt)

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
          const percent = getPercent(data)
          if (percent === 0) {
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
          }

          const yearlyUSD = getYearlyCustomRewardUSD(percent, new BigNumber(dfiPrice ?? 0), new BigNumber(emissionTotal ?? 0))
          const total = yearlyUSD.div(data.totalLiquidity.usd ?? 1).toNumber()
          return (
            <NumberFormat
              value={total * 100}
              displayType='text'
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              suffix=' %'
            />
          )
        })()}
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}

function getPercent (data: PoolPairData): number {
  const reward = {
    17: 0.50000000,
    18: 0.10980000,
    25: 0.04990000,
    32: 0.02390000,
    33: 0.03350000,
    35: 0.02630000,
    36: 0.03780000,
    38: 0.07860000,
    39: 0.04790000,
    40: 0.01070000,
    41: 0.00960000,
    42: 0.02220000,
    43: 0.01080000,
    44: 0.00800000,
    45: 0.01440000,
    46: 0.01660000
  }
  return reward[data.id] ?? 0
}

function getYearlyCustomRewardUSD (percent: number, dfiPrice: BigNumber, emissionTotal: BigNumber): BigNumber {
  return new BigNumber(emissionTotal.multipliedBy(percent).multipliedBy(0.2468))
    .multipliedBy(60 * 60 * 24 / 30) // 30 seconds = 1 block
    .multipliedBy(365) // 1 year
    .multipliedBy(dfiPrice)
}
