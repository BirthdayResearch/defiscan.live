import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import React from 'react'
import { PoolPairData, PoolSwapData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { SwapCards } from './_components/SwapCards'
import { PoolPairDetails } from './_components/PoolPairDetails'
import { SwapTable } from './_components/SwapTable'
import { PoolPairSymbolLocal } from '@components/commons/token/PoolPairSymbolLocal'

interface PoolPairPageProps {
  poolpair: PoolPairData
  swaps: {
    items: PoolSwapData[]
    pages: CursorPage[]
  }
}

export default function PoolPairPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head
        title='DEX'
        description='Supply liquidity to BTC, ETH, USDT, USDC and many other pool pairs to power the Decentralized Exchange. Earn fees and block rewards in return for providing liquidity to the pool, you can withdraw your liquidity at any time.'
      />
      <Container className='pt-12 pb-20'>
        <h1 className='text-2xl font-medium mb-6'>
          <PoolPairSymbolLocal
            tokenA={props.poolpair.tokenA} tokenB={props.poolpair.tokenB} symbolSizeClassName='h-8 w-8'
            symbolMarginClassName='ml-5' textClassName='ml-16 font-medium'
          />
        </h1>

        <div className='flex flex-wrap -mx-6'>
          <div className='w-full lg:w-2/5 xl:w-1/4 px-6'>
            <PoolPairDetails poolpair={props.poolpair} />
          </div>

          {/* <div className='w-full mt-8 lg:mt-0 lg:w-3/5 xl:w-3/4 px-6'> */}
          {/*  <PoolPairGraph poolpair={props.poolpair} /> */}
          {/* </div> */}
        </div>

        <div className='border-b my-6 border-gray-100' />

        <h3 className='text-xl font-semibold'>
          Swap History
        </h3>

        <div className='my-6 hidden md:block'>
          <SwapTable swaps={props.swaps.items} />
        </div>

        <div className='my-6 md:hidden'>
          <SwapCards swaps={props.swaps.items} />
        </div>

        <div className='flex justify-end mt-8'>
          <CursorPagination pages={props.swaps.pages} path={`/dex/${props.poolpair.id}`} />
        </div>

      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PoolPairPageProps>> {
  const poolpairId = context.params?.poolpairId?.toString().trim() as string
  const api = getWhaleApiClient(context)

  const next = CursorPagination.getNext(context)
  const swaps = await api.poolpairs.listPoolSwapsVerbose(poolpairId, 20, next)

  return {
    props: {
      poolpair: await api.poolpairs.get(poolpairId),
      swaps: {
        items: swaps,
        pages: CursorPagination.getPages(context, swaps)
      }
    }
  }
}
