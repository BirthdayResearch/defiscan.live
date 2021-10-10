import { NumberFormat } from './NumberFormat'
import { IoChevronForward, IoTimeOutline } from 'react-icons/io5'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { ExternalLink } from '@components/index/Link'
import { formatDistanceToNow } from 'date-fns'
import { enUSShort } from '@utils/locale/en-US-short'

export function TransactionsList ({ transactions }: { transactions: Transaction[] }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  return (
    <div className='w-full lg:w-1/2'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>
          Transactions
        </h1>
        <ExternalLink
          url='https://mainnet.defichain.io/#/DFI/mainnet/home'
          testId='latest-transactions-link'
        >
          <div className='flex items-center'>
            LATEST TRANSACTIONS <IoChevronForward size={18} className='ml-px inline' />
          </div>
        </ExternalLink>
      </div>
      <div className='mt-6 w-full space-y-1'>
        {
          transactions.map(t => {
            return (
              <TransactionDetails
                key={t.hash}
                hash={t.txid}
                age={formatDistanceToNow(t.block.medianTime * 1000, { locale: enUSShort })}
                from=''
                to=''
                confirmations={
                  blocks !== undefined ? blocks - t.block.height : blocks
                }
                totalVoutValue={t.totalVoutValue}
              />
            )
          })
        }
      </div>
      <ExternalLink url='https://mainnet.defichain.io/#/DFI/mainnet/home' testId='latest-transactions-button'>
        <button
          type='button'
          className='w-full mt-2 py-3 border border-gray-200'
        >
          LATEST TRANSACTIONS
        </button>
      </ExternalLink>
    </div>
  )
}

function TransactionDetails (props: {
  hash: string
  age: string
  from: string
  to: string
  confirmations: number | undefined
  totalVoutValue: string
}): JSX.Element {
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
      <div className='mt-3.5'>
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
