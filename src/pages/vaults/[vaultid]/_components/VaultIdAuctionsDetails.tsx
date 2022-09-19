import { LoanVaultLiquidated } from "@defichain/whale-api-client/dist/api/loan";
import React from "react";
import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import { OverflowTable } from "@components/commons/OverflowTable";
import { Link } from "@components/commons/link/Link";
import { CardList } from "@components/commons/CardList";
import {
  AuctionsTableRow,
  MobileAuctionDetailsCard,
} from "../../_components/commons/VaultAuctionDetails";

export function VaultAuctions(props: {
  vault: LoanVaultLiquidated;
}): JSX.Element {
  return (
    <>
      <div className="hidden md:block mt-10" data-testid="VaultAuctionsDesktop">
        <h2
          className="text-xl font-semibold"
          data-testid="VaultAuctionsDesktop.Heading"
        >
          In Auction
        </h2>

        <div className="mt-4">
          <OverflowTable>
            <OverflowTable.Header>
              <OverflowTable.Head
                title="Time Left"
                infoDesc="Estimated based on the number of blocks remaining."
                testId="AuctionTable.TimeLeft"
              />
              <OverflowTable.Head
                title="Loan Token"
                testId="AuctionTable.LoanToken"
              />
              <OverflowTable.Head
                title="Collateral For Auction"
                testId="AuctionTable.CollateralForAuction"
                alignRight
                className="lg:w-52"
              />
              <OverflowTable.Head
                title="Collateral Value (USDT)"
                testId="AuctionTable.CollateralValue"
                alignRight
              />
              <OverflowTable.Head
                title="Min. Next Bid"
                testId="AuctionTable.MinNextBid"
                alignRight
              />
            </OverflowTable.Header>
            {props.vault.batches.map((batch) => (
              <Link
                href={{
                  pathname: `/vaults/${props.vault.vaultId}/auctions/${batch.index}`,
                }}
                key={batch.index}
              >
                <a className="contents">
                  <AuctionsTableRow batch={batch} vault={props.vault} />
                </a>
              </Link>
            ))}
          </OverflowTable>
        </div>
      </div>

      <CollapsibleSection
        heading="In Auction"
        className="block md:hidden"
        testId="MobileVaultAuctions"
      >
        <CardList testId="MobileAuctionDetailsCards">
          {props.vault.batches.map((batch) => (
            <MobileAuctionDetailsCard
              batch={batch}
              key={batch.index}
              vault={props.vault}
            />
          ))}
        </CardList>
      </CollapsibleSection>
    </>
  );
}
