import { getEnvironment } from "@contexts/Environment";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext } from "react";
import {
  Network as NetworkObject,
  getNetwork,
} from "@defichain/jellyfish-network";

/**
 * What connection is DeFi Scan connected to.
 * This is different from NetworkName, and should not be used as NetworkName.
 */
export enum NetworkConnection {
  LocalPlayground = "Local",
  RemotePlayground = "Playground",
  MainNet = "MainNet",
  TestNet = "TestNet",
}

export type NetworkName = NetworkObject["name"];

export interface NetworkContextObject extends NetworkObject {
  connection: NetworkConnection;
}

const NetworkContext = createContext<NetworkContextObject>(undefined as any);

export function useNetwork(): NetworkContextObject {
  return useContext(NetworkContext);
}

export function NetworkProvider(
  props: PropsWithChildren<any>
): JSX.Element | null {
  const router = useRouter();
  const env = getEnvironment();
  const connection = env.resolveConnection(router.query.network);

  return (
    <NetworkContext.Provider value={mapNetworkObject(connection)}>
      {props.children}
    </NetworkContext.Provider>
  );
}

function mapNetworkObject(connection: NetworkConnection): NetworkContextObject {
  switch (connection) {
    case NetworkConnection.MainNet:
      return { connection: connection, ...getNetwork("mainnet") };
    case NetworkConnection.TestNet:
      return { connection: connection, ...getNetwork("testnet") };
    case NetworkConnection.RemotePlayground:
    case NetworkConnection.LocalPlayground:
      return { connection: connection, ...getNetwork("regtest") };
    default:
      throw new Error(`${connection as string} network not found`);
  }
}
