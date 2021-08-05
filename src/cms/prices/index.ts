export interface PriceCopy {
  /**
   * @example 'TSLA-USD'
   */
  id: string
  /**
   * price ticker type
   */
  type: 'CRYPTO' | 'FOREX' | 'COMMODITY' | 'STOCKS'
  /**
   * Icon with at least size of 100x100.png, must be symmetric.
   * To be placed in cms/prices/images/* directory.
   * @example you can use https://icons8.com/icons/set/tesla are free because they are copyrighted images
   */
  icon: string
  /**
   * Long company name with a lot of incorporated text, affiliations, groups of companies.
   */
  description: string
}

export const PRICES: Record<string, PriceCopy> = {
  'TSLA-USD': {
    id: 'TSLA-USD',
    type: 'STOCKS',
    description: 'Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla\'s current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services.',
    icon: 'cms/prices/images/tesla.png'
  }
}

export function getPriceCopy (id: string): PriceCopy | undefined {
  return PRICES[id]
}
