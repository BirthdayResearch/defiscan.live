import { DepositToVault, DfTx } from "@defichain/jellyfish-transaction";
import { useNetwork } from "@contexts/NetworkContext";
import { fromScript } from "@defichain/jellyfish-address";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { AddressLink } from "@components/commons/link/AddressLink";
import { VaultLink } from "@components/commons/link/VaultLink";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { DfTxHeader } from "./DfTxHeader";

interface DepositToVaultProps {
  dftx: DfTx<DepositToVault>;
}

export function DfTxDepositToVault(props: DepositToVaultProps): JSX.Element {
  const network = useNetwork().name;
  const address = fromScript(props.dftx.data.from, network);
  return (
    <div>
      <DfTxHeader name="Deposit To Vault" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Vault ID">
            <VaultLink
              vault={props.dftx.data.vaultId}
              className="break-all"
              testId="DfTxDepositToVault.VaultId"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Address">
            {(() => {
              if (address?.address !== undefined) {
                return (
                  <AddressLink
                    testId="DfTxDepositToVault.Address"
                    address={address.address}
                    className="break-all"
                  />
                );
              }
              return "N/A";
            })()}
          </AdaptiveList.Row>
        </AdaptiveList>
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Token" testId="DfTxDepositToVault.Token">
            <TokenSymbol
              tokenId={props.dftx.data.tokenAmount.token}
              testId="DfTxDepositToVault.TokenSymbol"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Amount" testId="DfTxDepositToVault.Amount">
            {props.dftx.data.tokenAmount.amount.toFixed(8)}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
