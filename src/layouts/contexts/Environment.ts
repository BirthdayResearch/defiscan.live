import { Network } from '@contexts/NetworkContext'

/**
 * Environment specific static resolution utility.
 */
class Environment {
  constructor (
    public readonly name: 'Production' | 'Development',
    public readonly debug: boolean,
    public readonly networks: Network[]
  ) {
  }

  /**
   * @param {any} text that is case sensitive to resolve to a Network, else unresolvable; default to first network
   */
  public resolveNetwork (text: any): Network {
    if ((this.networks as any[]).includes(text)) {
      return text as Network
    }

    return this.networks[0]
  }

  /**
   * @param {Network} network to check if it's the default network, aka the first network
   */
  public isDefaultNetwork (network: Network): boolean {
    return this.networks[0] === network
  }
}

/**
 * @return Environment of current setup, checked against Environment Variable
 */
export function getEnvironment (): Environment {
  switch (process.env.NODE_ENV) {
    case 'production':
      return new Environment('Production', false, [
        Network.MainNet,
        Network.TestNet,
        Network.RemotePlayground
      ])
    case 'development':
    default:
      return new Environment('Development', true, [
        Network.RemotePlayground,
        Network.LocalPlayground,
        Network.TestNet,
        Network.MainNet
      ])
  }
}

/**
 * @param {Network} network to check if it is a playground network
 */
export function isPlayground (network: Network): boolean {
  return [
    Network.LocalPlayground,
    Network.RemotePlayground
  ].includes(network)
}
