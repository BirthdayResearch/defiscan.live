import { DfTx, PoolSwap } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import BigNumber from "bignumber.js";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { AddressLink } from "@components/commons/link/AddressLink";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { useEffect, useState } from "react";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import NumberFormat from "react-number-format";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxPoolSwapProps {
  dftx: DfTx<PoolSwap>;
  transaction?: Transaction;
}

export function DfTxPoolSwap(props: DfTxPoolSwapProps): JSX.Element {
  const network = useNetwork().name;
  const { transaction, dftx } = props;

  const from =
    dftx.data.fromScript !== undefined
      ? fromScript(dftx.data.fromScript, network)
      : undefined;
  const to =
    dftx.data.toScript !== undefined
      ? fromScript(dftx.data.toScript, network)
      : undefined;
  const [toAmount, setToAmount] = useState<string>();
  const api = useWhaleApiClient();

  useEffect(() => {
    getSwapToAmount().then(setToAmount);
  }, [transaction]);

  async function getSwapToAmount(): Promise<string | undefined> {
    if (transaction?.block && to !== undefined) {
      const toTokenId = dftx.data.toTokenId.toString();
      const toTokenDetails = await api.tokens.get(toTokenId);
      const accountHistory = await api.address.getAccountHistory(
        to?.address,
        transaction.block.height,
        transaction.order
      );
      return accountHistory?.amounts?.reduce((toAmount, current) => {
        const [amount, symbol] = current.split("@");
        if (toAmount === undefined && symbol === toTokenDetails.symbol) {
          return amount;
        }
        return toAmount;
      }, undefined);
    }
  }

  return (
    <div>
      <DfTxHeader name="Pool Swap" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <PoolSwapDetailsTable
          fromAddress={from?.address}
          fromTokenId={dftx.data.fromTokenId}
          fromAmount={dftx.data.fromAmount}
          toAddress={to?.address}
          toTokenId={dftx.data.toTokenId}
          maxPrice={dftx.data.maxPrice}
          toAmount={toAmount}
        />
      </div>
    </div>
  );
}

function PoolSwapDetailsTable(props: {
  fromAddress?: string;
  fromTokenId: number;
  fromAmount: BigNumber;
  toAddress?: string;
  toTokenId: number;
  maxPrice: BigNumber;
  toAmount?: string;
}): JSX.Element {
  return (
    <>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="From">
          {(() => {
            if (props.fromAddress !== undefined) {
              return (
                <AddressLink
                  address={props.fromAddress}
                  testId="DfTxPoolSwap.fromAddress"
                />
              );
            }
            return "N/A";
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Token">
          <TokenSymbol
            tokenId={props.fromTokenId}
            testId="DfTxPoolSwap.fromAmountSymbol"
          />
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Amount">
          <span data-testid="DfTxPoolSwap.fromAmount">
            {props.fromAmount.toFixed(8)}
          </span>
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="To">
          {(() => {
            if (props.toAddress !== undefined) {
              return (
                <AddressLink
                  address={props.toAddress}
                  testId="DfTxPoolSwap.toAddress"
                />
              );
            }
            return "N/A";
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Token">
          <TokenSymbol
            tokenId={props.toTokenId}
            testId="DfTxPoolSwap.maxPriceSymbol"
          />
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Max Price">
          <span data-testid="DfTxPoolSwap.maxPrice">
            {props.maxPrice.toFixed(8)}
          </span>
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Amount" testId="DfTxPoolSwap.toAmount">
          {props.toAmount === undefined ? (
            <div>pending</div>
          ) : (
            <NumberFormat
              value={new BigNumber(props.toAmount).toFixed(8)}
              thousandSeparator
              displayType="text"
            />
          )}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  );
}
