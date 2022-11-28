import { NumericFormat } from "react-number-format";
import React from "react";
import { OverflowTable } from "@components/commons/OverflowTable";
import { TokenData } from "@defichain/whale-api-client/dist/api/tokens";
import { getAssetIcon, getTokenIcon } from "@components/icons/assets/tokens";
import { Link } from "@components/commons/link/Link";
import { getTokenName } from "../../../utils/commons/token/getTokenName";

export function TokenTable({ tokens }: { tokens: TokenData[] }): JSX.Element {
  return (
    <OverflowTable className="mt-6">
      <OverflowTable.Header>
        <OverflowTable.Head title="Token" />
        <OverflowTable.Head title="Name" />
        <OverflowTable.Head title="Category" />
        <OverflowTable.Head title="Minted" />
      </OverflowTable.Header>
      {tokens.map((token) => (
        <Link
          href={{
            pathname: `/tokens/${
              token.isDAT || token.isLPS
                ? token.displaySymbol
                : token.displaySymbol.concat("-", token.id)
            }`,
          }}
          key={token.id}
        >
          <a className="contents">
            <TokenRow data={token} />
          </a>
        </Link>
      ))}
    </OverflowTable>
  );
}

function TokenRow({ data }: { data: TokenData }): JSX.Element {
  return (
    <OverflowTable.Row className="hover:text-primary-500 dark:hover:text-gray-100 dark:text-gray-100">
      <OverflowTable.Cell className="align-middle">
        <div className="flex items-center">
          {(() => {
            if (data.isDAT) {
              const AssetIcon = getAssetIcon(data.symbol);
              return <AssetIcon className="h-8 w-8" />;
            }

            const TokenIcon = getTokenIcon(data.displaySymbol);
            return <TokenIcon className="h-8 w-8" />;
          })()}
          <div className="font-medium ml-3">
            {data.displaySymbol}
            {!data.isDAT && `#${data.id}`}
          </div>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle">
        {getTokenName(data)}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle">
        {(() => {
          if (data.isLPS) {
            return "LPS";
          }

          if (data.isDAT) {
            return "DAT";
          }

          return "DCT";
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle">
        {(() => {
          if (data.isLPS) {
            return <div>-</div>;
          }

          if (data.id === "0") {
            return <div>-</div>;
          }

          return (
            <NumericFormat
              value={data.minted}
              displayType="text"
              thousandSeparator
              decimalScale={2}
            />
          );
        })()}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
