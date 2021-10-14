import { DfTx, AccountToUtxos, TokenBalance } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'
import { TokenSymbol } from '@components/commons/TokenSymbol'

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
              <AdaptiveList.Row name='Balances' key={`${balance.amount.toString()}`}>
                <div className='flex flex-row'>
                  <span data-testid='DfTxAccountToUtxos.balances'>{balance.amount.toFixed(8)}</span>
                  <TokenSymbol tokenId={balance.token} className='ml-1' testId='DfTxAccountToUtxos.symbol' />
                </div>
              </AdaptiveList.Row>
            )
          )
        }
      </AdaptiveList>

      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Minting Outputs Start' testId='DfTxAccountToUtxos.mintingOutputsStart'>
          {mintingOutputsStart ?? '-'}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  )
}
