import { EnvironmentNetwork } from "@waveshq/walletkit-core";

export function getNetworkParams(network: EnvironmentNetwork): string {
  switch (network) {
    case EnvironmentNetwork.MainNet:
      // no-op: network param not required for MainNet
      return "";
    case EnvironmentNetwork.TestNet:
      return `?network=${EnvironmentNetwork.TestNet}`;
    case EnvironmentNetwork.DevNet:
      return `?network=${EnvironmentNetwork.DevNet}`;

    case EnvironmentNetwork.LocalPlayground:
    case EnvironmentNetwork.RemotePlayground:
      return `?network=${EnvironmentNetwork.RemotePlayground}`;
    case EnvironmentNetwork.Changi:
      return `?network=${EnvironmentNetwork.Changi}`;
    default:
      return "";
  }
}

const baseMetaScanUrl = "https://meta.defiscan.live";

export function getMetaScanBlockUrl(
  network: EnvironmentNetwork,
  id?: string | null,
): string {
  const networkParams = getNetworkParams(network);
  return `${baseMetaScanUrl}/block/${id}${networkParams}`;
}

export function getMetaScanTxUrl(
  network: EnvironmentNetwork,
  id?: string | null,
): string {
  const networkParams = getNetworkParams(network);
  return `${baseMetaScanUrl}/tx/${id}${networkParams}`;
}
