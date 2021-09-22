import classnames from 'classnames'
import { ReactNode, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'
import { formatDistanceToNow } from 'date-fns'
import { IoCaretUp, IoSearchOutline, IoChevronForward, IoTimeOutline } from 'react-icons/io5'
import NumberFormat from 'react-number-format'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { RootState } from '@store/index'
import { Container } from '@components/commons/Container'
import { Link } from '@components/commons/Link'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'

interface HomePageProps {
  blocks: Block[]
  transactions: Transaction[]
  liquidityPools: PoolPairData[]
}

function Banner (): JSX.Element {
  return (
    <div className='h-52 flex flex-col items-center'>
      <div className='pt-11'>
        <h1 className='text-4xl font-semibold'>DeFiChain Blockchain Explorer</h1>
      </div>
      <div className='mt-6 w-9/12'>
        <div className='flex'>
          <div className='rounded-l-full h-12 border-primary-100 w-12 border-t border-l border-b flex justify-center items-center'><IoSearchOutline size={17} className='text-gray-400' /></div>
          <input
            className='text-lg text-gray-600 placeholder-gray-400 rounded-r-full border-primary-100 h-12 border-t border-r border-b w-full focus:outline-none'
            placeholder='Search by address / Txn hash / Block / Token'
          />
        </div>

      </div>
    </div>
  )
}

function SummaryCard ({ children }: PropsWithChildren<{ children: ReactNode }>): JSX.Element {
  return (
    <div className='border border-gray-50 rounded-lg shadow-lg flex-1 h-64 pt-6 px-7 pb-7'>
      {children}
    </div>
  )
}

function SummaryCardTitle ({ children }: PropsWithChildren<{children: ReactNode}>): JSX.Element {
  return (
    <div className='text-lg text-gray-500 leading-6'>{children}</div>
  )
}

function SummaryCardHeader ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
  return (
    <div className={classnames('text-2xl text-gray-900 leading-8 flex items-center', className)}>{children}</div>
  )
}

function SummaryCardSubHeader ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
  return (
    <div className={classnames('text-xs text-gray-500 leading-4', className)}>{children}</div>
  )
}

function SummaryCardHeadModifier ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
  return <span className={classnames('text-base ml-3', className)}>{children}</span>
}

function Summary (): JSX.Element {
  return (
    <div className='mt-12'>
      <span className='text-xl font-semibold'>DeFiChain in numbers</span>
      <div className='flex mt-4 gap-x-4'>
        <SummaryCard>
          <SummaryCardTitle>Price</SummaryCardTitle>
          <SummaryCardHeader className='text-4xl leading-10'>$2.97<SummaryCardHeadModifier className='text-green-500'><IoCaretUp className='inline' /> 23.10%</SummaryCardHeadModifier></SummaryCardHeader>
          <SummaryCardSubHeader>Updated 50 minutes ago</SummaryCardSubHeader>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardTitle>Total Value Locked</SummaryCardTitle>
          <SummaryCardHeader>$999,999,999</SummaryCardHeader>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardTitle>Masternodes</SummaryCardTitle>
          <SummaryCardHeader>222,397,682 DFI</SummaryCardHeader>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardTitle>Transaction Activity</SummaryCardTitle>
          <SummaryCardHeader>11,106,158,292,201</SummaryCardHeader>
        </SummaryCard>
      </div>
    </div>
  )
}

function Stats (): JSX.Element {
  return (
    <div className='mt-12'>
      <div className='flex flex-wrap gap-x-4  gap-y-1'>
        <StatItem label='24h Volume:' value='999,999,999,999 USD' />
        <StatItem label='Blocks:' value='999,999,999,999' />
        <StatItem label='Burn Rate:' value='130.75 per block' />
        <StatItem label='Total DFI Burned:' value='2,202K DFI' />
        <StatItem label='Tokens:' value='80' />
        <StatItem label='Difficulty:' value='627,982.46 GH/s' />
        <StatItem label='Emission Rate:' value='999,999,999,999' />
      </div>
    </div>
  )
}

function StatItem ({ label, value }: { label: string, value: string }): JSX.Element {
  return (
    <div className='flex gap-x-8'>
      <div className='text-black w-36 text-ms'>{label}</div>
      <div className='w-44 text-black text-ms font-semibold'>{value}</div>
    </div>
  )
}

