import { useNetworkContext } from '@contexts'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'
import { EnvironmentNetwork, getEnvironment } from './Environment'

interface NetworkQueryInterface {
  /**
   * @return {EnvironmentNetwork} from query string
   */
  getNetwork: () => EnvironmentNetwork

  /**
   * @param {EnvironmentNetwork} network to set to update entire NetworkContext, reflected in url if non env default
   */
  setNetwork: (network: EnvironmentNetwork) => void
}

/**
 * @return EnvironmentNetwork if invalid, will be set to `networks[0]`
 */
export function useNetworkQuery (): NetworkQueryInterface {
  const env = getEnvironment()
  const router = useRouter()
  const current = resolveNetwork(router.query.network)

  return {
    getNetwork (): EnvironmentNetwork {
      return current
    },
    setNetwork (network: EnvironmentNetwork) {
      if (!env.networks.includes(network)) {
        throw new Error('network is not part of environment')
      }
      if (current === network) {
        return
      }

      void router.push({
        pathname: router.pathname,
        query: isDefaultNetwork(network) ? {} : { network: network }
      })
    }
  }
}

function isDefaultNetwork (network: EnvironmentNetwork): boolean {
  const env = getEnvironment()
  return env.networks[0] === network
}

function hasNetwork (url: string): boolean {
  const query = url.split('?')[1]
  return new URLSearchParams(query).has('network')
}

function resolveNetwork (text?: string | string[]): EnvironmentNetwork {
  const env = getEnvironment()

  if ((env.networks as any[]).includes(text)) {
    return text as EnvironmentNetwork
  }

  return env.networks[0]
}

export function KeepNetworkQueryString (props: PropsWithChildren<any>): JSX.Element {
  const router = useRouter()
  const { network } = useNetworkContext()

  useEffect(() => {
    function routeChangeComplete (url: string, options: { shadow: boolean }): void {
      const [pathname, search] = url.split('?')

      if (options.shadow) {
        return
      }

      if (hasNetwork(url)) {
        return
      }

      if (isDefaultNetwork(network)) {
        return
      }

      void router.replace({
        pathname: pathname,
        query: {
          ...Object.fromEntries(new URLSearchParams(search).entries()),
          network: network
        }
      }, undefined, { shallow: true })
    }

    router.events.on('routeChangeComplete', routeChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', routeChangeComplete)
    }
  }, [network])

  return props.children
}
