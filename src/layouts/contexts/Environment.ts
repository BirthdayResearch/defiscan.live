import { EnvironmentNetwork } from "@waveshq/walletkit-core";

/**
 * Environment specific static resolution utility.
 */
class Environment {
  constructor(
    public readonly name: "Production" | "Development",
    public readonly debug: boolean,
    public readonly networks: EnvironmentNetwork[],
  ) {}

  /**
   * @param {any} text that is case sensitive to resolve to a EnvironmentNetwork, else unresolvable; default to first network
   */
  public resolveConnection(text: any): EnvironmentNetwork {
    if ((this.networks as any[]).includes(text)) {
      return text as EnvironmentNetwork;
    }

    return this.networks[0];
  }

  /**
   * @param {EnvironmentNetwork} network to check if it's the default network, aka the first network
   */
  public isDefaultConnection(network: EnvironmentNetwork): boolean {
    return this.networks[0] === network;
  }
}

/**
 * @return Environment of current setup, checked against Environment Variable
 */
export function getEnvironment(): Environment {
  const type =
    process.env.CYPRESS === "true" ? "development" : process.env.NODE_ENV;
  switch (type) {
    case "production":
      return new Environment("Production", false, [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.Changi,
      ]);
    case "development":
    default:
      return new Environment("Development", true, [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ]);
  }
}
