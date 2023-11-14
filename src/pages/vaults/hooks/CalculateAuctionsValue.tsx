import { LoanVaultTokenAmount } from "@defichain/whale-api-client/dist/api/loan";
import BigNumber from "bignumber.js";
import { useTokenPrice } from "./TokenPrice";

interface CollateralsValue {
  value: BigNumber;
}

export function useCalculateAuctionsValue(
  batches: LoanVaultTokenAmount[]
): CollateralsValue {
  const { getTokenPrice } = useTokenPrice();
  let totalCollateralValue = new BigNumber(0);

  batches.forEach((collateral) => {
    const price = getTokenPrice(
      collateral.symbol,
      new BigNumber(collateral.amount)
    );
    totalCollateralValue = totalCollateralValue.plus(price);
  });

  return {
    value: totalCollateralValue,
  };
}
