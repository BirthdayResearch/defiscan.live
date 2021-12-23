import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { formatDistanceToNow } from 'date-fns'
import BigNumber from 'bignumber.js'
import { MdSwapHorizontalCircle } from 'react-icons/md'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'
import React, { PropsWithChildren } from 'react'
import { Link } from '@components/commons/link/Link'
import { IoChevronForwardSharp } from 'react-icons/io5'

export function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  return (
    <>
      <div className='hidden md:block'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-semibold'>Latest Transactions</h1>
        </div>

        <div className='mt-6'>
          {transactions.map(transaction => {
            return (
              <TransactionCard id={transaction.id} key={`Desktop.${transaction.txid}`}>
                <DesktopTransactionCardDetails
                  txid={transaction.txid}
                  age={formatDistanceToNow(transaction.block.medianTime * 1000, { addSuffix: true })}
                  totalVoutValue={transaction.totalVoutValue}
                />
              </TransactionCard>
            )
          })}
        </div>
      </div>

      <CollapsibleSection
        heading='Latest Transactions'
        className='block md:hidden'
      >
        <div className='mt-6 w-full'>
          {transactions.map(transaction => {
            return (
              <TransactionCard id={transaction.id} key={`Mobile.${transaction.txid}`}>
                <MobileTransactionCardDetails
                  txid={transaction.txid}
                  age={formatDistanceToNow(transaction.block.medianTime * 1000, { addSuffix: true })}
                  totalVoutValue={transaction.totalVoutValue}
                />
              </TransactionCard>
            )
          })}
        </div>
      </CollapsibleSection>
    </>
  )
}

function TransactionCard (props: PropsWithChildren<{ id: string }>): JSX.Element {
  return (
    <Link href={{ pathname: `/transactions/${props.id}` }}>
      <a className='content'>
        <div className='w-full flex flex-wrap p-4 rounded border border-gray-200 cursor-pointer my-1.5 hover:shadow-md'>
          {props.children}
        </div>
      </a>
    </Link>
  )
}

function DesktopTransactionCardDetails (props: {
  txid: string
  age: string
  totalVoutValue: string
}): JSX.Element {
  return (
    <div className='hidden xl:flex xl:flex-wrap xl:w-full'>
      <div className='md:w-1/2 lg:w-2/5 xl:w-3/5 flex space-x-2'>
        <span className='text-lg leading-6'>
          <MdSwapHorizontalCircle className='text-gray-400 inline-block' size={22} />
        </span>
        <div className='overflow-hidden'>
          <div className='overflow-ellipsis overflow-hidden font-medium text-gray-900'>
            {props.txid}
          </div>
          <div className='text-xs text-gray-400 leading-5'>
            {props.age}
          </div>
        </div>
      </div>
      <div className='w-1/2 lg:w-3/5 xl:w-2/5 flex'>
        <div className='w-full text-right text-sm flex'>
          <div className='w-1/2 text-gray-500 lg:mr-2 xl:mr-0'>
            Amount
          </div>
          <div className='w-1/2 text-gray-900'>
            {`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}
          </div>
        </div>
        <div className='flex items-center ml-8'>
          <IoChevronForwardSharp size={24} />
        </div>
      </div>
    </div>
  )
}

function MobileTransactionCardDetails (props: {
  txid: string
  age: string
  totalVoutValue: string
}): JSX.Element {
  return (
    <>
      <div className='block xl:hidden w-11/12 flex space-x-2'>
        <span className='text-lg leading-6'>
          <MdSwapHorizontalCircle className='text-gray-400 inline-block' size={22} />
        </span>
        <div className='overflow-hidden'>
          <div className='flex'>
            <div className='w-1/2 overflow-ellipsis overflow-hidden font-medium text-gray-900'>
              {props.txid}
            </div>
            <div className='w-1/2 text-right text-xs text-gray-400 leading-5 mr-3'>
              <span>{props.age}</span>
            </div>
          </div>
          <div className='block flex flex-wrap items-center'>
            <div className='text-gray-500 text-sm'>
              Amount
            </div>
            <div className='text-right text-gray-900 text-sm ml-2'>
              {`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}
            </div>
          </div>
        </div>
      </div>
      <div className='block xl:hidden w-1/12 flex items-center justify-end'>
        <IoChevronForwardSharp size={24} />
      </div>
    </>
  )
}
