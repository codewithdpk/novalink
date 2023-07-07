import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import { UseWalletProvidedValues } from '../@types/provider';
import { UseWalletContext } from '../contexts/UseWalletContext';

export default function useWallet(): UseWalletProvidedValues {
  const coreValues = useWeb3React();
  const additionalValues = useContext(UseWalletContext);
  return { ...coreValues, ...additionalValues, account: coreValues?.account?.toLowerCase() };
}
