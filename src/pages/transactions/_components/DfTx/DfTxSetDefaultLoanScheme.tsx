import { DfTx, SetDefaultLoanScheme } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxSetDefaultLoanSchemeProps {
  dftx: DfTx<SetDefaultLoanScheme>;
}

export function DfTxSetDefaultLoanScheme(
  props: DfTxSetDefaultLoanSchemeProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Set Default Loan Scheme" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row
            name="Identifier"
            testId="DfTxSetDefaultLoanScheme.Identifier"
          >
            {props.dftx.data.identifier}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
