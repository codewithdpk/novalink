import { ethers } from 'ethers';
import useWallet from './useWallet';
import { TXN_TYPE, Web3SignResponse } from '../@types/provider';
import { useState } from 'react';

interface UseSignTransactionProps {
  watchTransaction(hash: string): void;
}

export default function useSignTransaction({ watchTransaction }: UseSignTransactionProps) {
  const { connector, account, provider } = useWallet();

  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<ethers.providers.TransactionResponse | null>(null);

  async function signTxn(txn: TXN_TYPE) {
    const response: Web3SignResponse = {
      success: false,
      message: '',
    };
    if (!connector || !account) {
      console.error('Not connected');
      response.success = false;
      response.message = 'Wallet is not connected.';
      return response;
    }


    try {
      let signer: ethers.providers.JsonRpcSigner;
      if (provider) {
        setIsSigning(true);
        signer = provider.getSigner();
        const signedTransaction = await signer.sendTransaction(txn);
        console.info('useSignTransaction:', signedTransaction);
        watchTransaction(signedTransaction.hash);
        setReceipt(signedTransaction);
        setIsSigning(false);
        response.success = true;
        response.message = 'Transaction sent successfully.';
        response.hash = signedTransaction.hash;
        response.receipt = signedTransaction;
        return response;
      }
    } catch (e) {
      console.error('useSignTransaction:', e);
      response.success = false;
      response.message = `Something went wrong while signing the transaction: ${JSON.stringify(e)}`;
      return response;
    }
  }

  return { signTxn, isSigning, receipt };
}
