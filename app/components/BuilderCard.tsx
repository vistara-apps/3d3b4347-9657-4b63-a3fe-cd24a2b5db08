'use client';

import { useState } from 'react';
import { TrustScoreBadge } from './TrustScoreBadge';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface Builder {
  id: string;
  name: string;
  username: string;
  avatar: string;
  trustScore: number;
  projects: string;
  symbol: string;
  price: string;
  priceChange: number;
  volume: string;
  marketCap: string;
  tips: string;
  category: 'high' | 'medium' | 'low';
}

interface BuilderCardProps {
  builder: Builder;
}

export function BuilderCard({ builder }: BuilderCardProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const isPositive = builder.priceChange > 0;

  return (
    <>
      <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-primary/5 transition-all duration-200 border-l-2 border-transparent hover:border-primary group">
        {/* Coin Name */}
        <div className="col-span-3 flex items-center gap-3">
          <span className="text-2xl group-hover:scale-110 transition-transform">{builder.avatar}</span>
          <div>
            <p className="font-bold text-text-primary font-mono group-hover:text-primary transition-colors">
              {builder.name}
            </p>
            <p className="text-sm text-text-secondary font-mono">{builder.username}</p>
          </div>
        </div>

        {/* Projects */}
        <div className="col-span-2 flex items-center">
          <p className="text-text-primary font-mono">{builder.projects}</p>
        </div>

        {/* Symbol */}
        <div className="col-span-1 flex items-center">
          <span className="text-primary font-bold font-mono">{builder.symbol}</span>
        </div>

        {/* Price */}
        <div className="col-span-1 flex items-center">
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-danger" />
            )}
            <span className="text-text-primary font-bold font-mono">{builder.price}</span>
          </div>
        </div>

        {/* Price Change */}
        <div className="col-span-1 flex items-center">
          <span className="text-text-primary font-mono">{builder.volume}</span>
        </div>

        {/* Trust Score */}
        <div className="col-span-2 flex items-center">
          <TrustScoreBadge score={builder.trustScore} category={builder.category} />
        </div>

        {/* Volume */}
        <div className="col-span-1 flex items-center">
          <span className="text-text-primary font-mono">{builder.marketCap}</span>
        </div>

        {/* Tips & Pay Button */}
        <div className="col-span-1 flex items-center gap-2">
          <span className="text-text-primary font-mono">{builder.tips}</span>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 p-1.5 rounded hover:shadow-lg hover:shadow-primary/30"
            title="Send payment"
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>

      <PaymentModal
        builder={builder}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </>
  );
}
