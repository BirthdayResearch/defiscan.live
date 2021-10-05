import classnames from 'classnames'
import { ReactNode, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'
import { formatDistanceToNow } from 'date-fns'
import USLocale from 'date-fns/locale/en-US'
import {
//  IoCaretUp,
//  IoSearchOutline,
  IoChevronForward,
  IoTimeOutline
} from 'react-icons/io5'
import NumberFormat from 'react-number-format'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { RootState } from '@store/index'
import { Container } from '@components/commons/Container'
import { Link } from '@components/commons/Link'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'

import { getAssetIcon } from '@components/icons/assets'
interface HomePageProps {
  blocks: Block[]
  transactions: Transaction[]
  liquidityPools: PoolPairData[]
}

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a sec',
    other: 'less than {{count}} secs'
  },

  xSeconds: {
    one: '1 sec',
    other: '{{count}} secs'
  },

  halfAMinute: 'half a min',

  lessThanXMinutes: {
    one: 'less than a min',
    other: 'less than {{count}} mins'
  },

  xMinutes: {
    one: '1 min',
    other: '{{count}} mins'
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },

  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },

  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },

  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
}

function formatDistance (
  token: string,
  count: number,
  options: {
    addSuffix?: boolean
    comparison?: -1 | 0 | 1
  }): string {
  let result: string

  const tokenValue = formatDistanceLocale[token]
  if (typeof tokenValue === 'string') {
    result = tokenValue
  } else if (count === 1) {
    result = tokenValue.one
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString())
  }

  if (options.comparison !== undefined && options.comparison > 0) {
    return 'in ' + result
  }

  return result + ' ago'
}

const locale = {
  ...USLocale,
  formatDistance
}

function Banner (): JSX.Element {
  return (
    <div className='h-52 flex flex-col items-center' style={{ backgroundImage: 'linear-gradient(to bottom left, #FFFFFF, #fff7f4,  #f7e6f0' }}>
      <div className='pt-11'>
        <h1 className='text-4xl font-semibold' data-testid='banner-title'>DeFiChain Blockchain Explorer</h1>
      </div>
      {/* <div className='mt-6 w-9/12'> */}
      {/*   <div className='flex'> */}
      {/*     <button type='button' className='rounded-l-full h-12 border-primary-100 w-12 border-t border-l border-b flex justify-center items-center bg-white'><IoSearchOutline size={17} className='text-gray-400' /></button> */}
      {/*     <input */}
      {/*       className='text-lg text-gray-600 placeholder-gray-400 rounded-r-full border-primary-100 h-12 border-t border-r border-b w-full focus:outline-none' */}
      {/*       placeholder='Search by address / Txn hash / Block / Token' */}
      {/*       data-testid='search' */}
      {/*     /> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  )
}

function SummaryCard ({ children, testId }: PropsWithChildren<{ children: ReactNode, testId?: string}>): JSX.Element {
  return (
    <div className='border border-gray-50 rounded-lg shadow-lg flex-1 h-64 pt-6 px-7 pb-7' data-testid={testId}>
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

// function SummaryCardSubHeader ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
//   return (
//     <div className={classnames('text-xs text-gray-500 leading-4', className)}>{children}</div>
//   )
// }

// function SummaryCardHeadModifier ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
//   return <span className={classnames('text-base ml-3', className)}>{children}</span>
// }

function Summary (): JSX.Element {
  const {
    count: {
      masternodes
    },
    tvl: {
      total
    },
    price: {
      usdt
    }
  } = useSelector((state: RootState) => state.stats)

  return (
    <div className='mt-12'>
      <span className='text-xl font-semibold'>DeFiChain in numbers</span>
      <div className='flex mt-4 gap-x-4'>
        <SummaryCard testId='summary-price'>
          <SummaryCardTitle>Price</SummaryCardTitle>
          <SummaryCardHeader className='text-4xl leading-10'>
            ${usdt}
            {/* <SummaryCardHeadModifier className='text-green-500'> */}
            {/*   <IoCaretUp className='inline' /> */}
            {/*     23.10% */}
            {/* </SummaryCardHeadModifier> */}
          </SummaryCardHeader>
          {/* <SummaryCardSubHeader>Updated 50 minutes ago</SummaryCardSubHeader> */}
        </SummaryCard>
        <SummaryCard testId='summary-tvl'>
          <SummaryCardTitle>Total Value Locked</SummaryCardTitle>
          <SummaryCardHeader>
            <NumberFormat
              value={total}
              displayType='text'
              decimalScale={2}
              thousandSeparator
              prefix='$'
            />
          </SummaryCardHeader>
        </SummaryCard>
        <SummaryCard testId='summary-masternodes'>
          <SummaryCardTitle>Masternodes</SummaryCardTitle>
          <SummaryCardHeader>{masternodes}</SummaryCardHeader>
        </SummaryCard>
        {/* @TODO (aikchun) - transaction activity */}
        {/* <SummaryCard> */}
        {/*   <SummaryCardTitle>Transaction Activity</SummaryCardTitle> */}
        {/*   <SummaryCardHeader>-</SummaryCardHeader> */}
        {/* </SummaryCard> */}
      </div>
    </div>
  )
}

