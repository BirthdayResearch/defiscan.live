import { PoolPairData } from "@defichain/whale-api-client/dist/api/poolpairs";
import { NumericFormat } from "react-number-format";
import React, { useCallback } from "react";
import { MoreHoverPopover } from "@components/commons/popover/MoreHoverPopover";
import { OverflowTable } from "@components/commons/OverflowTable";
import { PoolPairSymbolLocal } from "@components/commons/token/PoolPairSymbolLocal";
import { Link } from "@components/commons/link/Link";
import BigNumber from "bignumber.js";
import { APRInfo } from "./APRInfo";
import { TotalLiquidityInfo } from "./TotalLiquidityInfo";
import { usePoolPairPrices } from "../hooks/CalculatePoolPairPrices";
import { NonTradeChip } from "./NonTradeChip";

export enum SortKeys {
  VOLUME = "volume",
  TOTAL_LIQUIDITY = "totalLiquidity",
  APR = "apr",
  PRIMARY_TOKEN_PRICE = "primaryTokenPrice",
}

export type SortOrder = "asc" | "desc";

export function PoolPairsTable({
  poolPairs,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}): JSX.Element {
  const poolPairsPrices = usePoolPairPrices(poolPairs);

  const sortedData = useCallback(
    () =>
      SortData({
        poolPairsPrices: poolPairsPrices,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [poolPairsPrices, sortKey, sortOrder],
  );

  function changeSort(key: SortKeys): void {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  }

  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title="Pair" />
        <OverflowTable.Head title="Primary Token Price (USDT)" alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.PRIMARY_TOKEN_PRICE}
            onClick={() => changeSort(SortKeys.PRIMARY_TOKEN_PRICE)}
            sortOrder={sortOrder}
            sortKey={sortKey}
          />
        </OverflowTable.Head>
        <OverflowTable.Head title="Volume (24H)" alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.VOLUME}
            onClick={() => changeSort(SortKeys.VOLUME)}
            sortOrder={sortOrder}
            sortKey={sortKey}
          />
        </OverflowTable.Head>
        <OverflowTable.Head title="Total Liquidity" alignRight>
          <OverflowTable.SortButton
            columnKey={SortKeys.TOTAL_LIQUIDITY}
            onClick={() => changeSort(SortKeys.TOTAL_LIQUIDITY)}
            sortOrder={sortOrder}
            sortKey={sortKey}
          />
        </OverflowTable.Head>
        <OverflowTable.Head
          title="APR"
          infoDesc="APR includes commission."
          alignRight
        >
          <OverflowTable.SortButton
            columnKey={SortKeys.APR}
            onClick={() => changeSort(SortKeys.APR)}
            sortOrder={sortOrder}
            sortKey={sortKey}
          />
        </OverflowTable.Head>
      </OverflowTable.Header>
      {sortedData().map((data) => (
        <Link
          href={{
            pathname: `/dex/${
              data.poolPair.displaySymbol.includes("DUSD") ||
              data.poolPair.displaySymbol.includes("dUSDT") ||
              data.poolPair.displaySymbol.includes("dUSDC") ||
              data.poolPair.displaySymbol.includes("dBTC") ||
              data.poolPair.displaySymbol.includes("dETH") ||
              data.poolPair.displaySymbol.includes("dEUROC") ||
              data.poolPair.displaySymbol.includes("dXCHF")
                ? data.poolPair.displaySymbol
                : data.poolPair.tokenA.displaySymbol
            }`,
          }}
          key={data.poolPair.id}
        >
          <a className="contents">
            <PoolPairRow
              poolPair={data.poolPair}
              tokenPrice={data.tokenPrice}
            />
          </a>
        </Link>
      ))}
    </OverflowTable>
  );
}

