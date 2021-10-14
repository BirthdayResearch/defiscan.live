import { DfTx, UtxosToAccount, ScriptBalances } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { fromScript } from '@defichain/jellyfish-address'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { useNetworkObject } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/TokenSymbol'

interface DfTxUtxoToAccountProps {
  dftx: DfTx<UtxosToAccount>
}

export function DfTxUtxosToAccount (props: DfTxUtxoToAccountProps): JSX.Element {
  const { dftx: { data: { to } } } = props
  return (
    <div>
      <DfTxHeader name='Utxos To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable to={to} />
      </div>
    </div>
  )
}

function DetailsTable (props: { to: ScriptBalances[] }): JSX.Element {
  const network = useNetworkObject().name
  return (
    <div className='w-full lg:w-1/2'>
      {props.to.map(scriptBalances => (
        scriptBalances.balances.map(balance => {
          const toAddress = fromScript(scriptBalances.script, network)?.address ?? 'N/A'

          return (
            <AdaptiveList key={balance.amount.toString()}>
              <AdaptiveList.Row name='To' testId='DfTxUtxosToAccount.to'>
                {toAddress}
              </AdaptiveList.Row>
              <AdaptiveList.Row name='Amount'>
                <div className='flex flex-row'>
                  <span data-testid='DfTxUtxosToAccount.toAmount'>{balance.amount.toFixed(8)}</span>
                  <TokenSymbol tokenId={balance.token} className='ml-1' testId='DfTxUtxosToAccount.toSymbol' />
                </div>
              </AdaptiveList.Row>
            </AdaptiveList>
          )
        })
      ))}
    </div>
  )
}
