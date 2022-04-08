import { CopyButton } from '@components/commons/CopyButton'
import { Transaction, TransactionSegWit } from '@defichain/jellyfish-transaction'

interface RawTransactionHeadingProps {
  transaction: TransactionSegWit | Transaction | undefined
}

interface RawTransactionPendingHeadingProps {
  txid: string
}

export function RawTransactionHeading (props: RawTransactionHeadingProps): JSX.Element {
  const txid = props.transaction?.vin[0].txid ?? ''
  return (
    <>
      <RawTransactionPendingHeading txid={txid} />
      <span className='leading-6 opacity-60' data-testid='title'>
        Transaction ID
      </span>
      <div className='flex items-center mt-1'>
        <h1 className='text-2xl font-medium break-all' data-testid='transaction-txid'>{txid}</h1>
        <CopyButton className='ml-2' content={txid} />
      </div>
    </>
  )
}

function RawTransactionPendingHeading (props: RawTransactionPendingHeadingProps): JSX.Element {
  const txid = props.txid

  return (
    <div className='bg-red-100 rounded p-3 text-center mb-5' data-testid='transaction-pending-banner'>
      The requested transaction <code className='break-all'>{txid}</code> is still pending, please wait for a few minutes for it to be confirmed.
    </div>
  )
}
