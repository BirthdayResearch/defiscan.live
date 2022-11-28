import React from "react";
import {
  LoanVaultLiquidationBatch,
  LoanVaultTokenAmount,
} from "@defichain/whale-api-client/dist/api/loan";
import BigNumber from "bignumber.js";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { NumericFormat } from "react-number-format";
import { VaultLink } from "@components/commons/link/VaultLink";
import { BidAmountValue } from "../../../../auctions/_components/commons/BidAmountValue";
import { AuctionTimeLeft } from "../../../../auctions/_components/commons/AuctionTimeLeft";
import { useTokenPrice } from "../../../hooks/TokenPrice";

interface DesktopAuctionDetailsProps {
  vaultId: string;
  batchIndex: string;
  liquidationBatch: LoanVaultLiquidationBatch;
  liquidationHeight: number;
}

export function DesktopAuctionDetails(
  props: DesktopAuctionDetailsProps
): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol);

  return (
    <div className="mt-8 hidden md:block">
      <div className="flex border border-gray-200 rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center self-start mr-10">
          <LoanSymbol
            className="h-8 w-8"
            data-testid="DesktopAuctionDetails.LoanSymbol"
          />
          <span
            className="ml-1.5 font-medium text-gray-900 dark:text-gray-100"
            data-testid="DesktopAuctionDetails.displaySymbol"
          >
            {props.liquidationBatch.loan.displaySymbol}
          </span>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full flex flex-wrap -m-4 items-start">
            <div className="flex flex-wrap w-1/2 lg:w-1/4 p-4">
              <div
                className="w-full text-sm text-gray-500 dark:text-gray-400 mb-0.5"
                data-testid="DesktopAuctionDetails.BatchNumber"
              >
                {`BATCH #${Number(props.batchIndex) + 1}`}
              </div>
              <AuctionTimeLeft
                liquidationHeight={props.liquidationHeight}
                className="text-sm text-gray-500 dark:text-gray-400"
                showApproximateSymbol
                testId="DesktopAuctionDetails.AuctionTimeLeft"
              />
            </div>
            <div
              className="w-1/2 lg:w-1/4 flex flex-wrap p-4"
              data-testid="DesktopAuctionDetails.MinNextBid"
            >
              <div
                className="w-full text-gray-500 dark:text-gray-400 text-sm mb-0.5"
                data-testid="DesktopAuctionDetails.MinNextBid.Label"
              >
                Min. Next Bid
              </div>
              <BidAmountValue
                batch={props.liquidationBatch}
                valueSuffix
                valueClassName="text-left text-sm"
              />
            </div>
            <div
              className="w-1/2 lg:w-1/4 p-4 flex flex-wrap"
              data-testid="DesktopAuctionDetails.MinStartingBid"
            >
              <div
                className="w-full text-gray-500 dark:text-gray-400 text-sm mb-0.5"
                data-testid="DesktopAuctionDetails.MinStartingBid.Label"
              >
                Min. Starting Bid
              </div>
              <BidAmountValue
                isStartingBid
                valueSuffix
                batch={props.liquidationBatch}
                valueClassName="text-left text-sm"
              />
            </div>
            <div
              className="w-1/2 lg:w-1/4 p-4 flex flex-wrap"
              data-testid="DesktopAuctionDetails.VaultID"
            >
              <div
                className="w-full text-sm text-gray-500 dark:text-gray-400 mb-0.5"
                data-testid="DesktopAuctionDetails.VaultID.Label"
              >
                Vault ID
              </div>
              <VaultLink
                vault={props.vaultId}
                className="overflow-hidden overflow-ellipsis"
                testId="DesktopAuctionDetails.VaultID.Value"
              >
                {props.vaultId}
              </VaultLink>
            </div>
          </div>
          <div
            className="w-full flex flex-wrap border-t mt-4"
            data-testid="DesktopAuctionDetails.CollateralsForAuctions"
          >
            <div
              className="text-sm text-gray-500 dark:text-gray-400 mt-4"
              data-testid="DesktopAuctionDetails.CollateralsForAuctions.Label"
            >
              Collaterals For Auction
            </div>
            <div className="w-full flex flex-wrap mt-1 -my-2">
              {props.liquidationBatch.collaterals.map((collateral) => (
                <DesktopCollateralListItem
                  collateral={collateral}
                  key={collateral.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopCollateralListItem(props: {
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
      className="w-1/2 lg:w-1/4 flex py-2 items-middle"
      data-testid="DesktopCollateralListItem"
    >
      <div className="flex">
        <CollateralSymbol
          className="h-6 w-6"
          data-testid="DesktopCollateralListItem.CollateralSymbol"
        />
      </div>
      <div className="ml-1.5 dark:text-gray-100">
        <div>
          <NumericFormat
            value={props.collateral.amount}
            displayType="text"
            suffix={` ${props.collateral.displaySymbol}`}
            decimalScale={8}
            fixedDecimalScale
            thousandSeparator
            data-testid="DesktopCollateralListItem.Amount"
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {!collateralValue.eq(0) && (
            <NumericFormat
              value={collateralValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
              displayType="text"
              decimalScale={2}
              prefix="$"
              fixedDecimalScale
              thousandSeparator
              data-testid="DesktopCollateralListItem.Value"
            />
          )}
        </div>
      </div>
    </div>
  );
}
