import { DfTx, TokenUpdateAny } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import BigNumber from "bignumber.js";
import { getAssetIcon, getTokenIcon } from "@components/icons/assets/tokens";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxTokenUpdateAnyProps {
  dftx: DfTx<TokenUpdateAny>;
}

export function DfTxTokenUpdateAny(
  props: DfTxTokenUpdateAnyProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Token Update Any" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <DetailsTable
          creationTx={props.dftx.data.creationTx}
          symbol={props.dftx.data.symbol}
          decimal={props.dftx.data.decimal}
          name={props.dftx.data.name}
          limit={props.dftx.data.limit}
          isDAT={props.dftx.data.isDAT}
          tradeable={props.dftx.data.tradeable}
          mintable={props.dftx.data.mintable}
        />
      </div>
    </div>
  );
}

function DetailsTable(props: {
  creationTx: string;
  symbol: string;
  decimal: number;
  name: string;
  limit: BigNumber;
  isDAT: boolean;
  tradeable: boolean;
  mintable: boolean;
}): JSX.Element {
  return (
    <>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="Creation Tx">
          <TxIdLink
            txid={props.creationTx}
            testId="DfTxTokenUpdateAny.CreationTx"
            className="break-all"
          />
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Name" testId="DfTxTokenUpdateAny.name">
          {props.name}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Symbol" testId="DfTxTokenUpdateAny.symbol">
          <div className="flex">
            {props.symbol}
            {(() => {
              if (props.isDAT) {
                const AssetIcon = getAssetIcon(props.symbol);
                return <AssetIcon className="h-6 w-6 ml-1" />;
              }

              const TokenIcon = getTokenIcon(props.symbol);
              return <TokenIcon className="h-6 w-6 ml-1" />;
            })()}
          </div>
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="Decimal" testId="DfTxTokenUpdateAny.decimal">
          {props.decimal}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Limit" testId="DfTxTokenUpdateAny.limit">
          {props.limit.toFixed(8)}
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Tradeable"
          className="capitalize"
          testId="DfTxTokenUpdateAny.Tradeable"
        >
          {props.tradeable.toString()}
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Mintable"
          className="capitalize"
          testId="DfTxTokenUpdateAny.Mintable"
        >
          {props.mintable.toString()}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  );
}
