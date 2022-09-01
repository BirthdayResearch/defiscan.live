import { DfTx, SetFutureSwap } from "@defichain/jellyfish-transaction";
import { DfTxHeader } from "./DfTxHeader";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import BigNumber from "bignumber.js";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";

interface DfTxSetFutureSwapProps {
  dftx: DfTx<SetFutureSwap>;
}

export function DfTxSetFutureSwap(props: DfTxSetFutureSwapProps): JSX.Element {
  const from = props.dftx.data.source;
  const to = props.dftx.data.destination;

  return (
    <div>
      <DfTxHeader name="Set Future Swap" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <SetFutureSwapDetailsTable
          fromTokenId={from?.token}
          fromAmount={from?.amount}
          toTokenId={to}
        />
      </div>
    </div>
  );
}

function SetFutureSwapDetailsTable(props: {
  fromTokenId: number;
  fromAmount: BigNumber;
  toTokenId: number;
}): JSX.Element {
  return (
    <>
      <div
        className="w-full lg:w-1/2 lg:pl-3 lg:pr-1.5"
        data-testid="DfTxCompositeSwap.SwapFrom"
      >
        <h2
          className="my-3 font-medium"
          data-testid="DfTxCompositeSwap.SwapFromTitle"
        >
          Swap From
        </h2>
        <AdaptiveList>
          <AdaptiveList.Row name="Token">
            <TokenSymbol
              tokenId={props.fromTokenId}
              testId="DfTxSetFutureSwap.fromAmountSymbol"
              symbolLeft
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Amount">
            <span data-testid="DfTxSetFutureSwap.fromAmount">
              {props.fromAmount.toFixed(8)}
            </span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>

      <div
        className="w-full lg:w-1/2 lg:pr-3 lg:pl-1.5 mt-4 lg:mt-0"
        data-testid="DfTxCompositeSwap.SwapTo"
      >
        <h2
          className="my-3 font-medium"
          data-testid="DfTxCompositeSwap.SwapToTitle"
        >
          Swap To
        </h2>
        <AdaptiveList>
          <AdaptiveList.Row name="Token">
            <TokenSymbol
              tokenId={props.toTokenId}
              testId="DfTxSetFutureSwap.toAmountSymbol"
              symbolLeft
            />
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </>
  );
}
