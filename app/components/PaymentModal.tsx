'use client';

import { useState } from 'react';
import { X, Terminal, DollarSign, Zap } from 'lucide-react';
import { useX402Payment } from '../hooks/useX402Payment';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface PaymentModalProps {
  builder: {
    name: string;
    username: string;
    avatar: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ builder, isOpen, onClose }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);
  const { sendPayment, isLoading, error } = useX402Payment();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    // Mock recipient address for demo (in production, this would come from the builder)
    const recipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    
    const result = await sendPayment({
      amount,
      recipient,
      currency: 'USDC',
    });

    if (result.success && result.txHash) {
      setTxHash(result.txHash);
      setTimeout(() => {
        onClose();
        setAmount('');
        setTxHash(null);
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface border-2 border-primary/40 rounded-lg max-w-md w-full shadow-2xl shadow-primary/20">
        {/* Terminal Header */}
        <div className="bg-primary/10 border-b-2 border-primary/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary font-mono font-bold tracking-wider">
              {'>'} PAY_MODULE_v2.0
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Builder Info */}
          <div className="bg-bg border border-primary/20 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{builder.avatar}</span>
              <div>
                <p className="text-text-primary font-mono font-bold">{builder.name}</p>
                <p className="text-text-secondary text-sm font-mono">{builder.username}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-success text-sm font-mono">
              <Zap className="w-4 h-4" />
              <span>VERIFIED_BUILDER</span>
            </div>
          </div>

          {/* Wallet Connection */}
          {!isConnected ? (
            <div className="space-y-3">
              <p className="text-text-secondary font-mono text-sm">
                {'>'} CONNECT_WALLET_TO_PROCEED
              </p>
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 px-4 py-3 rounded font-mono font-bold transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
                >
                  {'>'} CONNECT_{connector.name.toUpperCase()}
                </button>
              ))}
            </div>
          ) : (
            <>
              {/* Amount Input */}
              <div>
                <label className="block text-text-secondary text-sm mb-2 font-mono">
                  {'>'} AMOUNT_IN_USDC
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-bg text-text-primary pl-10 pr-4 py-3 rounded border-2 border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono text-lg transition-all duration-200"
                    disabled={isLoading || !!txHash}
                  />
                </div>
              </div>

              {/* Connected Wallet Info */}
              <div className="bg-success/10 border border-success/40 rounded p-3">
                <p className="text-success text-xs font-mono mb-1">WALLET_CONNECTED</p>
                <p className="text-text-primary text-sm font-mono truncate">
                  {address}
                </p>
                <button
                  onClick={() => disconnect()}
                  className="mt-2 text-xs text-danger font-mono hover:underline"
                >
                  {'>'} DISCONNECT
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-danger/10 border border-danger/40 rounded p-3">
                  <p className="text-danger text-sm font-mono">ERROR: {error}</p>
                </div>
              )}

              {/* Success Message */}
              {txHash && (
                <div className="bg-success/10 border border-success/40 rounded p-3 animate-pulse">
                  <p className="text-success text-sm font-mono mb-2">
                    {'>'} TX_SUCCESS
                  </p>
                  <a
                    href={`https://basescan.org/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xs font-mono hover:underline break-all"
                  >
                    {txHash}
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-surface hover:bg-surface/80 text-text-secondary border border-primary/20 px-4 py-3 rounded font-mono font-bold transition-all duration-200"
                  disabled={isLoading}
                >
                  CANCEL
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isLoading || !amount || parseFloat(amount) <= 0 || !!txHash}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white border-2 border-primary px-4 py-3 rounded font-mono font-bold transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {isLoading ? 'PROCESSING...' : '>'} SEND_USDC
                </button>
              </div>
            </>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="bg-primary/10 border-t-2 border-primary/40 px-6 py-3">
          <p className="text-primary/60 text-xs font-mono text-center">
            POWERED_BY_X402_PROTOCOL | BASE_MAINNET
          </p>
        </div>
      </div>
    </div>
  );
}
