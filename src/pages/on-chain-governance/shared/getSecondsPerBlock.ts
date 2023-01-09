import { NetworkConnection } from "@contexts/NetworkContext";

export function getSecondsPerBlock(network: NetworkConnection): number {
  return network === NetworkConnection.MainNet ||
    network === NetworkConnection.TestNet
    ? 30
    : 3;
}
