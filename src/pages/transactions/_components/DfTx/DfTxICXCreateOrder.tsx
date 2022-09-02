import { DfTx, ICXCreateOrder } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import BigNumber from "bignumber.js";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxICXCreateOrderProps {
  dftx: DfTx<ICXCreateOrder>;
}

export function DfTxICXCreateOrder(
  props: DfTxICXCreateOrderProps
): JSX.Element {
  const network = useNetwork().name;
  const ownerAddress = fromScript(props.dftx.data.ownerAddress, network);

  return (
    <div>
      <DfTxHeader name="ICX Create Order" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <DetailsTable
          tokenId={props.dftx.data.tokenId}
          amountFrom={props.dftx.data.amountFrom}
          amountToFill={props.dftx.data.amountToFill}
          orderPrice={props.dftx.data.orderPrice}
          orderType={props.dftx.data.orderType}
          ownerAddress={ownerAddress?.address}
          expiry={props.dftx.data.expiry}
        />
      </div>
    </div>
  );
}

function DetailsTable(props: {
  orderType: number;
  tokenId: number;
  ownerAddress?: string;
  receivePubkey?: string;
  amountFrom: BigNumber;
  amountToFill: BigNumber;
  orderPrice: BigNumber;
  expiry: number;
}): JSX.Element {
  return (
    <>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="Token">
          <TokenSymbol
            tokenId={props.tokenId}
            testId="DfTxICXCreateOrder.token"
          />
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Amount From"
          testId="DfTxICXCreateOrder.amountFrom"
        >
          {props.amountFrom.toFixed(8)}
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Amount To Fill"
          testId="DfTxICXCreateOrder.amountToFill"
        >
          {props.amountToFill.toFixed(8)}
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Order Type"
          testId="DfTxICXCreateOrder.orderType"
        >
          {props.orderType === 1 ? "Internal" : "External"}
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Order Price"
          testId="DfTxICXCreateOrder.orderPrice"
        >
          {props.orderPrice.toFixed(8)}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Expiry" testId="DfTxICXCreateOrder.expiry">
          {`${props.expiry} Blocks`}
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="Owner Address">
          {(() => {
            if (props.ownerAddress !== undefined) {
              return (
                <AddressLink
                  address={props.ownerAddress}
                  testId="DfTxICXCreateOrder.ownerAddress"
                />
              );
            }
            return "N/A";
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Pubkey" testId="DfTxICXCreateOrder.pubkey">
          {props.receivePubkey ?? "N/A"}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  );
}
