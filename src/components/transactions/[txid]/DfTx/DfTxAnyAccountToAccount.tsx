import { DfTx, AnyAccountToAccount, ScriptBalances } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxAnyAccountToAccountProps {
  dftx: DfTx<AnyAccountToAccount>
}

export function DfTxAnyAccountToAccount (props: DfTxAnyAccountToAccountProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Any Account To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          from={props.dftx.data.from}
          to={props.dftx.data.to}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: {
  from?: ScriptBalances[]
  to?: ScriptBalances[]
}): JSX.Element {
  const {
    from,
    to
  } = props

  const network = useNetworkObject().name
  return (
    <>
      <div className='w-full lg:w-1/2'>
        {
          from?.map(scriptBalances => (
            scriptBalances.balances.map(balance => {
              const scriptFrom = scriptBalances.script !== undefined ? fromScript(scriptBalances.script, network) : undefined
              const scriptFromAddress = scriptFrom !== undefined ? `${scriptFrom.address}` : ''
              return (
                <AdaptiveList key={balance.amount.toString()}>
                  <AdaptiveList.Row name='From' testId='DfTxAnyAccountToAccount.from'>
                    {`${scriptFromAddress}`}
                  </AdaptiveList.Row>
                  <AdaptiveList.Row name='Amount' testId='DfTxAnyAccountToAccount.fromAmount'>
                    {`${balance.amount.toFixed(8)} DFI`}
                  </AdaptiveList.Row>
                </AdaptiveList>
              )
            })
          ))
        }
      </div>
      <div className='w-full lg:w-1/2'>
        {
          to?.map(scriptBalances => (
            scriptBalances.balances.map(balance => {
              const to = scriptBalances.script !== undefined ? fromScript(scriptBalances.script, network) : undefined
              const toAddress = to !== undefined ? `${to.address}` : ''

              return (
                <AdaptiveList key={balance.amount.toString()}>
                  <AdaptiveList.Row name='To' testId='DfTxAnyAccountToAccount.to'>
                    {`${toAddress}`}
                  </AdaptiveList.Row>
                  <AdaptiveList.Row name='Amount' testId='DfTxAnyAccountToAccount.toAmount'>
                    {`${balance.amount.toFixed(8)} DFI`}
                  </AdaptiveList.Row>
                </AdaptiveList>
              )
            })
          ))
        }
      </div>
    </>
  )
}
