import { DfTx, WithdrawFromVault } from "@defichain/jellyfish-transaction";

import { AdaptiveList } from "@components/commons/AdaptiveList";
import { VaultLink } from "@components/commons/link/VaultLink";
import { AddressLink } from "@components/commons/link/AddressLink";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxWithdrawFromVaultProps {
  dftx: DfTx<WithdrawFromVault>;
}

export function DfTxWithdrawFromVault(
  props: DfTxWithdrawFromVaultProps
): JSX.Element {
  const toAddress = fromScript(props.dftx.data.to, useNetwork().name);

  return (
    <div>
      <DfTxHeader name="Withdraw From Vault" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Vault ID">
            <VaultLink
              className="break-all"
              vault={props.dftx.data.vaultId}
              testId="DfTxWithdrawFromVault.VaultId"
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name="Address">
            {(() => {
              if (toAddress?.address !== undefined) {
                return (
                  <AddressLink
                    address={toAddress.address}
                    className="break-all"
                    testId="DfTxWithdrawFromVault.Address"
                  />
                );
              }
              return "N/A";
            })()}
          </AdaptiveList.Row>
        </AdaptiveList>

        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Amount">
            <div className="flex flex-row">
              <span data-testid="DfTxWithdrawFromVault.Amount">
                {props.dftx.data.tokenAmount.amount.toFixed(8)}
              </span>
              <TokenSymbol
                tokenId={props.dftx.data.tokenAmount.token}
                className="ml-1"
                testId="DfTxWithdrawFromVault.AmountSymbol"
              />
            </div>
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
