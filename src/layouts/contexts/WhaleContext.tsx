import { WhaleApiClient, WhaleRpcClient } from "@defichain/whale-api-client";
import { GetServerSidePropsContext } from "next";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
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
  return newWhaleClient(network);
}

export function getWhaleRpcClient(
  context: GetServerSidePropsContext
): WhaleRpcClient {
  const network =
    context.query.network?.toString() ?? getEnvironment().networks[0];
  return newRpcClient(network);
}

export function useWhaleApiClient(): WhaleApiClient {
  return useContext(WhaleApiClientContext);
}

export function WhaleProvider(
  props: PropsWithChildren<any>
): JSX.Element | null {
  const connection = useNetwork().connection;

  const memo = useMemo(() => {
    const api = newWhaleClient(connection);
    const rpc = newRpcClient(connection);
    return {
      api: api,
      rpc: rpc,
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

function newWhaleClient(
  connection?: string | NetworkConnection
): WhaleApiClient {
  switch (connection) {
    case NetworkConnection.LocalPlayground:
      return new WhaleApiClient({
        url: "http://localhost:19553",
        network: "regtest",
        version: "v0",
      });
    case NetworkConnection.RemotePlayground:
      return new WhaleApiClient({
        url: "https://playground.jellyfishsdk.com",
        network: "regtest",
        version: "v0",
      });
    case NetworkConnection.TestNet:
      return new WhaleApiClient({
        url: "https://testnet.ocean.jellyfishsdk.com",
        network: "testnet",
        version: "v0",
      });
    case NetworkConnection.MainNet:
    default:
      return new WhaleApiClient({
        url: "https://ocean.defichain.com",
        network: "mainnet",
        version: "v0",
      });
  }
}

function newRpcClient(connection?: string | NetworkConnection): WhaleRpcClient {
  switch (connection) {
    case NetworkConnection.LocalPlayground:
      return new WhaleRpcClient("http://localhost:19553/v0/regtest/rpc");
    case NetworkConnection.RemotePlayground:
      return new WhaleRpcClient(
        "https://playground.jellyfishsdk.com/v0/regtest/rpc"
      );
    case NetworkConnection.TestNet: {
      const version = "v0";
      return new WhaleRpcClient(
        `https://testnet.ocean.jellyfishsdk.com/${version}/testnet/rpc`
      );
    }
    case NetworkConnection.MainNet:
    default: {
      const version = "v0";
      return new WhaleRpcClient(
        `https://ocean.defichain.com/${version}/mainnet/rpc`
      );
    }
  }
}
