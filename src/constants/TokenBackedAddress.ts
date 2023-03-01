interface BackedAddress {
  [key: string]: {
    link: string;
    address: string;
  };
}

export const TOKEN_BACKED_ADDRESS: BackedAddress = {
  BTC: {
    link: "https://www.blockchain.com/btc/address/38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT",
    address: "38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT",
  },
  ETH: {
    link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
  },
  USDT: {
    link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
  },
  USDC: {
    link: "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac",
    address: "0x94fa70d079d76279e1815ce403e9b985bccc82ac",
  },
  LTC: {
    link: "https://live.blockcypher.com/ltc/address/MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE",
    address: "MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE",
  },
  BCH: {
    link: "https://www.blockchain.com/bch/address/38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf",
    address: "38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf",
  },
  DOGE: {
    link: "https://dogechain.info/address/D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba",
    address: "D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba",
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
];
