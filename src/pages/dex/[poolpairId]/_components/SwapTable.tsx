import { JSX } from "@babel/types";
import { OverflowTable } from "@components/commons/OverflowTable";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { NumericFormat } from "react-number-format";
import { AddressLink } from "@components/commons/link/AddressLink";
import {
  PoolSwapData,
  SwapType,
} from "@defichain/whale-api-client/dist/api/poolpairs";
import classNames from "classnames";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { useAge } from "../../../../hooks/useAge";

export function SwapTable({ swaps }: { swaps: PoolSwapData[] }): JSX.Element {
  return (
    <div data-testid="SwapTable">
      <OverflowTable className="mt-4">
        <OverflowTable.Header>
          <OverflowTable.Head title="Transaction ID" />
          <OverflowTable.Head title="Age" />
          <OverflowTable.Head title="Type" />
          <OverflowTable.Head title="Input Amount" alignRight />
          <OverflowTable.Head title="Output Amount" alignRight />
          <OverflowTable.Head title="From" />
          <OverflowTable.Head title="To" />
        </OverflowTable.Header>
        {swaps.map((swap) => (
          <SwapRow swap={swap} key={swap.txid} />
        ))}
      </OverflowTable>
    </div>
  );
}

function SwapRow({ swap }: { swap: PoolSwapData }): JSX.Element {
  const age = useAge(swap.block.medianTime);
  const FromIcon =
    swap.from === undefined ? getAssetIcon("") : getAssetIcon(swap.from.symbol);
  const ToIcon =
    swap.to === undefined ? getAssetIcon("") : getAssetIcon(swap.to.symbol);

  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <TxIdLink txid={swap.txid}>
          <TextTruncate text={swap.txid} />
        </TxIdLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="dark:text-gray-100">
        {age}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {swap.type === undefined ? (
          "N/A"
        ) : (
          <span
            className={classNames(
              "capitalize",
              swap.type === SwapType.SELL ? "text-red-500" : "text-green-500"
            )}
          >
            {swap.type.toLowerCase()}
          </span>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {swap.from === undefined ? (
          "N/A"
        ) : (
          <div className="flex items-center justify-end dark:text-gray-100">
            <NumericFormat
              value={swap.fromAmount}
              fixedDecimalScale
              thousandSeparator=","
              displayType="text"
            />
            <div className="bg-lime-green">
              <FromIcon className="w-5 h-5 ml-1" />
            </div>
          </div>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {swap.to === undefined ? (
          "N/A"
        ) : (
          <div className="flex items-center justify-end dark:text-gray-100">
            <NumericFormat
              value={swap.to.amount}
              fixedDecimalScale
              thousandSeparator=","
              displayType="text"
            />
            <ToIcon className="w-5 h-5 ml-1" />
          </div>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {swap.from === undefined ? (
          "N/A"
        ) : (
          <AddressLink address={swap.from.address}>
            <TextTruncate text={swap.from.address} />
          </AddressLink>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {swap.to === undefined ? (
          "N/A"
        ) : (
          <AddressLink address={swap.to.address}>
            <TextTruncate text={swap.to.address} />
          </AddressLink>
        )}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
