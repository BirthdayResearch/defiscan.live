import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { formatDistanceToNow } from 'date-fns'
import BigNumber from 'bignumber.js'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdSwapHorizontalCircle } from 'react-icons/md'
import { CollapsibleSection } from '@components/commons/CollapsibleSection'
import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from '@components/commons/link/Link'

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
      <div className='w-1/2 lg:w-2/5 xl:w-3/5 flex space-x-2'>
        <span className='text-lg leading-6'>
          <MdSwapHorizontalCircle className='text-gray-400 inline-block' size={22} />
        </span>
        <div className='overflow-ellipsis overflow-hidden'>
          <TxIdLink
            txid={props.txid}
            className='overflow-ellipsis overflow-hidden font-medium text-gray-900'
          />
          <div className='text-xs text-gray-400 leading-5'>
            <span>{props.age}</span>
          </div>
        </div>
      </div>
      <DesktopTransactionDetails totalVoutValue={props.totalVoutValue} />
      <MobileTransactionDetails totalVoutValue={props.totalVoutValue} />
    </div>
  )
}

function DesktopTransactionDetails (props: { totalVoutValue: string }): JSX.Element {
  return (
    <div className='hidden md:block w-1/2 lg:w-3/5 xl:w-2/5'>
      <div className='w-full flex'>
        <div className='w-1/2 text-right text-sm text-gray-500 lg:mr-2 xl:mr-0'>
          Amount
        </div>
        <div className='w-1/2 text-right text-sm text-gray-900'>
          {`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}
        </div>
      </div>
    </div>
  )
}

function MobileTransactionDetails (props: { totalVoutValue: string }): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div
        className='w-1/2 text-primary-500 flex flex-wrap justify-end items-center self-start block md:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {(!isOpen)
          ? (<>VIEW<MdOutlineKeyboardArrowDown size={22} /></>)
          : (<>HIDE<MdOutlineKeyboardArrowUp size={22} /></>)}
      </div>
      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full mt-5'
        show={isOpen}
      >
        <div className='flex flex-wrap items-center'>
          <div className='w-1/2 text-gray-500 text-sm'>
            Amount
          </div>
          <div className='w-1/2 text-right text-gray-900'>
            {`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}
          </div>
        </div>
      </Transition>
    </>
  )
}
