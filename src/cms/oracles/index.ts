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

export const ORACLES: Record<string, OracleCopy> = {
  nasdaq: {
    id: '',
    name: 'Nasdaq',
    image: 'cms/oracles/images/nasdaq.png',
    order: 0
  },
  finnhub: {
    id: '',
    name: 'Finnhub',
    image: 'cms/oracles/images/finnhub.png',
    order: 1
  },
  tiingo: {
    id: '',
    name: 'Tiingo',
    image: 'cms/oracles/images/tiingo.png',
    order: 2
  },
  iex: {
    id: '',
    name: 'IEX Cloud',
    image: 'cms/oracles/images/iex.png',
    order: 3
  }
}

export function getOracleCopy (id: string): OracleCopy | undefined {
  return ORACLES[id]
}
