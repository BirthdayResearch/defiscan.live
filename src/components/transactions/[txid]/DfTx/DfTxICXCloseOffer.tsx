import { DfTx, ICXCloseOffer } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface DfTxICXCloseOfferProps {
  dftx: DfTx<ICXCloseOffer>
}

export function DfTxICXCloseOffer (props: DfTxICXCloseOfferProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='ICX Close Offer' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList>
          <AdaptiveList.Row name='Offer Tx'>
            <span data-testid='DfTxICXCloseOffer.OfferTx'>{props.dftx.data.offerTx}</span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
