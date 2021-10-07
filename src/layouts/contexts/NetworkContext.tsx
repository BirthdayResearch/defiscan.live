import { getEnvironment } from '@contexts/Environment'
import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

export declare type NetworkName = 'mainnet' | 'testnet' | 'regtest'

export enum Network {
  LocalPlayground = 'Local',
  RemotePlayground = 'Playground',
  MainNet = 'MainNet',
  TestNet = 'TestNet'
}

export interface NetworkObject {
  name: NetworkName
}

const NetworkContext = createContext<Network>(undefined as any)

export function useNetwork (): Network {
  return useContext(NetworkContext)
}

export function useNetworkObject (): NetworkObject {
  const network = useContext(NetworkContext)

  switch (network) {
    case Network.MainNet:
      return { name: 'mainnet' as NetworkName }
    case Network.TestNet:
      return { name: 'testnet' as NetworkName }
    case Network.RemotePlayground:
      return { name: 'regtest' as NetworkName }
    case Network.LocalPlayground:
      return { name: 'regtest' as NetworkName }
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
