import { NetworkConnection } from "@contexts/NetworkContext";

/**
 * Environment specific static resolution utility.
 */
class Environment {
  constructor(
    public readonly name: "Production" | "Development",
    public readonly debug: boolean,
    public readonly networks: NetworkConnection[]
  ) {}

  /**
   * @param {any} text that is case sensitive to resolve to a NetworkConnection, else unresolvable; default to first network
   */
  public resolveConnection(text: any): NetworkConnection {
    if ((this.networks as any[]).includes(text)) {
      return text as NetworkConnection;
    }

    return this.networks[0];
  }

  /**
   * @param {NetworkConnection} network to check if it's the default network, aka the first network
   */
  public isDefaultConnection(network: NetworkConnection): boolean {
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
        NetworkConnection.MainNet,
        NetworkConnection.TestNet,
        NetworkConnection.RemotePlayground,
      ]);
    case "development":
    default:
      return new Environment("Development", true, [
        NetworkConnection.MainNet,
        NetworkConnection.RemotePlayground,
        NetworkConnection.LocalPlayground,
        NetworkConnection.TestNet,
      ]);
  }
}

/**
 * @param {NetworkConnection} connection to check if it is a playground network
 */
export function isPlayground(connection: NetworkConnection): boolean {
  return [
    NetworkConnection.LocalPlayground,
    NetworkConnection.RemotePlayground,
  ].includes(connection);
}
