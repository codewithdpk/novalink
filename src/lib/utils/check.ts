// @ts-nocheck

type NonMetaMaskFlag = 'isRabby' | 'isBraveWallet' | 'isTrustWallet' | 'isLedgerConnect';
const allNonMetamaskFlags: NonMetaMaskFlag[] = [
  'isRabby',
  'isBraveWallet',
  'isTrustWallet',
  'isLedgerConnect',
];

export const getIsMetaMaskWallet = () =>
  Boolean(
    window.ethereum?.isMetaMask && !allNonMetamaskFlags.some((flag) => window.ethereum?.[flag])
  );

export const getIsCoinbaseWallet = () => Boolean(window.ethereum?.isCoinbaseWallet);

export const getIsInjected = () => Boolean(window.ethereum);