function Stats (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { blocks } = props
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
            displayType='text'
            thousandSeparator
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
            value={blocks[0].difficulty}
            units={{ 0: 'K', 3: 'M', 6: 'B', 9: 'T' }}
          />
          GH/s
        </StatItem>
        <StatItem label='Emission Rate:' testId='stat-emission-rate'>
          <NumberFormat
            value={emission}
            displayType='text'
            decimalScale={2}
            thousandSeparator
          />
        </StatItem>

      </div>
    </div>
  )
}

function StatItem ({ label, children, testId }: PropsWithChildren<{ label: string, children: ReactNode, testId?: string }>): JSX.Element {
  return (
    <div className='flex gap-x-8 text-sm' data-testid={testId}>
      <div className='text-gray-400 w-36'>{label}</div>
      <div className='w-44 text-black font-semibold'>{children}</div>
    </div>
  )
}

function BlockDetails ({ height, medianTime, mintedBy, transactionCount }: {height: string, medianTime: number, mintedBy?: string, transactionCount: number}): JSX.Element {
  return (
    <div className='h-20 border border-gray-200 p-4 flex'>
      <div className='flex flex-col'>
        <span className='text-xl text-gray-900 font-semibold'>#{height}</span>
        <div className='text-xs text-opacity-40 text-black font-medium flex gap-x-1.5 mt-1'><IoTimeOutline size={15} /><span>{formatDistanceToNow(medianTime * 1000, { locale })}</span></div>
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
      <div className='w-full'>
        <span
          className='w-5/12 inline-block leading-6 text-gray-900 font-semibold overflow-ellipsis overflow-hidden'
        >
          {hash}
        </span>
        <span>
          <span
            className='text-xs text-opacity-40 text-black font-medium'
          >
            <IoTimeOutline size={15} className='inline' />
            <span className='ml-1.5'>{formatDistanceToNow(medianTime * 1000, { locale })}</span>
          </span>
          <NumberFormat
            className='h-5 text-xs leading-4 font-medium px-2 py-0.5 rounded bg-gray-100'
            value={24200.032}
            displayType='text'
            decimalScale={3}
            thousandSeparator
            suffix=' DFI'
          />
        </span>
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

function LiquidityPool (
  {
    poolSymbol,
    apr,
    totalLiquidity,
    priceRatio,
    tokenASymbol,
    tokenBSymbol
  }: {
    poolSymbol: string
    apr: number | undefined
    totalLiquidity: string
    priceRatio: string
    tokenASymbol: string
    tokenBSymbol: string
  }): JSX.Element {
  const SymbolBIcon = getAssetIcon(tokenBSymbol)
  const SymbolAIcon = getAssetIcon(tokenASymbol)
  return (

    <div className='p-6 border border-gray-300 w-80 h-40'>
      <div className='flex justify-between'>
        <div className='flex'>
          <div className='icons flex flex-row-reverse'>
            <SymbolBIcon className='h-6 w-6 -ml-2' />
            <SymbolAIcon className='h-6 w-6' />
          </div>
          <div className='mr-2' />
          <h1 className='font-semibold text-lg leading-6'>{poolSymbol}</h1>
        </div>
        {/* <Link href={{ pathname: '/#' }}> */}
        {/*   <a */}
        {/*     className={` */}
        {/*     text-sm  */}
        {/*     font-medium */}
        {/*     leading-4 */}
        {/*     cursor-pointer */}
        {/*     text-primary-500 */}
        {/*     hover:text-primary-500 */}
        {/*     opacity-60 */}
        {/*     hover:opacity-100'`} */}
        {/*   > */}
        {/*     <div className='flex items-center'> */}
        {/*       VIEW<IoChevronForward size={15} className='ml-px inline' /> */}
        {/*     </div> */}
        {/*   </a> */}
        {/* </Link> */}
      </div>
      <div className='mt-4'>
        <LiquidityCardStat label='APR'>
          <NumberFormat
            value={apr}
            displayType='text'
            decimalScale={2}
            thousandSeparator
            suffix='%'
          />
        </LiquidityCardStat>
        <LiquidityCardStat label='Total Liquidity'>
          <NumberFormat
            value={totalLiquidity}
            displayType='text'
            decimalScale={2}
            thousandSeparator
            suffix=' USD'
          />
        </LiquidityCardStat>
        <LiquidityCardStat
          label='Price Ratio'
        >
          <NumberFormat
            value={priceRatio}
            displayType='text'
            decimalScale={2}
            thousandSeparator
            suffix={` ${tokenBSymbol}/${tokenASymbol}`}
          />
        </LiquidityCardStat>
      </div>
    </div>

  )
}

function BlocksList ({ blocks }: { blocks: Block[]}): JSX.Element {
  return (
    <div className='w-5/12 min-w-min'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold leading-6'>Blocks</h1> {/* start of title and link */}
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
            <div className='flex items-center' data-testid='view-all-blocks-link'>
              VIEW ALL BLOCKS <IoChevronForward size={18} className='ml-px inline' />
            </div>
          </a>
        </Link>
      </div>
      <div className='mt-6 h-166 min-h-0 overflow-y-auto'>
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
            data-testid='view-all-blocks-button'
          >
            VIEW ALL BLOCKS
          </button>
        </a>
      </Link>
    </div>
  )
}

function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  return (
    <div className='w-5/12 min-w-min'>
      <div className='flex justify-between'>
        <h1
          className='text-xl font-semibold leading-6'
        >
          Transactions
        </h1>
        <a
          className={`
          font-medium 
          leading-6 
          cursor-pointer 
          text-primary-500 
          hover:text-primary-500 
          opacity-60 
          hover:opacity-100'`}
          href='https://mainnet.defichain.io/#/DFI/mainnet/home'
          data-testid='latest-transactions-link'
        >
          <div className='flex items-center'>
            LATEST TRANSACTIONS <IoChevronForward size={18} className='ml-px inline' />
          </div>
        </a>
      </div> {/* end of blocks */}
      <div className='mt-6 h-166 min-h-0 overflow-y-auto'>
        {
          transactions.map(t => {
            return (
              <TransactionDetails
                key={t.hash}
                hash={t.txid}
                medianTime={t.block.medianTime}
                from=''
                to=''
                confirmations={
                blocks !== undefined ? blocks - t.block.height : blocks
              }
              />
            )
          })
        }
      </div>
      <a
        className={`
        font-medium 
        leading-6 
        cursor-pointer 
        text-primary-500 
        hover:text-primary-500 
        opacity-60 
        hover:opacity-100'`}
        href='https://mainnet.defichain.io/#/DFI/mainnet/home'
        data-testid='latest-transactions-button'
      >
        <button
          type='button'
          className='text-primary-500 hover:text-primary-500 w-full h-12 border border-gray-200 text-'
        >
          LATEST TRANSACTIONS
        </button>
      </a>
    </div>
  )
}

function LiquidityCardStat ({ label, children }: PropsWithChildren<{label: string, children: ReactNode}>): JSX.Element {
  return (
    <div className='flex gap-x-4'>
      <div className='font-normal text-sm opacity-40 leading-5 w-24'>
        {label}:
      </div>
      <div className='text-sm leading-5'>{children}</div>
    </div>
  )
}

function LiquidityPools ({ liquidityPools }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='mt-12' data-testid='liquidity-pools'>
      <div className='flex justify-between'>
        <h1 className='text-xl leading-8 font-semibold' data-testid='liquidity-pools-title'>Liquidity Pools</h1>
        {/* <a */}
        {/*   className={` */}
        {/*     font-medium  */}
        {/*     leading-6  */}
        {/*     cursor-pointer  */}
        {/*     text-primary-500  */}
        {/*     hover:text-primary-500  */}
        {/*     opacity-60  */}
        {/*     hover:opacity-100'`} */}
        {/*   href='https://mainnet.defichain.io/#/DFI/mainnet/home' */}
        {/* > */}
        {/*   <div className='flex items-center'> */}
        {/*     VIEW FULL DETAILS <IoChevronForward size={18} className='ml-px inline' /> */}
        {/*   </div> */}
        {/* </a> */}
      </div>
      <div className='mt-6 flex flex-wrap gap-x-4 gap-y-6'>
        {
          liquidityPools.map(pool => {
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
  )
}

export default function HomePage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container>
      <Banner />
      <Summary />
      <Stats {...props} />
      <div className='mt-10 flex justify-between'>
        <BlocksList {...props} />
        <TransactionsList {...props} />
      </div>
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
