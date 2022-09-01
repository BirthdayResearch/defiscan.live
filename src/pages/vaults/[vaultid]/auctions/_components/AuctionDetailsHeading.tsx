import { LoanVaultLiquidated } from "@defichain/whale-api-client/dist/api/loan";
import { Head } from "@components/commons/Head";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import React from "react";

export function AuctionDetailsHeading(props: {
  vault: LoanVaultLiquidated;
  batchIndex: string;
}): JSX.Element {
  return (
    <>
      <Head title={`Vault #${props.vault.vaultId}`} />
      <Breadcrumb
        items={[
          {
            path: "/vaults",
            name: "Vaults",
          },
          {
            path: `/vaults/${props.vault.vaultId}`,
            name: <TextTruncate text={props.vault.vaultId} />,
          },
          {
            path: `/vaults/${props.vault.vaultId}`,
            name: "Auctions",
          },
          {
            path: `/vaults/${props.vault.vaultId}/auctions/${0}`,
            name: props.batchIndex,
            isCurrentPath: true,
          },
        ]}
      />

      <h2
        className="text-xl font-semibold mt-8 dark:text-dark-gray-900"
        data-testid="AuctionDetails.Heading"
      >
        Auction Details
      </h2>
    </>
  );
}
