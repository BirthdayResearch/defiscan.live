import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { formatDistanceToNow } from 'date-fns'
import BigNumber from 'bignumber.js'
import { MdSwapHorizontalCircle } from 'react-icons/md'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'
import React from 'react'
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
              <Link href={{ pathname: `/transactions/${transaction.id}` }} key={transaction.hash}>
                <a className='content'>
                  <TransactionDetails
                    txid={transaction.txid}
                    age={formatDistanceToNow(transaction.block.medianTime * 1000, { addSuffix: true })}
                    totalVoutValue={transaction.totalVoutValue}
                  />
                </a>
              </Link>
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
              <Link href={{ pathname: `/transactions/${transaction.id}` }} key={transaction.hash}>
                <a className='content'>
                  <TransactionDetails
                    txid={transaction.txid}
                    age={formatDistanceToNow(transaction.block.medianTime * 1000, { addSuffix: true })}
                    totalVoutValue={transaction.totalVoutValue}
                  />
                </a>
              </Link>
            )
          })}
        </div>
      </CollapsibleSection>
    </>
  )
}

function TransactionDetails (props: {
  txid: string
  age: string
  totalVoutValue: string
}): JSX.Element {
  return (
    <div className='w-full flex flex-wrap p-4 rounded border border-gray-200 cursor-pointer my-1.5 hover:shadow-md'>
      <DesktopTransactionDetails txid={props.txid} age={props.age} totalVoutValue={props.totalVoutValue} />
      <MobileTransactionDetails txid={props.txid} age={props.age} totalVoutValue={props.totalVoutValue} />
    </div>
  )
}

function DesktopTransactionDetails (props: {
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

function MobileTransactionDetails (props: {
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
