import {
  LoanVaultActive,
  LoanVaultLiquidated,
} from "@defichain/whale-api-client/dist/api/loan";
import { OverflowTable } from "@components/commons/OverflowTable";
import { Link } from "@components/commons/link/Link";
import React from "react";
import { calculateLiquidationValues } from "../../utils/LiquidatedVaultDerivedValues";
import { VaultTableRow } from "./VaultTableRow";

interface VaultTableProps {
  items: Array<LoanVaultActive | LoanVaultLiquidated>;
}

export function VaultTable(props: VaultTableProps): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head
          title="Vault ID"
          testId="VaultsTable.VaultID"
          sticky
        />

        <OverflowTable.Head
          title="Status"
          infoDesc={<VaultStatusInfo />}
          testId="VaultsTable.Status"
        />

        <OverflowTable.Head
          alignRight
          title="Loan Taken"
          testId="VaultsTable.Loans"
        />

        <OverflowTable.Head
          alignRight
          title="Loan Value (USD)"
          infoDesc="Loan token(s) and value (in USD) taken by a vault."
          testId="VaultsTable.LoansValue"
        />

        <OverflowTable.Head
          alignRight
          title="Collaterals"
          testId="VaultsTable.Collaterals"
        />

        <OverflowTable.Head
          alignRight
          title="Collateral Value (USD)"
          infoDesc="Value of tokens (in USD) deposited as collateral in a vault."
          testId="VaultsTable.CollateralValue"
        />

        <OverflowTable.Head
          alignRight
          title="Collateralization Ratio / Min."
          infoDesc={<CollateralizationRatioMinInfo />}
          testId="VaultsTable.CollateralizationRatios"
        />
      </OverflowTable.Header>
      {props.items.map((vault) => {
        return (
          <Link
            href={{ pathname: `/vaults/${vault.vaultId}` }}
            key={vault.vaultId}
          >
            <a className="contents">
              <VaultTableRow
                vault={vault}
                liquidatedVaultDerivedValues={calculateLiquidationValues(vault)}
              />
            </a>
          </Link>
        );
      })}
    </OverflowTable>
  );
}

function VaultStatusInfo(): JSX.Element {
  return (
    <div className="p-3 space-y-2 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs dark:bg-gray-800 dark:border-gray-700 dark:text-dark-gray-900">
      <div>
        <span className="font-medium">Empty</span>: When a vault has been
        created but no collateral has been deposited yet.
      </div>
      <div>
        <span className="font-medium">Ready</span>: When collateral has been
        deposited into the vault, but no loan has been taken yet.
      </div>
      <div>
        <span className="font-medium">Active</span>: When a vault's
        collateralization ratio is above its minimum requirement.
      </div>
      <div>
        <span className="font-medium">In Liquidation</span>: When a vault’s
        collateralization ratio falls below the minimum requirement
      </div>
      <div>
        <span className="font-medium">Halted</span>: When any token in the vault
        (collateral or loan tokens) has fluctuated more than 30% in the past
        hour
      </div>
    </div>
  );
}

function CollateralizationRatioMinInfo(): JSX.Element {
  return (
    <div className="px-3 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs dark:bg-gray-800 dark:border-gray-700 dark:text-dark-gray-900">
      <span className="font-medium">Collateralization Ratio</span>: Percentage
      of collaterals deposited in a vault in relation to the amount of loan
      taken.
      <br />
      <br />
      <span className="font-medium">Min. Collateralization Ratio</span>: Minimum
      required collateral ratio based on vault scheme selected by vault owner.
    </div>
  );
}
