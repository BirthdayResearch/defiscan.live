import { DfTx, PoolAddLiquidity } from '@defichain/jellyfish-transaction'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'
import BigNumber from 'bignumber.js'

interface DfTxPoolAddLiquidityProps {
  dftx: DfTx<PoolAddLiquidity>
}

interface PoolLiquidityTableProps {
  shareAddress: string | undefined
  signature: number
  type: number
  name: string
  balances: Array<{ token: number, amount: BigNumber }>
}

export function DfTxPoolAddLiquidity (props: DfTxPoolAddLiquidityProps): JSX.Element {
  const network = useNetworkObject().name

  const to = props.dftx.data.shareAddress !== undefined ? fromScript(props.dftx.data.shareAddress, network) : undefined

  return (
    <div>
      <DfTxHeader name='Pool Add Liquidity' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <PoolAddLiquidityTable
          signature={props.dftx.signature}
          type={props.dftx.type}
          name={props.dftx.name}
          shareAddress={to?.address}
          balances={props.dftx.data.from[0].balances}
        />
      </div>
    </div>
  )
}

export function PoolAddLiquidityTable (props: PoolLiquidityTableProps): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Signature' testId='DfTxPoolAddLiquidity.signature'>
          {props.signature}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Name' testId='DfTxPoolAddLiquidity.name' className='break-all'>
          {props.name}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Type' testId='DfTxPoolAddLiquidity.type'>
          {props.type}
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Share Address' testId='DfTxPoolAddLiquidity.shareAddress' className='break-all'>
          {props.shareAddress}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token 1 ID'>
          {props.balances[0].token}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token 2 ID'>
          {props.balances[1].token}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token 1 amount'>
          {props.balances[0].amount.toString()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token 2 amount'>
          {props.balances[1].amount.toString()}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>

  )
}
