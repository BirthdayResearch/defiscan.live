import { AdaptiveList } from "@components/commons/AdaptiveList";
import BigNumber from "bignumber.js";
import { AddressAggregation } from "@defichain/whale-api-client/dist/api/address";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { AddressType } from "@waveshq/walletkit-core";
import { WalletAddressInfoI, useGetEVMBalanceMutation } from "@store/metachain";
import { useNetwork } from "@contexts/NetworkContext";

interface AddressSummaryTableProps {
  address: string;
  addressType: AddressType;
}

export function AddressSummaryTable(
  props: AddressSummaryTableProps
): JSX.Element {
  const api = useWhaleApiClient();
  const { connection } = useNetwork();

  const [aggregationData, setAggregationData] = useState<
    AddressAggregation | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState(new BigNumber(0));
  const [fetchEVMBalance] = useGetEVMBalanceMutation();

  function getAggregation(): void {
    // reset balance
    setBalance(new BigNumber(0));
    setIsLoading(true);
    api.address
      .getAggregation(props.address)
      .then((data: AddressAggregation) => {
        setAggregationData(data);
      })
      .catch(() => {
        setAggregationData(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getEVMBalance(): void {
    setIsLoading(true);
    fetchEVMBalance({ address: props.address, network: connection })
      .then(({ data }: { data: WalletAddressInfoI }) => {
        setBalance(
          new BigNumber(data?.coin_balance ?? 0).dividedBy(
            new BigNumber(10).pow(18)
          )
        );
      })
      .catch(() => {
        setBalance(new BigNumber(0));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (props.addressType === AddressType.ETH) {
      return getEVMBalance();
    }
    getAggregation();
  }, [props.address]);

  if (isLoading) {
    return <LoadingPanel />;
  }

  if (aggregationData === undefined) {
    return (
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <AdaptiveList>
            <AdaptiveList.Row
              name="Balance"
              className="text-left"
              testId="AddressSummaryTable.balance"
            >
              <NumericFormat
                value={new BigNumber(balance ?? 0).toFixed(8)}
                thousandSeparator
                displayType="text"
                suffix=" DFI"
              />
            </AdaptiveList.Row>
          </AdaptiveList>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
      <div className="w-full lg:w-1/2">
        <AdaptiveList>
          <AdaptiveList.Row
            name="UTXO Balance"
            className="text-left"
            testId="AddressSummaryTable.utxoBalance"
            infoDesc="DFI in UTXO form is the primary form of DFI. It is used for core cryptocurrency purposes such as send, receive and fees."
          >
            {new BigNumber(aggregationData.amount.unspent).toFixed(8)} DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="Total Sent"
            className="text-left"
            testId="AddressSummaryTable.totalSent"
          >
            <NumericFormat
              value={new BigNumber(aggregationData.amount.txOut).toFixed(8)}
              thousandSeparator
              displayType="text"
              suffix=" DFI"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="Total Received"
            className="text-left"
            testId="AddressSummaryTable.totalReceived"
          >
            <NumericFormat
              value={new BigNumber(aggregationData.amount.txIn).toFixed(8)}
              thousandSeparator
              displayType="text"
              suffix=" DFI"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="No. of Transaction"
            className="text-left"
            testId="AddressSummaryTable.txCount"
          >
            {aggregationData.statistic.txCount}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}

function LoadingPanel(): JSX.Element {
  return (
    <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
      <div className="w-full lg:w-1/2">
        <div className="flex flex-wrap w-full rounded border border-gray-200">
          <div className="flex w-full flex-wrap space-x-2 border-b border-gray-100 p-4">
            <div className="w-14 animate-pulse py-2.5 rounded-md bg-gray-200" />
            <div className="w-3/4 animate-pulse py-2.5 rounded-md bg-gray-200" />
          </div>
          <div className="flex w-full flex-wrap space-x-2 border-b border-gray-100 p-4">
            <div className="w-14 animate-pulse py-2.5 rounded-md bg-gray-200" />
            <div className="w-3/5 animate-pulse py-2.5 rounded-md bg-gray-200" />
          </div>
          <div className="flex w-full flex-wrap space-x-2 border-b border-gray-100 p-4">
            <div className="w-14 animate-pulse py-2.5 rounded-md bg-gray-200" />
            <div className="w-4/5 animate-pulse py-2.5 rounded-md bg-gray-200" />
          </div>
          <div className="flex w-full flex-wrap space-x-2 p-4">
            <div className="w-14 animate-pulse py-2.5 rounded-md bg-gray-200" />
            <div className="w-1/2 animate-pulse py-2.5 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
