import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { useNetwork } from '@contexts/NetworkContext'
import { CopyButton } from '@components/commons/CopyButton'

interface TransactionHeadingProps {
  transaction: Transaction
}

interface TransactionNotFoundHeadingProps {
  txid: string
}

export function TransactionHeading (props: TransactionHeadingProps): JSX.Element {
  const network = useNetwork()

  return (
    <>
      <div className='flex items-center justify-center pb-6'>
        <div className='bg-orange-100 rounded p-3 text-center'>
          🚧 Work in progress, this is an early iteration of defiscan.live/transactions/*. Some features are not
          available and may not work as expected.
          {network === 'MainNet' && (
            <>
              <br />In the meantime, you can use
              <a
                target='_blank'
                href={`https://explorer.defichain.io/#/DFI/mainnet/tx/${props.transaction.id}`}
                className='cursor-pointer hover:underline text-primary-500 break-all ml-1' rel='noreferrer'
              >
                https://explorer.defichain.com
              </a>.
            </>
          )}
        </div>
      </div>

      <span className='leading-6 opacity-60' data-testid='title'>
        Transaction Hash
      </span>

      <div className='flex items-center mt-1'>
        <h1 className='text-2xl font-medium break-all' data-testid='transaction-hash'>{props.transaction.hash}</h1>
        <CopyButton className='ml-2' content={props.transaction.hash} />
      </div>
    </>
  )
}

export function TransactionNotFoundHeading (props: TransactionNotFoundHeadingProps): JSX.Element {
  const txid = props.txid

  return (
    <div className='bg-red-100 rounded p-3 text-center' data-testid='transaction-not-found-banner'>
      The requested transaction <code className='break-all'>{txid}</code> could not be found, it is most likely still
      being confirmed, please try again in a few minutes.
    </div>
  )
}
