import { DfTx, SetLoanScheme } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxSetLoanSchemeProps {
  dftx: DfTx<SetLoanScheme>;
}

export function DfTxSetLoanScheme(props: DfTxSetLoanSchemeProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Set Loan Scheme" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <AdaptiveList>
            <AdaptiveList.Row
              name="Identifier"
              testId="DfTxSetLoanScheme.Identifier"
            >
              {props.dftx.data.identifier}
            </AdaptiveList.Row>
            <AdaptiveList.Row name="Ratio" testId="DfTxSetLoanScheme.Ratio">
              {props.dftx.data.rate.toFixed(8)}
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
        <div className="w-full lg:w-1/2">
          <AdaptiveList>
            <AdaptiveList.Row name="Rate" testId="DfTxSetLoanScheme.Rate">
              {props.dftx.data.rate.toFixed(8)}
            </AdaptiveList.Row>
            <AdaptiveList.Row name="Update" testId="DfTxSetLoanScheme.Update">
              {props.dftx.data.update.toFixed(8)}
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
      </div>
    </div>
  );
}
