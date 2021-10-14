import { DfTx, AccountToUtxos, TokenBalance } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxAccountToUtxosProps {
  dftx: DfTx<AccountToUtxos>
}

export function DfTxAccountToUtxos (props: DfTxAccountToUtxosProps): JSX.Element {
  const network = useNetworkObject().name

  const from = props.dftx.data.from !== undefined ? fromScript(props.dftx.data.from, network) : undefined

  return (
    <div>
      <DfTxHeader name='Account To Utxos' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          fromAddress={from?.address}
          mintingOutputsStart={props.dftx.data.mintingOutputsStart}
          balances={props.dftx.data.balances}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: {
  fromAddress?: string
  balances: TokenBalance[]
  mintingOutputsStart: number
}): JSX.Element {
  const {
    fromAddress,
    balances,
    mintingOutputsStart
  } = props

  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='From' testId='DfTxAccountToUtxos.fromAddress'>
          {fromAddress ?? 'N/A'}
        </AdaptiveList.Row>
        {
          balances.map(
            balance => (
              <AdaptiveList.Row name='Balances' testId='DfTxAccountToUtxos.balances' key={`${balance.amount.toString()}`}>
                {`${balance.amount.toFixed(8)} DFI`}
              </AdaptiveList.Row>
            )
          )
        }
        <AdaptiveList.Row name='Minting outputs start' testId='DfTxAccountToUtxos.mintingOutputsStart'>
          {mintingOutputsStart ?? '-'}
        </AdaptiveList.Row>

      </AdaptiveList>
    </>
  )
}
