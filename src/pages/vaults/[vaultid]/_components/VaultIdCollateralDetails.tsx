import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import {
  CollateralToken,
  LoanVaultState,
  LoanVaultTokenAmount,
} from "@defichain/whale-api-client/dist/api/loan";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import BigNumber from "bignumber.js";
import React from "react";
import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import { EmptySection } from "@components/commons/sections/EmptySection";
import { IconTooltip } from "@components/commons/IconsTooltip";
import { getActivePrice } from "pages/vaults/utils/ActivePrice";
import { VaultNumberValues } from "../../_components/commons/VaultNumberValues";

export function VaultIdCollateralDetails(props: {
  totalCollateralValue: string;
  vaultState: LoanVaultState;
  collateralAmounts: LoanVaultTokenAmount[];
  collateralTokens: CollateralToken[];
}): JSX.Element {
  return (
    <>
      <div
        className="mt-10 hidden md:block"
        data-testid="CollateralDetailsDesktop"
      >
        <div className="flex items-center">
          <h2
            data-testid="CollateralDetailsDesktop.Heading"
            className="text-xl font-semibold dark:text-dark-gray-900"
          >
            Collateral Details
          </h2>
          <InfoHoverPopover
            className="ml-1"
            description="Proportion of collaterals deposited in the vault."
          />
        </div>

        {props.collateralAmounts.length === 0 ? (
          <EmptySection message="There are no collaterals in the vault at this time" />
        ) : (
          <div
            className="mt-3 grid gap-2 justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch"
            data-testid="CollateralDetailsDesktop.Cards"
          >
            {props.collateralAmounts.map((col) => (
              <CollateralCard
                vaultTotalCollateralValue={props.totalCollateralValue}
                vaultState={props.vaultState}
                col={col}
                key={col.id}
                priceFactor={
                  props.collateralTokens.find(
                    (token) => token.token.id === col.id
                  )?.factor ?? "1"
                }
              />
            ))}
          </div>
        )}
      </div>

      <CollapsibleSection
        heading="Collateral Details"
        className="block md:hidden"
        testId="VaultCollapsibleSection.CollateralDetails"
      >
        {props.collateralAmounts.length === 0 ? (
          <EmptySection message="There are no collaterals in the vault at this time" />
        ) : (
          <div
            className="mt-4 mb-8 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            data-testid="CollateralDetailsMobile.Cards"
          >
            {props.collateralAmounts.map((col) => (
              <CollateralCard
                vaultTotalCollateralValue={props.totalCollateralValue}
                vaultState={props.vaultState}
                col={col}
                key={col.id}
                priceFactor={
                  props.collateralTokens.find(
                    (token) => token.token.id === col.id
                  )?.factor ?? "1"
                }
              />
            ))}
          </div>
        )}
      </CollapsibleSection>
    </>
  );
}

function CollateralCard(props: {
  vaultTotalCollateralValue: string;
  vaultState: LoanVaultState;
  col: LoanVaultTokenAmount;
  priceFactor: string;
}): JSX.Element {
  const TokenSymbol = getAssetIcon(props.col.symbol);
  const collateralPrice = getActivePrice(
    props.col.symbol,
    props.col.activePrice,
    props.priceFactor,
    "ACTIVE",
    "COLLATERAL"
  );
  const collateralValue = new BigNumber(props.col.amount).multipliedBy(
    collateralPrice
  );
  const compositionPercentage = collateralValue
    .dividedBy(props.vaultTotalCollateralValue)
    .multipliedBy(100);

  return (
    <div
      className="w-full p-4 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700"
      data-testid="CollateralCard"
    >
      <div className="flex justify-between items-start w-full">
        <div
          className="flex items-center"
          data-testid="CollateralCard.AssetIcon"
        >
          <TokenSymbol className="h-6 w-6 z-10" />
          <div
            className="flex flex-wrap items-center ml-1.5 font-medium"
            data-testid="CollateralCard.displaySymbol"
          >
            <div className="dark:text-gray-400">{props.col.displaySymbol}</div>
            {props.col.symbol === "DUSD" ? (
              <InfoHoverPopover
                className="ml-1"
                description={`${new BigNumber(props.priceFactor)
                  .multipliedBy(100)
                  .toFixed(2)}% collateral factor`}
                placement="top"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {compositionPercentage != null && (
          <div className="font-medium text-gray-900 dark:text-gray-400">
            <VaultNumberValues value={compositionPercentage} suffix="%" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <div
          className="text-sm text-gray-500 dark:text-gray-400"
          data-testid="CollateralCard.CollateralAmountTitle"
        >
          Collateral Amount
        </div>
        <div
          className={classNames(
            "flex items-center space-x-1",
            props.vaultState === LoanVaultState.FROZEN
              ? "text-gray-200"
              : "text-gray-900 dark:text-gray-100"
          )}
          data-testid="CollateralCard.CollateralAmount"
        >
          <NumericFormat
            value={new BigNumber(props.col.amount).toFixed(8)}
            displayType="text"
            suffix={` ${props.col.displaySymbol}`}
            decimalScale={8}
            fixedDecimalScale
            thousandSeparator
          />
          <div className="text-sm text-gray-500">
            {collateralPrice != null && (
              <div className="flex">
                <span className="ml-0.5 mr-1">/</span>
                <div className="flex justify-end items-center">
                  <VaultNumberValues
                    value={new BigNumber(collateralPrice)}
                    prefix="$"
                  />
                  <IconTooltip />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
