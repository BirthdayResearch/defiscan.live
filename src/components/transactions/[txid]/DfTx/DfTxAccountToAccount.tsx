import { DfTx, AccountToAccount, ScriptBalances } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/TokenSymbol'

interface DfTxAccountToAccountProps {
  dftx: DfTx<AccountToAccount>
}

export function DfTxAccountToAccount (props: DfTxAccountToAccountProps): JSX.Element {
  const network = useNetworkObject().name
  const from = fromScript(props.dftx.data.from, network)

  return (
    <div>
      <DfTxHeader name='Account To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsFromTable fromAddress={from?.address} />
        <DetailsToTable to={props.dftx.data.to} />
      </div>
    </div>
  )
}

function DetailsFromTable (props: {
  fromAddress?: string
}): JSX.Element {
  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='From' testId='DfTxAccountToAccount.fromAddress'>
        {props.fromAddress ?? 'N/A'}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function DetailsToTable (props: {
  to: ScriptBalances[]
}): JSX.Element {
  const network = useNetworkObject().name

  return (
    <div className='w-full lg:w-1/2'>
      {props.to.map(scriptBalances => {
        const toAddress = fromScript(scriptBalances.script, network)?.address ?? 'N/A'
        return (
          <AdaptiveList key={toAddress} className='mb-1'>
            <AdaptiveList.Row name='To' testId='DfTxAccountToAccount.to'>
              {toAddress}
            </AdaptiveList.Row>
            {scriptBalances.balances.map(balance => {
              return (
                <AdaptiveList.Row name='Amount' key={`${balance.amount.toString()}-${balance.token}`}>
                  <div className='flex flex-row'>
                    <span data-testid='DfTxAccountToAccount.toAmount'>{balance.amount.toFixed(8)}</span>
                    <TokenSymbol tokenId={balance.token} className='ml-1' testId='DfTxAccountToAccount.toSymbol' />
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
