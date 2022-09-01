import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
} from "@defichain/whale-api-client/dist/api/loan";
import { Head } from "@components/commons/Head";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import { CopyButton } from "@components/commons/CopyButton";
import { FcInfo } from "react-icons/fc";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import React from "react";
import { VaultStatus } from "../../_components/commons/VaultStatus";

export function VaultIdHeading(props: {
  vault: LoanVaultActive | LoanVaultLiquidated;
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
            isCurrentPath: true,
          },
        ]}
      />

      {props.vault.state === LoanVaultState.FROZEN && (
        <div className="p-3 flex items-center max-w-max bg-blue-50 dark:bg-gray-800 dark:ring-gray-900 mt-8 rounded ring-2 ring-blue-200">
          <FcInfo size={20} />
          <div className="ml-2 text-gray-600">
            The activity of this vault has been temporarily halted due to price
            volatility in the market. This vault will resume its activity once
            the market stabilizes.
          </div>
        </div>
      )}

      <div className="flex items-center pt-10">
        <h2
          data-testid="PageHeading"
          className="font-medium text-2xl block dark:text-dark-gray-900"
        >
          Vault ID
        </h2>
        <VaultStatus
          vault={props.vault}
          className="ml-4 inline-block text-xs"
          testId="VaultIdHeading.VaultStatus"
        />
      </div>
      <div className="flex items-center">
        <div
          className="text-lg text-gray-500 font-medium break-all dark:text-gray-100"
          data-testid="VaultIdHeading.vaultId"
        >
          {props.vault.vaultId}
        </div>
        <CopyButton className="ml-2" content={props.vault.vaultId} />
      </div>
    </>
  );
}
