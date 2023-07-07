import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { Connector } from '@web3-react/types';
import { useCallback } from 'react';
import { Connection, ConnectionType } from '../@types/provider';
import { getIsCoinbaseWallet, getIsInjected, getIsMetaMaskWallet } from '../utils/check';
import { ethereumRpcMap } from '../utils/helpers';
import { walletConnectV2, walletConnectV2hooks } from './walletConnectv2';

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`);
}

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions: any) =>
    new Network({
      actions,
      urlMap: { 1: ethereumRpcMap[1], 137: ethereumRpcMap[137] },
      defaultChainId: 1,
    })
);

export const networkConnection: Connection = {
  getName: () => 'Network',
  getIcon: () => '/assets/images/browser-wallet-light.svg',
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
  shouldDisplay: () => false,
  overrideActivate: () => {
    return false;
  },
};

const isMobile = false;

const getIsCoinbaseWalletBrowser = () => isMobile && getIsCoinbaseWallet();
const getIsMetaMaskBrowser = () => isMobile && getIsMetaMaskWallet();
const getIsInjectedMobileBrowser = () => getIsMetaMaskBrowser();

const getShouldAdvertiseMetaMask = () =>
  !getIsMetaMaskWallet() && !isMobile && (!getIsInjected() || getIsCoinbaseWallet());
const getIsGenericInjector = () =>
  getIsInjected() && !getIsMetaMaskWallet() && !getIsCoinbaseWallet();

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
  (actions: any) => new MetaMask({ actions, onError })
);

const injectedConnection: Connection = {
  // TODO(WEB-3131) re-add "Install MetaMask" string when no injector is present
  getName: () => 'Metamask',
  getIcon: () => '/assets/images/metamask.png',
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
  shouldDisplay: () =>
    getIsMetaMaskWallet() || getShouldAdvertiseMetaMask() || getIsGenericInjector(),
  // If on non-injected, non-mobile browser, prompt user to install Metamask
  overrideActivate: () => {
    if (!getIsMetaMaskWallet()) {
      window.open('https://metamask.io/', 'inst_metamask');
      return true;
    }
    return false;
  },
};

export const walletConnectv2Connection: Connection = {
  getName: () => 'WalletConnectV2',
  getIcon: () => '/assets/images/walletConnect.png',
  connector: walletConnectV2,
  hooks: walletConnectV2hooks,
  type: ConnectionType.WALLET_CONNECT_V2,
  shouldDisplay: () => !getIsInjectedMobileBrowser(),
  overrideActivate: () => {
    return false;
  },
};


const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions: any) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: ethereumRpcMap[137],
        appName: 'Alfred',

        reloadOnDisconnect: false,
      },
      onError,
    })
);

const coinbaseWalletConnection: Connection = {
  getName: () => 'Coinbase Wallet',
  getIcon: () => '/assets/images/coinbase.png',
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
  shouldDisplay: () =>
    Boolean(
      (isMobile && !getIsInjectedMobileBrowser()) || !isMobile || getIsCoinbaseWalletBrowser()
    ),
  // If on a mobile browser that isn't the coinbase wallet browser, deeplink to the coinbase wallet app
  overrideActivate: () => {
    // if (!getIsInjectedMobileBrowser()) {
    //   window.open('https://go.cb-w.com/mtUDhEZPy1', 'cbwallet');
    //   return true;
    // }
    return false;
  },
};

export function getConnections() {
  return [
    injectedConnection,
    walletConnectv2Connection,
    coinbaseWalletConnection,
    networkConnection,
    
  ];
}

export function useGetConnection() {
  return useCallback((c: Connector | ConnectionType) => {
    if (c instanceof Connector) {
      const connection = getConnections().find((connection) => connection.connector === c);
      if (!connection) {
        throw Error('unsupported connector');
      }
      return connection;
    } else {
      switch (c) {
        case ConnectionType.INJECTED:
          return injectedConnection;
        case ConnectionType.COINBASE_WALLET:
          return coinbaseWalletConnection;
        case ConnectionType.WALLET_CONNECT_V2:
          return walletConnectv2Connection;
        case ConnectionType.NETWORK:
          return networkConnection;
      }
    }
  }, []);
}
