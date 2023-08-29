interface BackedAddress {
  [key: string]: {
    cake: {
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
      link: "https://www.blockchain.com/btc/address/38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT",
      address: "38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT",
    },
    quantum: {
      link: "https://etherscan.io/address/0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
      address: "0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
    },
  },
  ETH: {
    cake: {
      link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
      address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    },
    quantum: {
      link: "https://etherscan.io/address/0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
      address: "0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
    },
  },
  USDT: {
    cake: {
      link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
      address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    },
    quantum: {
      link: "https://etherscan.io/address/0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
      address: "0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
    },
  },
  USDC: {
    cake: {
      link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
      address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    },
    quantum: {
      link: "https://etherscan.io/address/0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
      address: "0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
    },
  },
  EUROC: {
    cake: {
      link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
      address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    },
    quantum: {
      link: "https://etherscan.io/address/0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
      address: "0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb",
    },
  },
  LTC: {
    cake: {
      link: "https://live.blockcypher.com/ltc/address/MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE",
      address: "MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE",
    },
  },
  BCH: {
    cake: {
      link: "https://www.blockchain.com/bch/address/38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf",
      address: "38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf",
    },
  },
  DOGE: {
    cake: {
      link: "https://dogechain.info/address/D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba",
      address: "D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba",
    },
  },
  MATIC: {
    cake: {
      link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
      address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    },
  },
  SOL: {
    cake: {
      link: "https://solscan.io/account/9XeYumALc7r4TvBvnUYrZpMXdvxKQ4mxf2WsR1gxyNNH",
      address: "9XeYumALc7r4TvBvnUYrZpMXdvxKQ4mxf2WsR1gxyNNH",
    },
  },
  DOT: {
    cake: {
      link: "https://polkadot.subscan.io/account/12YfgqECReN4fQppa9BDoyGce43F54ZHYotE77mb5SmCBsUks",
      address: "12YfgqECReN4fQppa9BDoyGce43F54ZHYotE77mb5SmCBsUk",
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
];
