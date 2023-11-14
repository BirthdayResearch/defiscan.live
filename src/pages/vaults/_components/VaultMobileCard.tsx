import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
} from "@defichain/whale-api-client/dist/api/loan";
import React from "react";
import BigNumber from "bignumber.js";
import { NumericFormat } from "react-number-format";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { CardList } from "@components/commons/CardList";
import { IconTooltip } from "@components/commons/IconsTooltip";
import { LiquidatedVaultDerivedValues } from "../utils/LiquidatedVaultDerivedValues";
import { VaultStatus } from "./commons/VaultStatus";
import { VaultTokenSymbols } from "./commons/VaultTokenSymbols";
import { VaultNumberValues } from "./commons/VaultNumberValues";
import { VaultCollateralizationRatio } from "./commons/VaultCollateralizationRatio";

interface VaultMobileCardProps {
  vault: LoanVaultActive | LoanVaultLiquidated;
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues;
}

export function VaultMobileCard(props: VaultMobileCardProps): JSX.Element {
  return (
    <CardList.Card>
      <CardList.Header
        path={`/vaults/${props.vault.vaultId}`}
        className="dark:text-white"
      >
        Vault ID
        <VaultStatus
          vault={props.vault}
          className="ml-2 inline-block text-xs"
          testId="VaultMobileCard.VaultStatus"
        />
      </CardList.Header>

      <TextTruncate
        text={props.vault.vaultId}
        className="mt-0.5 font-medium text-gray-900 dark:text-gray-400"
        testId="VaultMobileCard.VaultID"
        width="w-36"
      />

      <CardList.List>
        <VaultMobileDetails
          vault={props.vault}
          liquidatedVaultDerivedValues={props.liquidatedVaultDerivedValues}
        />
      </CardList.List>
    </CardList.Card>
  );
}

function VaultMobileDetails(props: {
  vault: LoanVaultActive | LoanVaultLiquidated;
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues;
}): JSX.Element {
  return (
    <CardList.List>
      <CardList.ListItem title="Loans" testId="VaultMobileCard.Loans">
        <VaultTokenSymbols
          tokens={
            props.vault.state === LoanVaultState.IN_LIQUIDATION
              ? props.liquidatedVaultDerivedValues?.loanAmounts
              : props.vault.loanAmounts
          }
        />
      </CardList.ListItem>

      <CardList.ListItem
        title="Loan Value (USD)"
        infoDesc="Loan token(s) and value (in USD) taken by a vault."
        testId="VaultMobileCard.LoansValue"
      >
        <div className="flex justify-end items-center">
          <VaultNumberValues
            value={
              props.vault.state === LoanVaultState.IN_LIQUIDATION
                ? props.liquidatedVaultDerivedValues?.loanValue
                : new BigNumber(props.vault.loanValue)
            }
            prefix="$"
          />
          <IconTooltip />
        </div>
      </CardList.ListItem>

      <CardList.ListItem title="Collateral" testId="VaultMobileCard.Collateral">
        <VaultTokenSymbols
          tokens={
            props.vault.state === LoanVaultState.IN_LIQUIDATION
              ? props.liquidatedVaultDerivedValues?.collateralAmounts
              : props.vault.collateralAmounts
          }
        />
      </CardList.ListItem>

      <CardList.ListItem
        title="Collateral Value (USD)"
        infoDesc="Value of tokens (in USD) deposited as collateral in a vault."
        testId="VaultMobileCard.CollateralValue"
      >
        <div className="flex justify-end items-center">
          <VaultNumberValues
            value={
              props.vault.state === LoanVaultState.IN_LIQUIDATION
                ? props.liquidatedVaultDerivedValues?.collateralValue
                : new BigNumber(props.vault.collateralValue)
            }
            prefix="$"
          />
          <IconTooltip />
        </div>
      </CardList.ListItem>

      <CardList.ListItem
        title="Collateralization Ratio"
        infoDesc="Percentage of collaterals deposited in a vault in relation to the amount of loan taken."
        testId="VaultMobileCard.CollateralizationRatio"
      >
        <VaultCollateralizationRatio
          collateralizationRatio={
            props.vault.state === LoanVaultState.IN_LIQUIDATION
              ? props.liquidatedVaultDerivedValues?.collateralRatio.toFixed(
                  0,
                  BigNumber.ROUND_HALF_UP
                )
              : props.vault.informativeRatio
          }
          loanScheme={props.vault.loanScheme}
          vaultState={props.vault.state}
          testId={`VaultRow.${props.vault.vaultId}.CollateralizationRatio`}
        />
      </CardList.ListItem>

      <CardList.ListItem
        title="Min Collateralization Ratio"
        infoDesc="Minimum required collateral ratio based on vault scheme selected by vault owner."
        testId="VaultMobileCard.MinCollateralizationRatio"
      >
        <NumericFormat
          value={props.vault.loanScheme.minColRatio}
          suffix="%"
          displayType="text"
          thousandSeparator
        />
      </CardList.ListItem>
    </CardList.List>
  );
}
