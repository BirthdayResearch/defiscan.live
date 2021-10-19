import { DfTx, ICXMakeOffer } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxICXMakeOfferProps {
  dftx: DfTx<ICXMakeOffer>
}

export function DfTxICXMakeOffer (props: DfTxICXMakeOfferProps): JSX.Element {
  const network = useNetworkObject().name

  const address = props.dftx.data.ownerAddress !== undefined ? fromScript(props.dftx.data.ownerAddress, network) : undefined
  return (
    <div>
      <DfTxHeader name='ICX Make Offer' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <div className='w-full lg:w-1/2'>
          <AdaptiveList>
            <AdaptiveList.Row name='Order Tx'>
              <span data-testid='DfTxICXMakeOffer.OrderTx'>{props.dftx.data.orderTx}</span>
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Amount'>
              <span data-testid='DfTxICXMakeOffer.Amount'>{props.dftx.data.amount.toFixed(8)}</span>
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Taker Fee'>
              <span data-testid='DfTxICXMakeOffer.TakerFee'>{props.dftx.data.takerFee.toFixed(8)}</span>
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Expiry'>
              <span data-testid='DfTxICXMakeOffer.Expiry'>{`${props.dftx.data.expiry} Blocks`}</span>
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
        <div className='w-full lg:w-1/2'>
          <AdaptiveList>
            <AdaptiveList.Row name='Owner Address'>
              <span data-testid='DfTxICXMakeOffer.OwnerAddress'>{address?.address ?? 'N/A'}</span>
            </AdaptiveList.Row>
            <AdaptiveList.Row name='Pubkey'>
              <span data-testid='DfTxICXMakeOffer.Pubkey'>{props.dftx.data.receivePubkey ?? 'N/A'}</span>
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
      </div>
    </div>
  )
}
