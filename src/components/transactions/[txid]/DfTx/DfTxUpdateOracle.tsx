import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { DfTx, UpdateOracle } from '@defichain/jellyfish-transaction'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

interface DfTxUpdateOracleProps {
  dftx: DfTx<UpdateOracle>
}
export function DfTxUpdateOracle (props: DfTxUpdateOracleProps): JSX.Element {
  const network = useNetworkObject().name
  const address = fromScript(props.dftx.data.script, network)?.address

  return (
    <div>
      <DfTxHeader name='Update Oracle' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Address' testId='DfTxUpdateOracle.Address'>
            {address ?? 'N/A'}
          </AdaptiveList.Row>
        </AdaptiveList>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='OracleID' testId='DfTxUpdateOracle.OracleId'>
            {props.dftx.data.oracleId}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
