import { WhaleApiClient, WhaleRpcClient } from "@defichain/whale-api-client";
import { GetServerSidePropsContext } from "next";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { WhaleApiClientOptions } from "@defichain/whale-api-client/dist/whale.api.client";
import { getEnvironment } from "./Environment";
import { NetworkConnection, useNetwork } from "./NetworkContext";

const WhaleApiClientContext = createContext<WhaleApiClient>(undefined as any);
const WhaleRpcClientContext = createContext<WhaleRpcClient>(undefined as any);

/**
 * getWhaleApiClient from GetServerSidePropsContext.
 * @example
 * function getServerSideProps(context: GetServerSidePropsContext) {
 *   const client = getWhaleApiClient(context)
 * }
 *
 * @param {GetServerSidePropsContext} context to read from SSR
 * @return WhaleApiClient created from query string of GetServerSidePropsContext
 */
export function getWhaleApiClient(
  context: GetServerSidePropsContext
): WhaleApiClient {
  const network =
    context.query.network?.toString() ?? getEnvironment().networks[0];
  return newWhaleClient(newOceanOptions(network));
}

export function getWhaleRpcClient(
  context: GetServerSidePropsContext
): WhaleRpcClient {
  const network =
    context.query.network?.toString() ?? getEnvironment().networks[0];
  return newRpcClient(newOceanOptions(network));
}

export function useWhaleApiClient(): WhaleApiClient {
  return useContext(WhaleApiClientContext);
}

export function WhaleProvider(
  props: PropsWithChildren<any>
): JSX.Element | null {
  const connection = useNetwork().connection;

  const memo = useMemo(() => {
    const options = newOceanOptions(connection);
    return {
      api: newWhaleClient(options),
      rpc: newRpcClient(options),
    };
  }, [connection]);

  return (
    <WhaleApiClientContext.Provider value={memo.api}>
      <WhaleRpcClientContext.Provider value={memo.rpc}>
        {props.children}
      </WhaleRpcClientContext.Provider>
    </WhaleApiClientContext.Provider>
  );
}

function newOceanOptions(
  connection?: string | NetworkConnection
): WhaleApiClientOptions {
  switch (connection) {
    case NetworkConnection.LocalPlayground:
      return {
        url: "http://localhost:19553",
        network: "regtest",
        version: "v0",
      };
    case NetworkConnection.RemotePlayground:
      return {
        url: "https://playground.jellyfishsdk.com",
        network: "regtest",
        version: "v0",
      };
    case NetworkConnection.TestNet:
      return {
        url: "https://testnet.ocean.jellyfishsdk.com",
        network: "testnet",
        version: "v0",
      };
    case NetworkConnection.MainNet:
    default:
      return {
        url: "https://ocean.defichain.com",
        network: "mainnet",
        version: "v0",
      };
  }
}

function newWhaleClient(options: WhaleApiClientOptions): WhaleApiClient {
  return new WhaleApiClient(options);
}

function newRpcClient(options: WhaleApiClientOptions): WhaleRpcClient {
  return new WhaleRpcClient(
    `${options.url}/${options.version}/${options.network}/rpc`
  );
}
