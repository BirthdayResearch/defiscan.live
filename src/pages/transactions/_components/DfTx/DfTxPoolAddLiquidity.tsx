import BigNumber from 'bignumber.js'
import { DfTx, PoolAddLiquidity } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from './DfTxHeader'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import classNames from 'classnames'
import { AddressLink } from '@components/commons/link/AddressLink'

interface DfTxPoolAddLiquidityProps {
  dftx: DfTx<PoolAddLiquidity>
}

export function DfTxPoolAddLiquidity (props: DfTxPoolAddLiquidityProps): JSX.Element {
  const network = useNetwork().name
  const shareAddress = props.dftx.data.shareAddress !== undefined ? fromScript(props.dftx.data.shareAddress, network) : undefined

  return (
    <div>
      <DfTxHeader name='Pool Add Liquidity' />
      <div className='mt-5 flex flex-col space-y-6 items-start'>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Share Address'>
            {(() => {
              if (shareAddress?.address !== undefined) {
                return (
                  <AddressLink
                    address={shareAddress.address} testId='DfTxPoolAddLiquidity.ShareAddress'
                    className='break-all'
                  />
                )
              }
              return 'N/A'
            })()}
          </AdaptiveList.Row>
        </AdaptiveList>
        <div className='w-full grid gap-2 grid-cols-1 lg:grid-cols-2'>
          {props.dftx.data.from.map(scriptBalance => {
            const fromAddress = fromScript(scriptBalance.script, network)?.address ?? 'N/A'
            return (
              <AdaptiveList key={`from-${fromAddress}`}>
                <AdaptiveList.Row name='From'>
                  <AddressLink address={fromAddress} testId='DfTxPoolAddLiquidity.FromAddress' className='break-all' />
                </AdaptiveList.Row>
                {scriptBalance.balances.map(balance => {
                  return (
                    <PoolAddLiquidityRow
                      tokenId={balance.token} amount={balance.amount}
                      key={`${balance.token}-${balance.amount.toFixed(8)}`}
                    />
                  )
                })}
              </AdaptiveList>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PoolAddLiquidityRow (props: { tokenId: number, amount: BigNumber }): JSX.Element {
  return (
    <div className='table-row border-b border-gray-100 dark:border-gray-700 last:border-b-0'>
      <div className='table-cell px-4 md:px-6 py-3'>
        <div className='flex items-center dark:text-gray-400'>
          <TokenSymbol tokenId={props.tokenId} testId={`DfTxPoolAddLiquidity.${props.tokenId}-Symbol`} />
        </div>
      </div>
      <div className={classNames('table-cell px-4 md:px-6 py-3 text-gray-600 dark:text-gray-100 align-middle break-all')}>
        <span data-testid={`DfTxPoolAddLiquidity.${props.tokenId}-Amount`}>{props.amount.toFixed(8)}</span>
      </div>
    </div>
  )
}
