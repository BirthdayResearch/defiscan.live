import { DfTx, SetGovernanceHeight } from '@defichain/jellyfish-transaction'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from './DfTxHeader'
import { OverflowTable } from '@components/commons/OverflowTable'
import {
  GovernanceLpDailyReward,
  GovernanceLpSplits,
  GovernanceUnmapped,
  LiqPoolSplit
} from '@defichain/jellyfish-transaction/dist/script/dftx/dftx_governance'
import { TokenSymbol } from '@components/commons/TokenSymbol'

interface DfTxSetGovernanceHeightProps {
  dftx: DfTx<SetGovernanceHeight>
}

export function DfTxSetGovernanceHeight (props: DfTxSetGovernanceHeightProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Set Governance Height' />
      <div className='mt-5'>
        <div className='flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
          {props.dftx.data.governanceVars.map((gov) => {
            switch (gov.key) {
              case 'LP_DAILY_DFI_REWARD': {
                const governanceLpDailyReward = gov as GovernanceLpDailyReward
                return (
                  <AdaptiveList className='w-full lg:w-1/2'>
                    <AdaptiveList.Row name='Governance Key' testId='DfTxSetGovernance.Key'>
                      {governanceLpDailyReward.key}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row name='Value' testId='DfTxSetGovernance.Value'>
                      {governanceLpDailyReward.value.toFixed(8)}
                    </AdaptiveList.Row>
                  </AdaptiveList>
                )
              }
              case 'LP_SPLITS': {
                const governanceLpSplits = gov as GovernanceLpSplits
                return (
                  <>
                    <AdaptiveList className='w-full lg:w-1/2'>
                      <AdaptiveList.Row name='Governance Key' testId='DfTxSetGovernance.Key'>
                        {governanceLpSplits.key}
                      </AdaptiveList.Row>
                    </AdaptiveList>
                    <div className='w-full lg:w-1/2 mt-4'>
                      <OverflowTable>
                        <OverflowTable.Header>
                          <OverflowTable.Head title='Token' />
                          <OverflowTable.Head title='Value' />
                        </OverflowTable.Header>
                        {governanceLpSplits.value.map(liqPoolSplit => (
                          <GovernanceLpSplitsTableRow
                            liqPoolSplit={liqPoolSplit}
                            key={`${liqPoolSplit.tokenId}-${liqPoolSplit.value.toFixed(8)}`}
                          />
                        )
                        )}
                      </OverflowTable>
                    </div>
                  </>
                )
              }
              case 'LP_LOAN_TOKEN_SPLITS': {
                // TODO (joeldavidw): Update once LP_LOAN_TOKEN_SPLITS has been mapped
                const governanceUnmapped = gov
                return (
                  <AdaptiveList className='w-full lg:w-1/2'>
                    <AdaptiveList.Row name='Activation Height' testId='DfTxSetGovernance.Key'>
                      {props.dftx.data.activationHeight}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row name='Governance Key' testId='DfTxSetGovernance.Key'>
                      {governanceUnmapped.key}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row
                      name='Value' testId='DfTxSetGovernance.Value'
                      className='whitespace-pre-wrap break-all'
                    >
                      {governanceUnmapped.value}
                    </AdaptiveList.Row>
                  </AdaptiveList>
                )
              }
              default: {
                const governanceUnmapped = gov as GovernanceUnmapped
                return (
                  <AdaptiveList className='w-full lg:w-1/2'>
                    <AdaptiveList.Row name='Governance Key' testId='DfTxSetGovernance.Key'>
                      {governanceUnmapped.key}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row
                      name='Value' testId='DfTxSetGovernance.Value'
                      className='whitespace-pre-wrap break-all'
                    >
                      {governanceUnmapped.value}
                    </AdaptiveList.Row>
                  </AdaptiveList>
                )
              }
            }
          })}
        </div>
      </div>
    </div>
  )
}

function GovernanceLpSplitsTableRow (props: { liqPoolSplit: LiqPoolSplit }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <div className='flex flex-row'>
          <TokenSymbol
            tokenId={props.liqPoolSplit.tokenId}
            testId={`DfTxSetGovernance.Token${props.liqPoolSplit.tokenId}Symbol`}
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <div className='flex flex-row'>
          {props.liqPoolSplit.value.toFixed(8)}
        </div>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
