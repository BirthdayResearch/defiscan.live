import { NetworkName } from '@contexts/NetworkContext'
import { Link } from '@components/commons/Link'

interface TransactionVectorRowProps {
  label: 'INPUT' | 'OUTPUT'
  address: string
  value: string
  network: NetworkName
  isAddress: boolean
}

export function TransactionVectorRow (props: TransactionVectorRowProps): JSX.Element {
  return (
    <div className='bg-gray-50 h-20 p-3 rounded flex justify-between'>
      <div className='flex flex-col justify-between h-full w-full'>
        <span className='bg-gray-200 rounded text-xs px-2 py-1 font-medium w-min mb-1.5'>
          {props.label}
        </span>
        <div className='flex justify-between gap-x-2'>
          {props.isAddress ? (
            <Link href={{ pathname: `/address/${props.address}` }}>
              <div className='overflow-ellipsis overflow-hidden cursor-pointer hover:text-primary-500'>
                {props.address}
              </div>
            </Link>
          ) : (
            <div className='overflow-ellipsis overflow-hidden opacity-80'>
              {props.address}
            </div>
          )}
          <span className='min-w-max'>
            {props.value}
          </span>
        </div>
      </div>
    </div>
  )
}
