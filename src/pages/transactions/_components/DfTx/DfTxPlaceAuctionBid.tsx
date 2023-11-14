import { DfTx, PlaceAuctionBid } from "@defichain/jellyfish-transaction";

import { AdaptiveList } from "@components/commons/AdaptiveList";
import { VaultLink } from "@components/commons/link/VaultLink";
import { AddressLink } from "@components/commons/link/AddressLink";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxPlaceAuctionBidProps {
  dftx: DfTx<PlaceAuctionBid>;
}

export function DfTxPlaceAuctionBid(
  props: DfTxPlaceAuctionBidProps
): JSX.Element {
  const fromAddress = fromScript(props.dftx.data.from, useNetwork().name);

  return (
    <div>
      <DfTxHeader name="Place Auction Bid" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Vault ID">
            <VaultLink
              className="break-all"
              vault={props.dftx.data.vaultId}
              testId="DfTxPlaceAuctionBid.VaultId"
            />
          </AdaptiveList.Row>
        </AdaptiveList>

        <div className="w-full lg:w-1/2">
          <AdaptiveList className="w-full">
            <AdaptiveList.Row name={"Bidder's Address"}>
              {(() => {
                if (fromAddress?.address !== undefined) {
                  return (
                    <AddressLink
                      address={fromAddress.address}
                      className="break-all"
                      testId="DfTxPlaceAuctionBid.BidderAddress"
                    />
                  );
                }
                return "NA";
              })()}
            </AdaptiveList.Row>
          </AdaptiveList>
          <AdaptiveList className="w-full mt-1">
            <AdaptiveList.Row
              name="Auction Batch"
              testId="DfTxPlaceAuctionBid.AuctionBatch"
            >
              {props.dftx.data.index}
            </AdaptiveList.Row>
            <AdaptiveList.Row name="Amount">
              <div className="flex flex-row">
                <span data-testid="DfTxPlaceAuctionBid.Amount">
                  {props.dftx.data.tokenAmount.amount.toFixed(8)}
                </span>
                <TokenSymbol
                  tokenId={props.dftx.data.tokenAmount.token}
                  className="ml-1"
                  testId="DfTxPlaceAuctionBid.AmountSymbol"
                />
              </div>
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
      </div>
    </div>
  );
}
