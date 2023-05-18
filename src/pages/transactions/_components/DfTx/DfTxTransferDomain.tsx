import { TransferDomain, DfTx } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { TokenBalance } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxTransferDomainProps {
  dftx: DfTx<TransferDomain>;
}

function getTransferDomainType(type: number): string {
  switch (type) {
    case 1:
      return "DVM token to EVM";
    case 2:
      return "EVM to DVM token";
    default:
      return "";
  }
}

export function DfTxTransferDomain(
  props: DfTxTransferDomainProps
): JSX.Element {
  const network = useNetwork().name;
  return (
    <div>
      <DfTxHeader
        name={`Transfer Domain: ${getTransferDomainType(props.dftx.data.type)}`}
      />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          {props.dftx.data.from.map((scriptBalances) => {
            const scriptFromAddress =
              fromScript(scriptBalances.script, network)?.address ?? "N/A";
            return (
              <AdaptiveList key={`from-${scriptFromAddress}`} className="mb-1">
                <AdaptiveList.Row name="From">
                  <AddressLink
                    address={scriptFromAddress}
                    testId="DfTxTransferDomain.from"
                  />
                </AdaptiveList.Row>

                {scriptBalances.balances.map((balance) => {
                  return (
                    <BalanceRow
                      testId="from"
                      balance={balance}
                      key={`${balance.amount.toFixed(8)}-${balance.token}`}
                    />
                  );
                })}
              </AdaptiveList>
            );
          })}
        </div>
        <div className="w-full lg:w-1/2">
          {props.dftx.data.to.map((scriptBalances) => {
            const toAddress =
              fromScript(scriptBalances.script, network)?.address ?? "N/A";
            return (
              <AdaptiveList key={toAddress} className="mb-1">
                <AdaptiveList.Row name="To">
                  <AddressLink
                    address={toAddress}
                    testId="DfTxTransferDomain.to"
                  />
                </AdaptiveList.Row>
                {scriptBalances.balances.map((balance) => {
                  return (
                    <BalanceRow
                      testId="to"
                      balance={balance}
                      key={`${balance.amount.toFixed(8)}-${balance.token}`}
                    />
                  );
                })}
              </AdaptiveList>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BalanceRow(props: {
  balance: TokenBalance;
  testId: string;
}): JSX.Element {
  return (
    <>
      <AdaptiveList.Row name="Token">
        <div className="flex flex-row">
          <TokenSymbol
            tokenId={props.balance.token}
            testId={`DfTxTransferDomain.${props.testId}Symbol`}
          />
        </div>
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Amount">
        <div className="flex flex-row">
          <span data-testid={`DfTxTransferDomain.${props.testId}Amount`}>
            {props.balance.amount.toFixed(8)}
          </span>
        </div>
      </AdaptiveList.Row>
    </>
  );
}
