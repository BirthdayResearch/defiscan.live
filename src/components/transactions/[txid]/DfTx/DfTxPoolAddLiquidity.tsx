import BigNumber from 'bignumber.js'
import { DfTx, PoolAddLiquidity } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { TokenSymbol } from '@components/commons/TokenSymbol'

interface DfTxPoolAddLiquidityProps {
  dftx: DfTx<PoolAddLiquidity>
}

interface PoolLiquidityTableProps {
  shareAddress: string | undefined
  token1Amount: BigNumber
  token2Amount: BigNumber
  token1Id: number
  token2Id: number
}

export function DfTxPoolAddLiquidity (props: DfTxPoolAddLiquidityProps): JSX.Element {
  const network = useNetworkObject().name
  const to = props.dftx.data.shareAddress !== undefined ? fromScript(props.dftx.data.shareAddress, network) : undefined
  return (
    <div>
      <DfTxHeader name='Pool Add Liquidity' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <PoolAddLiquidityTable
          shareAddress={to?.address}
          token1Amount={props.dftx.data.from[0].balances[0].amount}
          token2Amount={props.dftx.data.from[0].balances[1].amount}
          token1Id={props.dftx.data.from[0].balances[0].token}
          token2Id={props.dftx.data.from[0].balances[1].token}
        />
      </div>
    </div>
  )
}

function PoolAddLiquidityTable (props: PoolLiquidityTableProps): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Share Address' testId='DfTxPoolAddLiquidity.ShareAddress' className='break-all'>
          {props.shareAddress ?? 'N/A'}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token 1 ID' testId='DfTxPoolAddLiquidity.Token1Id'>
          {props.token1Id}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token 1 Amount'>
          <div className='flex flex-row'>
            <span data-testid='DfTxPoolAddLiquidity.Token1Amount'>{props.token1Amount.toFixed(8)}</span>
            <TokenSymbol tokenId={props.token1Id} className='ml-1' testId='DfTxPoolAddLiquidity.Token1Symbol' />
          </div>
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Token 2 ID' testId='DfTxPoolAddLiquidity.Token2Id'>
          {props.token2Id}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Token 2 Amount'>
          <div className='flex flex-row'>
            <span data-testid='DfTxPoolAddLiquidity.Token2Amount'>{props.token2Amount.toFixed(8)}</span>
            <TokenSymbol tokenId={props.token2Id} className='ml-1' testId='DfTxPoolAddLiquidity.Token2Symbol' />
          </div>
        </AdaptiveList.Row>
      </AdaptiveList>
    </>

  )
}
