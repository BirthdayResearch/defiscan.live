import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { formatDistanceToNow } from 'date-fns'
import BigNumber from 'bignumber.js'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { MdOutlineKeyboardArrowRight, MdSwapHorizontalCircle } from 'react-icons/md'
import React from 'react'
import { Link } from '@components/commons/link/Link'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'

export function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  return (
    <>
      <div className='hidden md:flex justify-between'>
        <h1 className='text-xl font-semibold' data-testid='Desktop.LatestTransactions.title'>Latest Transactions</h1>
      </div>
      <div className='md:hidden' data-testid='Mobile.LatestTransactionsList'>
        <CollapsibleSection heading='Latest Transactions' testId='Mobile.LatestTransactions.CollapsibleSection'>
          <BlockDetailCards transactions={transactions} />
        </CollapsibleSection>
      </div>
      <div className='hidden md:block mt-6 cursor-pointer' data-testid='Desktop.LatestTransactions.List'>
        <BlockDetailCards transactions={transactions} />
      </div>
    </>
  )
}

function BlockDetailCards (props: { transactions: Transaction[] }): JSX.Element {
  return (
    <>
      {props.transactions.map(transaction => {
        return (
          <Link href={{ pathname: `/transactions/${transaction.id}` }} key={transaction.hash}>
            <span className='content'>
              <TransactionDetails
                txid={transaction.txid}
                age={formatDistanceToNow(transaction.block.medianTime * 1000, { addSuffix: true })}
                totalVoutValue={transaction.totalVoutValue}
              />
            </span>
          </Link>
        )
      })}
    </>
  )
}

function TransactionDetails (props: { txid: string, age: string, totalVoutValue: string }): JSX.Element {
  return (
    <div className='flex p-4 rounded border border-gray-200 my-1.5 justify-between hover:shadow-md'>
      <div className='flex-none w-11/12'>
        <div className='flex'>
          <div className='flex-none w-8'>
            <MdSwapHorizontalCircle className='text-gray-400 inline-block' size={22} />
          </div>
          <div className='flex-none w-28 md:w-36 xl:w-96'>
            <div className='overflow-ellipsis overflow-hidden'>
              <TxIdLink txid={props.txid} className='overflow-ellipsis overflow-hidden font-medium text-gray-900' />
            </div>
            <div className='hidden md:block text-xs text-gray-400'>
              <span>{props.age}</span>
            </div>
          </div>
          <div className='flex-none w-9' />
          <div className='flex-grow w-10'>
            <div className='hidden md:block text-sm text-right'>
              <span className='text-gray-400'>Amount&nbsp;</span>
              <span>{`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}</span>
            </div>
            <div className='md:hidden text-center text-xs text-gray-400'>
              <span>{props.age}</span>
            </div>
          </div>
        </div>
        <div className='md:hidden flex'>
          <div className='flex-none w-8' />
          <div>
            <div className='sm:block text-sm text-right'>
              <span className='text-gray-400'>Amount&nbsp;</span>
              <span>{`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <MdOutlineKeyboardArrowRight size={38} />
      </div>
    </div>
  )
}
