import { DfTx, ICXSubmitDFCHTLC } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface DfTxICXSubmitDFCHTLCProps {
  dftx: DfTx<ICXSubmitDFCHTLC>
}

export function DfTxICXSubmitDFCHTLC (props: DfTxICXSubmitDFCHTLCProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='ICX Submit DFCHTLC' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList>
          <AdaptiveList.Row name='Offer Tx'>
            <span data-testid='DfTxICXSubmitDFCHTLC.OfferTx'>{props.dftx.data.offerTx}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Amount'>
            <span data-testid='DfTxICXSubmitDFCHTLC.Amount'>{props.dftx.data.amount.toString()}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Hash'>
            <span data-testid='DfTxICXSubmitDFCHTLC.Hash'>{props.dftx.data.hash}</span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
