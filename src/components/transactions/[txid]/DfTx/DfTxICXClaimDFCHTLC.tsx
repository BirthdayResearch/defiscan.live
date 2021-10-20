import { DfTx, ICXClaimDFCHTLC } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface DfTxICXClaimDFCHTLCProps {
  dftx: DfTx<ICXClaimDFCHTLC>
}

export function DfTxICXClaimDFCHTLC (props: DfTxICXClaimDFCHTLCProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='ICX Claim DFCHTLC' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList>
          <AdaptiveList.Row name='HTLC Tx'>
            <span data-testid='DfTxICXClaimDFCHTLC.dfcHTLCTx'>{props.dftx.data.dfcHTLCTx}</span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Seed'>
            <span data-testid='DfTxICXClaimDFCHTLC.Seed'>{props.dftx.data.seed}</span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
