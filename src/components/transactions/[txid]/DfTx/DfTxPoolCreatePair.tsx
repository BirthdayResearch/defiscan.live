import { DfTx, PoolCreatePair } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { fromScript } from '@defichain/jellyfish-address'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxPoolCreatePairProps {
  dftx: DfTx<PoolCreatePair>
}

interface DetailsTableProps {
  tokenA: number
  tokenB: number
  status: number
  pairSymbol: string
  ownerAddress: string|undefined
  commission: string
}

export function DfTxPoolCreatePair (props: DfTxPoolCreatePairProps): JSX.Element {
  console.log('props', props)
  const {
    dftx: {
      data: {
        tokenA,
        tokenB,
        status,
        pairSymbol,
        ownerAddress,
        commission
      }
    }
  } = props
  const network = useNetworkObject().name

  const address = ownerAddress !== undefined ? fromScript(ownerAddress, network) : undefined
  return (
    <div>
      <DfTxHeader name='Pool Create Pair' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          tokenA={tokenA}
          tokenB={tokenB}
          commission={commission.toString()}
          ownerAddress={address?.address}
          status={Number(status)}
          pairSymbol={pairSymbol}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: DetailsTableProps): JSX.Element {
  const {
    tokenA,
    tokenB,
    status,
    pairSymbol,
    ownerAddress,
    commission
  } = props
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Token A' testId='DfTxPoolCreatePair.tokenA'>
          {tokenA}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token B' testId='DfTxPoolCreatePair.tokenB'>
          {tokenB}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Commission' testId='DfTxPoolCreatePair.commission'>
          {commission}
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Owner Address' testId='DfTxPoolCreatePair.ownerAddress'>
          {ownerAddress ?? 'N/A'}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Status' testId='DfTxPoolCreatePair.status'>
          {status}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Pair Symbol' testId='DfTxPoolCreatePair.pairSymbol'>
          {pairSymbol}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  )
}
