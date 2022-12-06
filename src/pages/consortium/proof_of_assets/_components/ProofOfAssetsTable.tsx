import { PropsWithChildren } from "react";
import classNames from "classnames";
import {
  AssetBreakdownInfo,
  MemberWithTokenInfo,
} from "@defichain/whale-api-client/dist/api/consortium";
import { OverflowTable } from "@components/commons/OverflowTable";
import { getAssetIcon } from "@components/icons/assets/tokens";

export function ProofOfAssetsTable({
  assets,
}: {
  assets: AssetBreakdownInfo[];
}): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title="Token" sticky />
        <OverflowTable.Head title="Member" sticky />
        <OverflowTable.Head title="Address(es)" />
      </OverflowTable.Header>

      {assets.map((asset) =>
        asset.memberInfo.map((memberInfo, index) => (
          <ProofOfAssetsRow
            symbol={asset.tokenSymbol}
            memberInfo={memberInfo}
            isFirstRow={index === 0}
          />
        ))
      )}
    </OverflowTable>
  );
}

function ProofOfAssetsRow({
  isFirstRow,
  memberInfo,
  symbol,
}: {
  isFirstRow: boolean;
  memberInfo: MemberWithTokenInfo;
  symbol: string;
}): JSX.Element {
  const AssetIcon = getAssetIcon(symbol);
  return (
    <OverflowTable.Row className="border-none text-lg dark:hover:text-gray-100">
      <OverflowTable.Cell
        sticky
        className="group-hover:bg-white dark:group-hover:bg-gray-800"
      >
        <div
          className={classNames("flex", {
            hidden: !isFirstRow,
          })}
        >
          <AssetIcon className="h-8 w-8" />
          <span className="ml-2 text-2xl font-medium">{symbol}</span>
        </div>
      </OverflowTable.Cell>
      <BorderedCell>{memberInfo.name}</BorderedCell>
      <BorderedCell>
        <div className="flex flex-col">
          {memberInfo.backingAddresses.map((backingAddress, index) => {
            return (
              <div
                key={index}
                className={classNames({
                  "border-b border-gray-100 pb-4 dark:border-gray-700":
                    index !== backingAddress.length - 1,
                  "pt-4 border-none": index !== 0,
                })}
              >
                <a className="text-hyperlink-default hover:text-hyperlink-focused">
                  {backingAddress}
                </a>
              </div>
            );
          })}
        </div>
      </BorderedCell>
    </OverflowTable.Row>
  );
}

function BorderedCell({ children }: PropsWithChildren<{}>) {
  return (
    <OverflowTable.Cell className="mx-0 my-0 border-b border-gray-100 px-0 py-0 group-hover:bg-white dark:border-gray-700 dark:group-hover:bg-gray-800">
      {children}
    </OverflowTable.Cell>
  );
}
