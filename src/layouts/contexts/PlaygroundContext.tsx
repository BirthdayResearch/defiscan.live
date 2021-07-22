import { PlaygroundApiClient, PlaygroundRpcClient } from '@defichain/playground-api-client'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { EnvironmentNetwork, getEnvironment, isPlayground } from './api/Environment'
import { useNetworkContext } from './NetworkContext'

interface Playground {
  rpc: PlaygroundRpcClient
  api: PlaygroundApiClient
}

const PlaygroundContext = createContext<Playground | undefined>(undefined)

/**
 * usePlaygroundContext(), only available in debug mode and playground network.
 */
export function usePlaygroundContext (): Playground {
  const context = useContext(PlaygroundContext)
  if (context !== undefined) {
    return context
  }

  throw new Error('attempting to usePlaygroundContext on a non debug environment')
}

export function PlaygroundProvider (props: PropsWithChildren<any>): JSX.Element | null {
  const { network } = useNetworkContext()
  const connected = useConnectedPlayground()

  const context = useMemo(() => {
    if (!isPlaygroundAvailable(network)) {
      return undefined
    }
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
  const { network, setNetwork } = useNetworkContext()
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const environment = getEnvironment()
    if (!isPlaygroundAvailable(network)) {
      setLoaded(true)
      return
    }

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

function isPlaygroundAvailable (network: EnvironmentNetwork): boolean {
  const environment = getEnvironment()
  if (!isPlayground(network)) {
    return false
  }

  if (!environment.debug) {
    return false
  }

  return true
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
