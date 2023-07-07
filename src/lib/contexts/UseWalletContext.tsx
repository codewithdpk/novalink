import { useWeb3React } from '@web3-react/core';
import { createContext, useEffect, useState } from 'react';
import { ConnectionConfig, UseWalletValues, WalletProviderProps } from '../@types/provider';
import { getConnections } from '../connectors';

const defaultValues: UseWalletValues = {
  connectors: getConnections(),
  isConnectModalOpen: false,
  connectingState: { isConnecting: false, provider: '' },
  setConnectingState: () => {
    return;
  },
  handleCloseConnectModal: () => {
    return;
  },
  handleOpenConnectModal: () => {
    return;
  },
};

export const UseWalletContext = createContext(defaultValues);

export default function WalletProvider({ children }: WalletProviderProps) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);

  const [connectingState, setConnectingState] = useState<{
    isConnecting: boolean;
    provider: string;
  }>({
    isConnecting: false,
    provider: '',
  });
  const { isActive, isActivating } = useWeb3React();

  const connections = getConnections();

  function handleOpenConnectModal() {
    setIsConnectModalOpen(true);
  }

  function handleCloseConnectModal() {
    setIsConnectModalOpen(false);
  }

  async function checkPreConnections() {
    const connectionState = localStorage.getItem(ConnectionConfig.CONNECTION_STATE);
    if (connectionState === ConnectionConfig.CONNECTED) {
      const defaultProvider = JSON.parse(
        localStorage.getItem(ConnectionConfig.DEFAULT_PROVIDER) || ''
      );

      if (defaultProvider) {
        const defaultConnector = connections.filter(
          (conn) => conn.getName() === defaultProvider
        )[0];
        setConnectingState({ isConnecting: true, provider: defaultConnector?.getName() });
        console.log('defaultConnector', defaultConnector);
        await defaultConnector?.connector?.activate();
        setConnectingState({ isConnecting: false, provider: '' });
      }
    }
  }

  useEffect(() => {
    checkPreConnections();
  }, []);

  useEffect(() => {
    if (isActive) {
      localStorage.setItem(
        ConnectionConfig.DEFAULT_PROVIDER,
        JSON.stringify(connectingState.provider)
      );
      localStorage.setItem(ConnectionConfig.CONNECTION_STATE, ConnectionConfig.CONNECTED);
      setIsConnectModalOpen(false);
      setConnectingState({ isConnecting: false, provider: '' });
    }
  }, [isActivating, isActive]);

  return (
    <UseWalletContext.Provider
      value={{
        isConnectModalOpen,
        handleOpenConnectModal,
        handleCloseConnectModal,
        connectors: connections,
        setConnectingState,
        connectingState,
      }}
    >
      {children}
    </UseWalletContext.Provider>
  );
}
