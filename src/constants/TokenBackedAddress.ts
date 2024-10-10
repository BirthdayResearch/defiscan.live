interface BackedAddress {
  [key: string]: {
    cake?: {
      link: string;
      address: string;
    };
    quantum?: {
      link: string;
      address: string;
    };
  };
}

export const TOKEN_BACKED_ADDRESS: BackedAddress = {
  BTC: {
    cake: {
      link: "https://www.blockchain.com/btc/address/3GcSHxkKY8ADMWRam51T1WYxYSb2vH62VL",
      address: "3GcSHxkKY8ADMWRam51T1WYxYSb2vH62VL",
    },
    quantum: {
      link: "https://etherscan.io/address/0xc3F5f07143c567D657beFAE6752382b160d17317",
      address: "0xc3F5f07143c567D657beFAE6752382b160d17317",
    },
  },
  ETH: {
    cake: {
      link: "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      address: "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    },
    quantum: {
      link: "https://etherscan.io/address/0xc3F5f07143c567D657beFAE6752382b160d17317",
      address: "0xc3F5f07143c567D657beFAE6752382b160d17317",
    },
  },
  USDT: {
    cake: {
      link: "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      address: "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    },
    quantum: {
      link: "https://etherscan.io/address/0xc3F5f07143c567D657beFAE6752382b160d17317",
      address: "0xc3F5f07143c567D657beFAE6752382b160d17317",
    },
  },
  USDC: {
    cake: {
      link: "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      address: "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    },
    quantum: {
      link: "https://etherscan.io/address/0xc3F5f07143c567D657beFAE6752382b160d17317",
      address: "0xc3F5f07143c567D657beFAE6752382b160d17317",
    },
  },
  EUROC: {
    cake: {
      link: "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      address: "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    },
    quantum: {
      link: "https://etherscan.io/address/0xc3F5f07143c567D657beFAE6752382b160d17317",
      address: "0xc3F5f07143c567D657beFAE6752382b160d17317",
    },
  },
  LTC: {
    cake: {
      link: "https://live.blockcypher.com/ltc/address/MTorFqmHaoFSBTmRGTnN1gXRrNqxa3tn2f",
      address: "MTorFqmHaoFSBTmRGTnN1gXRrNqxa3tn2f",
    },
  },
  BCH: {
    cake: {
      link: "https://www.blockchain.com/bch/address/38dTgSFhAg9c4QRqXd5fvLCYfvUdKLjmcx",
      address: "38dTgSFhAg9c4QRqXd5fvLCYfvUdKLjmcx",
    },
  },
  DOGE: {
    cake: {
      link: "https://dogechain.info/address/9uv4fqPjSYNVNvqzbuGUMACBw67qQcLTxg",
      address: "9uv4fqPjSYNVNvqzbuGUMACBw67qQcLTxg",
    },
  },
  MATIC: {
    cake: {
      link: "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      address: "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    },
    quantum: {
      link: "https://etherscan.io/address/0xc3F5f07143c567D657beFAE6752382b160d17317",
      address: "0xc3F5f07143c567D657beFAE6752382b160d17317",
    },
  },
  SOL: {
    cake: {
      link: "https://solscan.io/account/9DT7TnLgbw175oFNuAgoMuVzJkLmpVM3eektucttVmXL",
      address: "9DT7TnLgbw175oFNuAgoMuVzJkLmpVM3eektucttVmXL",
    },
  },
  DOT: {
    cake: {
      link: "https://polkadot.subscan.io/account/12YfgqECReN4fQppa9BDoyGce43F54ZHYotE77mb5SmCBsUk",
      address: "12YfgqECReN4fQppa9BDoyGce43F54ZHYotE77mb5SmCBsUk",
    },
  },
  SUI: {
    cake: {
      link: "https://suiscan.xyz/mainnet/account/0xe319ee27de5d3cb4a2345c8b714a69d6710ca05395e3709983d886061b1b818d",
      address:
        "0xe319ee27de5d3cb4a2345c8b714a69d6710ca05395e3709983d886061b1b818d",
    },
  },
  XCHF: {
    quantum: {
      link: "https://etherscan.io/address/0xc3F5f07143c567D657beFAE6752382b160d17317",
      address: "0xc3F5f07143c567D657beFAE6752382b160d17317",
    },
  },
};

interface TokenBacked {
  name: string;
  symbol: string;
}

export const TOKEN_BACKED: TokenBacked[] = [
  {
    name: "dBTC",
    symbol: "BTC",
  },
  {
    name: "dETH",
    symbol: "ETH",
  },
  {
    name: "dUSDT",
    symbol: "USDT",
  },
  {
    name: "dUSDC",
    symbol: "USDC",
  },
  {
    name: "dEUROC",
    symbol: "EUROC",
  },
  {
    name: "dLTC",
    symbol: "LTC",
  },
  {
    name: "dBCH",
    symbol: "BCH",
  },
  {
    name: "dDOGE",
    symbol: "DOGE",
  },
  {
    name: "dMATIC",
    symbol: "MATIC",
  },
  {
    name: "dSOL",
    symbol: "SOL",
  },
  {
    name: "dDOT",
    symbol: "DOT",
  },
  {
    name: "dSUI",
    symbol: "SUI",
  },
  {
    name: "dXCHF",
    symbol: "XCHF",
  },
];
