import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";

export const metachainSlice = createApi({
  reducerPath: "metachain",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    getEVMBalance: builder.mutation<
      WalletAddressInfoI,
      { network: EnvironmentNetwork; address: string }
    >({
      query: ({ network, address }) => ({
        url: `${getBaseUrl(network)}/api/v2/addresses/${address}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEVMBalanceMutation } = metachainSlice;

export function getBaseUrl(network: EnvironmentNetwork): string {
  switch (network) {
    case EnvironmentNetwork.MainNet:
      return "https://blockscout.mainnet.ocean.jellyfishsdk.com";
    case EnvironmentNetwork.TestNet:
      return "https://blockscout.testnet.ocean.jellyfishsdk.com";
    case EnvironmentNetwork.Changi:
      return "https://blockscout.changi.ocean.jellyfishsdk.com";
    default:
      throw new Error("No api endpoint available");
  }
}

export interface WalletAddressInfoI {
  creator_address_hash: string;
  creation_tx_hash: string;
  token: WalletAddressTokenI;
  coin_balance: string;
  exchange_rate: string;
  implementation_address: string;
  block_number_balance_updated_at: number;
  hash: string;
  implementation_name: string;
  name: string;
  is_contract: boolean;
  private_tags: TagI[];
  watchlist_names: WatchlistNameI[];
  public_tags: TagI[];
  is_verified: boolean;
}

export interface TagI {
  address_hash: string;
  display_name: string;
  label: string;
}

export interface WatchlistNameI {
  display_name: string;
  label: string;
}

export interface WalletAddressTokenI {
  address: string;
  type: string;
  symbol: string;
  name: string;
  decimals: string;
  holders: string;
  exchange_rate: string;
  total_supply: string;
}
