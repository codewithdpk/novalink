import useWallet from './useWallet';

export default function useWalletAddress() {
  const { account } = useWallet();
  return account?.toLowerCase();
}
