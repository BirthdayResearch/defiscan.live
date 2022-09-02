import { AccountToAccount, DfTx } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { TokenBalance } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxAccountToAccountProps {
  dftx: DfTx<AccountToAccount>;
}

export function DfTxAccountToAccount(
  props: DfTxAccountToAccountProps
): JSX.Element {
  const network = useNetwork().name;
  const from = fromScript(props.dftx.data.from, network);

  return (
    <div>
      <DfTxHeader name="Account To Account" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <FromTable fromAddress={from?.address} />
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
                    testId="DfTxAccountToAccount.to"
                  />
                </AdaptiveList.Row>
                {scriptBalances.balances.map((balance) => {
                  return (
                    <BalanceRow
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

function FromTable(props: { fromAddress?: string }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name="From">
        {(() => {
          if (props.fromAddress !== undefined) {
            return (
              <AddressLink
                address={props.fromAddress}
                testId="DfTxAccountToAccount.fromAddress"
              />
            );
          }
          return "N/A";
        })()}
      </AdaptiveList.Row>
    </AdaptiveList>
  );
}

function BalanceRow(props: { balance: TokenBalance }): JSX.Element {
  return (
    <>
      <AdaptiveList.Row name="Token">
        <div className="flex flex-row">
          <TokenSymbol
            tokenId={props.balance.token}
            className="ml-1"
            testId="DfTxAccountToAccount.toSymbol"
          />
        </div>
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Amount">
        <div className="flex flex-row">
          <span data-testid="DfTxAccountToAccount.toAmount">
            {props.balance.amount.toFixed(8)}
          </span>
        </div>
      </AdaptiveList.Row>
    </>
  );
}
