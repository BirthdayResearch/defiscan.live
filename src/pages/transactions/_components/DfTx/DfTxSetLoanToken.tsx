import { DfTx, SetLoanToken } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxSetLoanTokenProps {
  dftx: DfTx<SetLoanToken>;
}

export function DfTxSetLoanToken(props: DfTxSetLoanTokenProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Set Loan Token" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row
            name="Token Symbol"
            testId="DfTxSetLoanToken.TokenSymbol"
          >
            {props.dftx.data.symbol}
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="Token Name"
            testId="DfTxSetLoanToken.TokenName"
          >
            {props.dftx.data.name}
          </AdaptiveList.Row>
        </AdaptiveList>
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row
            name="Currency Pair"
            testId="DfTxSetLoanToken.CurrencyPair"
          >
            {`${props.dftx.data.currencyPair.token}-${props.dftx.data.currencyPair.currency}`}
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Mintable" testId="DfTxSetLoanToken.Mintable">
            {props.dftx.data.mintable ? "Yes" : "No"}
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Interest" testId="DfTxSetLoanToken.Interest">
            {props.dftx.data.interest.toFixed(8)}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
