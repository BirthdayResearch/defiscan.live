/* eslint @typescript-eslint/quotes: 0 */

export interface PriceCopy {
  /**
   * @example 'TSLA-USD'
   */
  id: string
  /**
   * price ticker type
   */
  type: 'CRYPTO' | 'FOREX' | 'COMMODITY' | 'STOCKS' | 'ETF'

  available: boolean
}

export const PRICES: Record<string, PriceCopy> = {
  'TSLA-USD': {
    id: 'TSLA-USD',
    type: 'STOCKS',
    available: true
  },
  'XCU-USD': {
    id: 'XCU-USD',
    type: 'COMMODITY',
    available: false
  },
  'XAU-USD': {
    id: 'XAU-USD',
    type: 'COMMODITY',
    available: false
  },
  'XAG-USD': {
    id: 'XAG-USD',
    type: 'COMMODITY',
    available: false
  },
  'SGD-USD': {
    id: 'SGD-USD',
    type: 'FOREX',
    available: false
  },
  'EUR-USD': {
    id: 'EUR-USD',
    type: 'FOREX',
    available: false
  },
  'BCO-USD': {
    id: 'BCO-USD',
    type: 'COMMODITY',
    available: false
  },
  'UBER-USD': {
    id: 'UBER-USD',
    type: 'STOCKS',
    available: false
  },
  'GME-USD': {
    id: 'GME-USD',
    type: 'STOCKS',
    available: false
  },
  'AMD-USD': {
    id: 'AMD-USD',
    type: 'STOCKS',
    available: false
  },
  'TWTR-USD': {
    id: 'TWTR-USD',
    type: 'STOCKS',
    available: false
  },
  'NVDA-USD': {
    id: 'NVDA-USD',
    type: 'STOCKS',
    available: false
  },
  'MSTR-USD': {
    id: 'MSTR-USD',
    type: 'STOCKS',
    available: false
  },
  'GOOGL-USD': {
    id: 'GOOGL-USD',
    type: 'STOCKS',
    available: false
  },
  'FB-USD': {
    id: 'FB-USD',
    type: 'STOCKS',
    available: false
  },
  'COIN-USD': {
    id: 'COIN-USD',
    type: 'STOCKS',
    available: false
  },
  'AMZN-USD': {
    id: 'AMZN-USD',
    type: 'STOCKS',
    available: false
  },
  'AAPL-USD': {
    id: 'AAPL-USD',
    type: 'STOCKS',
    available: false
  },
  'OTGLY-USD': {
    id: 'OTGLY-USD',
    type: 'STOCKS',
    available: false
  },
  'BCH-USD': {
    id: 'BCH-USD',
    type: 'CRYPTO',
    available: true
  },
  'BTC-USD': {
    id: 'BTC-USD',
    type: 'CRYPTO',
    available: true
  },
  'DFI-USD': {
    id: 'DFI-USD',
    type: 'CRYPTO',
    available: true
  },
  'DOGE-USD': {
    id: 'DOGE-USD',
    type: 'CRYPTO',
    available: true
  },
  'ETH-USD': {
    id: 'ETH-USD',
    type: 'CRYPTO',
    available: true
  },
  'LTC-USD': {
    id: 'LTC-USD',
    type: 'CRYPTO',
    available: true
  },
  'USDC-USD': {
    id: 'USDC-USD',
    type: 'CRYPTO',
    available: true
  },
  'USDT-USD': {
    id: 'USDT-USD',
    type: 'CRYPTO',
    available: true
  },
  'U-USD': {
    id: 'U-USD',
    type: 'STOCKS',
    available: false
  },
  'TCEHY-USD': {
    id: 'TCHEY-USD',
    type: 'STOCKS',
    available: false
  },
  'SEDG-USD': {
    id: 'SEDG-USD',
    type: 'STOCKS',
    available: false
  },
  'VOO-USD': {
    id: 'VOO-USD',
    type: 'ETF',
    available: false
  },
  'V-USD': {
    id: 'V-USD',
    type: 'STOCKS',
    available: false
  },
  'TTWO-USD': {
    id: 'TTWO-USD',
    type: 'STOCKS',
    available: false
  },
  'TQQQ-USD': {
    id: 'TQQQ-USD',
    type: 'ETF',
    available: false
  },
  'TLRY-USD': {
    id: 'TLRY-USD',
    type: 'STOCKS',
    available: false
  },
  'SNAP-USD': {
    id: 'SNAP-USD',
    type: 'STOCKS',
    available: false
  },
  'SQ-USD': {
    id: 'SQ-USD',
    type: 'STOCKS',
    available: false
  },
  'SPY-USD': {
    id: 'SPY-USD',
    type: 'ETF',
    available: false
  },
  'SI-USD': {
    id: 'SI-USD',
    type: 'STOCKS',
    available: false
  },
  'RIOT-USD': {
    id: 'RIOT-USD',
    type: 'STOCKS',
    available: false
  },
  'PYPL-USD': {
    id: 'PYPL-USD',
    type: 'STOCKS',
    available: false
  },
  'PLTR-USD': {
    id: 'PLTR-USD',
    type: 'STOCKS',
    available: false
  },
  'NTDOF-USD': {
    id: 'NTDOF-USD',
    type: 'STOCKS',
    available: false
  },
  'NSRGY-USD': {
    id: 'NSRGY-USD',
    type: 'STOCKS',
    available: false
  },
  'SQQQ-USD': {
    id: 'SQQQ-USD',
    type: 'ETF',
    available: false
  },
  'SOXX-USD': {
    id: 'SOXX-USD',
    type: 'ETF',
    available: false
  },
  'BABA-USD': {
    id: 'BABA-USD',
    type: 'STOCKS',
    available: false
  },
  'DIS-USD': {
    id: 'DIS-USD',
    type: 'STOCKS',
    available: false
  },
  'NFLX-USD': {
    id: 'NFLX-USD',
    type: 'STOCKS',
    available: false
  },
  'MA-USD': {
    id: 'MA-USD',
    type: 'STOCKS',
    available: false
  },
  'RBLX-USD': {
    id: 'RBLX-USD',
    type: 'STOCKS',
    available: false
  },
  'MARA-USD': {
    id: 'MARA-USD',
    type: 'STOCKS',
    available: false
  },
  'MCHI-USD': {
    id: 'MCHI-USD',
    type: 'ETF',
    available: false
  },
  'EEM-USD': {
    id: 'EEM-USD',
    type: 'ETF',
    available: false
  },
  'NLLSF-USD': {
    id: 'NLLSF-USD',
    type: 'STOCKS',
    available: false
  },
  'GLO-USD': {
    id: 'GLO-USD',
    type: 'ETF',
    available: false
  },
  'KRBN-USD': {
    id: 'KRBN-USD',
    type: 'ETF',
    available: false
  },
  'PATH-USD': {
    id: 'PATH-USD',
    type: 'STOCKS',
    available: false
  },
  'MSFT-USD': {
    id: 'MSFT-USD',
    type: 'STOCKS',
    available: false
  },
  'INTC-USD': {
    id: 'INTC-USD',
    type: 'STOCKS',
    available: false
  },
  'SQNXF-USD': {
    id: 'SQNXF-USD',
    type: 'STOCKS',
    available: false
  },
  'SOXS-USD': {
    id: 'SOXS-USD',
    type: 'ETF',
    available: false
  },
  'SOXL-USD': {
    id: 'SOXL-USD',
    type: 'ETF',
    available: false
  },
  'QQQ-USD': {
    id: 'QQQ-USD',
    type: 'ETF',
    available: false
  },
  'LZAGY-USD': {
    id: 'LZAGY-USD',
    type: 'STOCKS',
    available: false
  },
  'CQQQ-USD': {
    id: 'CQQQ-USD',
    type: 'ETF',
    available: false
  },
  'BYDDF-USD': {
    id: 'BYDDF-USD',
    type: 'STOCKS',
    available: false
  },
  'ARKX-USD': {
    id: 'ARKX-USD',
    type: 'ETF',
    available: false
  },
  'ARKW-USD': {
    id: 'ARKW-USD',
    type: 'ETF',
    available: false
  },
  'ARKQ-USD': {
    id: 'ARKQ-USD',
    type: 'ETF',
    available: false
  },
  'ARKF-USD': {
    id: 'ARKF-USD',
    type: 'ETF',
    available: false
  },
  'ARKK-USD': {
    id: 'ARKK-USD',
    type: 'ETF',
    available: false
  },
  'ARKG-USD': {
    id: 'ARKG-USD',
    type: 'ETF',
    available: false
  },
  'VNQ-USD': {
    id: 'VNQ-USD',
    type: 'ETF',
    available: false
  },
  'URTH-USD': {
    id: 'URTH-USD',
    type: 'ETF',
    available: false
  },
  'TLT-USD': {
    id: 'TLT-USD',
    type: 'ETF',
    available: false
  },
  'SLV-USD': {
    id: 'SLV-USD',
    type: 'ETF',
    available: false
  },
  'PDBC-USD': {
    id: 'PDBC-USD',
    type: 'ETF',
    available: false
  },
  'GLD-USD': {
    id: 'GLD-USD',
    type: 'ETF',
    available: false
  },

  // Playground
  'CS25-USD': {
    id: 'CS25-USD',
    type: 'CRYPTO',
    available: true
  },
  'CU10-USD': {
    id: 'CU10-USD',
    type: 'CRYPTO',
    available: true
  },
  'CR50-USD': {
    id: 'CR50-USD',
    type: 'CRYPTO',
    available: true
  },
  'CD10-USD': {
    id: 'CD10-USD',
    type: 'CRYPTO',
    available: true
  }
}

export function getPriceCopy (id: string): PriceCopy | undefined {
  return PRICES[id]
}
