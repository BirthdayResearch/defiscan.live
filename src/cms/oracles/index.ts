export interface OracleCopy {
  /**
   * oracleId
   */
  id: string
  /**
   * name of the oracle
   */
  name: string
  /**
   * Image to use for the oracle at least 300x300.png
   * To be placed in cms/oracles/images/* directory
   */
  image: string
  /**
   * Ascending order to show oracle in '/prices' page.
   * @example 0 = highest oder
   */
  order: number
}

export const ORACLES: Record<string, OracleCopy> = {}

export function getOracleCopy (id: string): OracleCopy | undefined {
  return ORACLES[id]
}
