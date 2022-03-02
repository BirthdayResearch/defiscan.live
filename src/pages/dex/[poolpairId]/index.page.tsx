import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import React from 'react'
import { PoolPairData, PoolSwap } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import { SwapTable } from './_components/SwapTable'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { DfTx, OP_DEFI_TX, toOPCodes } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { SmartBuffer } from 'smart-buffer'
import { SwapCards } from './_components/SwapCards'

export interface PoolSwapWithAddresses extends PoolSwap {
  addresses: {
    from?: string
    to?: string
  }
}

interface PoolPairPageProps {
  poolpair: PoolPairData
  swaps: {
    items: PoolSwapWithAddresses[]
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
          <PoolPairSymbol
            poolPairId={props.poolpair.id} symbolSizeClassName='h-8 w-8'
            symbolMarginClassName='ml-5' textClassName='ml-16 font-medium'
          />
        </h1>

        <div className='flex flex-wrap -mx-6'>
          <div className='w-full lg:w-1/3 px-6' />
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
  const swaps = await api.poolpairs.listPoolSwaps(poolpairId, 30, next)

  return {
    props: {
      poolpair: await api.poolpairs.get(poolpairId),
      swaps: {
        items: await Promise.all(await getSwapsWithAddresses()),
        pages: CursorPagination.getPages(context, swaps)
      }
    }
  }

  async function getSwapsWithAddresses (): Promise<Array<Promise<PoolSwapWithAddresses>>> {
    return swaps.map(async item => {
      const dftx = await getDfTx(item.txid)

      let from: string | undefined
      let to: string | undefined

      if (dftx !== undefined) {
        if (dftx.name === 'OP_DEFI_TX_POOL_SWAP') {
          from = dftx.data.fromScript !== undefined ? fromScript(dftx.data.fromScript, 'mainnet')?.address : undefined
          to = dftx.data.toScript !== undefined ? fromScript(dftx.data.toScript, 'mainnet')?.address : undefined
        } else {
          from = fromScript(dftx.data.poolSwap.fromScript, 'mainnet')?.address
          to = fromScript(dftx.data.poolSwap.toScript, 'mainnet')?.address
        }
      }

      return {
        ...item,
        addresses: {
          from: (from !== undefined ? from : undefined),
          to: (to !== undefined ? to : undefined)
        }
      }
    })
  }

  async function getDfTx (txid): Promise<DfTx<any> | undefined> {
    const vout = await api.transactions.getVouts(txid, 1)
    const hex = vout[0].script.hex
    const buffer = SmartBuffer.fromBuffer(Buffer.from(hex, 'hex'))
    const stack = toOPCodes(buffer)
    if (stack.length !== 2 || stack[1].type !== 'OP_DEFI_TX') {
      return undefined
    }
    return (stack[1] as OP_DEFI_TX).tx
  }
}
