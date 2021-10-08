import { useSelector } from 'react-redux'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'
import { formatDistanceToNow } from 'date-fns'
import {
//  IoCaretUp,
//  IoSearchOutline,
  IoChevronForward
} from 'react-icons/io5'

import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'

import { getWhaleApiClient } from '@contexts/WhaleContext'

import { Container } from '@components/commons/Container'
import { ExternalLink, InternalLink } from '@components/index/Link'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { Banner } from '@components/index/Banner'
import { Summary } from '@components/index/Summary'
import { StatItem } from '@components/index/StatItem'
import { BlockDetails } from '@components/index/BlockDetails'
import { TransactionDetails } from '@components/index/TransactionDetails'
import { LiquidityPool } from '@components/index/LiquidityPool'
import { NumberFormat } from '@components/index/NumberFormat'

import { RootState } from '@store/index'

import { enUSShort } from '@utils/locale/en-US-short'

interface HomePageProps {
  blocks: Block[]
  transactions: Transaction[]
  liquidityPools: PoolPairData[]
}

function BlocksList ({ blocks }: { blocks: Block[]}): JSX.Element {
  return (
    <div className='w-166 overflow-hidden'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold leading-6'>Blocks</h1>
        <InternalLink
          testId='view-all-blocks-link'
          pathname='/blocks'
        >
          <div className='flex items-center'>
            VIEW ALL BLOCKS <IoChevronForward size={18} className='ml-px inline' />
          </div>
        </InternalLink>
      </div>
      <div className='mt-6 w-full box-content space-y-1'>
        {
          blocks.map((block) => {
            return (
              <BlockDetails
                key={block.id}
                height={block.height.toString()}
                mintedBy={block.minter}
                transactionCount={block.transactionCount}
                age={formatDistanceToNow(block.medianTime * 1000, { locale: enUSShort })}
              />
            )
          })
        }
      </div>
      <InternalLink pathname='/blocks'>
        <button
          type='button'
          className='text-primary-500 hover:text-primary-500 w-full mt-2 py-3 border border-gray-200'
          data-testid='view-all-blocks-button'
        >
          VIEW ALL BLOCKS
        </button>
      </InternalLink>

    </div>
  )
}

function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  return (
    <div className='w-166 overflow-hidden'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold leading-6'>
          Transactions
        </h1>
        <ExternalLink
          url='https://mainnet.defichain.io/#/DFI/mainnet/home'
          testId='latest-transactions-link'
        >
          <div className='flex items-center'>
            LATEST TRANSACTIONS <IoChevronForward size={18} className='ml-px inline' />
          </div>
        </ExternalLink>
      </div> {/* end of blocks */}
      <div className='mt-6 h-166 overflow-y-auto w-full pr-4 box-content space-y-2'>
        {
          transactions.map(t => {
            return (
              <TransactionDetails
                key={t.hash}
                hash={t.txid}
                age={formatDistanceToNow(t.block.medianTime * 1000, { locale: enUSShort })}
                from=''
                to=''
                confirmations={
                  blocks !== undefined ? blocks - t.block.height : blocks
                }
                totalVoutValue={t.totalVoutValue}
              />
            )
          })
        }
      </div>
      <ExternalLink url='https://mainnet.defichain.io/#/DFI/mainnet/home' testId='latest-transactions-button'>
        <button
          type='button'
          className='text-primary-500 hover:text-primary-500 w-full h-12 border border-gray-200'
        >
          LATEST TRANSACTIONS
        </button>
      </ExternalLink>

    </div>
  )
}

function Stats (props: { blocks: Block[] }): JSX.Element {
  const {
    count: { blocks: blockCount },
    burned: {
      total,
      emission
    }
  } = useSelector((state: RootState) => state.stats)
  return (
    <div className='mt-12'>
      <div className='flex flex-wrap gap-x-4  gap-y-1'>
        {/* <StatItem label='24h Volume:'> */}
        {/*   - */}
        {/* </StatItem> */}
        <StatItem label='Blocks:' testId='stat-blocks'>
          <NumberFormat
            value={blockCount}
          />
        </StatItem>
        {/* <StatItem label='Burn Rate:'> */}
        {/*   - per block */}
        {/* </StatItem> */}
        <StatItem label='Total DFI Burned:' testId='stat-total-dfi-burned'>
          <UnitSuffix
            value={total as number}
            units={{ 0: 'K', 3: 'M', 6: 'B', 9: 'T' }}
          />
        </StatItem>
        {/* <StatItem label='Tokens:'> */}
        {/*   -                        */}
        {/* </StatItem>                */}
        <StatItem label='Difficulty:' testId='stat-difficulty'>
          <UnitSuffix
            value={props.blocks[0].difficulty}
            units={{ 0: 'K', 3: 'M', 6: 'B', 9: 'T' }}
          />
        </StatItem>
        <StatItem label='Emission Rate:' testId='stat-emission-rate'>
          <NumberFormat
            value={emission}
            decimalScale={2}
          />
        </StatItem>

      </div>
    </div>
  )
}

export default function HomePage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container>
      <Banner />
      <Summary />
      <Stats {...props} />

      <div className='mt-20'>
        <div className='pt-2 flex justify-between flex-wrap gap-y-4'>
          <BlocksList {...props} />
          <TransactionsList {...props} />
        </div>
      </div>
      <div className='mt-12' data-testid='liquidity-pools'>
        <div className='flex justify-between'>
          <h1 className='text-xl leading-8 font-semibold' data-testid='liquidity-pools-title'>Liquidity Pools</h1>
          {/* <ExternalLink */}
          {/*   url='https://mainnet.defichain.io/#/DFI/mainnet/home' */}
          {/* > */}
          {/*   <div className='flex items-center'> */}
          {/*     VIEW FULL DETAILS <IoChevronForward size={18} className='ml-px inline' /> */}
          {/*   </div> */}
          {/* </ExternalLink> */}
        </div>
        <div className='mt-6 flex flex-wrap gap-x-4 gap-y-6 justify-center sm:justify-start'>
          {
            props.liquidityPools.map(pool => {
              return (
                <LiquidityPool
                  key={pool.symbol}
                  poolSymbol={pool.symbol}
                  apr={pool.apr != null ? pool.apr.total * 100 : undefined}
                  totalLiquidity={pool.totalLiquidity.usd !== undefined ? pool.totalLiquidity.usd : ''}
                  priceRatio={pool.priceRatio.ba}
                  tokenASymbol={pool.tokenA.symbol}
                  tokenBSymbol={pool.tokenB.symbol}
                />
              )
            })
          }
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> {
  const api = getWhaleApiClient(context)
  const blocks = await api.blocks.list(10)

  /* @TODO (aikchun) get latest transactions */
  const transactions = await api.blocks.getTransactions(blocks[0].id)

  const liquidityPools = await api.poolpairs.list()

  return {
    props: {
      blocks,
      transactions,
      liquidityPools
    }
  }
}
