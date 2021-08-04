import { WhaleApiClient, WhaleRpcClient } from '@defichain/whale-api-client'
import { GetServerSidePropsContext } from 'next'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { EnvironmentNetwork } from './api/Environment'
import { useNetworkContext } from './NetworkContext'

const WhaleApiClientContext = createContext<WhaleApiClient>(undefined as any)
const WhaleRpcClientContext = createContext<WhaleRpcClient>(undefined as any)

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
export function getWhaleApiClient (context: GetServerSidePropsContext): WhaleApiClient {
  const network = context.query.network?.toString()
  return newWhaleClient(network as EnvironmentNetwork)
}

export function useWhaleApiClient (): WhaleApiClient {
  return useContext(WhaleApiClientContext)
}

export function useWhaleRpcClient (): WhaleRpcClient {
  return useContext(WhaleRpcClientContext)
}

export function WhaleProvider (props: PropsWithChildren<any>): JSX.Element | null {
  const { network } = useNetworkContext()

  const { api, rpc } = useMemo(() => {
    const api = newWhaleClient(network)
    const rpc = new WhaleRpcClient(api)
    return { api, rpc }
  }, [network])

  return (
    <WhaleApiClientContext.Provider value={api}>
      <WhaleRpcClientContext.Provider value={rpc}>
        {props.children}
      </WhaleRpcClientContext.Provider>
    </WhaleApiClientContext.Provider>
  )
}

function newWhaleClient (network: EnvironmentNetwork): WhaleApiClient {
  switch (network) {
    case EnvironmentNetwork.MainNet:
      return new WhaleApiClient({ url: 'https://ocean.defichain.com', network: 'mainnet' })
    case EnvironmentNetwork.TestNet:
      return new WhaleApiClient({ url: 'https://ocean.defichain.com', network: 'testnet' })
    case EnvironmentNetwork.RemotePlayground:
      return new WhaleApiClient({ url: 'https://playground.defichain.com', network: 'regtest' })
    case EnvironmentNetwork.LocalPlayground:
      return new WhaleApiClient({ url: 'http://localhost:19553', network: 'regtest' })
  }
}
