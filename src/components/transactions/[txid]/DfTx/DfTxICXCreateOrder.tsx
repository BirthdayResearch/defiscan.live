import { DfTx, ICXCreateOrder } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxICXCreateOrderProps {
  dftx: DfTx<ICXCreateOrder>
}

export function DfTxICXCreateOrder (props: DfTxICXCreateOrderProps): JSX.Element {
  const network = useNetworkObject().name
  const ownerAddress = fromScript(props.dftx.data.ownerAddress, network)

  return (
    <div>
      <DfTxHeader name='ICX Create Order' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          amountFrom={props.dftx.data.amountFrom.toString()}
          amountToFill={props.dftx.data.amountToFill.toString()}
          orderPrice={props.dftx.data.orderPrice.toString()}
          orderType={props.dftx.data.orderType}
          ownerAddress={ownerAddress?.address}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: {
  amountFrom: string
  amountToFill: string
  orderPrice: string
  orderType: number
  ownerAddress: string|undefined
}): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Amount From' testId='DfTxICXCreateOrder.amountFrom'>
        {props.amountFrom}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Amount To Fill' testId='DfTxICXCreateOrder.amountToFill'>
        {props.amountToFill}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Order Price' testId='DfTxICXCreateOrder.orderPrice'>
        {props.orderPrice}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Order Type' testId='DfTxICXCreateOrder.orderType'>
        {props.orderType}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Owner Address' testId='DfTxICXCreateOrder.ownerAddress'>
        {props.ownerAddress}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}
