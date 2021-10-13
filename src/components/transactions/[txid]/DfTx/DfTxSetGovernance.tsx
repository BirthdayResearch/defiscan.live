import { DfTx, GovernanceVar, LiqPoolSplit, SetGovernance } from '@defichain/jellyfish-transaction'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'

interface DfTxSetGovernanceProps {
  dftx: DfTx<SetGovernance>
}

export function DfTxSetGovernance (props: DfTxSetGovernanceProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Set Governance' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        {props.dftx.data.governanceVars.map((gov, index) => (
          <SetGovernanceTable governance={gov} key={index} />
        ))}
      </div>
    </div>
  )
}

function SetGovernanceTable ({ governance }: { governance: GovernanceVar }): JSX.Element {
  const liqPoolSplit = governance.value as LiqPoolSplit[]
  const isLiqPoolSplit = typeof governance.value === 'object'
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name=' Governance Key' testId='DfTxSetGovernance.Key'>
          {governance.key}
        </AdaptiveList.Row>
        {isLiqPoolSplit && liqPoolSplit.map(value => (
          <AdaptiveList.Row key={value.tokenId} name='Governance Token ID' testId={`DfTxSetGovernance.Token${value.tokenId}`}>
            {value.tokenId}
          </AdaptiveList.Row>
        ))}
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Governance Value'>
          {isLiqPoolSplit ? 'N/A' : governance.value.toString()}
        </AdaptiveList.Row>
        {isLiqPoolSplit && liqPoolSplit.map(value => (
          <AdaptiveList.Row key={value.tokenId} name={`Governance Token ${value.tokenId} Value`} testId={`DfTxSetGovernance.Token${value.tokenId}Value`}>
            {value.value.toFixed(8)}
          </AdaptiveList.Row>
        ))}
      </AdaptiveList>
    </>
  )
}
