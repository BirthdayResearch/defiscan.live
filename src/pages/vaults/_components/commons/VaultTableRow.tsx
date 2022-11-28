import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
} from "@defichain/whale-api-client/dist/api/loan";
import classNames from "classnames";
import { OverflowTable } from "@components/commons/OverflowTable";
import React from "react";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import BigNumber from "bignumber.js";
import { NumericFormat } from "react-number-format";
import { IconTooltip } from "@components/commons/IconsTooltip";
import { LiquidatedVaultDerivedValues } from "../../utils/LiquidatedVaultDerivedValues";
import { VaultStatus } from "./VaultStatus";
import { VaultNumberValues } from "./VaultNumberValues";
import { VaultCollateralizationRatio } from "./VaultCollateralizationRatio";
import { VaultTokenSymbols } from "./VaultTokenSymbols";

interface VaultTableRowProps {
  vault: LoanVaultActive | LoanVaultLiquidated;
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues;
}

export function VaultTableRow(props: VaultTableRowProps): JSX.Element {
  return (
    <OverflowTable.Row
      className={classNames(
        "cursor-pointer",
        props.vault.state === LoanVaultState.FROZEN
          ? "text-gray-200"
          : "text-gray-900 dark:text-gray-100"
      )}
    >
      <OverflowTable.Cell sticky>
        <TextTruncate
          text={props.vault.vaultId}
          className="text-grey-500"
          testId="VaultRow.VaultID"
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultStatus
          vault={props.vault}
          className="inline-block text-xs"
          testId="VaultRow.VaultStatus"
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className="flex justify-end" data-testid="VaultRow.LoansValue">
          {props.vault.state === LoanVaultState.IN_LIQUIDATION ? (
            <VaultTokenSymbols
              tokens={props.liquidatedVaultDerivedValues?.loanAmounts}
            />
          ) : (
            <VaultTokenSymbols tokens={props.vault.loanAmounts} />
          )}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div
          className="flex justify-end items-center"
          data-testid="VaultRow.LoansValue"
        >
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
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className="flex justify-end" data-testid="VaultRow.Collaterals">
          <VaultTokenSymbols
            tokens={
              props.vault.state === LoanVaultState.IN_LIQUIDATION
                ? props.liquidatedVaultDerivedValues?.collateralAmounts
                : props.vault.collateralAmounts
            }
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div
          className="flex justify-end items-center"
          data-testid="VaultRow.CollateralValue"
        >
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
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-right">
        <span
          className="flex flex-row justify-end"
          data-testid="VaultRow.CollateralizationRatio"
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
          />
          <span>&nbsp;/&nbsp;</span>
          <NumericFormat
            value={new BigNumber(props.vault.loanScheme.minColRatio).toFixed(2)}
            suffix="%"
            displayType="text"
            thousandSeparator
          />
        </span>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
