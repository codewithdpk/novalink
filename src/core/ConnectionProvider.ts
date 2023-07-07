
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';
import { ConnectionProviderProps } from '../@types/connection';
import { Connection, ConnectionType } from '../lib/@types/provider';
import { getIsMetaMaskWallet } from '../lib/utils/check';
import { ethereumRpcMap } from '../lib/utils/helpers';


class ConnectionProvider {

    rpcUrls
    defaultChainId
    allowedProviders
    errors: Error[] = []
    walletConnectProjectId

    constructor(props: ConnectionProviderProps) {
        this.rpcUrls = props.rpcUrls
        this.defaultChainId = props.defaultChainId
        this.allowedProviders = props.allowedProviders
        this.walletConnectProjectId = props.walletConnectProjectId
    }


    getNetworkProvider() {
        return this._networkProvider()
    }

    getInjectedProvider() {
        return this._injectedProvider()
    }

    getCoinbaseProvider() {
        return this._coinbaseProvider()
    }

    getWalletV2Provider() {
        return this._walletConnectV2Provider()
    }

    getAllProviders() {
        const providers = this._getAllProvider()

        return providers.filter((provider) => {
            return this.allowedProviders.includes(provider.type)
        })
    }

    _getAllProvider() {
        const networkProvider = this.getNetworkProvider()
        const injectedProvider = this.getInjectedProvider()
        const walletConnectProvider = this.getWalletV2Provider()
        const coinbaseProvider = this.getCoinbaseProvider()

        const someProviders = [networkProvider, injectedProvider, coinbaseProvider]
        if (walletConnectProvider) {
            someProviders.push(walletConnectProvider)
        }

        return someProviders

    }



    _networkProvider() {
        const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
            (actions: any) =>
                new Network({
                    actions,
                    urlMap: this.rpcUrls,
                    defaultChainId: this.defaultChainId,
                })
        );

        const connection: Connection = {
            getName: () => 'Network',
            getIcon: () => '/assets/images/browser-wallet-light.svg',
            connector: web3Network,
            hooks: web3NetworkHooks,
            type: ConnectionType.NETWORK,
            shouldDisplay: () => this.allowedProviders.includes(ConnectionType.NETWORK),
            overrideActivate: () => {
                return false;
            },
        };

        return connection
    }

    _injectedProvider() {
        const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
            (actions: any) => new MetaMask({ actions, onError: this._onError })
        );

        const connection: Connection = {
            getName: () => 'Metamask',
            getIcon: () => '/assets/images/metamask.png',
            connector: web3Injected,
            hooks: web3InjectedHooks,
            type: ConnectionType.INJECTED,
            shouldDisplay: () => this.allowedProviders.includes(ConnectionType.INJECTED),
            overrideActivate: () => {
                if (!getIsMetaMaskWallet()) {
                    window.open('https://metamask.io/', 'inst_metamask');
                    return true;
                }
                return false;
            },
        };


        return connection
    }

    _walletConnectV2Provider() {
        if (typeof this.walletConnectProjectId !== 'undefined') {

            const [walletConnectV2, walletConnectV2hooks] = initializeConnector<WalletConnectV2>(
                (actions) =>
                    new WalletConnectV2({
                        actions,
                        options: {
                            projectId: this.walletConnectProjectId,
                            chains: Object.keys(this.rpcUrls).map((chain) => Number(chain)),
                            optionalChains: [],
                            showQrModal: true,
                        },
                    })
            );

            const connection: Connection = {
                getName: () => 'WalletConnectV2',
                getIcon: () => '/assets/images/walletConnect.png',
                connector: walletConnectV2,
                hooks: walletConnectV2hooks,
                type: ConnectionType.WALLET_CONNECT_V2,
                shouldDisplay: () => this.allowedProviders.includes(ConnectionType.WALLET_CONNECT_V2),
                overrideActivate: () => {
                    return false;
                },
            };

            return connection


        }
    }

    _coinbaseProvider() {
        const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
            (actions: any) =>
                new CoinbaseWallet({
                    actions,
                    options: {
                        url: ethereumRpcMap[137],
                        appName: 'Alfred',

                        reloadOnDisconnect: false,
                    },
                    onError: this._onError,
                })
        );

        const connection: Connection = {
            getName: () => 'Coinbase Wallet',
            getIcon: () => '/assets/images/coinbase.png',
            connector: web3CoinbaseWallet,
            hooks: web3CoinbaseWalletHooks,
            type: ConnectionType.COINBASE_WALLET,
            shouldDisplay: () => this.allowedProviders.includes(ConnectionType.COINBASE_WALLET),
            overrideActivate: () => {
                // if (!getIsInjectedMobileBrowser()) {
                //   window.open('https://go.cb-w.com/mtUDhEZPy1', 'cbwallet');
                //   return true;
                // }
                return false;
            },
        };

        return connection
    }


    _onError(e: Error) {
        this.errors.push(e)
    }

}

export default ConnectionProvider