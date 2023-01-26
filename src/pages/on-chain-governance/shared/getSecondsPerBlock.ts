import { EnvironmentNetwork, isPlayground } from "@waveshq/walletkit-core";

export function getSecondsPerBlock(network: EnvironmentNetwork): number {
  return isPlayground(network) ? 30 : 3;
}
