import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { PoolPairData, PoolSwapData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { SwapCards } from './_components/SwapCards'
import { PoolPairDetails } from './_components/PoolPairDetails'
import { SwapTable } from './_components/SwapTable'
import { PoolPairDetailsBar } from './_components/PoolPairDetailsBar'
import { useState } from 'react'
import classNames from 'classnames'
import { IoMdCheckmark } from 'react-icons/io'

interface PoolPairPageProps {
  poolpair: PoolPairData
  swaps: {
    items: PoolSwapData[]
    pages: CursorPage[]
  }
}

export default function PoolPairPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [typeSelection, setTypeCurrentSelection] = useState<string>('All')

  const types = [
    'All',
    `${props.poolpair.tokenA.displaySymbol} to ${props.poolpair.tokenB.displaySymbol}`,
    `${props.poolpair.tokenB.displaySymbol} to ${props.poolpair.tokenA.displaySymbol}`
  ]
  return (
    <>
      <Head
        title='DEX'
        description='Supply liquidity to BTC, ETH, USDT, USDC and many other pool pairs to power the Decentralized Exchange. Earn fees and block rewards in return for providing liquidity to the pool, you can withdraw your liquidity at any time.'
      />
      <Container className='pt-12 pb-20'>
        <PoolPairDetailsBar poolpair={props.poolpair} />
        <div className='flex flex-wrap space-y-12 lg:space-y-0 lg:flex-nowrap mt-8'>
          <div className='lg:mr-4 w-full lg:w-1/4 min-w-[320px]'>
            <h3 className='text-lg font-semibold'>
              Pool Details
            </h3>
            <PoolPairDetails poolpair={props.poolpair} />
          </div>
          <div className='w-full lg:w-3/4 overflow-hidden'>
            <div className='flex flex-wrap items-center justify-between'>
              <h3 className='text-lg font-semibold'>
                Swap History
              </h3>
              <div className='flex w-full lg:max-w-max flex-wrap -mx-3 ' data-testid='FeedFilter.Types'>
                {types.map(type => (
                  <div
                    className='flex items-center mx-3  cursor-pointer'
                    onClick={() => setTypeCurrentSelection(type)}
                    key={type}
                    data-testid='FeedFilter.Types'
                  >
                    <span className={classNames('rounded border-2 mr-2', typeSelection === type ? 'text-white bg-primary-500 border-primary-500' : 'border-gray-300 ')}>
                      <IoMdCheckmark className='text-white p-0 m-0 w-4 h-4' />
                    </span>
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='hidden md:block'>
              <SwapTable swaps={props.swaps.items} />
            </div>
            <div className='my-6 md:hidden'>
              <SwapCards swaps={props.swaps.items} />
            </div>
            <div className='flex justify-end mt-8'>
              <CursorPagination pages={props.swaps.pages} path={`/dex/${props.poolpair.id}`} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PoolPairPageProps>> {
  const poolpairId = context.params?.poolpairId?.toString().trim() as string
  const api = getWhaleApiClient(context)

  const next = CursorPagination.getNext(context)
  const swaps = await api.poolpairs.listPoolSwapsVerbose(poolpairId, 10, next)

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
