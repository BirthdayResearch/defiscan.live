import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { formatDistanceToNow } from 'date-fns'
import BigNumber from 'bignumber.js'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdSwapHorizontalCircle } from 'react-icons/md'
import { CollapsibleSection } from '@components/commons/CollapsibleSection'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import { useState } from 'react'
import { Transition } from '@headlessui/react'

export function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  return (
    <div className='w-full md:w-1/2 lg:w-2/3'>
      <div className='hidden md:block'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-semibold'>
            Transactions
          </h1>
        </div>
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
    </div>
  )
}

function TransactionDetails (props: {
  txid: string
  age: string
  totalVoutValue: string
}): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='p-4 border border-gray-200'>
      <div className='flex flex-row justify-between'>
        <div className='flex space-x-2 items-baseline w-full md:w-max'>
          <MdSwapHorizontalCircle className='text-primary-500 bg-white h-4 w-4' />
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between w-full'>
              <TxIdLink txid={props.txid} className='text-lg underline md:no-underline font-medium md:w-4/5'>
                <span className='hidden md:block overflow-ellipsis overflow-hidden'>{props.txid}</span>
                <TextMiddleTruncate text={props.txid} textLength={6} className='block md:hidden' />
              </TxIdLink>
              <div
                className='text-primary-500 cursor-pointer text-xs flex items-center block md:hidden'
                onClick={() => setIsOpen(!isOpen)}
              >
                {(!isOpen)
                  ? (<>VIEW<MdOutlineKeyboardArrowDown size={22} /></>)
                  : (<>HIDE<MdOutlineKeyboardArrowUp size={22} /></>)}
              </div>
            </div>
            <div className='flex text-xs text-opacity-40 text-black mt-1'>
              <span>{props.age}</span>
            </div>
          </div>
        </div>
        <div className='inline text-sm hidden md:block'>
          <span className='text-right text-gray-400'>Amount:</span>
          <span className='pl-3 '>
            {new BigNumber(props.totalVoutValue).toFixed(8)} DFI
          </span>
        </div>
      </div>
      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full mt-3'
        show={isOpen}
      >
        <div className='inline text-sm'>
          <span className='text-right text-gray-400'>Amount</span>
          <span className='pl-3 '>
            {new BigNumber(props.totalVoutValue).toFixed(8)} DFI
          </span>
        </div>
      </Transition>
    </div>
  )
}
