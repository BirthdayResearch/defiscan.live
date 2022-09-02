import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
  LoanVaultTokenAmount,
} from "@defichain/whale-api-client/dist/api/loan";
import BigNumber from "bignumber.js";

export interface LiquidatedVaultDerivedValues {
  loanAmounts: LoanVaultTokenAmount[];
  collateralAmounts: LoanVaultTokenAmount[];
  loanValue: BigNumber;
  collateralValue: BigNumber;
  collateralRatio: BigNumber;
}

export function calculateLiquidationValues(
  vault: LoanVaultActive | LoanVaultLiquidated
): LiquidatedVaultDerivedValues | undefined {
  const loanAmounts: LoanVaultTokenAmount[] = [];
  const collateralAmounts: LoanVaultTokenAmount[] = [];
  let loanValue = new BigNumber(0);
  let collateralValue = new BigNumber(0);
  let collateralRatio = new BigNumber(0);

  let isMissingActivePrice = false;

  if (vault.state === LoanVaultState.IN_LIQUIDATION) {
    vault.batches.forEach((batch) => {
      if (batch.loan?.activePrice?.active == null) {
        if (batch.loan.symbol === "DUSD") {
          loanAmounts.push(batch.loan);
          loanValue = loanValue.plus(new BigNumber(batch.loan.amount));
        } else {
          isMissingActivePrice = true;
        }
      } else {
        loanAmounts.push(batch.loan);
        loanValue = loanValue.plus(
          new BigNumber(batch.loan.amount).multipliedBy(
            batch.loan.activePrice.active.amount
          )
        );
      }

      batch.collaterals.forEach((collateral) => {
        if (collateral.activePrice?.active == null) {
          if (collateral.symbol === "DUSD") {
            collateralAmounts.push(collateral);
            collateralValue = collateralValue.plus(
              new BigNumber(collateral.amount)
            );
          } else {
            isMissingActivePrice = true;
          }
        } else {
          collateralAmounts.push(collateral);
          collateralValue = collateralValue.plus(
            new BigNumber(collateral.amount).multipliedBy(
              collateral.activePrice?.active.amount
            )
          );
        }
      });
    });

    collateralRatio = collateralValue.div(loanValue).multipliedBy(100);
  }

  if (
    isMissingActivePrice ||
    loanValue.lte(0) ||
    collateralValue.lte(0) ||
    collateralRatio.lt(0)
  ) {
    return undefined;
  }

  return {
    loanAmounts: loanAmounts,
    collateralAmounts: collateralAmounts,
    loanValue: loanValue,
    collateralValue: collateralValue,
    collateralRatio: collateralRatio,
  };
}
