import { LoanVaultTokenAmount } from "@defichain/whale-api-client/dist/api/loan";
import BigNumber from "bignumber.js";

interface CollateralsValue {
  value: BigNumber;
}

export function calculateCollateralsValue(
  batches: LoanVaultTokenAmount[]
): CollateralsValue {
  let totalCollateralValue = new BigNumber(0);
  batches.forEach((collateral) => {
    if (collateral.activePrice?.active == null) {
      if (collateral.symbol === "DUSD") {
        totalCollateralValue = totalCollateralValue.plus(
          new BigNumber(collateral.amount)
        );
      }
    } else {
      totalCollateralValue = totalCollateralValue.plus(
        new BigNumber(collateral.amount).multipliedBy(
          collateral.activePrice?.active.amount
        )
      );
    }
  });
  return {
    value: totalCollateralValue,
  };
}
