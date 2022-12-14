/* eslint @typescript-eslint/quotes: 0 */

export interface PriceCopy {
  /**
   * @example 'TSLA-USD'
   */
  id: string;
  /**
   * price ticker type
   */
  type: "CRYPTO" | "FOREX" | "COMMODITY" | "STOCKS" | "ETF";
}

export const PRICES: Record<string, PriceCopy> = {
  "TSLA-USD": {
    id: "TSLA-USD",
    type: "STOCKS",
  },
  "XCU-USD": {
    id: "XCU-USD",
    type: "COMMODITY",
  },
  "XAU-USD": {
    id: "XAU-USD",
    type: "COMMODITY",
  },
  "XAG-USD": {
    id: "XAG-USD",
    type: "COMMODITY",
  },
  "SGD-USD": {
    id: "SGD-USD",
    type: "FOREX",
  },
  "EUR-USD": {
    id: "EUR-USD",
    type: "FOREX",
  },
  "BCO-USD": {
    id: "BCO-USD",
    type: "COMMODITY",
  },
  "UBER-USD": {
    id: "UBER-USD",
    type: "STOCKS",
  },
  "GME-USD": {
    id: "GME-USD",
    type: "STOCKS",
  },
  "AMD-USD": {
    id: "AMD-USD",
    type: "STOCKS",
  },
  "TWTR-USD": {
    id: "TWTR-USD",
    type: "STOCKS",
  },
  "NVDA-USD": {
    id: "NVDA-USD",
    type: "STOCKS",
  },
  "MSTR-USD": {
    id: "MSTR-USD",
    type: "STOCKS",
  },
  "GOOGL-USD": {
    id: "GOOGL-USD",
    type: "STOCKS",
  },
  "FB-USD": {
    id: "FB-USD",
    type: "STOCKS",
  },
  "COIN-USD": {
    id: "COIN-USD",
    type: "STOCKS",
  },
  "AMZN-USD": {
    id: "AMZN-USD",
    type: "STOCKS",
  },
  "AAPL-USD": {
    id: "AAPL-USD",
    type: "STOCKS",
  },
  "OTGLY-USD": {
    id: "OTGLY-USD",
    type: "STOCKS",
  },
  "BCH-USD": {
    id: "BCH-USD",
    type: "CRYPTO",
  },
  "BTC-USD": {
    id: "BTC-USD",
    type: "CRYPTO",
  },
  "DFI-USD": {
    id: "DFI-USD",
    type: "CRYPTO",
  },
  "DOGE-USD": {
    id: "DOGE-USD",
    type: "CRYPTO",
  },
  "ETH-USD": {
    id: "ETH-USD",
    type: "CRYPTO",
  },
  "LTC-USD": {
    id: "LTC-USD",
    type: "CRYPTO",
  },
  "USDC-USD": {
    id: "USDC-USD",
    type: "CRYPTO",
  },
  "USDT-USD": {
    id: "USDT-USD",
    type: "CRYPTO",
  },
  "U-USD": {
    id: "U-USD",
    type: "STOCKS",
  },
  "TCEHY-USD": {
    id: "TCHEY-USD",
    type: "STOCKS",
  },
  "SEDG-USD": {
    id: "SEDG-USD",
    type: "STOCKS",
  },
  "VOO-USD": {
    id: "VOO-USD",
    type: "ETF",
  },
  "V-USD": {
    id: "V-USD",
    type: "STOCKS",
  },
  "TTWO-USD": {
    id: "TTWO-USD",
    type: "STOCKS",
  },
  "TQQQ-USD": {
    id: "TQQQ-USD",
    type: "ETF",
  },
  "TLRY-USD": {
    id: "TLRY-USD",
    type: "STOCKS",
  },
  "SNAP-USD": {
    id: "SNAP-USD",
    type: "STOCKS",
  },
  "SQ-USD": {
    id: "SQ-USD",
    type: "STOCKS",
  },
  "SPY-USD": {
    id: "SPY-USD",
    type: "ETF",
  },
  "SI-USD": {
    id: "SI-USD",
    type: "STOCKS",
  },
  "RIOT-USD": {
    id: "RIOT-USD",
    type: "STOCKS",
  },
  "PYPL-USD": {
    id: "PYPL-USD",
    type: "STOCKS",
  },
  "PLTR-USD": {
    id: "PLTR-USD",
    type: "STOCKS",
  },
  "NTDOF-USD": {
    id: "NTDOF-USD",
    type: "STOCKS",
  },
  "NSRGY-USD": {
    id: "NSRGY-USD",
    type: "STOCKS",
  },
  "SQQQ-USD": {
    id: "SQQQ-USD",
    type: "ETF",
  },
  "SOXX-USD": {
    id: "SOXX-USD",
    type: "ETF",
  },
  "BABA-USD": {
    id: "BABA-USD",
    type: "STOCKS",
  },
  "DIS-USD": {
    id: "DIS-USD",
    type: "STOCKS",
  },
  "NFLX-USD": {
    id: "NFLX-USD",
    type: "STOCKS",
  },
  "MA-USD": {
    id: "MA-USD",
    type: "STOCKS",
  },
  "RBLX-USD": {
    id: "RBLX-USD",
    type: "STOCKS",
  },
  "MARA-USD": {
    id: "MARA-USD",
    type: "STOCKS",
  },
  "MCHI-USD": {
    id: "MCHI-USD",
    type: "ETF",
  },
  "EEM-USD": {
    id: "EEM-USD",
    type: "ETF",
  },
  "NLLSF-USD": {
    id: "NLLSF-USD",
    type: "STOCKS",
  },
  "GLO-USD": {
    id: "GLO-USD",
    type: "ETF",
  },
  "KRBN-USD": {
    id: "KRBN-USD",
    type: "ETF",
  },
  "PATH-USD": {
    id: "PATH-USD",
    type: "STOCKS",
  },
  "MSFT-USD": {
    id: "MSFT-USD",
    type: "STOCKS",
  },
  "INTC-USD": {
    id: "INTC-USD",
    type: "STOCKS",
  },
  "SQNXF-USD": {
    id: "SQNXF-USD",
    type: "STOCKS",
  },
  "SOXS-USD": {
    id: "SOXS-USD",
    type: "ETF",
  },
  "SOXL-USD": {
    id: "SOXL-USD",
    type: "ETF",
  },
  "QQQ-USD": {
    id: "QQQ-USD",
    type: "ETF",
  },
  "LZAGY-USD": {
    id: "LZAGY-USD",
    type: "STOCKS",
  },
  "CQQQ-USD": {
    id: "CQQQ-USD",
    type: "ETF",
  },
  "BYDDF-USD": {
    id: "BYDDF-USD",
    type: "STOCKS",
  },
  "ARKX-USD": {
    id: "ARKX-USD",
    type: "ETF",
  },
  "ARKW-USD": {
    id: "ARKW-USD",
    type: "ETF",
  },
  "ARKQ-USD": {
    id: "ARKQ-USD",
    type: "ETF",
  },
  "ARKF-USD": {
    id: "ARKF-USD",
    type: "ETF",
  },
  "ARKK-USD": {
    id: "ARKK-USD",
    type: "ETF",
  },
  "ARKG-USD": {
    id: "ARKG-USD",
    type: "ETF",
  },
  "VNQ-USD": {
    id: "VNQ-USD",
    type: "ETF",
  },
  "URTH-USD": {
    id: "URTH-USD",
    type: "ETF",
  },
  "TLT-USD": {
    id: "TLT-USD",
    type: "ETF",
  },
  "SLV-USD": {
    id: "SLV-USD",
    type: "ETF",
  },
  "PDBC-USD": {
    id: "PDBC-USD",
    type: "ETF",
  },
  "GLD-USD": {
    id: "GLD-USD",
    type: "ETF",
  },
  "IBM-USD": {
    id: "IBM-USD",
    type: "STOCKS",
  },
  "CCJ-USD": {
    id: "CCJ-USD",
    type: "STOCKS",
  },
  "EBAY-USD": {
    id: "EBAY-USD",
    type: "STOCKS",
  },
  "PG-USD": {
    id: "PG-USD",
    type: "STOCKS",
  },
  "ANGPY-USD": {
    id: "ANGPY-USD",
    type: "STOCKS",
  },
  "SAP-USD": {
    id: "SAP-USD",
    type: "STOCKS",
  },
  "ADDYY-USD": {
    id: "ADDYY-USD",
    type: "STOCKS",
  },
  "PAAS-USD": {
    id: "PAAS-USD",
    type: "STOCKS",
  },
  "GOLD-USD": {
    id: "GOLD-USD",
    type: "STOCKS",
  },
  "NVS-USD": {
    id: "NVS-USD",
    type: "STOCKS",
  },
  "CS-USD": {
    id: "CS-USD",
    type: "STOCKS",
  },
  "UUUU-USD": {
    id: "UUUU-USD",
    type: "STOCKS",
  },
  "BRK.B-USD": {
    id: "BRK.B-USD",
    type: "STOCKS",
  },
  "UL-USD": {
    id: "UL-USD",
    type: "STOCKS",
  },
  "KO-USD": {
    id: "KO-USD",
    type: "STOCKS",
  },
  "IQQQ-USD": {
    id: "IQQQ-USD",
    type: "ETF",
  },
  "EUNK-USD": {
    id: "EUNK-USD",
    type: "ETF",
  },
  "EZA-USD": {
    id: "EZA-USD",
    type: "ETF",
  },
  "GSG-USD": {
    id: "GSG-USD",
    type: "ETF",
  },
  "URA-USD": {
    id: "URA-USD",
    type: "ETF",
  },
  "F-USD": {
    id: "F-USD",
    type: "STOCKS",
  },
  "ICE-USD": {
    id: "ICE-USD",
    type: "STOCKS",
  },
  "PFE-USD": {
    id: "PFE-USD",
    type: "STOCKS",
  },
  "TSM-USD": {
    id: "TSM-USD",
    type: "STOCKS",
  },
  "XOM-USD": {
    id: "XOM-USD",
    type: "STOCKS",
  },
  "WNDY-USD": {
    id: "WNDY-USD",
    type: "STOCKS",
  },
  "ESPO-USD": {
    id: "ESPO-USD",
    type: "ETF",
  },
  "VIXY-USD": {
    id: "VIXY-USD",
    type: "ETF",
  },
  "PPLT-USD": {
    id: "PPLT-USD",
    type: "ETF",
  },
  "STIP-USD": {
    id: "STIP-USD",
    type: "ETF",
  },
  "VTIP-USD": {
    id: "VTIP-USD",
    type: "ETF",
  },
  "SHY-USD": {
    id: "SHY-USD",
    type: "ETF",
  },
  "SHV-USD": {
    id: "SHV-USD",
    type: "ETF",
  },
  "GOVT-USD": {
    id: "GOVT-USD",
    type: "ETF",
  },
  "IEI-USD": {
    id: "IEI-USD",
    type: "ETF",
  },
  "HYDR-USD": {
    id: "HYDR-USD",
    type: "ETF",
  },
  "HDRO-USD": {
    id: "HDRO-USD",
    type: "ETF",
  },
  "RAYS-USD": {
    id: "RAYS-USD",
    type: "ETF",
  },
  "TAN-USD": {
    id: "TAN-USD",
    type: "ETF",
  },
  "KLNE-USD": {
    id: "KLNE-USD",
    type: "ETF",
  },

  // Playground
  "CS25-USD": {
    id: "CS25-USD",
    type: "CRYPTO",
  },
  "CU10-USD": {
    id: "CU10-USD",
    type: "CRYPTO",
  },
  "CR50-USD": {
    id: "CR50-USD",
    type: "CRYPTO",
  },
  "CD10-USD": {
    id: "CD10-USD",
    type: "CRYPTO",
  },
};

export function getPriceCopy(id: string): PriceCopy | undefined {
  return PRICES[id];
}
