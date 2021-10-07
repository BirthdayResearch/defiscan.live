import { NumberFormat } from './NumberFormat'
import { IoTimeOutline } from 'react-icons/io5'

export function TransactionDetails ({ hash, age, from, to, confirmations }: {hash: string, age: string, from: string, to: string, confirmations: number|undefined}): JSX.Element {
  return (
    <div className='h-40 p-4 border border-gray-200 '>
      <div className='w-full flex justify-between'>
        <span
          className='w-7/12 inline-block leading-6 text-gray-900 font-semibold overflow-ellipsis overflow-hidden'
        >
          {hash}
        </span>
        <div className='flex items-center'>
          <span>
            <span
              className='text-xs text-opacity-40 text-black font-medium'
            >
              <IoTimeOutline size={15} className='inline' />
              <span className='ml-1.5'>{age}</span>
            </span>
            <NumberFormat
              className='h-5 text-xs leading-4 font-medium px-2 py-0.5 rounded bg-gray-100'
              value={24200.032}
              decimalScale={3}
              suffix=' DFI'
            />
          </span>
        </div>
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
