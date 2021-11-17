import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { formatDistanceToNow } from 'date-fns'
import BigNumber from 'bignumber.js'
import { Link } from '@components/commons/link/Link'

export function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
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
  )
}

function TransactionDetails (props: {
  txid: string
  age: string
  totalVoutValue: string
}): JSX.Element {
  return (
    <Link href={{ pathname: `/transactions/${props.txid}` }}>
      <div className='p-4 pb-3 border border-gray-200 cursor-pointer hover:bg-primary-50'>
        <div className='w-full flex flex-wrap justify-between'>
          <div className='flex w-1/2 sm:w-4/6 xl:w-3/4 2xl:w-4/5'>
            <a className='text-gray-900 font-medium overflow-ellipsis overflow-hidden'>{props.txid}</a>
          </div>
          <div className='flex items-center justify-end w-1/2 sm:w-2/6 xl:w-1/4 2xl:w-1/5'>
            <div className='flex text-xs text-opacity-40 text-black font-medium'>
              <span>{props.age}</span>
            </div>
          </div>
        </div>
        <div className='mt-1 inline text-sm'>
          <span className='text-right text-gray-400'>Amount:</span>
          <span className='pl-3 break-all'>
            {new BigNumber(props.totalVoutValue).toFixed(8)} DFI
          </span>
        </div>
      </div>
    </Link>
  )
}
