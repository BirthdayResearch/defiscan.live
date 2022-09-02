import {
  DfTx,
  PaybackLoan,
  TokenBalance,
} from "@defichain/jellyfish-transaction";
import { useNetwork } from "@contexts/NetworkContext";
import { fromScript } from "@defichain/jellyfish-address";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { VaultLink } from "@components/commons/link/VaultLink";
import { AddressLink } from "@components/commons/link/AddressLink";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxPayBackLoanProps {
  dftx: DfTx<PaybackLoan>;
}

export function DfTxPayBackLoan(props: DfTxPayBackLoanProps): JSX.Element {
  const network = useNetwork().name;
  const address = fromScript(props.dftx.data.from, network);

  return (
    <div>
      <DfTxHeader name="Pay Back Loan" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Vault ID">
            <VaultLink
              vault={props.dftx.data.vaultId}
              className="break-all"
              testId="DfTxPayBackLoan.VaultId"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name={"Owner's Address"}>
            {(() => {
              if (address?.address !== undefined) {
                return (
                  <AddressLink
                    address={address?.address}
                    testId="DfTxPayBackLoan.OwnerAddress"
                    className="break-all"
                  />
                );
              }
              return "N/A";
            })()}
          </AdaptiveList.Row>
        </AdaptiveList>
        <AdaptiveList className="w-full lg:w-1/2">
          {props.dftx.data.tokenAmounts.map((amount) => (
            <LoanTokenAmounts amount={amount} key={amount.token} />
          ))}
        </AdaptiveList>
      </div>
    </div>
  );
}

function LoanTokenAmounts({ amount }: { amount: TokenBalance }): JSX.Element {
  return (
    <>
      <AdaptiveList.Row name="Token">
        <TokenSymbol tokenId={amount.token} testId="DfTxPayBackLoan.Token" />
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Amount" testId="DfTxPayBackLoan.Amount">
        {amount.amount.toFixed(8)}
      </AdaptiveList.Row>
    </>
  );
}
