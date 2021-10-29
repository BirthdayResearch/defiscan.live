import { DfTx, UtxosToAccount } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { fromScript } from '@defichain/jellyfish-address'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { useNetworkContext } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { TokenBalance } from '@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance'

interface DfTxUtxoToAccountProps {
  dftx: DfTx<UtxosToAccount>
}

export function DfTxUtxosToAccount (props: DfTxUtxoToAccountProps): JSX.Element {
  const network = useNetworkContext().name

  return (
    <div>
      <DfTxHeader name='Utxos To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <div className='w-full grid gap-2 grid-cols-1 lg:grid-cols-2'>
          {props.dftx.data.to.map(scriptBalances => {
            const toAddress = fromScript(scriptBalances.script, network)?.address ?? 'N/A'
            return (
              <AdaptiveList key={toAddress}>
                <AdaptiveList.Row name='To' testId='DfTxUtxosToAccount.to'>
                  {toAddress}
                </AdaptiveList.Row>
                {scriptBalances.balances.map(balance => {
                  return (
                    <UtxosToAccountList balance={balance} key={`${toAddress}-${balance.token}`} />
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

function UtxosToAccountList (props: { balance: TokenBalance }): JSX.Element {
  return (
    <AdaptiveList.Row name='Amount'>
      <div className='flex flex-row'>
        <span data-testid='DfTxUtxosToAccount.toAmount'>{props.balance.amount.toFixed(8)}</span>
        <TokenSymbol tokenId={props.balance.token} className='ml-1' testId='DfTxUtxosToAccount.toSymbol' />
      </div>
    </AdaptiveList.Row>
  )
}
