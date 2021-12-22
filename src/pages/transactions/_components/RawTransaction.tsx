import {
  CTransaction,
  CTransactionSegWit,
  Transaction,
  TransactionSegWit,
  Vin,
  Vout
} from '@defichain/jellyfish-transaction'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { AddressLink } from '@components/commons/link/AddressLink'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { useNetwork } from '@contexts/NetworkContext'
import { fromScript } from '@defichain/jellyfish-address'
import BigNumber from 'bignumber.js'
import { SmartBuffer } from 'smart-buffer'

export function RawTransaction ({ rawTx }: {rawTx: string}): JSX.Element {
  const network = useNetwork().name
  let transaction: TransactionSegWit | Transaction | undefined

  if (rawTx !== undefined) {
    const buffer = SmartBuffer.fromBuffer(Buffer.from(rawTx, 'hex'))
    if (rawTx.startsWith('040000000001')) {
      transaction = new CTransactionSegWit(buffer)
    } else {
      transaction = new CTransaction(buffer)
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
  return (
    <div>
      <h1 className='font-medium text-2xl mt-6' data-testid='RawTransaction.Title'>Pending Transactions</h1>
      <div className='flex flex-col lg:flex-row space-y-2 lg:space-y-2 lg:space-x-2'>
        <div className='w-full lg:w-1/2'>
          <h3 className='text-lg font-semibold mb-4'>Input</h3>
          {transaction?.vin.map(vin => (
            <TransactionInput vin={vin} key={vin.txid} />
          ))}
        </div>
        <div className='w-full lg:w-1/2 '>
          <h3 className='text-lg font-semibold mb-4'>Output</h3>
          <div className='space-y-2'>
            {transaction?.vout.map((vout, index) => {
              const decoded = fromScript(vout.script, network)
              return (
                <TransactionOutput key={index} vout={vout} address={decoded?.address} />
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
    </div>
  )
}

function TransactionInput ({ vin }: {vin: Vin}): JSX.Element {
  return (
    <AdaptiveList className='space-y-2'>
      <AdaptiveList.Row name='Index' testId='RawTransaction.VinIndex'>
        {vin.index}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='TxId'>
        <TxIdLink txid={vin.txid} className='break-all' testId='RawTransaction.VinTxId' />
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function TransactionOutput ({ vout, address }: {vout: Vout, address: string | undefined}): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Token' testId='RawTransaction.VoutToken'>
        <TokenSymbol tokenId={vout.tokenId} />
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Value' testId='RawTransaction.VoutValue'>{vout.value.toFixed(8)}</AdaptiveList.Row>
      {(() => {
        if (address !== undefined) {
          return (
            <AdaptiveList.Row name='Address' testId='RawTransaction.VoutAddress'>
              <AddressLink address={address} className='break-all' />
            </AdaptiveList.Row>
          )
        }
      })()}
    </AdaptiveList>
  )
}
