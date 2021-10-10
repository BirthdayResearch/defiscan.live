import classnames from 'classnames'

import { ReactNode, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { NumberFormat } from './NumberFormat'

import { getNativeIcon } from '@components/icons/assets'

import { RootState } from '@store/index'

export function SummaryCard ({ children, testId }: PropsWithChildren<{ children: ReactNode, testId?: string}>): JSX.Element {
  return (
    <div
      className='sm:h-64 pt-6 px-7 pb-7 flex-1 border border-gray-50 rounded-lg shadow-lg overflow-hidden min-w-min'
      data-testid={testId}
    >
      {children}
    </div>
  )
}

export function SummaryCardTitle ({ children }: PropsWithChildren<{children: ReactNode}>): JSX.Element {
  return (
    <div className='text-lg text-gray-500 leading-6'>{children}</div>
  )
}

export function SummaryCardHeader ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
  return (
    <div className={classnames('text-2xl text-gray-900 leading-8 flex items-center', className)}>{children}</div>
  )
}

export function SummaryCardSubHeader ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
  return (
    <div className={classnames('text-xs text-gray-500 leading-4', className)}>{children}</div>
  )
}

export function SummaryCardHeadModifier ({ children, className }: PropsWithChildren<{children: ReactNode, className?: string}>): JSX.Element {
  return <span className={classnames('text-base ml-3', className)}>{children}</span>
}

export function Summary (): JSX.Element {
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

  const Dfi = getNativeIcon('DFI')

  return (
    <div className='mt-12'>
      <div className='flex items-center gap-x-2'>
        <Dfi className='h-6 w-6' />
        <span className='text-xl font-semibold'>DeFiChain in numbers</span>
      </div>
      <div className='flex flex-wrap gap-y-2 mt-4 gap-x-4'>
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
              decimalScale={2}
              prefix='$'
            />
          </SummaryCardHeader>
        </SummaryCard>
        <SummaryCard testId='summary-masternodes'>
          <SummaryCardTitle>Masternodes</SummaryCardTitle>
          <SummaryCardHeader>
            <NumberFormat
              value={masternodes}
            />
          </SummaryCardHeader>
        </SummaryCard>
      </div>
    </div>
  )
}
