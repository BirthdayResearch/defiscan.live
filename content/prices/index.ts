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
  /**
   * Icon with at least size of 100x100.png, must be symmetric.
   * To be placed in /src/cms/oracles/images/* directory.
   * @example you can use https://icons8.com/icons/set/tesla are free because they are copyrighted images
   */
  icon: string

  available: boolean
}

export const PRICES: Record<string, PriceCopy> = {
  'TSLA-USD': {
    id: 'TSLA-USD',
    type: 'STOCKS',
    icon: require('./images/tesla.png'),
    available: true
  },
  'XCU-USD': {
    id: 'XCU-USD',
    type: 'COMMODITY',
    icon: require('./images/xcu.png'),
    available: false
  },
  'XAU-USD': {
    id: 'XAU-USD',
    type: 'COMMODITY',
    icon: require('./images/xau.png'),
    available: false
  },
  'XAG-USD': {
    id: 'XAG-USD',
    type: 'COMMODITY',
    icon: require('./images/xag.png'),
    available: false
  },
  'SGD-USD': {
    id: 'SGD-USD',
    type: 'FOREX',
    icon: require('./images/sgd.png'),
    available: false
  },
  'EUR-USD': {
    id: 'EUR-USD',
    type: 'FOREX',
    icon: require('./images/eur.png'),
    available: false
  },
  'BCO-USD': {
    id: 'BCO-USD',
    type: 'COMMODITY',
    icon: require('./images/bco.png'),
    available: false
  },
  'UBER-USD': {
    id: 'UBER-USD',
    type: 'STOCKS',
    icon: require('./images/uber.png'),
    available: false
  },
  'GME-USD': {
    id: 'GME-USD',
    type: 'STOCKS',
    icon: require('./images/gme.png'),
    available: false
  },
  'AMD-USD': {
    id: 'AMD-USD',
    type: 'STOCKS',
    icon: require('./images/amd.png'),
    available: false
  },
  'TWTR-USD': {
    id: 'TWTR-USD',
    type: 'STOCKS',
    icon: require('./images/twtr.png'),
    available: false
  },
  'NVDA-USD': {
    id: 'NVDA-USD',
    type: 'STOCKS',
    icon: require('./images/nvda.png'),
    available: false
  },
  'MSTR-USD': {
    id: 'MSTR-USD',
    type: 'STOCKS',
    icon: require('./images/mstr.png'),
    available: false
  },
  'GOOGL-USD': {
    id: 'GOOGL-USD',
    type: 'STOCKS',
    icon: require('./images/googl.png'),
    available: false
  },
  'FB-USD': {
    id: 'FB-USD',
    type: 'STOCKS',
    icon: require('./images/fb.png'),
    available: false
  },
  'COIN-USD': {
    id: 'COIN-USD',
    type: 'STOCKS',
    icon: require('./images/coin.png'),
    available: false
  },
  'AMZN-USD': {
    id: 'AMZN-USD',
    type: 'STOCKS',
    icon: require('./images/amzn.png'),
    available: false
  },
  'AAPL-USD': {
    id: 'AAPL-USD',
    type: 'STOCKS',
    icon: require('./images/appl.png'),
    available: false
  },
  'OTGLY-USD': {
    id: 'OTGLY-USD',
    type: 'STOCKS',
    icon: require('./images/otgly.png'),
    available: false
  },
  'BCH-USD': {
    id: 'BCH-USD',
    type: 'CRYPTO',
    icon: require('./images/bch.png'),
    available: true
  },
  'BTC-USD': {
    id: 'BTC-USD',
    type: 'CRYPTO',
    icon: require('./images/btc.png'),
    available: true
  },
  'DFI-USD': {
    id: 'DFI-USD',
    type: 'CRYPTO',
    icon: require('./images/dfi.png'),
    available: true
  },
  'DOGE-USD': {
    id: 'DOGE-USD',
    type: 'CRYPTO',
    icon: require('./images/doge.png'),
    available: true
  },
  'ETH-USD': {
    id: 'ETH-USD',
    type: 'CRYPTO',
    icon: require('./images/eth.png'),
    available: true
  },
  'LTC-USD': {
    id: 'LTC-USD',
    type: 'CRYPTO',
    icon: require('./images/ltc.png'),
    available: true
  },
  'USDC-USD': {
    id: 'USDC-USD',
    type: 'CRYPTO',
    icon: require('./images/usdc.png'),
    available: true
  },
  'USDT-USD': {
    id: 'USDT-USD',
    type: 'CRYPTO',
    icon: require('./images/usdt.png'),
    available: true
  },
  'U-USD': {
    id: 'U-USD',
    type: 'STOCKS',
    icon: require('./images/unity.png'),
    available: false
  },
  'TCEHY-USD': {
    id: 'TCHEY-USD',
    type: 'STOCKS',
    icon: require('./images/tcehy.png'),
    available: false
  },
  'SEDG-USD': {
    id: 'SEDG-USD',
    type: 'STOCKS',
    icon: require('./images/sedg.png'),
    available: false
  },
  'VOO-USD': {
    id: 'VOO-USD',
    type: 'ETF',
    icon: require('./images/vanguard.png'),
    available: false
  },
  'V-USD': {
    id: 'V-USD',
    type: 'STOCKS',
    icon: require('./images/visa.png'),
    available: false
  },
  'TTWO-USD': {
    id: 'TTWO-USD',
    type: 'STOCKS',
    icon: require('./images/ttwo.png'),
    available: false
  },
  'TQQQ-USD': {
    id: 'TQQQ-USD',
    type: 'ETF',
    icon: require('./images/proshares.png'),
    available: false
  },
  'TLRY-USD': {
    id: 'TLRY-USD',
    type: 'STOCKS',
    icon: require('./images/tlry.png'),
    available: false
  },
  'SNAP-USD': {
    id: 'SNAP-USD',
    type: 'STOCKS',
    icon: require('./images/snap.png'),
    available: false
  },
  'SQ-USD': {
    id: 'SQ-USD',
    type: 'STOCKS',
    icon: require('./images/sq.png'),
    available: false
  },
  'SPY-USD': {
    id: 'SPY-USD',
    type: 'ETF',
    icon: require('./images/spy.png'),
    available: false
  },
  'SI-USD': {
    id: 'SI-USD',
    type: 'STOCKS',
    icon: require('./images/si.png'),
    available: false
  },
  'RIOT-USD': {
    id: 'RIOT-USD',
    type: 'STOCKS',
    icon: require('./images/riot.png'),
    available: false
  },
  'PYPL-USD': {
    id: 'PYPL-USD',
    type: 'STOCKS',
    icon: require('./images/pypl.png'),
    available: false
  },
  'PLTR-USD': {
    id: 'PLTR-USD',
    type: 'STOCKS',
    icon: require('./images/pltr.png'),
    available: false
  },
  'NTDOF-USD': {
    id: 'NTDOF-USD',
    type: 'STOCKS',
    icon: require('./images/nintendo.png'),
    available: false
  },
  'NSRGY-USD': {
    id: 'NSRGY-USD',
    type: 'STOCKS',
    icon: require('./images/nestle.png'),
    available: false
  },
  'SQQQ-USD': {
    id: 'SQQQ-USD',
    type: 'ETF',
    icon: require('./images/proshares.png'),
    available: false
  },
  'SOXX-USD': {
    id: 'SOXX-USD',
    type: 'ETF',
    icon: require('./images/ishares.png'),
    available: false
  },
  'BABA-USD': {
    id: 'BABA-USD',
    type: 'STOCKS',
    icon: require('./images/baba.png'),
    available: false
  },
  'DIS-USD': {
    id: 'DIS-USD',
    type: 'STOCKS',
    icon: require('./images/dis.png'),
    available: false
  },
  'NFLX-USD': {
    id: 'NFLX-USD',
    type: 'STOCKS',
    icon: require('./images/nflx.png'),
    available: false
  },
  'MA-USD': {
    id: 'MA-USD',
    type: 'STOCKS',
    icon: require('./images/ma.png'),
    available: false
  },
  'RBLX-USD': {
    id: 'RBLX-USD',
    type: 'STOCKS',
    icon: require('./images/rblx.png'),
    available: false
  },
  'MARA-USD': {
    id: 'MARA-USD',
    type: 'STOCKS',
    icon: require('./images/mara.png'),
    available: false
  },
  'MCHI-USD': {
    id: 'MCHI-USD',
    type: 'ETF',
    icon: require('./images/ishares.png'),
    available: false
  },
  'EEM-USD': {
    id: 'EEM-USD',
    type: 'ETF',
    icon: require('./images/ishares.png'),
    available: false
  },
  'NLLSF-USD': {
    id: 'NLLSF-USD',
    type: 'STOCKS',
    icon: require('./images/nllsf.png'),
    available: false
  },
  'GLO-USD': {
    id: 'GLO-USD',
    type: 'ETF',
    icon: require('./images/glo.png'),
    available: false
  },
  'KRBN-USD': {
    id: 'KRBN-USD',
    type: 'ETF',
    icon: require('./images/krbn.png'),
    available: false
  },
  'PATH-USD': {
    id: 'PATH-USD',
    type: 'STOCKS',
    icon: require('./images/uipath.png'),
    available: false
  },
  'MSFT-USD': {
    id: 'MSFT-USD',
    type: 'STOCKS',
    icon: require('./images/msft.png'),
    available: false
  },
  'INTC-USD': {
    id: 'INTC-USD',
    type: 'STOCKS',
    icon: require('./images/intc.png'),
    available: false
  },
  'SQNXF-USD': {
    id: 'SQNXF-USD',
    type: 'STOCKS',
    icon: require('./images/sqnxf.png'),
    available: false
  },
  'SOXS-USD': {
    id: 'SOXS-USD',
    type: 'ETF',
    icon: require('./images/direxion.png'),
    available: false
  },
  'SOXL-USD': {
    id: 'SOXL-USD',
    type: 'ETF',
    icon: require('./images/direxion.png'),
    available: false
  },
  'QQQ-USD': {
    id: 'QQQ-USD',
    type: 'ETF',
    icon: require('./images/invesco.png'),
    available: false
  },
  'LZAGY-USD': {
    id: 'LZAGY-USD',
    type: 'STOCKS',
    icon: require('./images/lzagy.png'),
    available: false
  },
  'CQQQ-USD': {
    id: 'CQQQ-USD',
    type: 'ETF',
    icon: require('./images/invesco.png'),
    available: false
  },
  'BYDDF-USD': {
    id: 'BYDDF-USD',
    type: 'STOCKS',
    icon: require('./images/byddf.png'),
    available: false
  },
  'ARKX-USD': {
    id: 'ARKX-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
    available: false
  },
  'ARKW-USD': {
    id: 'ARKW-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
    available: false
  },
  'ARKQ-USD': {
    id: 'ARKQ-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
    available: false
  },
  'ARKF-USD': {
    id: 'ARKF-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
    available: false
  },
  'ARKK-USD': {
    id: 'ARKK-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
    available: false
  },
  'ARKG-USD': {
    id: 'ARKG-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
    available: false
  }
}

export function getPriceCopy (id: string): PriceCopy | undefined {
  return PRICES[id]
}
