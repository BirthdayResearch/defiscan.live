import { DfTx, TokenCreate } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import BigNumber from "bignumber.js";
import { getAssetIcon, getTokenIcon } from "@components/icons/assets/tokens";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxTokenCreateProps {
  dftx: DfTx<TokenCreate>;
}

export function DfTxTokenCreate(props: DfTxTokenCreateProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Token Create" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <DetailsTable
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
        <AdaptiveList.Row name="Name" testId="DfTxTokenCreate.name">
          {props.name}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Symbol" testId="DfTxTokenCreate.symbol">
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
        <AdaptiveList.Row name="Decimal" testId="DfTxTokenCreate.decimal">
          {props.decimal}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Limit" testId="DfTxTokenCreate.limit">
          {props.limit.toFixed(8)}
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Tradeable"
          className="capitalize"
          testId="DfTxTokenCreate.Tradeable"
        >
          {props.tradeable.toString()}
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Mintable"
          className="capitalize"
          testId="DfTxTokenCreate.Mintable"
        >
          {props.mintable.toString()}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  );
}
