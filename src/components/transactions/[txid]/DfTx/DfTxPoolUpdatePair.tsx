import { DfTx, PoolUpdatePair } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { fromScript } from '@defichain/jellyfish-address'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { useNetworkObject } from '@contexts/NetworkContext'
import { TokenBalance } from '@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'

interface DfTxPoolUpdatePairProps {
  dftx: DfTx<PoolUpdatePair>
}

export function DfTxPoolUpdatePair (props: DfTxPoolUpdatePairProps): JSX.Element {
  const network = useNetworkObject().name
  const address = fromScript(props.dftx.data.ownerAddress, network)

  return (
    <div>
      <DfTxHeader name='Pool Update Pair' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <PoolUpdatePairDetailsTable
          poolId={props.dftx.data.poolId}
          status={Number(props.dftx.data.status)}
          commission={props.dftx.data.commission.toString()}
          ownerAddress={address?.address}
        />
        <PoolUpdatePairList customRewards={props.dftx.data.customRewards} />
      </div>
    </div>
  )
}

function PoolUpdatePairDetailsTable (props: {
  poolId: number
  status: number
  commission: string
  ownerAddress?: string
}): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Pool Id' testId='DfTxPoolUpdatePair.poolId'>
          {props.poolId}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='status' testId='DfTxPoolUpdatePair.status'>
          {props.status}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='commission' testId='DfTxPoolUpdatePair.commission'>
          {props.commission}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Owner Address' testId='DfTxPoolUpdatePair.ownerAddress'>
          {props.ownerAddress}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  )
}

function PoolUpdatePairList (props: { customRewards: TokenBalance[] }): JSX.Element {
  if (props.customRewards.length === 0) {
    return (
      <></>
    )
  }

  return (
    <>
      <AdaptiveTable className='w-full lg:w-1/2'>
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>TOKEN</AdaptiveTable.Head>
          <AdaptiveTable.Head>AMOUNT</AdaptiveTable.Head>
        </AdaptiveTable.Header>

        {props.customRewards.map(reward => {
          return (
            <AdaptiveTable.Row key={reward.token}>
              <AdaptiveTable.Cell title='TOKEN' className='align-middle'>
                <div className='flex items-center' data-testid='DfTxPoolUpdatePair.Token'>
                  {reward.token}
                </div>
              </AdaptiveTable.Cell>
              <AdaptiveTable.Cell title='AMOUNT' className='align-middle'>
                <span data-testid='DfTxPoolUpdatePair.Amount'>{reward.amount.toFixed(8)}</span>
              </AdaptiveTable.Cell>
            </AdaptiveTable.Row>
          )
        })}
      </AdaptiveTable>
    </>
  )
}
