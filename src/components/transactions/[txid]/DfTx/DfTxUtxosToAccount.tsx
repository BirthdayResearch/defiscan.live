import { DfTx, UtxosToAccount, ScriptBalances } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface DfTxUtxoToAccountProps {
  dftx: DfTx<UtxosToAccount>
}

export function DfTxUtxosToAccount (props: DfTxUtxoToAccountProps): JSX.Element {
  const { dftx: { data: { to } } } = props
  console.log('props', props)
  return (
    <div>
      <DfTxHeader name='Utxos To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable to={to} />
      </div>
    </div>
  )
}

function DetailsTable ({ to }: { to: ScriptBalances[] }): JSX.Element {
  console.log('to', to)
  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      {to.map(scriptBalances => (
        scriptBalances.balances.map(balance => (
          <AdaptiveList.Row
            name='To'
            testId='DfTxUtxosToAccount.to'
            key={balance.amount.toString()}
          >
            {
              balance.amount.c !== null
                ? `${balance.amount.toString()} DFI`
                : 'N/A DFI'
            }
          </AdaptiveList.Row>
        ))
      ))}
    </AdaptiveList>
  )
}
