import { NetworkName } from '@contexts/NetworkContext'
import { AddressLink } from '@components/commons/link/AddressLink'

interface TransactionVectorRowProps {
  label: 'INPUT' | 'OUTPUT'
  address: string
  value: string
  network: NetworkName
  isAddressClickable: boolean
}

export function TransactionVectorRow (props: TransactionVectorRowProps): JSX.Element {
  return (
    <div className='bg-gray-50 h-20 p-3 rounded flex justify-between'>
      <div className='flex flex-col justify-between h-full w-full'>
        <span className='bg-gray-200 rounded text-xs px-2 py-1 font-medium w-min mb-1.5'>
          {props.label}
        </span>
        <div className='flex justify-between gap-x-2'>
          {props.isAddressClickable ? (
            <AddressLink testId='TransactionVectorRow.Address' address={props.address} className='overflow-ellipsis overflow-hidden text-primary-400' />
          ) : (
            <span className='overflow-ellipsis overflow-hidden opacity-80'>
              {props.address}
            </span>
          )}
          <span className='min-w-max'>
            {props.value}
          </span>
        </div>
      </div>
    </div>
  )
}
