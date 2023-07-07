import useWallet from './useWallet';

export default function useIsConnected() {
  const { isActive } = useWallet();
  return isActive;
}
