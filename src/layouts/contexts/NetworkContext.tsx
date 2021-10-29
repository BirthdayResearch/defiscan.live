import { getEnvironment } from '@contexts/Environment'
import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { Network as NetworkObject, getNetwork } from '@defichain/jellyfish-network'

export declare type NetworkName = 'mainnet' | 'testnet' | 'regtest'

export enum NetworkConnection {
  LocalPlayground = 'Local',
  RemotePlayground = 'Playground',
  MainNet = 'MainNet',
  TestNet = 'TestNet'
}

export interface NetworkContextObject extends NetworkObject {
  connection: NetworkConnection
}

const NetworkContext = createContext<NetworkConnection>(undefined as any)

export function useNetwork (): NetworkConnection {
  return useContext(NetworkContext)
}

export function useNetworkContext (): NetworkContextObject {
  const network = useContext(NetworkContext)

  switch (network) {
    case NetworkConnection.MainNet:
      return { connection: network, ...getNetwork('mainnet') }
    case NetworkConnection.TestNet:
      return { connection: network, ...getNetwork('testnet') }
    case NetworkConnection.RemotePlayground:
    case NetworkConnection.LocalPlayground:
      return { connection: network, ...getNetwork('regtest') }
    default:
      throw new Error(`${network as string} network not found`)
  }
}

export function NetworkProvider (props: PropsWithChildren<any>): JSX.Element | null {
  const router = useRouter()
  const env = getEnvironment()
  const [network] = useState<NetworkConnection>(env.resolveNetwork(router.query.network))

  return (
    <NetworkContext.Provider value={network}>
      {props.children}
    </NetworkContext.Provider>
  )
}
