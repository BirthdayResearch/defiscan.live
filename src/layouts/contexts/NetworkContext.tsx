import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { EnvironmentNetwork } from "./api/Environment";
import { useNetworkQuery } from "./api/NetworkQuery";

interface Network {
  network: EnvironmentNetwork
  setNetwork: (network: EnvironmentNetwork) => void
}

const NetworkContext = createContext<Network>(undefined as any)

export function useNetworkContext (): Network {
  return useContext(NetworkContext)
}

export function NetworkProvider (props: PropsWithChildren<any>): JSX.Element | null {
  const query = useNetworkQuery()
  const [network, setNetwork] = useState<EnvironmentNetwork>(query.getNetwork())

  const context: Network = {
    network: network,
    setNetwork (value: EnvironmentNetwork): void {
      query.setNetwork(value)
      setNetwork(value)
    }
  }

  return (
    <NetworkContext.Provider value={context}>
      {props.children}
    </NetworkContext.Provider>
  )
}
