import {
  CTransaction,
  CTransactionSegWit,
  DfTx, OP_DEFI_TX,
  Transaction,
  TransactionSegWit,
  Vout
} from '@defichain/jellyfish-transaction'
import { AddressLink } from '@components/commons/link/AddressLink'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { useNetwork } from '@contexts/NetworkContext'
import { DecodedAddress, fromScript } from '@defichain/jellyfish-address'
import BigNumber from 'bignumber.js'
import { SmartBuffer } from 'smart-buffer'
import { TransactionDfTx } from './TransactionDfTx'
import { Container } from '@components/commons/Container'

export function RawTransaction ({ rawTx }: { rawTx: string }): JSX.Element {
  const network = useNetwork().name
  let transaction: TransactionSegWit | Transaction | undefined

  if (rawTx !== undefined) {
    const buffer = SmartBuffer.fromBuffer(Buffer.from(rawTx, 'hex'))
    try {
      if (rawTx.startsWith('040000000001')) {
        transaction = new CTransactionSegWit(buffer)
      } else {
        transaction = new CTransaction(buffer)
      }
    } catch (e) {
      transaction = undefined
    }
  }

  function getTotalVoutValue (vouts: Vout[] | undefined): string {
    let value: BigNumber = new BigNumber(0)
    if (vouts !== undefined) {
      vouts.forEach(vout => {
        value = new BigNumber(vout.value).plus(value)
      })
    }
    return value.toFixed(8)
  }

  function getDfTx (vouts: Vout[]): DfTx<any> | undefined {
    const stack = vouts[0].script.stack
    if (stack.length !== 2 || stack[1].type !== 'OP_DEFI_TX') {
      return undefined
    }
    return (stack[1] as OP_DEFI_TX).tx
  }

  if (transaction === undefined) {
    return (
      <Container className='pt-12 pb-20'>
        <div className='bg-red-100 rounded p-3 text-center' data-testid='transaction-not-found-banner'>
          The requested raw transaction could not be found.
        </div>
      </Container>
    )
  }

  return (
    <div>
      <h1 className='font-medium text-2xl mt-6' data-testid='RawTransaction.Title'>Pending Transactions</h1>
      <div className='flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2'>
        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col space-y-1' data-testid='TransactionDetailsLeft.List'>
            {transaction?.vin.map((vin) => {
              return (
                <TransactionRow
                  label='INPUT'
                  txId={vin.txid}
                  key={vin.index}
                />
              )
            })}
          </div>
        </div>
        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col space-y-1' data-testid='TransactionDetailsLeft.List'>
            {transaction?.vout.map((vout, index) => {
              const decoded = fromScript(vout.script, network)
              return (
                <TransactionRow
                  label='OUTPUT'
                  address={decoded}
                  value={` ${vout.value.toFixed(8)} DFI`}
                  key={index}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between mt-8'>
        <div className='flex justify-between space-x-3 mt-2' data-testid='RawTransaction.total'>
          <span>Total:</span>
          <span>{getTotalVoutValue(transaction?.vout)} DFI</span>
        </div>
      </div>
      <div>
        {(() => {
          if ((transaction?.vout) != null) {
            return (
              <TransactionDfTx dftx={getDfTx(transaction.vout)} />
            )
          }
        })()}
      </div>
    </div>
  )
}

interface TransactionRowProps {
  label: 'INPUT'| 'OUTPUT'
  address?: DecodedAddress
  txId?: string
  value?: string
}

function TransactionRow (props: TransactionRowProps): JSX.Element {
  return (
    <div className='bg-gray-50 h-20 p-3 rounded flex justify-between'>
      <div className='flex flex-col justify-between h-full w-full'>
        <span className='bg-gray-200 rounded text-xs px-2 py-1 font-medium w-min mb-1.5'>
          {props.label}
        </span>
        <div className='flex justify-between'>
          {(() => {
            if (props.txId !== undefined) {
              return (
                <TxIdLink txid={props.txId} />
              )
            }
            if (props.address?.address !== undefined) {
              return (
                <AddressLink address={props.address.address} />
              )
            } else {
              return (
                'N/A'
              )
            }
          })()}
          {(() => {
            if (props.value !== undefined) {
              return (
                <span className='min-w-max'>
                  {props.value}
                </span>
              )
            }
          })()}
        </div>
      </div>
    </div>
  )
}
