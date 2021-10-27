import { getEnvironment } from '@contexts/Environment'
import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { Network as NetworkObject, getNetwork } from '@defichain/jellyfish-network'

export declare type NetworkName = 'mainnet' | 'testnet' | 'regtest'

export enum Network {
  LocalPlayground = 'Local',
  RemotePlayground = 'Playground',
  MainNet = 'MainNet',
  TestNet = 'TestNet'
}

export interface NetworkConnection extends NetworkObject {
  type: 'Local' | 'Playground' | 'MainNet' | 'TestNet'
}

const NetworkContext = createContext<Network>(undefined as any)

export function useNetwork (): Network {
  return useContext(NetworkContext)
}

export function useNetworkConnection (): NetworkConnection {
  const network = useContext(NetworkContext)

  switch (network) {
    case Network.MainNet:
      return { type: network, ...getNetwork('mainnet') }
    case Network.TestNet:
      return { type: network, ...getNetwork('testnet') }
    case Network.RemotePlayground:
    case Network.LocalPlayground:
      return { type: network, ...getNetwork('regtest') }
    default:
      throw new Error(`${network as string} network not found`)
  }
}

export function NetworkProvider (props: PropsWithChildren<any>): JSX.Element | null {
  const router = useRouter()
  const env = getEnvironment()
  const [network] = useState<Network>(env.resolveNetwork(router.query.network))

  return (
    <NetworkContext.Provider value={network}>
      {props.children}
    </NetworkContext.Provider>
  )
}
