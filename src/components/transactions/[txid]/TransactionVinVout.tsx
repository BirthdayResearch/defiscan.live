import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { NetworkName, useNetworkObject } from '@contexts/NetworkContext'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { fromScriptHex } from '@defichain/jellyfish-address'
import BigNumber from 'bignumber.js'

interface TransactionVinVoutProps {
  transaction: Transaction
  vins: TransactionVin[]
  vouts: TransactionVout[]
  fee: BigNumber
}

export function TransactionVinVout (props: TransactionVinVoutProps): JSX.Element {
  const network = useNetworkObject().name

  return (
    <>
      <h1 className='font-medium text-2xl mt-6' data-testid='details-subtitle'>Details</h1>

      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <div className='w-full lg:w-1/2 max-h-screen'>
          <div className='flex flex-col gap-y-1' data-testid='TransactionDetailsLeft.List'>
            {props.vins.map((vin) => {
              if (vin.vout === undefined) {
                return (
                  <TransactionVectorRow
                    label='INPUT'
                    script={undefined}
                    value='Coinbase (Newly Generated Coins)'
                    key={vin.id}
                    network={network}
                  />
                )
              }

              return (
                <TransactionVectorRow
                  label='INPUT'
                  script={vin.vout.script}
                  value={`${vin.vout.value} DFI`}
                  key={vin.id}
                  network={network}
                />
              )
            })}
          </div>
        </div>

        <div className='flex items-center justify-center text-gray-600 w-full lg:w-auto lg:h-20'>
          <IoArrowForwardOutline className='transform rotate-90 lg:rotate-0' size={24} />
        </div>

        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col gap-y-1' data-testid='TransactionDetailsRight.List'>
            {props.vouts.map((vout) => {
              return (
                <TransactionVectorRow
                  label='OUTPUT'
                  script={vout.script}
                  value={`${vout.value} DFI`}
                  key={vout.n}
                  network={network}
                />
              )
            })}
          </div>
        </div>
      </div>

      <TransactionSummary
        transaction={props.transaction}
        vins={props.vins}
        fee={props.fee}
      />
    </>
  )
}

function TransactionSummary (props: { transaction: Transaction, vins: TransactionVin[], fee: BigNumber }): JSX.Element {
  const fee = props.vins[0].vout === undefined ? 'Coinbase' : `${props.fee.decimalPlaces(8).toString()} mDFI`

  return (
    <div className='flex flex-col items-end justify-between mt-8'>
      <div className='flex justify-between gap-x-3' data-testid='TransactionDetailsSummary.fee'>
        <span>Fees:</span>
        <span>{fee}</span>
      </div>
      <div className='flex justify-between gap-x-3 mt-2' data-testid='TransactionDetailsSummary.total'>
        <span>Total:</span>
        <span>{props.transaction.totalVoutValue} DFI</span>
      </div>
    </div>
  )
}

function TransactionVectorRow (props: {
  label: 'INPUT' | 'OUTPUT'
  script?: {
    hex: string
  }
  value: string
  network: NetworkName
}): JSX.Element {
  const decoded = props.script !== undefined ? fromScriptHex(props.script?.hex, props.network) : undefined

  return (
    <div className='bg-gray-50 h-20 p-3 rounded flex justify-between'>
      <div className='flex flex-col justify-between h-full w-full'>
        <span className='bg-gray-200 rounded text-xs px-2 py-1 font-medium w-min mb-1.5'>
          {props.label}
        </span>
        <div className='flex justify-between gap-x-2'>
          <span className='opacity-60 overflow-ellipsis overflow-hidden'>
            {decoded?.address ?? 'N/A'}
          </span>
          <span className='min-w-max'>
            {props.value}
          </span>
        </div>
      </div>
    </div>
  )
}
