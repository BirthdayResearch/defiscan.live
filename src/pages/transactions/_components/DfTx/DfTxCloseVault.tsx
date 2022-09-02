import { CloseVault, DfTx } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { useNetwork } from "@contexts/NetworkContext";
import { fromScript } from "@defichain/jellyfish-address";
import { VaultLink } from "@components/commons/link/VaultLink";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxCloseVaultProps {
  dftx: DfTx<CloseVault>;
}

export function DfTxCloseVault(props: DfTxCloseVaultProps): JSX.Element {
  const network = useNetwork().name;
  const address = fromScript(props.dftx.data.to, network);

  return (
    <div>
      <DfTxHeader name="Close Vault" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Vault ID">
            <VaultLink
              vault={props.dftx.data.vaultId}
              className="break-all"
              testId="DfTxCloseVault.VaultId"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Address">
            {(() => {
              if (address?.address !== undefined) {
                return (
                  <AddressLink
                    address={address.address}
                    className="break-all"
                    testId="DfTxCloseVault.Address"
                  />
                );
              }
            })()}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
