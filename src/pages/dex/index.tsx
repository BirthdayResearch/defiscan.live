import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { getAssetIcon } from '@components/icons/assets'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { poolpairs } from '@defichain/whale-api-client'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { RootState } from '@store/index'
import BigNumber from 'bignumber.js'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { IoAlertCircle } from 'react-icons/io5'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'

interface DexPageProps {
  poolPairs: {
    items: poolpairs.PoolPairData[]
    pages: CursorPage[]
  }
}

export default function DexPage ({ poolPairs }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const tvl = useSelector((state: RootState) => state.stats.tvl.dex)

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Head
        title='DEX'
        description='Supply liquidity to BTC, ETH, USDT, USDC and many other pool pairs to power the Decentralized Exchange. Earn fees and block rewards in return for providing liquidity to the pool, you can withdraw your liquidity at any time.'
      />
      <div>
        <h1 className='text-2xl font-semibold'>Decentralized Exchange</h1>
        {tvl !== undefined && (
          <div className='mt-1'>
            <h3 className='text-sm font-medium'>Total Value Locked:</h3>
            <NumberFormat
              className='font-medium text-black opacity-80'
              value={tvl}
              displayType='text'
              decimalScale={0}
              thousandSeparator
              prefix='$'
            />
          </div>
        )}
      </div>

      <div className='mt-12'>
        <h1 className='text-xl font-semibold'>DEX Pool Pairs</h1>

        <AdaptiveTable className='mt-6'>
          <AdaptiveTable.Header>
            <AdaptiveTable.Head>PAIR</AdaptiveTable.Head>
            <AdaptiveTable.Head className='text-right'>TOTAL LIQUIDITY</AdaptiveTable.Head>
            <AdaptiveTable.Head className='text-right'>LIQUIDITY</AdaptiveTable.Head>
            <AdaptiveTable.Head className='text-right'>PRICE RATIO</AdaptiveTable.Head>
            <AdaptiveTable.Head>
              <div className='flex items-center justify-end'>
                <div>APR</div>
                <HoverPopover description='On defiscan.live, only block rewards are included in the APR calculation. With commission, the expected APR is much higher. We will update this soon.'>
                  <div className='p-1 cursor-help'>
                    <IoAlertCircle className='h-4 w-4 text-black opacity-60 group-hover:text-primary group-hover:opacity-100' />
                  </div>
                </HoverPopover>
              </div>
            </AdaptiveTable.Head>
          </AdaptiveTable.Header>

          {poolPairs.items.map((data) => (
            <PoolPairRow key={data.id} data={data} />
          ))}
        </AdaptiveTable>

        <div className='flex justify-end mt-8'>
          <CursorPagination pages={poolPairs.pages} path='/dex' />
        </div>
      </div>
    </div>
  )
}

function PoolPairRow ({ data }: { data: PoolPairData }): JSX.Element {
  const [symbolA, symbolB] = data.symbol.split('-')
  const IconA = getAssetIcon(symbolA)
  const IconB = getAssetIcon(symbolB)

  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='PAIR' className='align-middle'>
        <div className='flex items-center'>
          <IconB className='absolute h-8 w-8 ml-6' />
          <IconA className='absolute h-8 w-8' />
          <div className='font-medium ml-16 pl-1'>
            {data.symbol}
          </div>
        </div>
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
            value={new BigNumber(data.priceRatio.ab).toPrecision(4).toString()}
            displayType='text'
            thousandSeparator
            suffix={` ${symbolA}/${symbolB}`}
          />
        </div>
        <div>
          <NumberFormat
            value={new BigNumber(data.priceRatio.ba).toPrecision(4).toString()}
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

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<DexPageProps>> {
  const next = CursorPagination.getNext(context)
  const items = await getWhaleApiClient(context).poolpairs.list(30, next)
  return {
    props: {
      poolPairs: {
        items: items,
        pages: CursorPagination.getPages(context, items)
      }
    }
  }
}
