import { NumericFormat } from "react-number-format";
import { PropsWithChildren } from "react";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import {
  AssetBreakdownInfo,
  MemberWithTokenInfo,
} from "@defichain/whale-api-client/dist/api/consortium";
import { useTokenPrice } from "pages/vaults/hooks/TokenPrice";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { OverflowTable } from "@components/commons/OverflowTable";

export function AssetBreakdownTable({
  assets,
}: {
  assets: AssetBreakdownInfo[];
}): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title="Token" sticky />
        <OverflowTable.Head title="Member" sticky />
        <OverflowTable.Head title="Minted" alignRight />
        <OverflowTable.Head title="Burned" alignRight />
      </OverflowTable.Header>

      {assets.map((asset) =>
        asset.memberInfo.map((memberInfo, index) => (
          <AssetBreakdownRow
            key={index}
            isFirstRow={index === 0}
            memberInfo={memberInfo}
            displaySymbol={asset.tokenDisplaySymbol}
            symbol={asset.tokenSymbol}
          />
        ))
      )}
    </OverflowTable>
  );
}

function AssetBreakdownRow({
  displaySymbol,
  isFirstRow,
  memberInfo,
  symbol,
}: {
  displaySymbol: string;
  isFirstRow: boolean;
  memberInfo: MemberWithTokenInfo;
  symbol: string;
}): JSX.Element {
  const AssetIcon = getAssetIcon(symbol);
  const { getTokenPrice } = useTokenPrice();

  return (
    <OverflowTable.Row className="border-none text-lg hover:text-primary-500 dark:hover:text-gray-100">
      <OverflowTable.Cell sticky>
        <div
          className={classNames("flex", {
            hidden: !isFirstRow,
          })}
        >
          <AssetIcon className="h-8 w-8" />
          <span className="ml-2 text-2xl font-medium">{displaySymbol}</span>
        </div>
      </OverflowTable.Cell>
      <BorderedCell>
        <span className="font-semibold">{memberInfo.name}</span>
      </BorderedCell>
      <BorderedCell>
        <div className="flex flex-col">
          <NumericFormat
            value={new BigNumber(memberInfo.minted).toFixed(8)}
            fixedDecimalScale
            thousandSeparator=","
            displayType="text"
            className="text-right font-medium dark:text-gray-100"
          />
          <NumericFormat
            value={getTokenPrice(
              symbol,
              new BigNumber(memberInfo.minted)
            ).toFixed(2)}
            prefix="≈$"
            fixedDecimalScale
            thousandSeparator=","
            displayType="text"
            className="text-right text-gray-500 dark:text-gray-100"
          />
        </div>
      </BorderedCell>
      <BorderedCell>
        <div className="flex flex-col">
          <NumericFormat
            value={new BigNumber(memberInfo.burned).toFixed(8)}
            fixedDecimalScale
            thousandSeparator=","
            displayType="text"
            className="text-right font-medium dark:text-gray-100"
          />
          <NumericFormat
            value={getTokenPrice(
              symbol,
              new BigNumber(memberInfo.burned)
            ).toFixed(2)}
            prefix="≈$"
            fixedDecimalScale
            thousandSeparator=","
            displayType="text"
            className="text-right text-gray-500 dark:text-gray-100"
          />
        </div>
      </BorderedCell>
    </OverflowTable.Row>
  );
}
function BorderedCell({ children }: PropsWithChildren<{}>) {
  return (
    <OverflowTable.Cell className="border-t border-gray-100 dark:border-gray-700">
      {children}
    </OverflowTable.Cell>
  );
}
