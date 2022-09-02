import { DfTx, ICXSubmitEXTHTLC } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { AddressLink } from "@components/commons/link/AddressLink";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxICXSubmitEXTHTLCProps {
  dftx: DfTx<ICXSubmitEXTHTLC>;
}

export function DfTxICXSubmitEXTHTLC(
  props: DfTxICXSubmitEXTHTLCProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="ICX Submit EXTHTLC" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList>
          <AdaptiveList.Row name="Offer Tx">
            <TxIdLink
              txid={props.dftx.data.offerTx}
              testId="DfTxICXSubmitEXTHTLC.OfferTx"
              className="break-all"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Hash">
            <span data-testid="DfTxICXSubmitEXTHTLC.Hash">
              {props.dftx.data.hash}
            </span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Amount">
            <span data-testid="DfTxICXSubmitEXTHTLC.Amount">
              {props.dftx.data.amount.toFixed(8)}
            </span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name="HTLC Script Address">
            <AddressLink
              address={props.dftx.data.htlcScriptAddress}
              testId="DfTxICXSubmitEXTHTLC.HTLCScriptAddress"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Owner Public Key">
            <span data-testid="DfTxICXSubmitEXTHTLC.OwnerPubKey">
              {props.dftx.data.ownerPubkey}
            </span>
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Timeout">
            <span data-testid="DfTxICXSubmitEXTHTLC.Timeout">
              {props.dftx.data.timeout} Blocks
            </span>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
