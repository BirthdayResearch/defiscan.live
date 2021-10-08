import BigNumber from 'bignumber.js'
import { DfTx, PoolRemoveLiquidity } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'

interface DfTxPoolRemoveLiquidityProps {
  dftx: DfTx<PoolRemoveLiquidity>
}

export function DfTxPoolRemoveLiquidity (props: DfTxPoolRemoveLiquidityProps): JSX.Element {
  const network = useNetworkObject().name
  const address = fromScript(props.dftx.data.script, network)?.address

  return (
    <div>
      <DfTxHeader name='Pool Remove Liquidity' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <PoolRemoveLiquidityTable
          amount={props.dftx.data.amount}
          address={address}
          tokenId={props.dftx.data.tokenId}
        />
      </div>
    </div>
  )
}

function PoolRemoveLiquidityTable ({ address, amount, tokenId }: {address: string | undefined, amount: BigNumber, tokenId: number}): JSX.Element {
  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='Address' testId='DfTxPoolRemoveLiquidity.Address' className='break-all'>
        {address}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Amount' testId='DfTxPoolRemoveLiquidity.Amount'>
        {amount.toString()} DFI
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Token ID' testId='DfTxPoolRemoveLiquidity.Token'>
        {tokenId}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}
