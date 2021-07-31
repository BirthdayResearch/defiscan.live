/**
 * Network supported in this environment
 */
export enum EnvironmentNetwork {
  LocalPlayground = 'Local',
  RemotePlayground = 'Playground',
  MainNet = 'MainNet',
  TestNet = 'TestNet'
}

export enum EnvironmentName {
  Production = 'Production',
  Development = 'Development',
}

interface Environment {
  name: EnvironmentName
  debug: boolean
  networks: EnvironmentNetwork[]
}

export const environments: Record<EnvironmentName, Environment> = {
  Production: {
    name: EnvironmentName.Production,
    debug: false,
    networks: [
      EnvironmentNetwork.MainNet,
      // EnvironmentNetwork.TestNet,
      EnvironmentNetwork.RemotePlayground
    ]
  },
  Development: {
    name: EnvironmentName.Development,
    debug: true,
    networks: [
      EnvironmentNetwork.LocalPlayground,
      EnvironmentNetwork.RemotePlayground,
      // EnvironmentNetwork.TestNet,
      EnvironmentNetwork.MainNet
    ]
  }
}

/**
 * @return Environment of current setup, checked against Environment Variable
 */
export function getEnvironment (): Environment {
  switch (process.env.NODE_ENV) {
    case 'production':
      return environments[EnvironmentName.Production]
    case 'development':
    default:
      return environments[EnvironmentName.Development]
  }
}

/**
 * @param {EnvironmentNetwork} network to check if it is a playground network
 */
export function isPlayground (network: EnvironmentNetwork): boolean {
  return [
    EnvironmentNetwork.LocalPlayground,
    EnvironmentNetwork.RemotePlayground
  ].includes(network)
}
