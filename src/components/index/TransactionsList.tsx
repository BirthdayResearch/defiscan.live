import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { formatDistanceToNow } from 'date-fns'
import BigNumber from 'bignumber.js'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdSwapHorizontalCircle } from 'react-icons/md'
import { CollapsibleSection } from '@components/commons/CollapsibleSection'
import React, { useState } from 'react'
import { Transition } from '@headlessui/react'

export function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  return (
    <>
      <div className='hidden md:block'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-semibold'>Latest Transactions</h1>
        </div>

        <div className='mt-6 space-y-1.5'>
          {transactions.map(t => {
            return (
              <TransactionDetails
                key={t.hash}
                txid={t.txid}
                age={formatDistanceToNow(t.block.medianTime * 1000, { addSuffix: true })}
                totalVoutValue={t.totalVoutValue}
              />
            )
          })}
        </div>
      </div>

      <CollapsibleSection
        heading='Transactions'
        className='block md:hidden'
      >
        <div className='mt-6 w-full space-y-1'>

          {transactions.map(t => {
            return (
              <TransactionDetails
                key={t.hash}
                txid={t.txid}
                age={formatDistanceToNow(t.block.medianTime * 1000, { addSuffix: true })}
                totalVoutValue={t.totalVoutValue}
              />
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
    <div className='grid grid-cols-2 lg:grid-cols-5 p-4 rounded-sm border border-gray-200 cursor-pointer items-center'>
      <div className='col-span-1 lg:col-span-2 xl:col-span-3 flex space-x-2'>
        <span className='text-lg leading-6'>
          <MdSwapHorizontalCircle className='text-primary-600 inline-block' size={22} />
        </span>
        <div className='overflow-ellipsis overflow-hidden'>
          <TxIdLink
            txid={props.txid}
            className='overflow-ellipsis overflow-hidden text-lg font-medium text-primary-500 underline md:no-underline'
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
    <div className='hidden md:block col-span-1 lg:col-span-3 xl:col-span-2'>
      <div className='grid grid-cols-2 grid-rows-2'>
        <div className='text-right text-sm text-gray-500 lg:mr-2 xl:mr-0'>
          Amount
        </div>
        <div className='text-right text-sm text-gray-900'>
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
        className='text-primary-500 flex justify-end items-center self-start block md:hidden'
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
        className='col-span-3 mt-5'
        show={isOpen}
      >
        <div className='grid grid-cols-2 items-center'>
          <div className='text-gray-500 text-sm'>
            Amount
          </div>
          <div className='text-right text-gray-900'>
            {`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}
          </div>
        </div>
      </Transition>
    </>
  )
}
