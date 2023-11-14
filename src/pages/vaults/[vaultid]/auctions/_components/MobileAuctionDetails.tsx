import React from "react";
import {
  LoanVaultLiquidationBatch,
  LoanVaultTokenAmount,
} from "@defichain/whale-api-client/dist/api/loan";
import BigNumber from "bignumber.js";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { NumericFormat } from "react-number-format";
import { VaultLink } from "@components/commons/link/VaultLink";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { BidAmountValue } from "../../../../auctions/_components/commons/BidAmountValue";
import { AuctionTimeLeft } from "../../../../auctions/_components/commons/AuctionTimeLeft";
import { useTokenPrice } from "../../../hooks/TokenPrice";

interface MobileAuctionDetailsProps {
  vaultId: string;
  batchIndex: string;
  liquidationBatch: LoanVaultLiquidationBatch;
  liquidationHeight: number;
}

export function MobileAuctionDetails(
  props: MobileAuctionDetailsProps
): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol);

  return (
    <div className="mt-8 md:hidden">
      <div
        className="p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded w-full justify-self-center md:justify-self-stretch"
        data-testid="VaultLoanDetailsCard"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LoanSymbol
              className="h-6 w-6"
              data-testid="MobileAuctionDetails.LoanSymbol"
            />
            <span
              className="ml-1.5 font-medium text-gray-900 dark:text-gray-100"
              data-testid="MobileAuctionDetails.displaySymbol"
            >
              {props.liquidationBatch.loan.displaySymbol}
            </span>
          </div>
        </div>

        <div className="items-center mt-2">
          <div
            className="font-medium text-gray-500 dark:text-gray-400 text-xs"
            data-testid="MobileAuctionDetails.BatchNumber"
          >
            {`BATCH #${Number(props.batchIndex) + 1}`}
          </div>
          <AuctionTimeLeft
            liquidationHeight={props.liquidationHeight}
            className="text-sm text-gray-500 dark:text-gray-400"
            showApproximateSymbol
            testId="MobileAuctionDetails.AuctionTimeLeft"
          />
        </div>

        <div
          className="flex justify-between mt-4"
          data-testid="MobileAuctionDetails.MinNextBid"
        >
          <span
            className="text-gray-500 dark:text-gray-400 text-sm"
            data-testid="MobileAuctionDetails.MinNextBid.Label"
          >
            Min. Next Bid
          </span>
          <BidAmountValue
            batch={props.liquidationBatch}
            valueClassName="text-right text-sm"
            valueSuffix
          />
        </div>

        <div
          className="flex justify-between mt-4"
          data-testid="MobileAuctionDetails.MinStartingBid"
        >
          <span
            className="text-gray-500 dark:text-gray-400 text-sm"
            data-testid="MobileAuctionDetails.MinStartingBid.Label"
          >
            Min. Starting Bid
          </span>
          <BidAmountValue
            isStartingBid
            batch={props.liquidationBatch}
            valueClassName="text-right text-sm"
            valueSuffix
          />
        </div>

        <div
          className="flex justify-between mt-4"
          data-testid="MobileAuctionDetails.VaultID"
        >
          <span
            className="text-gray-500 dark:text-gray-400 text-sm"
            data-testid="MobileAuctionDetails.VaultID.Label"
          >
            Vault ID
          </span>
          <VaultLink
            vault={props.vaultId}
            testId="MobileAuctionDetails.VaultID.Value"
          >
            <TextTruncate text={props.vaultId} />
          </VaultLink>
        </div>

        <div
          className="w-full mt-4 pt-4 flex flex-col border-t-2 border-gray-100"
          data-testid="MobileAuctionDetails.CollateralsForAuctions"
        >
          <div className="flex items-center mb-2">
            <span
              className="text-sm text-gray-500 dark:text-gray-400"
              data-testid="MobileAuctionDetails.CollateralsForAuctions.Label"
            >
              Collaterals For Auction
            </span>
          </div>
          {props.liquidationBatch.collaterals.map((collateral) => (
            <MobileCollateralListItem
              collateral={collateral}
              key={collateral.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileCollateralListItem(props: {
  collateral: LoanVaultTokenAmount;
}): JSX.Element {
  const { getTokenPrice } = useTokenPrice();
  const CollateralSymbol = getAssetIcon(props.collateral.symbol);
  const collateralValue = getTokenPrice(
    props.collateral.symbol,
    new BigNumber(props.collateral.amount)
  );

  return (
    <div
      className="flex justify-between mt-4"
      data-testid="MobileCollateralListItem"
    >
      <div className="flex">
        <CollateralSymbol
          className="h-6 w-6 mr-1.5"
          data-testid="MobileCollateralListItem.CollateralSymbol"
        />
        <span
          className="font-medium text-gray-900 dark:text-gray-400"
          data-testid="MobileCollateralListItem.displaySymbol"
        >
          {props.collateral.displaySymbol}
        </span>
      </div>
      <div className="text-right text-gray-900 dark:text-gray-100">
        <NumericFormat
          value={props.collateral.amount}
          displayType="text"
          decimalScale={8}
          fixedDecimalScale
          thousandSeparator
          data-testid="MobileCollateralListItem.Amount"
        />
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {!collateralValue.eq(0) && (
            <NumericFormat
              value={collateralValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
              displayType="text"
              decimalScale={2}
              prefix="$"
              fixedDecimalScale
              thousandSeparator
              data-testid="MobileCollateralListItem.Value"
            />
          )}
        </div>
      </div>
    </div>
  );
}
