import { PlaygroundApiClient, PlaygroundRpcClient } from '@defichain/playground-api-client'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { EnvironmentNetwork, getEnvironment, isPlayground } from "./api/Environment";
import { useNetworkContext } from './NetworkContext'

interface Playground {
  rpc: PlaygroundRpcClient
  api: PlaygroundApiClient
}

const PlaygroundContext = createContext<Playground>(undefined as any)

/**
 * usePlaygroundContext(), only available in debug mode and playground network.
 */
export function usePlaygroundContext (): Playground {
  return useContext(PlaygroundContext)
}

export function PlaygroundProvider (props: PropsWithChildren<any>): JSX.Element | null {
  const { network } = useNetworkContext()

  const connected = useConnectedPlayground()

  const context = useMemo(() => {
    const api = newPlaygroundClient(network)
    const rpc = new PlaygroundRpcClient(api)
    return { api, rpc }
  }, [network])

  if (!connected) {
    return null
  }

  return (
    <PlaygroundContext.Provider value={context}>
      {props.children}
    </PlaygroundContext.Provider>
  )
}

/**
 * hooks to find connected playground
 * @return boolean when completed or found connected playground
 */
function useConnectedPlayground (): boolean {
  const { setNetwork } = useNetworkContext()
  const [isLoaded, setLoaded] = useState(false)

  const environment = getEnvironment()
  if (!environment.debug) {
    return true
  }

  useEffect(() => {
    async function findPlayground (): Promise<void> {
      for (const network of environment.networks.filter(isPlayground)) {
        if (await isConnected(network)) {
          setNetwork(network)
          setLoaded(true)
          return
        }
      }
    }

    void findPlayground()
  }, [])

  return isLoaded
}

async function isConnected (network: EnvironmentNetwork): Promise<boolean> {
  const client = newPlaygroundClient(network)
  return await client.playground.info()
    .then(() => true)
    .catch(() => false)
}

function newPlaygroundClient (network: EnvironmentNetwork): PlaygroundApiClient {
  switch (network) {
    case EnvironmentNetwork.RemotePlayground:
      return new PlaygroundApiClient({ url: 'https://playground.defichain.com' })
    case EnvironmentNetwork.LocalPlayground:
      return new PlaygroundApiClient({ url: 'http://localhost:19553' })
    default:
      throw new Error(`playground not available for '${network}'`)
  }
}
