import { Web3ContextType, Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { BigNumber, ethers } from 'ethers';
import { Dispatch, ReactNode, SetStateAction } from 'react';
export interface UseWalletValues {
  connectors: Connection[];
  isConnectModalOpen: boolean;
  handleOpenConnectModal(): void;
  handleCloseConnectModal(): void;
  connectingState: { isConnecting: boolean; provider: string };
  setConnectingState: Dispatch<
    SetStateAction<{
      isConnecting: boolean;
      provider: string;
    }>
  >;
}

export interface WalletProviderProps {
  children: ReactNode;
}

export enum ConnectionType {
  UNISWAP_WALLET = 'UNISWAP_WALLET',
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  WALLET_CONNECT_V2 = 'WALLET_CONNECT_V2',
  NETWORK = 'NETWORK',
  GNOSIS_SAFE = 'GNOSIS_SAFE',
}

export interface Connection {
  getName(): string;
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
  getIcon(): any;
  shouldDisplay(): boolean;
  overrideActivate?: () => boolean;
  isNew?: boolean;
}

export enum ConnectionConfig {
  DEFAULT_PROVIDER = 'DEFAULT_PROVIDER',
  DEFAULT_CHAIN_ID = 'DEFAULT_CHAIN_ID',
  CONNECTION_STATE = 'CONNECTION_STATE',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export interface TXN_TYPE {
  data: string;
  from: string;
  gasLimit: BigNumber | number;
  nonce: number;
  to: string;
  maxPriorityFeePerGas: number | BigNumber;
}

export interface Web3SignResponse {
  message?: string;
  success: boolean;
  hash?: string;
  receipt?: ethers.providers.TransactionResponse;
}

export interface UseWalletProvidedValues
  extends Web3ContextType<ethers.providers.Web3Provider>,
    UseWalletValues {}
