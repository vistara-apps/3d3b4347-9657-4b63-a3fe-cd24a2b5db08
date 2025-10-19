'use client';

import { useState, useCallback } from 'react';
import { useWalletClient, usePublicClient } from 'wagmi';
import { parseEther, encodeFunctionData } from 'viem';

interface PaymentOptions {
  amount: string;
  recipient: string;
  currency?: 'USDC' | 'ETH';
}

interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

// ERC20 ABI for USDC transfer
const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

// USDC contract address on Base mainnet
const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export function useX402Payment() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendPayment = useCallback(
    async ({ amount, recipient, currency = 'USDC' }: PaymentOptions): Promise<PaymentResult> => {
      if (!walletClient) {
        const errorMsg = 'Wallet not connected';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      if (!walletClient.account) {
        const errorMsg = 'No account connected';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      setIsLoading(true);
      setError(null);

      try {
        let txHash: string;

        if (currency === 'USDC') {
          // Send USDC payment (6 decimals)
          const amountInUSDC = BigInt(Math.floor(parseFloat(amount) * 1e6));
          
          const data = encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [recipient as `0x${string}`, amountInUSDC],
          });

          txHash = await walletClient.sendTransaction({
            to: USDC_BASE_ADDRESS as `0x${string}`,
            data,
            chain: walletClient.chain,
            account: walletClient.account,
          });
        } else {
          // Send ETH payment
          const amountInWei = parseEther(amount);
          
          txHash = await walletClient.sendTransaction({
            to: recipient as `0x${string}`,
            value: amountInWei,
            chain: walletClient.chain,
            account: walletClient.account,
          });
        }

        // Wait for transaction confirmation (optional but recommended)
        if (publicClient) {
          await publicClient.waitForTransactionReceipt({ hash: txHash as `0x${string}` });
        }

        setIsLoading(false);
        return {
          success: true,
          txHash,
        };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Payment failed';
        setError(errorMsg);
        setIsLoading(false);
        return {
          success: false,
          error: errorMsg,
        };
      }
    },
    [walletClient, publicClient]
  );

  return {
    sendPayment,
    isLoading,
    error,
  };
}
