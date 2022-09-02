import { DfTx, UtxosToAccount } from "@defichain/jellyfish-transaction";
import { fromScript } from "@defichain/jellyfish-address";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { TokenBalance } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxUtxoToAccountProps {
  dftx: DfTx<UtxosToAccount>;
}

export function DfTxUtxosToAccount(props: DfTxUtxoToAccountProps): JSX.Element {
  const network = useNetwork().name;

  return (
    <div>
      <DfTxHeader name="Utxos To Account" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full grid gap-2 grid-cols-1 lg:grid-cols-2">
          {props.dftx.data.to.map((scriptBalances) => {
            const toAddress =
              fromScript(scriptBalances.script, network)?.address ?? "N/A";
            return (
              <AdaptiveList key={toAddress}>
                <AdaptiveList.Row name="To">
                  <AddressLink
                    address={toAddress}
                    testId="DfTxUtxosToAccount.to"
                  />
                </AdaptiveList.Row>
                {scriptBalances.balances.map((balance) => {
                  return (
                    <UtxosToAccountList
                      balance={balance}
                      key={`${toAddress}-${balance.token}`}
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

function UtxosToAccountList(props: { balance: TokenBalance }): JSX.Element {
  return (
    <AdaptiveList.Row name="Amount">
      <div className="flex flex-row">
        <span data-testid="DfTxUtxosToAccount.toAmount">
          {props.balance.amount.toFixed(8)}
        </span>
        <TokenSymbol
          tokenId={props.balance.token}
          className="ml-1"
          testId="DfTxUtxosToAccount.toSymbol"
        />
      </div>
    </AdaptiveList.Row>
  );
}
