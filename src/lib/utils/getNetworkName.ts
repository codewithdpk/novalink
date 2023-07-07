export default function getNetworkName(chainId: number | null) {
  switch (chainId) {
    case 1:
      return 'Mainnet';
    case 4:
      return 'Rinkeby';
    case 5:
      return 'Goerli';
    case 42:
      return 'Kovan';
    case 56:
      return 'Binance Smart Chain Mainnet';
    case 97:
      return 'Binance Smart Chain Testnet';
    case 137:
      return 'Polygon Mainnet';
    case 80001:
      return 'Polygon Testnet';
    case 34983493:
      return 'Solana';
    case 42161:
      return 'Arbitrum';
    default:
      return 'Unknown';
  }
}
