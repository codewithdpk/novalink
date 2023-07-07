import { initializeConnector } from '@web3-react/core';

import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';

export const [walletConnectV2, walletConnectV2hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
        chains: [1, 137, 42161],
        optionalChains: [1, 137, 42161],
        showQrModal: true,
      },
    })
);
