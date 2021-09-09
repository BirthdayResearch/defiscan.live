import classnames from 'classnames'
import { ReactNode, PropsWithChildren } from 'react'
import { Container } from '@components/commons/Container'
import { GetServerSidePropsResult } from 'next'
import { IoCaretUp, IoSearchOutline } from 'react-icons/io5'

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

export default function HomePage (): JSX.Element {
  return (
    <Container>
      <Banner />
      <Summary />
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
