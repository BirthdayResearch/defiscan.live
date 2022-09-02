import { EmptySection } from "@components/commons/sections/EmptySection";
import { VaultAuctionBatchHistory } from "@defichain/whale-api-client/dist/api/loan";
import { OverflowTable } from "@components/commons/OverflowTable";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import { formatDistanceToNow } from "date-fns";
import { fromScriptHex } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { AddressLink } from "@components/commons/link/AddressLink";
import { BiddingHistoryCard } from "./BiddingHistoryMobileCard";

interface AuctionBiddingHistoryProps {
  history: VaultAuctionBatchHistory[];
}

export function BiddingHistory(props: AuctionBiddingHistoryProps): JSX.Element {
  if (props.history.length <= 0) {
    return (
      <>
        <h2
          className="text-xl font-semibold mt-8 mb-5 dark:text-dark-gray-900"
          data-testid="BiddingHistory.Heading"
        >
          Bidding Details
        </h2>
        <EmptySection message="No Bidding History" />
      </>
    );
  }
  return (
    <>
      <div className="mt-6 hidden lg:block">
        <h2
          className="text-xl font-semibold mt-8 mb-5 dark:text-dark-gray-900"
          data-testid="BiddingHistory.Heading"
        >
          Bidding Details
        </h2>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head
              title="Bid No."
              className="lg:w-1/4"
              testId="BiddingHistory.Header.BidNo"
            />
            <OverflowTable.Head
              title="Time"
              className="lg:w-1/4"
              testId="BiddingHistory.Header.Time"
            />
            <OverflowTable.Head
              title="Bidder"
              testId="BiddingHistory.Header.BidId"
            />
            <OverflowTable.Head
              title="Bid Amount"
              alignRight
              testId="BiddingHistory.Header.BidAmount"
            />
          </OverflowTable.Header>
          {props.history.map((history, index) => (
            <BiddingHistoryRow
              history={history}
              bidIndex={props.history.length - index}
              key={history.key}
            />
          ))}
        </OverflowTable>
      </div>
      <div className="block lg:hidden">
        <CollapsibleSection
          heading="Bidding History"
          testId="BiddingHistorySection"
        >
          <div className="space-y-4">
            {props.history.map((history, index) => (
              <BiddingHistoryCard
                history={history}
                key={history.key}
                bidIndex={props.history.length - index}
              />
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </>
  );
}

function BiddingHistoryRow({
  history,
  bidIndex,
}: {
  history: VaultAuctionBatchHistory;
  bidIndex: number;
}): JSX.Element {
  const decoded = fromScriptHex(history.from, useNetwork().name);
  const address = decoded?.address ?? "N/A";

  return (
    <OverflowTable.Row className="dark:text-gray-100">
      <OverflowTable.Cell>
        <span className="bg-gray-400 px-2 py-1 w-20 text-sm text-white dark:bg-gray-800 dark:text-dark-primary-500 text-center">
          {`Bid #${bidIndex}`}
        </span>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {formatDistanceToNow(history.block.medianTime * 1000)}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-blue-500">
        <AddressLink address={address}>
          <TextTruncate text={address} width="w-full" />
        </AddressLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <div className="flex items-center space-x-1 justify-end">
          <span>{history.amount.toString()}</span>
          <TokenSymbol tokenId={history.tokenId} symbolOnly />
        </div>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
