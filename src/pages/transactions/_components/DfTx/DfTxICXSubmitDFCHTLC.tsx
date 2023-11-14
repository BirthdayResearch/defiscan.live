import { DfTx, ICXSubmitDFCHTLC } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxICXSubmitDFCHTLCProps {
  dftx: DfTx<ICXSubmitDFCHTLC>;
}

export function DfTxICXSubmitDFCHTLC(
  props: DfTxICXSubmitDFCHTLCProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="ICX Submit DFCHTLC" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList>
          <AdaptiveList.Row name="Offer Tx">
            <TxIdLink
              txid={props.dftx.data.offerTx}
              testId="DfTxICXSubmitDFCHTLC.OfferTx"
              className="break-all"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Hash">
            <span data-testid="DfTxICXSubmitDFCHTLC.Hash">
              {props.dftx.data.hash}
            </span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Amount">
            <span data-testid="DfTxICXSubmitDFCHTLC.Amount">
              {props.dftx.data.amount.toFixed(8)}
            </span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Timeout">
            <span data-testid="DfTxICXSubmitDFCHTLC.Timeout">
              {props.dftx.data.timeout} Blocks
            </span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
