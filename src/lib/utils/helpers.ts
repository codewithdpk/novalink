export const ethereumRpcMap: Record<number, string> = {
  1: 'https://node-mainnet.rarible.com',
  3: 'https://node-ropsten.rarible.com',
  // 4: 'https://node-rinkeby.rarible.com',
  5: 'https://eth-goerli.public.blastapi.io',
  42161: 'https://arbitrum-one.publicnode.com',
  17: 'https://node-e2e.rarible.com',
  56: 'https://bsc-dataseed1.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  137: 'https://polygon-rpc.com',
  80001: 'https://rpc-mumbai.maticvigil.com',
};

export const ethereumNetworkMap: Record<number, string> = {
  1: 'mainnet',
  5: 'goerli',
  17: 'e2e',
  56: 'binance',
  97: 'binance test',
  137: 'polygon',
  80001: 'mumbai',
};

export declare type ETHEREUM_NETWORK_TYPE =
  | 'ropsten'
  | 'rinkeby'
  | 'kovan'
  | 'mainnet'
  | 'goerli'
  | 'localhost'
  | 'matic'
  | 'mumbai'
  | 'xdai'
  | 'bsc_mainnet'
  | 'bsc_testnet';

export const torusEthereumNetworkMap: Record<number, ETHEREUM_NETWORK_TYPE> = {
  1: 'mainnet',
  5: 'goerli',
  137: 'matic',
  80001: 'mumbai',
  56: 'bsc_mainnet',
  97: 'bsc_testnet',
};

export const ethereumEtherscanLinksMap: Record<number, string> = {
  1: 'https://etherscan.io',
  5: 'https://goerli.etherscan.io',
  56: 'https://bscscan.com',
  97: 'https://testnet.bscscan.com',
  137: 'https://polygonscan.com',
  80001: 'https://mumbai.polygonscan.com',
  34983493: 'https://solscan.io',
  42161: 'https://arbiscan.io',
};

// TODO; need to add the type
export const envToChainIdMap: any = {
  TESTNET: {
    ETHEREUM: 5,
    POLYGON: 80001,
    BINANCE: 97,
    SOLANA: 34983493,
    FLOW: 0,
    TEZOS: 0,
    IMMUTABLEX: 0,
  },
  PRODUCTION: {
    ETHEREUM: 1,
    POLYGON: 137,
    BINANCE: 56,
    SOLANA: 34983493,
    FLOW: 0,
    TEZOS: 0,
    IMMUTABLEX: 0,
  },
};

// Chain Id's
export const ETHREUM_CHAIN_IDs = [1];
export const POLYGON_CHAIN_IDs = [137];
export const BINANCE_CHAIN_IDs = [56, 97];
export const SOLANA_CHAIN_IDs = [8899];
export const ARBITRUM_CHAIN_IDS = [42161];

export enum CHAIN_TYPE {
  ETHEREUM = 'ETHEREUM',
  POLYGON = 'POLYGON',
  BINANCE = 'BINANCE',
  SOLANA = 'SOLANA',
  FLOW = 'FLOW',
  TEZOS = 'TEZOS',
  IMMUTABLEX = 'IMMUTABLEX',
  ARBITRUM = 'ARBITRUM',
}
