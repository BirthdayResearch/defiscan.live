import { PlaygroundApiClient, PlaygroundRpcClient } from '@defichain/playground-api-client'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { getEnvironment, isPlayground } from './Environment'
import { Network, useNetwork } from './NetworkContext'

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
  const network = useNetwork()

  const context = useMemo(() => {
    if (!isPlaygroundAvailable(network)) {
      return undefined
    }
    const api = newPlaygroundClient(network)
    const rpc = new PlaygroundRpcClient(api)
    return { api, rpc }
  }, [network])

  return (
    <PlaygroundContext.Provider value={context}>
      {props.children}
    </PlaygroundContext.Provider>
  )
}

function isPlaygroundAvailable (network: Network): boolean {
  const environment = getEnvironment()
  if (!isPlayground(network)) {
    return false
  }

  if (!environment.debug) {
    return false
  }

  return true
}

function newPlaygroundClient (network: Network): PlaygroundApiClient {
  switch (network) {
    case Network.RemotePlayground:
      return new PlaygroundApiClient({ url: 'https://playground.defichain.com' })
    case Network.LocalPlayground:
      return new PlaygroundApiClient({ url: 'http://localhost:19553' })
    default:
      throw new Error(`playground not available for '${network}'`)
  }
}
