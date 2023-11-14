import { AnyAccountToAccount, DfTx } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { TokenBalance } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxAnyAccountToAccountProps {
  dftx: DfTx<AnyAccountToAccount>;
}

export function DfTxAnyAccountToAccount(
  props: DfTxAnyAccountToAccountProps
): JSX.Element {
  const network = useNetwork().name;

  return (
    <div>
      <DfTxHeader name="Any Account To Account" />
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
                    testId="DfTxAnyAccountToAccount.from"
                  />
                </AdaptiveList.Row>

                {scriptBalances.balances.map((balance) => {
                  return (
                    <FromAmountRow
                      balance={balance}
                      key={`from-${balance.amount.toFixed(8)}-${balance.token}`}
                    />
                  );
                })}
              </AdaptiveList>
            );
          })}
        </div>
        <div className="w-full lg:w-1/2">
          {props.dftx.data.to.map((scriptBalances) => {
            const scriptToAddress =
              fromScript(scriptBalances.script, network)?.address ?? "N/A";
            return (
              <AdaptiveList key={`to-${scriptToAddress}`} className="mb-1">
                <AdaptiveList.Row name="To">
                  <AddressLink
                    address={scriptToAddress}
                    testId="DfTxAnyAccountToAccount.to"
                  />
                </AdaptiveList.Row>
                {scriptBalances.balances.map((balance) => {
                  return (
                    <ToAmountRow
                      balance={balance}
                      key={`to-${balance.amount.toFixed(8)}-${balance.token}`}
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

function FromAmountRow(props: { balance: TokenBalance }): JSX.Element {
  return (
    <AdaptiveList.Row name="Amount">
      <div className="flex flex-row">
        <span data-testid="DfTxAnyAccountToAccount.fromAmount">
          {props.balance.amount.toFixed(8)}
        </span>
        <TokenSymbol
          tokenId={props.balance.token}
          className="ml-1"
          testId="DfTxAnyAccountToAccount.fromSymbol"
        />
      </div>
    </AdaptiveList.Row>
  );
}

function ToAmountRow(props: { balance: TokenBalance }): JSX.Element {
  return (
    <AdaptiveList.Row name="Amount">
      <div className="flex flex-row">
        <span data-testid="DfTxAnyAccountToAccount.toAmount">
          {props.balance.amount.toFixed(8)}
        </span>
        <TokenSymbol
          tokenId={props.balance.token}
          className="ml-1"
          testId="DfTxAnyAccountToAccount.toSymbol"
        />
      </div>
    </AdaptiveList.Row>
  );
}
