import { EnvironmentNetwork, getEnvironment } from '@contexts'
import { useRouter } from 'next/router'

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

function resolveNetwork (text?: string | string[]): EnvironmentNetwork {
  const env = getEnvironment()

  if ((env.networks as any[]).includes(text)) {
    return text as EnvironmentNetwork
  }

  return env.networks[0]
}
