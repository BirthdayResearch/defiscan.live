import { NumericFormat } from "react-number-format";
import BigNumber from "bignumber.js";
import React from "react";
import { LoanVaultLiquidationBatch } from "@defichain/whale-api-client/dist/api/loan";
import classNames from "classnames";
import { useTokenPrice } from "../../../vaults/hooks/TokenPrice";

interface BidAmountValueProps {
  batch: LoanVaultLiquidationBatch;
  isStartingBid?: boolean;
  valueClassName?: string;
  valueSuffix?: boolean;
  testId?: string;
}

export function BidAmountValue(props: BidAmountValueProps): JSX.Element {
  const { getTokenPrice } = useTokenPrice();

  let minBidAmount: BigNumber;
  let minBidValue: BigNumber;

  if (props.batch.highestBid?.amount === undefined || props.isStartingBid!) {
    minBidAmount = new BigNumber(props.batch.loan.amount).multipliedBy(1.05);
    minBidValue = getTokenPrice(props.batch.loan.symbol, minBidAmount);
  } else {
    minBidAmount = new BigNumber(
      props.batch.highestBid.amount.amount
    ).multipliedBy(1.01);
    minBidValue = getTokenPrice(props.batch.loan.symbol, minBidAmount);
  }

  return (
    <div data-testid={props.testId}>
      <NumericFormat
        value={minBidAmount.toFixed(8)}
        thousandSeparator
        decimalScale={8}
        suffix={` ${props.batch.loan.displaySymbol}`}
        displayType="text"
        data-testid="BidAmountValue.MinBidAmount"
        className="dark:text-gray-100"
      />
      <div
        className={classNames(
          "text-gray-500 dark:text-gray-400",
          props.valueClassName
        )}
        data-testid="BidAmountValue.MinBidValue"
      >
        {minBidValue.eq(0) ? (
          "N/A"
        ) : (
          <NumericFormat
            value={minBidValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
            thousandSeparator
            decimalScale={8}
            prefix="$"
            displayType="text"
          />
        )}
        {props.batch.froms !== undefined && props.batch.froms.length !== 0 && (
          <div className="inline-block ml-1 text-gray-400">
            {`(${props.batch.froms?.length} ${
              props.batch.froms.length > 1 ? "Bids" : "Bid"
            })`}
          </div>
        )}
      </div>
    </div>
  );
}
