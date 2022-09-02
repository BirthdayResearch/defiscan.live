import BigNumber from "bignumber.js";
import { DfTx, PoolRemoveLiquidity } from "@defichain/jellyfish-transaction";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxPoolRemoveLiquidityProps {
  dftx: DfTx<PoolRemoveLiquidity>;
}

export function DfTxPoolRemoveLiquidity(
  props: DfTxPoolRemoveLiquidityProps
): JSX.Element {
  const network = useNetwork().name;
  const address = fromScript(props.dftx.data.script, network)?.address;

  return (
    <div>
      <DfTxHeader name="Pool Remove Liquidity" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <PoolRemoveLiquidityTable
          amount={props.dftx.data.amount}
          address={address}
          tokenId={props.dftx.data.tokenId}
        />
      </div>
    </div>
  );
}

function PoolRemoveLiquidityTable(props: {
  address?: string;
  amount: BigNumber;
  tokenId: number;
}): JSX.Element {
  return (
    <AdaptiveList className="w-full lg:w-1/2">
      <AdaptiveList.Row name="Address">
        {(() => {
          if (props.address !== undefined) {
            return (
              <AddressLink
                address={props.address}
                testId="DfTxPoolRemoveLiquidity.Address"
                className="break-all"
              />
            );
          }
          return "N/A";
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Token">
        <TokenSymbol
          tokenId={props.tokenId}
          testId="DfTxPoolRemoveLiquidity.Symbol"
        />
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Amount">
        <span data-testid="DfTxPoolRemoveLiquidity.Amount">
          {props.amount.toFixed(8)}
        </span>
      </AdaptiveList.Row>
    </AdaptiveList>
  );
}
