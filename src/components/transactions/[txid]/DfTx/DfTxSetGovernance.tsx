import { DfTx, SetGovernance } from '@defichain/jellyfish-transaction'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { OverflowTable } from '@components/commons/OverflowTable'
import {
  GovernanceLpDailyReward,
  GovernanceLpSplits, GovernanceUnmapped
} from '@defichain/jellyfish-transaction/dist/script/dftx/dftx_governance'

interface DfTxSetGovernanceProps {
  dftx: DfTx<SetGovernance>
}

export function DfTxSetGovernance (props: DfTxSetGovernanceProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Set Governance' />
      <div className='mt-5'>
        {props.dftx.data.governanceVars.map((gov, index) => {
          switch (gov.key) {
            case 'LP_DAILY_DFI_REWARD':
              return (
                <GovernanceLpDailyRewardTable
                  governanceLpDailyReward={gov as GovernanceLpDailyReward}
                  key={index}
                />
              )
            case 'LP_SPLITS':
              return <GovernanceLpSplitsTable governanceLpSplits={gov as GovernanceLpSplits} key={index} />
            default:
              return <GovernanceUnmappedTable governanceUnmapped={gov as GovernanceUnmapped} key={index} />
          }
        })}
      </div>
    </div>
  )
}

function GovernanceLpDailyRewardTable (props: { governanceLpDailyReward: GovernanceLpDailyReward }): JSX.Element {
  return (
    <div className='flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Governance Key' testId='DfTxSetGovernance.Key'>
          {props.governanceLpDailyReward.key}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Value' testId='DfTxSetGovernance.Value'>
          {props.governanceLpDailyReward.value.toFixed(8)}
        </AdaptiveList.Row>
      </AdaptiveList>
    </div>
  )
}

function GovernanceUnmappedTable (props: { governanceUnmapped: GovernanceUnmapped }): JSX.Element {
  return (
    <div className='flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Governance Key' testId='DfTxSetGovernance.Key'>
          {props.governanceUnmapped.key}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Value' testId='DfTxSetGovernance.Value'>
          {props.governanceUnmapped.value}
        </AdaptiveList.Row>
      </AdaptiveList>
    </div>
  )
}

function GovernanceLpSplitsTable (props: { governanceLpSplits: GovernanceLpSplits }): JSX.Element {
  return (
    <>
      <div className='flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Governance Key' testId='DfTxSetGovernance.Key'>
            {props.governanceLpSplits.key}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
      <div className='w-full lg:w-1/2 mt-4'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head>Governance Token ID</OverflowTable.Head>
            <OverflowTable.Head>Value</OverflowTable.Head>
          </OverflowTable.Header>
          {props.governanceLpSplits.value.map(value => (
            <OverflowTable.Row key={value.tokenId}>
              <OverflowTable.Cell>
                <span data-testId={`DfTxSetGovernance.Token${value.tokenId}`}>{value.tokenId}</span>
              </OverflowTable.Cell>
              <OverflowTable.Cell>
                <span data-testId={`DfTxSetGovernance.Token${value.tokenId}Value`}>{value.value.toFixed(8)}</span>
              </OverflowTable.Cell>
            </OverflowTable.Row>
          )
          )}
        </OverflowTable>
      </div>
    </>
  )
}
