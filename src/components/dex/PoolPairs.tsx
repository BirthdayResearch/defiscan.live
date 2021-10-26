import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { IoAlertCircle } from 'react-icons/io5'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'

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
  const [symbolA, symbolB] = data.symbol.split('-')

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
            suffix={` ${symbolA}`}
          />
        </div>
        <div>
          <NumberFormat
            value={data.tokenB.reserve}
            displayType='text'
            thousandSeparator
            decimalScale={0}
            suffix={` ${symbolB}`}
          />
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='PRICE RATIO' className='align-middle lg:text-right'>
        <div>
          <NumberFormat
            value={Number(new BigNumber(data.priceRatio.ab).toPrecision(4))}
            displayType='text'
            thousandSeparator
            suffix={` ${symbolA}/${symbolB}`}
          />
        </div>
        <div>
          <NumberFormat
            value={Number(new BigNumber(data.priceRatio.ba).toPrecision(4))}
            displayType='text'
            thousandSeparator
            suffix={` ${symbolB}/${symbolA}`}
          />
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='APR' className='align-middle lg:text-right'>
        {data.apr !== undefined ? (
          <NumberFormat
            value={data.apr.total * 100}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            suffix=' %'
          />
        ) : (
          <div className='text-yellow-500'>
            Error
          </div>
        )}
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}
