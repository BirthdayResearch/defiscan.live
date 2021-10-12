import { IoTimeOutline } from 'react-icons/io5'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { formatDistanceToNow } from 'date-fns'
import { enUSShort } from '@utils/locale/en-US-short'
import BigNumber from 'bignumber.js'
import { Link } from '@components/commons/Link'

export function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  return (
    <div className='w-full lg:w-2/5'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>
          Transactions
        </h1>
      </div>
      <div className='mt-6 w-full space-y-1'>
        {
          transactions.map(t => {
            return (
              <TransactionDetails
                key={t.hash}
                hash={t.txid}
                age={formatDistanceToNow(t.block.medianTime * 1000, { locale: enUSShort })}
                from={undefined}
                to={undefined}
                confirmations={
                  blocks !== undefined ? blocks - t.block.height : blocks
                }
                totalVoutValue={t.totalVoutValue}
              />
            )
          })
        }
      </div>

    </div>
  )
}

function TransactionDetails (props: {
  hash: string
  age: string
  from?: string
  to?: string
  confirmations?: number
  totalVoutValue: string
}): JSX.Element {
  return (
    <div className='p-4 pb-3 border border-gray-200'>
      <div className='w-full flex justify-between'>
        <Link href={{ pathname: `/transactions/${props.hash}` }}>
          <a
            className='text-gray-900 hover:text-primary-500 font-medium overflow-ellipsis overflow-hidden'
          >{props.hash}
          </a>
        </Link>
        <div className='flex items-center ml-3'>
          <div
            className='flex min-w-max text-xs text-opacity-40 text-black font-medium'
          >
            <IoTimeOutline size={15} />
            <span className='ml-1.5'>{props.age}</span>
          </div>
        </div>
      </div>
      <div className='mt-1'>
        <div className='inline text-sm'>
          <span className='text-right text-gray-400'>Amount:</span>
          <span className='pl-3 text-gray-900 opacity-90 font-medium break-all'>{new BigNumber(props.totalVoutValue).toFixed(8)} DFI</span>
        </div>
      </div>
    </div>
  )
}
