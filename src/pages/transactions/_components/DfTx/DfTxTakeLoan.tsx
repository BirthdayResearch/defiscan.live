import { DfTx, TakeLoan } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { VaultLink } from "@components/commons/link/VaultLink";
import { AddressLink } from "@components/commons/link/AddressLink";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxTakeLoanProps {
  dftx: DfTx<TakeLoan>;
}

export function DfTxTakeLoan(props: DfTxTakeLoanProps): JSX.Element {
  const address = fromScript(props.dftx.data.to, useNetwork().name);

  return (
    <>
      <DfTxHeader name={props.dftx.name} />
      <AdaptiveList className="mt-5 w-full lg:w-1/2">
        <AdaptiveList.Row name="Vault ID">
          <VaultLink
            className="break-all"
            vault={props.dftx.data.vaultId}
            testId="DfTxTakeLoan.VaultId"
          />
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Address To">
          {(() => {
            if (address?.address !== undefined) {
              return (
                <AddressLink
                  address={address.address}
                  className="break-all"
                  testId="DfTxTakeLoan.Address"
                />
              );
            }
            return "NA";
          })()}
        </AdaptiveList.Row>
        {props.dftx.data.tokenAmounts.map((tokenData, i) => (
          <AdaptiveList.Row name="Amount" key={`token-amounts-${i}`}>
            <div className="flex flex-row">
              <span data-testid={`DfTxTakeLoan.toAmount-${i}`}>
                {tokenData.amount.toFixed(8)}
              </span>
              <TokenSymbol
                tokenId={tokenData.token}
                className="ml-1"
                testId={`DfTxTakeLoan.toSymbol-${i}`}
              />
            </div>
          </AdaptiveList.Row>
        ))}
      </AdaptiveList>
    </>
  );
}
