import { getEnvironment } from '@contexts/Environment'
import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

export enum Network {
  LocalPlayground = 'Local',
  RemotePlayground = 'Playground',
  MainNet = 'MainNet',
  TestNet = 'TestNet'
}

const NetworkContext = createContext<Network>(undefined as any)

export function useNetwork (): Network {
  return useContext(NetworkContext)
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
