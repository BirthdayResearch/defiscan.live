import { CardList } from "@components/commons/CardList";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import { AddressLink } from "@components/commons/link/AddressLink";
import { NumericFormat } from "react-number-format";
import {
  PoolSwapData,
  SwapType,
} from "@defichain/whale-api-client/dist/api/poolpairs";
import classNames from "classnames";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { useAge } from "../../../../hooks/useAge";

export function SwapCards({ swaps }: { swaps: PoolSwapData[] }): JSX.Element {
  return (
    <CardList>
      {swaps.map((swap) => (
        <SwapCard swap={swap} key={swap.txid} />
      ))}
    </CardList>
  );
}

export function SwapCard({ swap }: { swap: PoolSwapData }): JSX.Element {
  const age = useAge(swap.block.medianTime);
  const FromIcon =
    swap.from === undefined ? getAssetIcon("") : getAssetIcon(swap.from.symbol);
  const ToIcon =
    swap.to === undefined ? getAssetIcon("") : getAssetIcon(swap.to.symbol);

  return (
    <CardList.Card testId="SwapCard">
      <CardList.Header>
        <TxIdLink txid={swap.txid} testId="CardList.Header.TxId">
          <TextTruncate text={swap.txid} className="w-44" />
        </TxIdLink>
      </CardList.Header>
      <div className="mt-4" data-testid="CardList.Header.Type">
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
      </div>
      <CardList.List>
        <CardList.ListItem
          title="Age"
          titleClassNames="text-sm"
          testId="SwapCard.CardList.Age"
        >
          {age}
        </CardList.ListItem>
        <CardList.ListItem
          title="Input Amount"
          titleClassNames="text-sm"
          testId="SwapCard.CardList.InputAmount"
        >
          {swap.from === undefined ? (
            "N/A"
          ) : (
            <div className="flex items-center justify-end">
              <NumericFormat
                value={swap.from.amount}
                fixedDecimalScale
                thousandSeparator=","
                displayType="text"
              />
              <FromIcon className="w-4 h-4 ml-0.5" />
            </div>
          )}
        </CardList.ListItem>
        <CardList.ListItem
          title="Output Amount"
          titleClassNames="text-sm"
          testId="SwapCard.CardList.OutputAmount"
        >
          {swap.to === undefined ? (
            "N/A"
          ) : (
            <div className="flex items-center justify-end">
              <NumericFormat
                value={swap.to.amount}
                fixedDecimalScale
                thousandSeparator=","
                displayType="text"
              />
              <ToIcon className="w-4 h-4 ml-0.5" />
            </div>
          )}
        </CardList.ListItem>
        <CardList.ListItem
          title="From"
          titleClassNames="text-sm"
          testId="SwapCard.CardList.From"
        >
          {swap.from === undefined ? (
            "N/A"
          ) : (
            <AddressLink address={swap.from.address}>
              <TextTruncate text={swap.from.address} className="w-44" />
            </AddressLink>
          )}
        </CardList.ListItem>
        <CardList.ListItem
          title="To"
          titleClassNames="text-sm"
          testId="SwapCard.CardList.To"
        >
          {swap.to === undefined ? (
            "N/A"
          ) : (
            <AddressLink address={swap.to.address}>
              <TextTruncate text={swap.to.address} className="w-44" />
            </AddressLink>
          )}
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  );
}
