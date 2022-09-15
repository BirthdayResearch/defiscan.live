import {
  CollateralToken,
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
} from "@defichain/whale-api-client/dist/api/loan";
import { AddressLink } from "@components/commons/link/AddressLink";
import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import { OverflowTable } from "@components/commons/OverflowTable";
import classNames from "classnames";
import BigNumber from "bignumber.js";
import React from "react";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { IconTooltip } from "@components/commons/IconsTooltip";
import { LiquidatedVaultDerivedValues } from "../../utils/LiquidatedVaultDerivedValues";
import { VaultHealthBar } from "../../_components/commons/VaultHealthBar";
import { VaultNumberValues } from "../../_components/commons/VaultNumberValues";
import { VaultDetailsListItem } from "../../_components/commons/VaultDetailsListItem";

interface VaultIdDetailsProps {
  vault: LoanVaultActive | LoanVaultLiquidated;
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues;
  collateralTokens: CollateralToken[];
}

export function VaultIdDetails(props: VaultIdDetailsProps): JSX.Element {
  const isVaultActive =
    props.vault.state !== LoanVaultState.IN_LIQUIDATION &&
    props.vault.loanAmounts.length > 0 &&
    props.vault.collateralAmounts.length > 0;

  return (
    <>
      <div className="mt-8 hidden md:block" data-testid="VaultDetailsDesktop">
        <h2
          className="text-xl font-semibold dark:text-dark-gray-900"
          data-testid="VaultDetailsDesktop.Heading"
        >
          Vault Details
        </h2>
        <div className="flex flex-wrap mt-3 items-center">
          <OverflowTable
            className={`md:w-full lg:${isVaultActive ? "w-2/3" : "w-full"}`}
          >
            <OverflowTable.Header>
              <OverflowTable.Head
                title={"Owner's Address"}
                testId="VaultDetailsDesktop.OwnerAddress"
              />

              <OverflowTable.Head
                alignRight
                title="Total Loan Value (USD)"
                infoDesc="Total loan value (in USD) taken by the vault."
                testId="VaultDetailsDesktop.TotalLoanValue"
              />

              <OverflowTable.Head
                alignRight
                title="Total Collateral Value (USD)"
                infoDesc="Total value of tokens (in USD) deposited as collaterals in the vault."
                testId="VaultDetailsDesktop.TotalCollateralValue"
              />

              <OverflowTable.Head
                alignRight
                title="Vault Interest Rate (APR)"
                infoDesc="Annual Vault Interest Rate based on the scheme selected by the vault owner."
                testId="VaultDetailsDesktop.VaultInterestRate "
              />
            </OverflowTable.Header>
            <DesktopVaultDetailsRow
              vault={props.vault}
              liquidatedVaultDerivedValues={props.liquidatedVaultDerivedValues}
            />
          </OverflowTable>
          {props.vault.state !== LoanVaultState.IN_LIQUIDATION &&
            isVaultActive && (
              <VaultHealthBar
                vault={props.vault}
                collateralTokens={props.collateralTokens}
              />
            )}
        </div>
      </div>

      <CollapsibleSection
        heading="Vault Details"
        className="block md:hidden"
        testId="VaultCollapsibleSection.VaultIdDetails"
      >
        <div className="mb-8" data-testid="VaultDetailsMobile">
          <MobileVaultDetails
            vault={props.vault}
            liquidatedVaultDerivedValues={props.liquidatedVaultDerivedValues}
          />
          {props.vault.state !== LoanVaultState.IN_LIQUIDATION &&
            isVaultActive && (
              <VaultHealthBar
                vault={props.vault}
                collateralTokens={props.collateralTokens}
              />
            )}
        </div>
      </CollapsibleSection>
    </>
  );
}

function DesktopVaultDetailsRow(props: {
  vault: LoanVaultActive | LoanVaultLiquidated;
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues;
}): JSX.Element {
  return (
    <OverflowTable.Row
      className={classNames(
        props.vault.state === LoanVaultState.FROZEN
          ? "text-gray-200"
          : "text-gray-900 dark:text-gray-100"
      )}
    >
      <OverflowTable.Cell>
        <AddressLink
          address={props.vault.ownerAddress}
          testId="DesktopVaultDetailsRow.OwnerId"
        >
          <TextTruncate text={props.vault.ownerAddress} />
        </AddressLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-right">
        <div className="flex justify-end items-center">
          <VaultNumberValues
            value={
              props.vault.state === LoanVaultState.IN_LIQUIDATION
                ? props.liquidatedVaultDerivedValues?.loanValue
                : new BigNumber(props.vault.loanValue)
            }
            prefix="$"
            testId="DesktopVaultDetailsRow.TotalLoanValue"
          />
          <IconTooltip />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-right">
        <div className="flex justify-end items-center">
          <VaultNumberValues
            value={
              props.vault.state === LoanVaultState.IN_LIQUIDATION
                ? props.liquidatedVaultDerivedValues?.collateralValue
                : new BigNumber(props.vault.collateralValue)
            }
            prefix="$"
            testId="DesktopVaultDetailsRow.TotalCollateralValue"
          />
          <IconTooltip />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-right">
        <VaultNumberValues
          value={new BigNumber(props.vault.loanScheme.interestRate)}
          suffix="%"
          testId="DesktopVaultDetailsRow.APR"
        />
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}

function MobileVaultDetails(props: {
  vault: LoanVaultActive | LoanVaultLiquidated;
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues;
}): JSX.Element {
  return (
    <div
      className={classNames(
        "flex flex-col space-y-2",
        props.vault.state === LoanVaultState.FROZEN
          ? "text-gray-200"
          : "text-gray-900"
      )}
    >
      <VaultDetailsListItem
        title={"Owner's Address"}
        testId="VaultDetailList.OwnerAddress"
      >
        <AddressLink address={props.vault.ownerAddress}>
          <TextTruncate
            text={props.vault.ownerAddress}
            testId="VaultDetailList.OwnerAddress.Value"
          />
        </AddressLink>
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title="Total Loan Value (USD)"
        infoDesc="Total loan value (in USD) taken by the vault."
        testId="VaultDetailList.TotalLoanValue"
      >
        <div className="flex justify-end items-center">
          <VaultNumberValues
            value={
              props.vault.state === LoanVaultState.IN_LIQUIDATION
                ? props.liquidatedVaultDerivedValues?.loanValue
                : new BigNumber(props.vault.loanValue)
            }
            prefix="$"
            testId="VaultDetailList.TotalLoanValue.Value"
          />
          <IconTooltip />
        </div>
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title="Total Collateral Value (USD)"
        infoDesc="Total value of tokens (in USD) deposited as collaterals in the vault."
        testId="VaultDetailList.TotalCollateralValue"
      >
        <div className="flex justify-end items-center">
          <VaultNumberValues
            value={
              props.vault.state === LoanVaultState.IN_LIQUIDATION
                ? props.liquidatedVaultDerivedValues?.collateralValue
                : new BigNumber(props.vault.collateralValue)
            }
            prefix="$"
            testId="VaultDetailList.TotalCollateralValue.Value"
          />
          <IconTooltip />
        </div>
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title="Vault Interest Rate (APR)"
        infoDesc="Annual Vault Interest Rate based on the scheme selected by the vault owner."
        testId="VaultDetailList.VaultInterestRate"
      >
        <VaultNumberValues
          value={new BigNumber(props.vault.loanScheme.interestRate)}
          suffix="%"
          testId="VaultDetailList.VaultInterestRate.Value"
        />
      </VaultDetailsListItem>
    </div>
  );
}
