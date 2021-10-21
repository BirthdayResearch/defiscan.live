import { DfTx, ICXSubmitDFCHTLC } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Link } from '@components/commons/Link'

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
            <Link href={{ pathname: `/transactions/${props.dftx.data.offerTx}` }}>
              <span
                className='cursor-pointer hover:text-primary-500 break-all'
                data-testid='DfTxICXSubmitDFCHTLC.OfferTx'
              >{props.dftx.data.offerTx}
              </span>
            </Link>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Hash'>
            <span data-testid='DfTxICXSubmitDFCHTLC.Hash'>{props.dftx.data.hash}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Amount'>
            <span data-testid='DfTxICXSubmitDFCHTLC.Amount'>{props.dftx.data.amount.toFixed(8)}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Timeout'>
            <span data-testid='DfTxICXSubmitDFCHTLC.Timeout'>{props.dftx.data.timeout} Blocks</span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
