import { TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { useNetworkObject } from '@contexts/NetworkContext'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { fromScriptHex } from '@defichain/jellyfish-address'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { DfTx, OP_DEFI_TX, toOPCodes } from '@defichain/jellyfish-transaction'
import { SmartBuffer } from 'smart-buffer'
import { TransactionVectorRow } from '@components/commons/transactions/TransactionVectorRow'

interface AddressVinVoutProps {
  txid: string
  expanded: boolean
}

export function AddressVinVout (props: AddressVinVoutProps): JSX.Element {
  const network = useNetworkObject().name

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

  if (props.expanded && vins !== undefined && vouts !== undefined) {
    const dftx: DfTx<any> | undefined = getDfTx(vouts)

    return (
      <div className='table-row max-w-max'>
        <td colSpan={4} className='px-6 pt-2 pb-4 lg:p-6'>
          <div className='w-full font-medium text-lg'>Details</div>
          <div className='mt-2 w-full flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>

            <div className='w-full lg:w-1/2'>
              <div className='flex flex-col gap-y-1' data-testid='TransactionDetailsLeft.List'>
                {vins.map((vin) => {
                  const decoded = vin.vout !== undefined ? fromScriptHex(vin.vout.script?.hex, network) : undefined
                  const address = decoded?.address ?? 'N/A'

                  if (vin.vout === undefined) {
                    return (
                      <TransactionVectorRow
                        label='INPUT'
                        address={address}
                        value='Coinbase (Newly Generated Coins)'
                        key={vin.id}
                        network={network}
                        isAddress={false}
                      />
                    )
                  }

                  return (
                    <TransactionVectorRow
                      label='INPUT'
                      address={address}
                      value={`${vin.vout.value} DFI`}
                      key={vin.id}
                      network={network}
                      isAddress
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
                {vouts.map((vout, index) => {
                  const decoded = vout.script !== undefined ? fromScriptHex(vout.script?.hex, network) : undefined

                  let address = decoded?.address ?? 'N/A'
                  let isAddress = true
                  if (index === 0) {
                    address = decoded?.address ?? dftx?.name ?? 'N/A'
                    isAddress = dftx === undefined
                  }

                  return (
                    <TransactionVectorRow
                      label='OUTPUT'
                      address={address}
                      value={`${vout.value} DFI`}
                      key={vout.n}
                      network={network}
                      isAddress={isAddress}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </td>
      </div>
    )
  } else {
    return (<></>)
  }
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
