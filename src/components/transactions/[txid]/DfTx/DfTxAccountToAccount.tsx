import { DfTx, AccountToAccount, ScriptBalances } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxAccountToAccountProps {
  dftx: DfTx<AccountToAccount>
}

export function DfTxAccountToAccount (props: DfTxAccountToAccountProps): JSX.Element {
  const network = useNetworkObject().name
  const from = props.dftx.data.from !== undefined ? fromScript(props.dftx.data.from, network) : undefined

  return (
    <div>
      <DfTxHeader name='Account To Account' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          fromAddress={from?.address}
          to={props.dftx.data.to}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: {
  fromAddress?: string
  to?: ScriptBalances[]
}): JSX.Element {
  const {
    fromAddress,
    to
  } = props
  const network = useNetworkObject().name

  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='From' testId='DfTxAccountToAccount.fromAddress'>
          {fromAddress ?? 'N/A'}
        </AdaptiveList.Row>
      </AdaptiveList>
      <div className='w-full lg:w-1/2'>
        {
          to?.map(scriptBalances => (
            scriptBalances.balances.map(balance => {
              const to = scriptBalances.script !== undefined ? fromScript(scriptBalances.script, network) : undefined
              const toAddress = to !== undefined ? `${to.address}` : ''
              return (
                <AdaptiveList key={balance.amount.toString()}>
                  <AdaptiveList.Row name='To' testId='DfTxAccountToAccount.to'>
                    {`${toAddress}`}
                  </AdaptiveList.Row>
                  <AdaptiveList.Row name='Amount' testId='DfTxAccountToAccount.toAmount'>
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
