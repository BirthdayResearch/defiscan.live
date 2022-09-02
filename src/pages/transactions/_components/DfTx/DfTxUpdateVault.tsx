import { DfTx, UpdateVault } from "@defichain/jellyfish-transaction";
import { useNetwork } from "@contexts/NetworkContext";
import { fromScript } from "@defichain/jellyfish-address";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { AddressLink } from "@components/commons/link/AddressLink";
import { Link } from "@components/commons/link/Link";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import React from "react";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxUpdateVaultProps {
  dftx: DfTx<UpdateVault>;
}

export function DfTxUpdateVault(props: DfTxUpdateVaultProps): JSX.Element {
  const network = useNetwork().name;
  const ownerAddress = fromScript(props.dftx.data.ownerAddress, network);

  return (
    <div>
      <DfTxHeader name="Update Vault" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Vault ID">
            <Link href={{ pathname: `/vaults/${props.dftx.data.vaultId}` }}>
              <a className="content">
                <TextTruncate
                  text={props.dftx.data.vaultId}
                  className="text-blue-500 hover:underline"
                  testId="DfTxUpdateVault.VaultID"
                />
              </a>
            </Link>
          </AdaptiveList.Row>
          <AdaptiveList.Row name={"Owner's Address"}>
            {(() => {
              if (ownerAddress != null) {
                return (
                  <AddressLink
                    address={ownerAddress.address}
                    testId="DfTxUpdateVault.OwnersAddress"
                    className="break-all"
                  />
                );
              }
              return "N/A";
            })()}
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Scheme ID" testId="DfTxUpdateVault.SchemeId">
            {(() => {
              if (props.dftx.data.schemeId !== "") {
                return props.dftx.data.schemeId;
              }
              return "N/A";
            })()}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