function BlockDetails ({ height, medianTime, mintedBy, transactionCount }: {height: string, medianTime: number, mintedBy?: string, transactionCount: number}): JSX.Element {
  return (
    <div className='h-20 border border-gray-200 p-4 flex'>
      <div className='flex flex-col'>
        <span className='text-xl text-gray-900 font-semibold'>#{height}</span>
        <div className='text-xs text-opacity-40 text-black font-medium flex gap-x-1.5 mt-1'><IoTimeOutline size={15} /><span>{formatDistanceToNow(medianTime * 1000)} ago</span></div>
      </div>
      <div className='ml-8'>
        <div className='text-sm leading-5 flex gap-x-6'>
          <span className='text-right w-28 text-gray-400'>
            Minted by:
          </span>
          <span>
            {mintedBy}
          </span>
        </div>
        <div className='text-sm leading-5 flex gap-x-6'>
          <span className='text-right w-28 text-gray-400'>
            Transactions:
          </span>
          <span className=''>
            {transactionCount} Txns
          </span>
        </div>
      </div>
    </div>
  )
}

function TransactionDetails ({ hash, medianTime, from, to, confirmations }: {hash: string, medianTime: number, from: string, to: string, confirmations: number|undefined}): JSX.Element {
  return (
    <div className='h-40 border border-gray-200 p-4'>
      <div className='flex justify-between'>
        <div
          className='w-7/12 leading-6 text-gray-900 font-semibold overflow-ellipsis overflow-hidden'
        >
          {hash}
        </div>
        <div>
          <span
            className='ml-8 text-xs text-opacity-40 text-black font-medium mt-1'
          >
            <IoTimeOutline size={15} className='inline' />
            <span className='ml-1.5'>{formatDistanceToNow(medianTime * 1000)} ago</span>
          </span>
          <NumberFormat
            className='ml-1 h-5 text-xs leading-4 font-medium px-2 py-0.5 rounded bg-gray-100'
            value={24200.032}
            displayType='text'
            decimalScale={3}
            thousandSeparator
            suffix=' DFI'
          />
        </div>
      </div>
      <div className='mt-4'>
        <div className='flex gap-x-1.5 text-sm leading-5'>
          <span className='w-28 text-gray-400'>
            From:
          </span>
          <span className='overflow-hidden overflow-ellipsis'>
            {from}
          </span>
        </div>
        <div className='flex gap-x-1.5 mt-2 text-sm leading-5'>
          <span className='w-28 text-gray-400'>
            To:
          </span>
          <span className='overflow-hidden overflow-ellipsis'>
            {to}
          </span>
        </div>
        <div className='flex gap-x-1.5 mt-2 text-sm leading-5'>
          <span className='w-28 text-gray-400'>
            Confirmations:
          </span>
          <span className='overflow-hidden overflow-ellipsis'>
            {confirmations}
          </span>
        </div>
      </div>
    </div>
  )
}

