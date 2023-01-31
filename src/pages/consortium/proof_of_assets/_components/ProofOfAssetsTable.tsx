import { PropsWithChildren } from "react";
import classNames from "classnames";
import {
  AssetBreakdownInfo,
  MemberWithTokenInfo,
} from "@defichain/whale-api-client/dist/api/consortium";
import { OverflowTable } from "@components/commons/OverflowTable";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { Link } from "@components/commons/link/Link";
import { getBackingAddressLink } from "../index.page";

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
            key={index}
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
        <div className="flex flex-col divide-y">
          {memberInfo.backingAddresses.map((backingAddress, index) => {
            const backingAddressLink = getBackingAddressLink(
              backingAddress,
              symbol
            );

            return (
              <div
                key={index}
                className={classNames("border-gray-100 dark:border-gray-700", {
                  "pb-4": index !== memberInfo.backingAddresses.length - 1,
                  "pt-4": index !== 0,
                })}
              >
                {backingAddressLink === undefined && (
                  <span>{backingAddress}</span>
                )}
                {backingAddressLink !== undefined && (
                  <Link
                    href={{
                      pathname: backingAddressLink,
                    }}
                  >
                    <a className="text-hyperlink-default hover:text-hyperlink-focused">
                      {backingAddress}
                    </a>
                  </Link>
                )}
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