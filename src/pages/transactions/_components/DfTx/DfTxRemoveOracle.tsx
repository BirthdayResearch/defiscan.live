import { DfTx, RemoveOracle } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxRemoveOracleProps {
  dftx: DfTx<RemoveOracle>;
}

export function DfTxRemoveOracle(props: DfTxRemoveOracleProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Remove Oracle" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-auto">
          <AdaptiveList.Row
            name="Oracle ID"
            testId="DfTxRemoveOracle.OracleId"
            className="break-all"
          >
            {props.dftx.data.oracleId}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