export function SortData({
  poolPairsPrices,
  sortKey,
  reverse,
}: {
  poolPairsPrices: Array<{ poolPair: PoolPairData; tokenPrice: BigNumber }>;
  sortKey: string;
  reverse: boolean;
}): Array<{ poolPair: PoolPairData; tokenPrice: BigNumber }> {
  if (sortKey === undefined) {
    return poolPairsPrices;
  }

  const sortedData = poolPairsPrices.sort((a, b) => {
    switch (sortKey) {
      case SortKeys.VOLUME:
        return (a.poolPair.volume?.h24 ?? 0) - (b.poolPair.volume?.h24 ?? 0);
      case SortKeys.APR:
        return (a.poolPair.apr?.total ?? 0) - (b.poolPair.apr?.total ?? 0);
      case SortKeys.TOTAL_LIQUIDITY:
        return (
          Number(a.poolPair.totalLiquidity?.usd ?? 0) -
          Number(b.poolPair.totalLiquidity?.usd ?? 0)
        );
      case SortKeys.PRIMARY_TOKEN_PRICE:
        return a.tokenPrice.minus(b.tokenPrice).toNumber();
      default:
        return b[sortKey] - a[sortKey];
    }
  });

  return reverse ? sortedData.reverse() : sortedData;
}

function PoolPairRow({
  poolPair,
  tokenPrice,
}: {
  poolPair: PoolPairData;
  tokenPrice: BigNumber;
}): JSX.Element {
  if (poolPair.symbol === "BURN-DFI") {
    return <></>;
  }

  return (
    <OverflowTable.Row className="hover:text-primary-500">
      <OverflowTable.Cell className="align-middle">
        {(poolPair.tokenB.displaySymbol.includes("BURN2") ||
          poolPair.tokenA.displaySymbol.includes("BURN2")) && <NonTradeChip />}
        <PoolPairSymbolLocal
          tokenA={poolPair.tokenA}
          tokenB={poolPair.tokenB}
          primarySymbolClassName="h-8 w-8"
          secondarySymbolClassName="ml-6 h-6 w-6"
          textClassName="ml-16"
          primaryTextClassName="font-medium dark:text-gray-100"
          secondaryTextClassName="text-gray-400"
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle text-right dark:text-gray-100">
        {!tokenPrice.isNaN() ? (
          <NumericFormat
            value={
              tokenPrice.isGreaterThan(100)
                ? tokenPrice.toFixed(0, BigNumber.ROUND_HALF_UP)
                : tokenPrice.toFixed(2, BigNumber.ROUND_HALF_UP)
            }
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        ) : (
          "Error"
        )}
      </OverflowTable.Cell>

      <OverflowTable.Cell className="align-middle text-right dark:text-gray-100">
        {poolPair.volume?.h24 !== undefined ? (
          <NumericFormat
            value={poolPair.volume?.h24}
            displayType="text"
            thousandSeparator
            decimalScale={0}
            prefix="$"
          />
        ) : (
          <div className="text-yellow-500">Error</div>
        )}
      </OverflowTable.Cell>

      <OverflowTable.Cell className="align-middle text-right dark:text-gray-100">
        {poolPair.totalLiquidity.usd !== undefined ? (
          <div className="flex justify-end">
            <MoreHoverPopover
              className="ml-1"
              description={
                <TotalLiquidityInfo
                  tokenA={poolPair.tokenA}
                  tokenB={poolPair.tokenB}
                />
              }
              placement="bottom"
            >
              <NumericFormat
                value={poolPair.totalLiquidity.usd}
                displayType="text"
                thousandSeparator
                decimalScale={0}
                prefix="$"
              />
            </MoreHoverPopover>
          </div>
        ) : (
          <div className="text-yellow-500">Error</div>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle">
        {(() => {
          if (poolPair.apr !== undefined) {
            return (
              <div className="flex justify-end dark:text-gray-100">
                <MoreHoverPopover
                  className="ml-1"
                  description={<APRInfo {...poolPair.apr} />}
                  placement="bottom"
                >
                  <NumericFormat
                    value={poolPair.apr.total * 100}
                    displayType="text"
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    suffix="%"
                  />
                </MoreHoverPopover>
              </div>
            );
          } else {
            return <div className="text-yellow-500">Error</div>;
          }
        })()}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
