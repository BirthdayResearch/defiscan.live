import { NumberFormat } from './NumberFormat'
import { IoTimeOutline } from 'react-icons/io5'

interface TransactionDetailsProps {
  hash: string
  age: string
  from: string
  to: string
  confirmations: number | undefined
  totalVoutValue: string
}

function TransactionDetailsField ({
  label,
  value
}: { label: string, value: string | undefined }): JSX.Element {
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
    <div className='p-4 border border-gray-200'>
      <div className='w-full flex justify-between'>
        <div
          className='text-gray-900 font-semibold overflow-ellipsis overflow-hidden'
        >
          {props.hash}
        </div>
        <div className='flex items-center ml-4'>
          <div
            className='flex min-w-max text-xs text-opacity-40 text-black font-medium'
          >
            <IoTimeOutline size={15} />
            <span className='ml-1.5'>{props.age}</span>
          </div>
          <div className='flex min-w-max'>
            <NumberFormat
              className='text-xs font-medium px-2 py-0.5 rounded bg-gray-100 ml-1'
              value={props.totalVoutValue}
              decimalScale={3}
              suffix=' DFI'
            />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <TransactionDetailsField label='From:' value={props.from} />
        <TransactionDetailsField label='To:' value={props.to} />
        <TransactionDetailsField
          label='Confirmations:'
          value={props.confirmations !== undefined ? props.confirmations.toString() : undefined}
        />
      </div>
    </div>
  )
}
