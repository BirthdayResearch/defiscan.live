import { WhaleApiClient, WhaleRpcClient } from '@defichain/whale-api-client'
import { GetServerSidePropsContext } from 'next'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { getEnvironment } from './Environment'
import { NetworkConnection, useNetwork } from './NetworkContext'

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
  const network = context.query.network?.toString() ?? getEnvironment().networks[0]
  return newWhaleClient(network)
}

export function useWhaleApiClient (): WhaleApiClient {
  return useContext(WhaleApiClientContext)
}

/**
 * @deprecated added for convenience, do not use.
 */
export function useWhaleRpcClient (): WhaleRpcClient {
  return useContext(WhaleRpcClientContext)
}

export function WhaleProvider (props: PropsWithChildren<any>): JSX.Element | null {
  const network = useNetwork()

  const memo = useMemo(() => {
    const api = newWhaleClient(network)
    const rpc = new WhaleRpcClient(api)
    return {
      api: api,
      rpc: rpc
    }
  }, [network])

  return (
    <WhaleApiClientContext.Provider value={memo.api}>
      <WhaleRpcClientContext.Provider value={memo.rpc}>
        {props.children}
      </WhaleRpcClientContext.Provider>
    </WhaleApiClientContext.Provider>
  )
}

function newWhaleClient (network?: string): WhaleApiClient {
  switch (network) {
    case NetworkConnection.LocalPlayground:
      return new WhaleApiClient({
        url: 'http://localhost:19553',
        network: 'regtest',
        version: 'v0'
      })
    case NetworkConnection.RemotePlayground:
      return new WhaleApiClient({
        url: 'https://playground.defichain.com',
        network: 'regtest',
        version: 'v0'
      })
    case NetworkConnection.TestNet:
      return new WhaleApiClient({
        url: 'https://ocean.defichain.com',
        network: 'testnet'
      })
    case NetworkConnection.MainNet:
    default:
      return new WhaleApiClient({
        url: 'https://ocean.defichain.com',
        network: 'mainnet'
      })
  }
}
