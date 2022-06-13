import { DfTx, PoolUpdatePair } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from './DfTxHeader'
import { fromScript } from '@defichain/jellyfish-address'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { useNetwork } from '@contexts/NetworkContext'
import { TokenBalance } from '@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { AddressLink } from '@components/commons/link/AddressLink'

interface DfTxPoolUpdatePairProps {
  dftx: DfTx<PoolUpdatePair>
}

export function DfTxPoolUpdatePair (props: DfTxPoolUpdatePairProps): JSX.Element {
  const network = useNetwork().name
  const ownerAddress = fromScript(props.dftx.data.ownerAddress, network)

  return (
    <div>
      <DfTxHeader name='Pool Update Pair' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <PoolUpdatePairDetailsTable
          poolId={props.dftx.data.poolId}
          status={Number(props.dftx.data.status)}
          commission={props.dftx.data.commission.toFixed(8)}
          ownerAddress={ownerAddress?.address}
        />
        {props.dftx.data.customRewards.length > 0 &&
          <div className='w-full lg:w-1/2'>
            <div className='-mb-4 lg:mb-2 lg:-mt-8 font-medium text-gray-800 opacity-80 dark:text-gray-100'>Custom Rewards</div>
            <AdaptiveTable>
              <AdaptiveTable.Header>
                <AdaptiveTable.Head>TOKEN</AdaptiveTable.Head>
                <AdaptiveTable.Head>AMOUNT</AdaptiveTable.Head>
              </AdaptiveTable.Header>
              {props.dftx.data.customRewards.map(tokenReward => {
                return (
                  <PoolUpdatePairTableRow tokenReward={tokenReward} key={tokenReward.token} />
                )
              })}
            </AdaptiveTable>
          </div>}
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
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='Pool ID' testId='DfTxPoolUpdatePair.poolId'>
        {props.poolId}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Commission' testId='DfTxPoolUpdatePair.commission'>
        {props.commission}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Owner Address' testId='DfTxPoolUpdatePair.ownerAddress'>
        {(() => {
          if (props.ownerAddress !== undefined) {
            return (
              <AddressLink
                address={props.ownerAddress}
                testId='DfTxPoolUpdatePair.ownerAddress'
              />
            )
          }
          return 'N/A'
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Status' testId='DfTxPoolUpdatePair.status'>
        {props.status}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function PoolUpdatePairTableRow (props: { tokenReward: TokenBalance }): JSX.Element {
  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='TOKEN' className='align-middle'>
        <div className='flex items-center'>
          <TokenSymbol tokenId={props.tokenReward.token} testId='DfTxPoolUpdatePair.Token' />
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='AMOUNT' className='align-middle'>
        <span data-testid='DfTxPoolUpdatePair.Amount'>{props.tokenReward.amount.toFixed(8)}</span>
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}
