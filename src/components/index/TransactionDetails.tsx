import { NumberFormat } from './NumberFormat'
import { IoTimeOutline } from 'react-icons/io5'

interface TransactionDetailsProps {
  hash: string
  age: string
  from: string
  to: string
  confirmations: number|undefined
  totalVoutValue: string
}

function TransactionDetailsField ({ label, value }: { label: string, value: string|undefined }): JSX.Element {
  return (
    <div className='flex gap-x-1.5 text-sm leading-5'>
      <span className='w-28 text-gray-400'>
        {label}
      </span>
      <span className='overflow-hidden overflow-ellipsis'>
        {value}
      </span>
    </div>
  )
}

export function TransactionDetails (props: TransactionDetailsProps): JSX.Element {
  return (
    <div className='h-40 p-4 border border-gray-200 '>
      <div className='w-full flex justify-between'>
        <span
          className='w-7/12 inline-block leading-6 text-gray-900 font-semibold overflow-ellipsis overflow-hidden'
        >
          {props.hash}
        </span>
        <div className='flex items-center'>
          <span>
            <span
              className='text-xs text-opacity-40 text-black font-medium'
            >
              <IoTimeOutline size={15} className='inline' />
              <span className='ml-1.5'>{props.age}</span>
            </span>
            <NumberFormat
              className='h-5 text-xs leading-4 font-medium px-2 py-0.5 rounded bg-gray-100 ml-1'
              value={props.totalVoutValue}
              decimalScale={3}
              suffix=' DFI'
            />
          </span>
        </div>
      </div>
      <div className='mt-4'>
        <TransactionDetailsField label='From:' value={props.from} />
        <TransactionDetailsField label='To:' value={props.to} />
        <TransactionDetailsField label='Confirmations:' value={props.confirmations !== undefined ? props.confirmations.toString() : undefined} />
      </div>
    </div>
  )
}