function BlocksAndTransactions (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { blocks, transactions } = props

  const { count: { blocks: blockCount } } = useSelector((state: RootState) => state.stats)
  return (
    <div className='mt-10'>
      <div className='mt-12 flex gap-x-8'>
        <div className='flex-1'>
          <div className='flex justify-between'>
            <h1 className='text-xl font-semibold leading-6'>Blocks</h1>
            <Link href={{ pathname: '/blocks' }}>
              <a
                className={`
                font-medium 
                leading-6 
                cursor-pointer 
                text-primary-500 
                hover:text-primary-500 
                opacity-60 
                hover:opacity-100'`}
              >
                <div className='flex items-center'>
                  VIEW ALL BLOCKS <IoChevronForward size={18} className='ml-px inline' />
                </div>
              </a>
            </Link>
          </div>
          <div className='mt-6 flex flex-col gap-y-2 h-2/6 overflow-scroll'>
            {
              blocks.map((block) => {
                return (
                  <BlockDetails
                    key={block.id}
                    height={block.height.toString()}
                    mintedBy={block.minter}
                    transactionCount={block.transactionCount}
                    medianTime={block.medianTime}
                  />
                )
              })
            }
          </div>
          <Link href={{ pathname: '/blocks' }}>
            <a
              className={`
              font-medium 
              leading-6 
              cursor-pointer 
              text-primary-500 
              hover:text-primary-500 
              opacity-60 
              hover:opacity-100'`}
            >
              <button
                type='button'
                className='text-primary-500 hover:text-primary-500 w-full h-12 border border-gray-200 text-'
              >
                VIEW ALL BLOCKS
              </button>
            </a>
          </Link>
        </div>
        <div className='flex-1'>
          <div className='flex justify-between'>
            <h1 className='text-xl font-semibold leading-6'>Transactions</h1>
            <Link href={{ pathname: '/blocks' }}>
              <a
                className={`
                font-medium 
                leading-6 
                cursor-pointer 
                text-primary-500 
                hover:text-primary-500 
                opacity-60 
                hover:opacity-100'`}
              >
                <div className='flex items-center'>
                  LATEST TRANSACTIONS <IoChevronForward size={18} className='ml-px inline' />
                </div>
              </a>
            </Link>
          </div>
          <div className='mt-6 flex flex-col gap-y-2 h-2/6 overflow-scroll'>
            {
              transactions.map(t => {
                return (
                  <TransactionDetails
                    key={t.hash}
                    hash='4afe36e8222f84f9ba5ba1c6f259a6bd1fc1accebf704487c97383fbec7bf496'
                    medianTime={1632102904}
                    from=''
                    to=''
                    confirmations={
                    blockCount !== undefined ? blockCount - t.block.height : blockCount
                  }
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
function LiquidityPairCard ({ title, children }: PropsWithChildren<{ title: string, children: ReactNode }>): JSX.Element {
  return (
    <div className='p-6 border border-gray-300 w-80 h-40'>
      <div className='flex justify-between'>
        <div className='flex'>
          <div className='mr-2' />
          <h1 className='font-semibold text-lg leading-6'>{title}</h1>
        </div>
        <Link href={{ pathname: '/#' }}>
          <a
            className={`
            text-sm 
            font-medium 
            leading-4 
            cursor-pointer 
            text-primary-500 
            hover:text-primary-500 
            opacity-60 
            hover:opacity-100'`}
          >
            <div className='flex items-center'>
              VIEW<IoChevronForward size={15} className='ml-px inline' />
            </div>
          </a>
        </Link>
      </div>
      <div className='mt-4'>
        {children}
      </div>
    </div>
  )
}

function LiquidityCardStat ({ label, value }: {label: string, value: string}): JSX.Element {
  return (
    <div className='flex gap-x-4'>
      <div className='font-normal text-sm opacity-40 leading-5 w-24'>
        {label}:
      </div>
      <div className='text-sm leading-5'>{value}</div>
    </div>
  )
}

function LiquidityPools ({ liquidityPools }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='mt-12'>
      <div className='flex justify-between'>
        <h1 className='text-xl leading-8 font-semibold'>Liquidity Pools</h1>
        <Link href={{ pathname: '/#' }}>
          <a
            className={`
            font-medium 
            leading-6 
            cursor-pointer 
            text-primary-500 
            hover:text-primary-500 
            opacity-60 
            hover:opacity-100'`}
          >
            <div className='flex items-center'>
              VIEW FULL DETAILS <IoChevronForward size={18} className='ml-px inline' />
            </div>
          </a>
        </Link>
      </div>
      <div className='mt-6 flex flex-wrap gap-x-4 gap-y-6'>
        {
          liquidityPools.map(pool => {
            return (
              <LiquidityPairCard title={pool.symbol} key={pool.symbol}>
                <LiquidityCardStat label='APR' value={`${(pool.apr != null) ? pool.apr.total : '-'}%`} />
                <LiquidityCardStat label='Total Liquidity' value={`${pool.totalLiquidity.usd !== undefined ? pool.totalLiquidity.usd : ''} USD`} />
                <LiquidityCardStat label='Price Ratio' value={`${pool.priceRatio.ba} ${pool.tokenB.symbol}/${pool.tokenA.symbol}`} />
              </LiquidityPairCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default function HomePage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container>
      <Banner />
      <Summary />
      <Stats />
      <BlocksAndTransactions {...props} />
      <LiquidityPools {...props} />
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> {
  const api = getWhaleApiClient(context)
  const blocks = await api.blocks.list(30)

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
