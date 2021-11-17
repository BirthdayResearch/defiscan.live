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
   * To be placed in /src/cms/prices/images/* directory.
   * @example you can use https://icons8.com/icons/set/tesla are free because they are copyrighted images
   */
  icon: string
}

export const PRICES: Record<string, PriceCopy> = {
  'TSLA-USD': {
    id: 'TSLA-USD',
    type: 'STOCKS',
    icon: require('./images/tesla.png')
  },
  'XCU-USD': {
    id: 'XCU-USD',
    type: 'COMMODITY',
    icon: require('./images/xcu.png')
  },
  'XAU-USD': {
    id: 'XAU-USD',
    type: 'COMMODITY',
    icon: require('./images/xau.png')
  },
  'XAG-USD': {
    id: 'XAG-USD',
    type: 'COMMODITY',
    icon: require('./images/xag.png')
  },
  'SGD-USD': {
    id: 'SGD-USD',
    type: 'FOREX',
    icon: require('./images/sgd.png')
  },
  'EUR-USD': {
    id: 'EUR-USD',
    type: 'FOREX',
    icon: require('./images/eur.png')
  },
  'BCO-USD': {
    id: 'BCO-USD',
    type: 'COMMODITY',
    icon: require('./images/bco.png')
  },
  'UBER-USD': {
    id: 'UBER-USD',
    type: 'STOCKS',
    icon: require('./images/uber.png')
  },
  'GME-USD': {
    id: 'GME-USD',
    type: 'STOCKS',
    icon: require('./images/gme.png')
  },
  'AMD-USD': {
    id: 'AMD-USD',
    type: 'STOCKS',
    icon: require('./images/amd.png')
  },
  'TWTR-USD': {
    id: 'TWTR-USD',
    type: 'STOCKS',
    icon: require('./images/twtr.png')
  },
  'NVDA-USD': {
    id: 'NVDA-USD',
    type: 'STOCKS',
    icon: require('./images/nvda.png')
  },
  'MSTR-USD': {
    id: 'MSTR-USD',
    type: 'STOCKS',
    icon: require('./images/mstr.png')
  },
  'GOOGL-USD': {
    id: 'GOOGL-USD',
    type: 'STOCKS',
    icon: require('./images/googl.png')
  },
  'FB-USD': {
    id: 'FB-USD',
    type: 'STOCKS',
    icon: require('./images/fb.png')
  },
  'COIN-USD': {
    id: 'COIN-USD',
    type: 'STOCKS',
    icon: require('./images/coin.png')
  },
  'AMZN-USD': {
    id: 'AMZN-USD',
    type: 'STOCKS',
    icon: require('./images/amzn.png')
  },
  'AAPL-USD': {
    id: 'AAPL-USD',
    type: 'STOCKS',
    icon: require('./images/appl.png')
  },
  'OTGLY-USD': {
    id: 'OTGLY-USD',
    type: 'STOCKS',
    icon: require('./images/otgly.png')
  },
  'BCH-USD': {
    id: 'BCH-USD',
    type: 'CRYPTO',
    icon: require('./images/bch.png'),
  },
  'BTC-USD': {
    id: 'BTC-USD',
    type: 'CRYPTO',
    icon: require('./images/btc.png'),
  },
  'DFI-USD': {
    id: 'DFI-USD',
    type: 'CRYPTO',
    icon: require('./images/dfi.png'),
  },
  'DOGE-USD': {
    id: 'DOGE-USD',
    type: 'CRYPTO',
    icon: require('./images/doge.png'),
  },
  'ETH-USD': {
    id: 'ETH-USD',
    type: 'CRYPTO',
    icon: require('./images/eth.png'),
  },
  'LTC-USD': {
    id: 'LTC-USD',
    type: 'CRYPTO',
    icon: require('./images/ltc.png'),
  },
  'USDC-USD': {
    id: 'USDC-USD',
    type: 'CRYPTO',
    icon: require('./images/usdc.png'),
  },
  'USDT-USD': {
    id: 'USDT-USD',
    type: 'CRYPTO',
    icon: require('./images/usdt.png'),
  },
  'U-USD': {
    id: 'U-USD',
    type: 'STOCKS',
    icon: require('./images/unity.png'),
  },
  'TCEHY-USD': {
    id: 'TCHEY-USD',
    type: 'STOCKS',
    icon: require('./images/tcehy.png'),
  },
  'SEDG-USD': {
    id: 'SEDG-USD',
    type: 'STOCKS',
    icon: require('./images/sedg.png'),
  },
  'VOO-USD': {
    id: 'VOO-USD',
    type: 'ETF',
    icon: require('./images/vanguard.png'),
  },
  'V-USD': {
    id: 'V-USD',
    type: 'STOCKS',
    icon: require('./images/visa.png'),
  },
  'TTWO-USD': {
    id: 'TTWO-USD',
    type: 'STOCKS',
    icon: require('./images/ttwo.png'),
  },
  'TQQQ-USD': {
    id: 'TQQQ-USD',
    type: 'ETF',
    icon: require('./images/proshares.png'),
  },
  'TLRY-USD': {
    id: 'TLRY-USD',
    type: 'STOCKS',
    icon: require('./images/tlry.png'),
  },
  'SNAP-USD': {
    id: 'SNAP-USD',
    type: 'STOCKS',
    icon: require('./images/snap.png'),
  },
  'SQ-USD': {
    id: 'SQ-USD',
    type: 'STOCKS',
    icon: require('./images/sq.png'),
  },
  'SPY-USD': {
    id: 'SPY-USD',
    type: 'ETF',
    icon: require('./images/spy.png'),
  },
  'SI-USD': {
    id: 'SI-USD',
    type: 'STOCKS',
    icon: require('./images/si.png'),
  },
  'RIOT-USD': {
    id: 'RIOT-USD',
    type: 'STOCKS',
    icon: require('./images/riot.png'),
  },
  'PYPL-USD': {
    id: 'PYPL-USD',
    type: 'STOCKS',
    icon: require('./images/pypl.png'),
  },
  'PLTR-USD': {
    id: 'PLTR-USD',
    type: 'STOCKS',
    icon: require('./images/pltr.png'),
  },
  'NTDOF-USD': {
    id: 'NTDOF-USD',
    type: 'STOCKS',
    icon: require('./images/nintendo.png'),
  },
  'NSRGY-USD': {
    id: 'NSRGY-USD',
    type: 'STOCKS',
    icon: require('./images/nestle.png'),
  },
  'SQQQ-USD': {
    id: 'SQQQ-USD',
    type: 'ETF',
    icon: require('./images/proshares.png'),
  },
  'SOXX-USD': {
    id: 'SOXX-USD',
    type: 'ETF',
    icon: require('./images/ishares.png'),
  },
  'BABA-USD': {
    id: 'BABA-USD',
    type: 'STOCKS',
    icon: require('./images/baba.png'),
  },
  'DIS-USD': {
    id: 'DIS-USD',
    type: 'STOCKS',
    icon: require('./images/dis.png'),
  },
  'NFLX-USD': {
    id: 'NFLX-USD',
    type: 'STOCKS',
    icon: require('./images/nflx.png'),
  },
  'MA-USD': {
    id: 'MA-USD',
    type: 'STOCKS',
    icon: require('./images/ma.png'),
  },
  'RBLX-USD': {
    id: 'RBLX-USD',
    type: 'STOCKS',
    icon: require('./images/rblx.png'),
  },
  'MARA-USD': {
    id: 'MARA-USD',
    type: 'STOCKS',
    icon: require('./images/mara.png'),
  },
  'MCHI-USD': {
    id: 'MCHI-USD',
    type: 'ETF',
    icon: require('./images/ishares.png'),
  },
  'EEM-USD': {
    id: 'EEM-USD',
    type: 'ETF',
    icon: require('./images/ishares.png'),
  },
  'NLLSF-USD': {
    id: 'NLLSF-USD',
    type: 'STOCKS',
    icon: require('./images/nllsf.png'),
  },
  'GLO-USD': {
    id: 'GLO-USD',
    type: 'ETF',
    icon: require('./images/glo.png'),
  },
  'KRBN-USD': {
    id: 'KRBN-USD',
    type: 'ETF',
    icon: require('./images/krbn.png'),
  },
  'PATH-USD': {
    id: 'PATH-USD',
    type: 'STOCKS',
    icon: require('./images/uipath.png'),
  },
  'MSFT-USD': {
    id: 'MSFT-USD',
    type: 'STOCKS',
    icon: require('./images/msft.png'),
  },
  'INTC-USD': {
    id: 'INTC-USD',
    type: 'STOCKS',
    icon: require('./images/intc.png'),
  },
  'SQNXF-USD': {
    id: 'SQNXF-USD',
    type: 'STOCKS',
    icon: require('./images/sqnxf.png'),
  },
  'SOXS-USD': {
    id: 'SOXS-USD',
    type: 'ETF',
    icon: require('./images/direxion.png'),
  },
  'SOXL-USD': {
    id: 'SOXL-USD',
    type: 'ETF',
    icon: require('./images/direxion.png'),
  },
  'QQQ-USD': {
    id: 'QQQ-USD',
    type: 'ETF',
    icon: require('./images/invesco.png'),
  },
  'LZAGY-USD': {
    id: 'LZAGY-USD',
    type: 'STOCKS',
    icon: require('./images/lzagy.png'),
  },
  'CQQQ-USD': {
    id: 'CQQQ-USD',
    type: 'ETF',
    icon: require('./images/invesco.png'),
  },
  'BYDDF-USD': {
    id: 'BYDDF-USD',
    type: 'STOCKS',
    icon: require('./images/byddf.png'),
  },
  'ARKX-USD': {
    id: 'ARKX-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
  },
  'ARKW-USD': {
    id: 'ARKW-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
  },
  'ARKQ-USD': {
    id: 'ARKQ-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
  },
  'ARKF-USD': {
    id: 'ARKF-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
  },
  'ARKK-USD': {
    id: 'ARKK-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
  },
  'ARKG-USD': {
    id: 'ARKG-USD',
    type: 'ETF',
    icon: require('./images/ark.png'),
  }
}

export function getPriceCopy (id: string): PriceCopy | undefined {
  return PRICES[id]
}
