import { DfTx, PoolCreatePair } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { fromScript } from '@defichain/jellyfish-address'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxPoolCreatePairProps {
  dftx: DfTx<PoolCreatePair>
}

export function DfTxPoolCreatePair (props: DfTxPoolCreatePairProps): JSX.Element {
  const network = useNetworkObject().name
  const address = fromScript(props.dftx.data.ownerAddress, network)

  return (
    <div>
      <DfTxHeader name='Pool Create Pair' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          tokenA={props.dftx.data.tokenA}
          tokenB={props.dftx.data.tokenB}
          commission={props.dftx.data.commission.toString()}
          ownerAddress={address?.address}
          status={props.dftx.data.status}
          pairSymbol={props.dftx.data.pairSymbol}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: {
  tokenA: number
  tokenB: number
  status: boolean
  pairSymbol: string
  ownerAddress?: string
  commission: string
}): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Token A' testId='DfTxPoolCreatePair.tokenA'>
          {props.tokenA}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token B' testId='DfTxPoolCreatePair.tokenB'>
          {props.tokenB}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Commission' testId='DfTxPoolCreatePair.commission'>
          {props.commission}
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Owner Address' testId='DfTxPoolCreatePair.ownerAddress'>
          {props.ownerAddress ?? 'N/A'}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Status' testId='DfTxPoolCreatePair.status'>
          {Number(status)}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Pair Symbol' testId='DfTxPoolCreatePair.pairSymbol'>
          {props.pairSymbol}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  )
}
