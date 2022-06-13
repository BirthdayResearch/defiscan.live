import { TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { NetworkName, useNetwork } from '@contexts/NetworkContext'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { CgSpinner } from 'react-icons/cg'
import { fromScriptHex } from '@defichain/jellyfish-address'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { DfTx, OP_DEFI_TX, toOPCodes } from '@defichain/jellyfish-transaction'
import { SmartBuffer } from 'smart-buffer'
import { TransactionVectorRow } from '@components/commons/transactions/TransactionVectorRow'

interface AddressVinVoutProps {
  address: string
  txid: string
  expanded: boolean
}

export function AddressVinVout (props: AddressVinVoutProps): JSX.Element {
  const api = useWhaleApiClient()
  const [vins, setVins] = useState<TransactionVin[] | undefined>(undefined)
  const [vouts, setVouts] = useState<TransactionVout[] | undefined>(undefined)

  async function getVins (txid): Promise<TransactionVin[]> {
    const vins: TransactionVin[] = []
    let vinsResponse = await api.transactions.getVins(txid, 100)
    vins.push(...vinsResponse)
    while (vinsResponse.hasNext) {
      vinsResponse = await api.transactions.getVins(txid, 100, vinsResponse.nextToken)
      vins.push(...vinsResponse)
    }
    return vins
  }

  async function getVouts (txid): Promise<TransactionVout[]> {
    const vouts: TransactionVout[] = []
    let voutsResponse = await api.transactions.getVouts(txid, 100)
    vouts.push(...voutsResponse)
    while (voutsResponse.hasNext) {
      voutsResponse = await api.transactions.getVouts(txid, 100, voutsResponse.nextToken)
      vouts.push(...voutsResponse)
    }
    return vouts
  }

  useEffect(() => {
    if (props.expanded) {
      void Promise.all([
        getVins(props.txid),
        getVouts(props.txid)
      ]
      ).then(([vinsData, voutsData]) => {
        setVins(vinsData)
        setVouts(voutsData)
      })
    }
  }, [props.expanded])

  if (props.expanded && vins === undefined && vouts === undefined) {
    return <LoadingPanel />
  } else if (props.expanded && vins !== undefined && vouts !== undefined) {
    return <TransactionDetails address={props.address} vins={vins} vouts={vouts} />
  } else {
    return <></>
  }
}

function LoadingPanel (): JSX.Element {
  return (
    <td colSpan={4}>
      <div className='flex justify-center pt-2 pb-4'>
        <CgSpinner size={32} className='animate-spin text-gray-600 dark:text-gray-100' />
      </div>
    </td>
  )
}

function TransactionDetails (props: { address: string, vins: TransactionVin[], vouts: TransactionVout[] }): JSX.Element {
  const network = useNetwork().name
  const dftx: DfTx<any> | undefined = getDfTx(props.vouts)

  return (
    <td colSpan={4} className='px-4 md:px-6 pt-2 pb-4 lg:p-6 bg-gray-200 bg-opacity-50 dark:bg-opacity-80 dark:bg-gray-800'>
      <div className='w-full font-medium text-lg dark:text-dark-gray-900'>Details</div>
      <div className='mt-2 w-full flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <TransactionDetailsLeft address={props.address} vins={props.vins} network={network} />
        <div className='flex items-center justify-center text-gray-600 dark:text-dark-primary-500 w-full lg:w-auto lg:h-20'>
          <IoArrowForwardOutline className='transform rotate-90 lg:rotate-0' size={24} />
        </div>
        <TransactionDetailsRight address={props.address} vouts={props.vouts} network={network} dftx={dftx} />
      </div>
    </td>
  )
}

function TransactionDetailsLeft (props: { address: string, vins: TransactionVin[], network: NetworkName }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
      <div className='flex flex-col space-y-1' data-testid='TransactionDetailsLeft.List'>
        {props.vins.map((vin) => {
          const decoded = vin.vout !== undefined ? fromScriptHex(vin.vout.script?.hex, props.network) : undefined
          const address = decoded?.address ?? 'N/A'

          if (vin.vout === undefined) {
            return (
              <TransactionVectorRow
                label='INPUT'
                address={address}
                value='Coinbase (Newly Generated Coins)'
                key={vin.id}
                network={props.network}
                isAddressClickable={false}
              />
            )
          }
          return (
            <TransactionVectorRow
              label='INPUT'
              address={address}
              value={`${vin.vout.value} DFI`}
              key={vin.id}
              network={props.network}
              isAddressClickable={address !== props.address}
            />
          )
        })}
      </div>
    </div>
  )
}

function TransactionDetailsRight (props: { address: string, vouts: TransactionVout[], network: NetworkName, dftx: DfTx<any> | undefined }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
      <div className='flex flex-col space-y-1' data-testid='TransactionDetailsRight.List'>
        {props.vouts.map((vout, index) => {
          const decoded = vout.script !== undefined ? fromScriptHex(vout.script?.hex, props.network) : undefined

          let address = decoded?.address ?? 'N/A'
          if (index === 0) {
            address = decoded?.address ?? props.dftx?.name ?? 'N/A'
          }

          return (
            <TransactionVectorRow
              label='OUTPUT'
              address={address}
              value={`${vout.value} DFI`}
              key={vout.n}
              network={props.network}
              isAddressClickable={props.dftx === undefined && decoded?.address !== undefined}
            />
          )
        })}
      </div>
    </div>
  )
}

function getDfTx (vouts: TransactionVout[]): DfTx<any> | undefined {
  const hex = vouts[0].script.hex
  const buffer = SmartBuffer.fromBuffer(Buffer.from(hex, 'hex'))
  const stack = toOPCodes(buffer)
  if (stack.length !== 2 || stack[1].type !== 'OP_DEFI_TX') {
    return undefined
  }
  return (stack[1] as OP_DEFI_TX).tx
}
