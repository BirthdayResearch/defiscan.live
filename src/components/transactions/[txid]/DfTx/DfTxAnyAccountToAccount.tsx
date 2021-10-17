import { DfTx, AnyAccountToAccount, ScriptBalances } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/TokenSymbol'

interface DfTxAnyAccountToAccountProps {
  dftx: DfTx<AnyAccountToAccount>
}

export function DfTxAnyAccountToAccount (props: DfTxAnyAccountToAccountProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Any Account To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <FromTable
          from={props.dftx.data.from}
        />
        <ToTable
          to={props.dftx.data.to}
        />
      </div>
    </div>
  )
}

function FromTable (props: {
  from: ScriptBalances[]
}): JSX.Element {
  const network = useNetworkObject().name
  return (
    <div className='w-full lg:w-1/2'>
      {props.from.map(scriptBalances => {
        const scriptFromAddress = fromScript(scriptBalances.script, network)?.address ?? 'N/A'
        return (
          <AdaptiveList key={`from-${scriptFromAddress}`} className='mb-1'>
            <AdaptiveList.Row name='From' testId='DfTxAnyAccountToAccount.from'>
              {scriptFromAddress}
            </AdaptiveList.Row>
            {scriptBalances.balances.map(balance => {
              return (
                <AdaptiveList.Row name='Amount' key={`from-${balance.amount.toFixed(8)}-${balance.token}`}>
                  <div className='flex flex-row'>
                    <span data-testid='DfTxAnyAccountToAccount.fromAmount'>{balance.amount.toFixed(8)}</span>
                    <TokenSymbol
                      tokenId={balance.token} className='ml-1'
                      testId='DfTxAnyAccountToAccount.fromSymbol'
                    />
                  </div>
                </AdaptiveList.Row>
              )
            })}
          </AdaptiveList>
        )
      })}
    </div>
  )
}

function ToTable (props: {
  to: ScriptBalances[]
}): JSX.Element {
  const network = useNetworkObject().name
  return (
    <div className='w-full lg:w-1/2'>
      {props.to.map(scriptBalances => {
        const scriptToAddress = fromScript(scriptBalances.script, network)?.address ?? 'N/A'
        return (
          <AdaptiveList key={`to-${scriptToAddress}`} className='mb-1'>
            <AdaptiveList.Row name='To' testId='DfTxAnyAccountToAccount.to'>
              {scriptToAddress}
            </AdaptiveList.Row>
            {scriptBalances.balances.map(balance => {
              return (
                <AdaptiveList.Row name='Amount' key={`to-${balance.amount.toFixed(8)}-${balance.token}`}>
                  <div className='flex flex-row'>
                    <span data-testid='DfTxAnyAccountToAccount.toAmount'>{balance.amount.toFixed(8)}</span>
                    <TokenSymbol
                      tokenId={balance.token} className='ml-1'
                      testId='DfTxAnyAccountToAccount.toSymbol'
                    />
                  </div>
                </AdaptiveList.Row>
              )
            })}
          </AdaptiveList>
        )
      })}
    </div>
  )
}
