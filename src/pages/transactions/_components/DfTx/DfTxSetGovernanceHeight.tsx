import { DfTx, SetGovernanceHeight } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { GovernanceUnmapped } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_governance";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxSetGovernanceHeightProps {
  dftx: DfTx<SetGovernanceHeight>;
}

export function DfTxSetGovernanceHeight(
  props: DfTxSetGovernanceHeightProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Set Governance Height" />
      <div className="mt-5">
        <div className="flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
          {props.dftx.data.governanceVars.map((gov) => {
            switch (gov.key) {
              case "LP_LOAN_TOKEN_SPLITS": {
                // TODO (joeldavidw): Update once LP_LOAN_TOKEN_SPLITS has been mapped
                const governanceUnmapped = gov;
                return (
                  <AdaptiveList className="w-full lg:w-1/2">
                    <AdaptiveList.Row
                      name="Activation Height"
                      testId="DfTxSetGovernanceHeight.ActivationHeight"
                    >
                      {props.dftx.data.activationHeight}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row
                      name="Governance Key"
                      testId="DfTxSetGovernanceHeight.Key"
                    >
                      {governanceUnmapped.key}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row
                      name="Value"
                      testId="DfTxSetGovernanceHeight.Value"
                      className="whitespace-pre-wrap break-all"
                    >
                      {governanceUnmapped.value}
                    </AdaptiveList.Row>
                  </AdaptiveList>
                );
              }
              default: {
                const governanceUnmapped = gov as GovernanceUnmapped;
                return (
                  <AdaptiveList className="w-full lg:w-1/2">
                    <AdaptiveList.Row
                      name="Governance Key"
                      testId="DfTxSetGovernanceHeight.Key"
                    >
                      {governanceUnmapped.key}
                    </AdaptiveList.Row>
                    <AdaptiveList.Row
                      name="Value"
                      testId="DfTxSetGovernanceHeight.Value"
                      className="whitespace-pre-wrap break-all"
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
