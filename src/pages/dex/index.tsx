import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { getTokenIcon } from '@components/icons/tokens'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { poolpairs } from '@defichain/whale-api-client'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import BigNumber from 'bignumber.js'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import NumberFormat from 'react-number-format'

interface DexPageProps {
  poolPairs: {
    items: poolpairs.PoolPairData[]
    nextToken: string | null
  }
}

export default function DexPage ({ poolPairs }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [items] = useState(poolPairs.items)
  // const [nextToken, setNextToken] = useState(poolPairs.nextToken)

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <div>
        <h1 className='text-2xl font-semibold'>DEX Pool Pairs</h1>
      </div>

      <AdaptiveTable className='mt-6'>
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>PAIR</AdaptiveTable.Head>
          <AdaptiveTable.Head className='text-right'>TOTAL LIQUIDITY</AdaptiveTable.Head>
          <AdaptiveTable.Head className='text-right'>LIQUIDITY</AdaptiveTable.Head>
          <AdaptiveTable.Head className='text-right'>PRICE RATIO</AdaptiveTable.Head>
          <AdaptiveTable.Head className='text-right'>APR</AdaptiveTable.Head>
        </AdaptiveTable.Header>

        {items.map((data) => (
          <PoolPairRow key={data.id} data={data} />
        ))}
      </AdaptiveTable>
    </div>
  )
}

function PoolPairRow ({ data }: { data: PoolPairData }): JSX.Element {
  const [symbolA, symbolB] = data.symbol.split('-')
  const IconA = getTokenIcon(symbolA)
  const IconB = getTokenIcon(symbolB)

  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='PAIR' className='align-middle'>
        <div className='flex items-center'>
          <IconA className='absolute h-8 w-8' />
          <IconB className='absolute h-8 w-8 ml-5' />
          <div className='text-primary font-medium ml-16'>
            {data.symbol}
          </div>
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='TOTAL LIQUIDITY' className='align-middle lg:text-right'>
        <NumberFormat
          value={data.totalLiquidity.usd}
          displayType='text'
          thousandSeparator
          decimalScale={0}
          suffix=' USD'
        />
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
  const items = await getWhaleApiClient(context).poolpairs.list()
  return {
    props: {
      poolPairs: {
        items: items,
        nextToken: items.nextToken ?? null
      }
    }
  }
}
