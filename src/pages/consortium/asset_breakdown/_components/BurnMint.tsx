import { TextAreaComponent } from "pages/on-chain-governance/_components/TextAreaComponent";
import {
  MnemonicHdNodeProvider,
  MnemonicProviderData,
} from "@defichain/jellyfish-wallet-mnemonic";
import {
  JellyfishWallet,
  WalletHdNode,
  WalletHdNodeProvider,
} from "@defichain/jellyfish-wallet";
import { WhaleApiClient } from "@defichain/whale-api-client";
import {
  WhaleWalletAccount,
  WhaleWalletAccountProvider,
} from "@defichain/whale-api-wallet";
import {
  EnvironmentNetwork,
  getBip32Option,
  getJellyfishNetwork,
} from "@waveshq/walletkit-core";
import {
  WalletPersistenceDataI,
  WalletType,
  usePlaygroundContext,
} from "@waveshq/walletkit-ui";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import BigNumber from "bignumber.js";
import { CTransactionSegWit } from "@defichain/jellyfish-transaction/dist";
import { useCallback, useEffect } from "react";

function initJellyfishWallet<HdNode extends WalletHdNode>(
  provider: WalletHdNodeProvider<HdNode>,
  network: EnvironmentNetwork,
  client: WhaleApiClient
): JellyfishWallet<WhaleWalletAccount, HdNode> {
  const accountProvider = new WhaleWalletAccountProvider(
    client,
    getJellyfishNetwork(network)
  );
  return new JellyfishWallet(provider, accountProvider);
}

function initProvider(
  data: WalletPersistenceDataI<MnemonicProviderData>,
  network: EnvironmentNetwork
): MnemonicHdNodeProvider {
  if (data.type !== WalletType.MNEMONIC_UNPROTECTED || data.version !== "v1") {
    throw new Error("Unexpected WalletPersistenceDataI");
  }

  const options = getBip32Option(network);
  return MnemonicHdNodeProvider.fromData(data.raw, options);
}

function toData(
  mnemonic: string[],
  network: EnvironmentNetwork
): WalletPersistenceDataI<MnemonicProviderData> {
  const options = getBip32Option(network);
  const data = MnemonicHdNodeProvider.wordsToData(mnemonic, options);

  return {
    version: "v1",
    type: WalletType.MNEMONIC_UNPROTECTED,
    raw: data,
  };
}

export function BurnMint(): JSX.Element {
  const data = toData(
    "avoid between cupboard there nerve sugar quote foot broom intact seminar culture much anger hold rival moral silly volcano fog service decline tortoise combine".split(
      " "
    ),
    EnvironmentNetwork.RemotePlayground
  );

  const provider = initProvider(data, EnvironmentNetwork.RemotePlayground);
  const whaleApiClient = useWhaleApiClient();
  const account = initJellyfishWallet(
    provider,
    EnvironmentNetwork.RemotePlayground,
    whaleApiClient
  ).get(1);

  const fetchFromAPI = useCallback(async () => {
    const address = await account.getAddress();
    console.log({ address });

    async function signer(
      account: WhaleWalletAccount
    ): Promise<CTransactionSegWit> {
      const builder = account.withTransactionBuilder();
      const script = await account.getScript();
      const dfTx = await builder.tokens.burn(
        {
          from: script,
          amounts: [{ token: 4, amount: new BigNumber(100000) }],
          burnType: 0,
          variantContext: {
            variant: 0,
            context: {
              stack: [],
            },
          },
        },
        script
      );

      return new CTransactionSegWit(dfTx);
    }
    return await signer(account);
  }, []);

  return (
    <div className="w-1/2">
      <div className="flex flex-row text-gray-900 dark:text-dark-gray-900">
        {/* <TextAreaComponent
          label="Token Name"
          placeholder=""
          note=""
          value="hey"
          error=""
          isVisited={false}
          onBlur={() => {}}
          onChange={() => {}}
        /> */}
      </div>
      <button
        type="button"
        onClick={async () => {
          try {
            const test = await fetchFromAPI();
            console.log({ test });
          } catch (e: any) {
            console.log({ e, message: e.message });
            throw e;
          }
        }}
        className="w-48 py-2.5 text-primary-300 hover:text-primary-500 border border-primary-200 hover:border-primary-500 rounded"
      >
        Burn
      </button>
    </div>
  );
}
