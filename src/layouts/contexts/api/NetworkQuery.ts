import { useRouter } from "next/router";
import { EnvironmentNetwork, getEnvironment } from "./Environment";

interface NetworkQueryInterface {
  /**
   * @return {EnvironmentNetwork} from query string
   */
  getNetwork (): EnvironmentNetwork

  /**
   * @param {EnvironmentNetwork} network to set to update entire NetworkContext, reflected in url if non env default
   */
  setNetwork (network: EnvironmentNetwork): void
}

/**
 * @return EnvironmentNetwork if invalid, will be set to `networks[0]`
 */
export function useNetworkQuery (): NetworkQueryInterface {
  const env = getEnvironment()
  const router = useRouter()
  const network = resolveNetwork(env.networks, router['network'])

  return {
    getNetwork (): EnvironmentNetwork {
      return network
    },
    setNetwork (network: EnvironmentNetwork) {
      if (!env.networks.includes(network)) {
        throw new Error('network is not part of environment')
      }

      if (env.networks[0] === network) {
        void router.push({ pathname: '/' })
      }

      void router.push({
        pathname: '/',
        query: { network: network },
      })
    }
  }
}

function resolveNetwork (networks: EnvironmentNetwork[], text: string): EnvironmentNetwork {
  if ((networks as any[]).includes(text)) {
    return text as EnvironmentNetwork
  }

  return networks[0]
}
