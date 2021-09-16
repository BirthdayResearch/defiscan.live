import classnames from 'classnames'
import { ReactNode, PropsWithChildren } from 'react'
import { GetServerSidePropsResult } from 'next'
import { IoCaretUp, IoSearchOutline, IoChevronForward } from 'react-icons/io5'
import { Container } from '@components/commons/Container'
import { Link } from '@components/commons/Link'

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

function BlockDetails (): JSX.Element {
  return (
    <div className='h-20 border border-gray-200 p-4'>
      <div className='flex flex-col gap-y-2'>
        <span className='text-xl text-gray-900 font-semibold'>#102320123</span>
        <span className='text-xs text-opacity-40 text-black font-medium'>#102320123</span>
      </div>
    </div>
  )
}

function BlocksAndTransactions (): JSX.Element {
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
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
            <BlockDetails />
          </div>
          <button type='button' className='text-primary-500 hover:text-primary-500 w-full h-12 border border-gray-200 text-'>VIEW ALL BLOCKS</button>
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
          <div className='mt-6 flex flex-col gap-y-2 h-auto'>
            <BlockDetails />
            <BlockDetails />
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

function LiquidityPools (): JSX.Element {
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
        <LiquidityPairCard title='BTC-DFI'>
          <LiquidityCardStat label='APR' value='78.23%' />
          <LiquidityCardStat label='Total Liquidity' value='289,860,929.34 USD' />
          <LiquidityCardStat label='Price Ratio' value='16,770.48 DFI/BTC' />
        </LiquidityPairCard>
        <LiquidityPairCard title='ETH-DFI'>
          <LiquidityCardStat label='APR' value='71.49%' />
          <LiquidityCardStat label='Total Liquidity' value='67,065,097.75 USD' />
          <LiquidityCardStat label='Price Ratio' value='1,294.15 DFI/ETH' />
        </LiquidityPairCard>
        <LiquidityPairCard title='USDT-DFI'>
          <LiquidityCardStat label='APR' value='78.04%' />
          <LiquidityCardStat label='Total Liquidity' value='12,033,846.49 USD' />
          <LiquidityCardStat label='Price Ratio' value='3.03 USDT/DFI' />
        </LiquidityPairCard>
        <LiquidityPairCard title='LTC-DFI'>
          <LiquidityCardStat label='APR' value='78.23%' />
          <LiquidityCardStat label='Total Liquidity' value='12,033,846.49 USD' />
          <LiquidityCardStat label='Price Ratio' value='3.03 DFI/LTC' />
        </LiquidityPairCard>
        <LiquidityPairCard title='USDC-DFI'>
          <LiquidityCardStat label='APR' value='78.23%' />
          <LiquidityCardStat label='Total Liquidity' value='12,033,846.49 USD' />
          <LiquidityCardStat label='Price Ratio' value='3.03 USDC/DFI' />
        </LiquidityPairCard>
        <LiquidityPairCard title='BCH-DFI'>
          <LiquidityCardStat label='APR' value='78.23%' />
          <LiquidityCardStat label='Total Liquidity' value='12,033,846.49 USD' />
          <LiquidityCardStat label='Price Ratio' value='3.03 DFI/BCH' />
        </LiquidityPairCard>
        <LiquidityPairCard title='DOGE-DFI'>
          <LiquidityCardStat label='APR' value='78.23%' />
          <LiquidityCardStat label='Total Liquidity' value='12,033,846.49 USD' />
          <LiquidityCardStat label='Price Ratio' value='3.03 DFI/DOGE' />
        </LiquidityPairCard>
      </div>
    </div>
  )
}

export default function HomePage (): JSX.Element {
  return (
    <Container>
      <Banner />
      <Summary />
      <Stats />
      <BlocksAndTransactions />
      <LiquidityPools />
    </Container>
  )
}

export async function getServerSideProps (): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {}
    // redirect: {
    //   statusCode: 302,
    //   destination: '/prices'
    // }
  }
}
