import { DfTx, TransferDomain } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { getDecodedAddress } from "@waveshq/walletkit-core";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { TokenBalance } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxTransferDomainProps {
  dftx: DfTx<TransferDomain>;
}

export function DfTxTransferDomain(
  props: DfTxTransferDomainProps
): JSX.Element {
  const network = useNetwork().name;
  const { items } = props.dftx.data;
  return (
    <div>
      <DfTxHeader name="Transfer Domain" />
      <div className="mt-5 space-y-10">
        {items.map(({ src, dst }, index) => {
          const fromAddress =
            getDecodedAddress(src.address, network)?.address ?? "N/A";
          const toAddress =
            getDecodedAddress(dst.address, network)?.address ?? "N/A";
          return (
            <div
              className="flex flex-col space-y-6 items-center lg:flex-row lg:space-x-8 lg:space-y-0"
              key={`domain-txn-${index}`}
            >
              <div className="w-full lg:w-1/2">
                <AdaptiveList className="mb-1">
                  <AdaptiveList.Row name="From">
                    <AddressLink
                      address={fromAddress}
                      testId="DfTxTransferDomain.from"
                    />
                  </AdaptiveList.Row>
                  <BalanceRow
                    testId={`BalanceFromRow-${index}`}
                    balance={src.amount}
                  />
                </AdaptiveList>
              </div>
              <div className="flex items-center justify-center text-gray-600 w-full lg:w-auto">
                <IoArrowForwardOutline
                  className="transform rotate-90 lg:rotate-0"
                  size={24}
                />
              </div>
              <div className="w-full lg:w-1/2">
                <AdaptiveList className="mb-1">
                  <AdaptiveList.Row name="To">
                    <AddressLink
                      address={toAddress}
                      testId="DfTxTransferDomain.to"
                    />
                  </AdaptiveList.Row>
                  <BalanceRow
                    testId={`BalanceToRow-${index}`}
                    balance={dst.amount}
                  />
                </AdaptiveList>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BalanceRow(props: {
  balance: TokenBalance;
  testId: string;
}): JSX.Element {
  return (
    <AdaptiveList.Row name="Amount">
      <div className="flex flex-row">
        <span data-testid={`DfTxTransferDomain.${props.testId}Amount`}>
          {props.balance.amount.toFixed(8)}
        </span>
        <TokenSymbol
          tokenId={props.balance.token}
          testId={`DfTxTransferDomain.${props.testId}Symbol`}
          className="ml-2"
        />
      </div>
    </AdaptiveList.Row>
  );
}
