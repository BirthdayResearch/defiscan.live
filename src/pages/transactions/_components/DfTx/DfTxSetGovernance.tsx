import { DfTx, SetGovernance } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { OverflowTable } from "@components/commons/OverflowTable";
import {
  GovernanceLpDailyReward,
  GovernanceLpSplits,
  GovernanceUnmapped,
  LiqPoolSplit,
} from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_governance";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxSetGovernanceProps {
  dftx: DfTx<SetGovernance>;
}

export function DfTxSetGovernance(props: DfTxSetGovernanceProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Set Governance" />
      <div className="mt-5">
        <div className="flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
          {props.dftx.data.governanceVars.map((gov) => {
            switch (gov.key) {
              case "LP_DAILY_DFI_REWARD": {
                const governanceLpDailyReward = gov as GovernanceLpDailyReward;
                return (
                  <AdaptiveList className="w-full lg:w-1/2">
                    <AdaptiveList.Row
                      name="Governance Key"
                      testId="DfTxSetGovernance.Key"
                    >
                      {governanceLpDailyReward.key}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row
                      name="Value"
                      testId="DfTxSetGovernance.Value"
                    >
                      {governanceLpDailyReward.value.toFixed(8)}
                    </AdaptiveList.Row>
                  </AdaptiveList>
                );
              }
              case "LP_SPLITS": {
                const governanceLpSplits = gov as GovernanceLpSplits;
                return (
                  <>
                    <AdaptiveList className="w-full lg:w-1/2">
                      <AdaptiveList.Row
                        name="Governance Key"
                        testId="DfTxSetGovernance.Key"
                      >
                        {governanceLpSplits.key}
                      </AdaptiveList.Row>
                    </AdaptiveList>
                    <div className="w-full lg:w-1/2 mt-4">
                      <OverflowTable>
                        <OverflowTable.Header>
                          <OverflowTable.Head title="Token" />
                          <OverflowTable.Head title="Value" />
                        </OverflowTable.Header>
                        {governanceLpSplits.value.map((liqPoolSplit) => (
                          <GovernanceLpSplitsTableRow
                            liqPoolSplit={liqPoolSplit}
                            key={`${
                              liqPoolSplit.tokenId
                            }-${liqPoolSplit.value.toFixed(8)}`}
                          />
                        ))}
                      </OverflowTable>
                    </div>
                  </>
                );
              }
              default: {
                const governanceUnmapped = gov as GovernanceUnmapped;
                return (
                  <AdaptiveList className="w-full lg:w-1/2">
                    <AdaptiveList.Row
                      name="Governance Key"
                      testId="DfTxSetGovernance.Key"
                    >
                      {governanceUnmapped.key}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row
                      name="Value"
                      testId="DfTxSetGovernance.Value"
                    >
                      {governanceUnmapped.value}
                    </AdaptiveList.Row>
                  </AdaptiveList>
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
}

function GovernanceLpSplitsTableRow(props: {
  liqPoolSplit: LiqPoolSplit;
}): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <div className="flex flex-row">
          <TokenSymbol
            tokenId={props.liqPoolSplit.tokenId}
            testId={`DfTxSetGovernance.Token${props.liqPoolSplit.tokenId}Symbol`}
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <span
          data-testid={`DfTxSetGovernance.Token${props.liqPoolSplit.tokenId}Value`}
        >
          {props.liqPoolSplit.value.toFixed(8)}
        </span>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
