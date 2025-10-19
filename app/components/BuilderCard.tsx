'use client';

import { TrustScoreBadge } from './TrustScoreBadge';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
  const isPositive = builder.priceChange > 0;

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-primary/5 transition-colors duration-200 cursor-pointer">
      {/* Coin Name */}
      <div className="col-span-3 flex items-center gap-3">
        <span className="text-2xl">{builder.avatar}</span>
        <div>
          <p className="font-medium text-text-primary">{builder.name}</p>
          <p className="text-sm text-text-secondary">{builder.username}</p>
        </div>
      </div>

      {/* Projects */}
      <div className="col-span-2 flex items-center">
        <p className="text-text-primary">{builder.projects}</p>
      </div>

      {/* Symbol */}
      <div className="col-span-1 flex items-center">
        <span className="text-text-primary font-medium">{builder.symbol}</span>
      </div>

      {/* Price */}
      <div className="col-span-1 flex items-center">
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-danger" />
          )}
          <span className="text-text-primary font-medium">{builder.price}</span>
        </div>
      </div>

      {/* Price Change */}
      <div className="col-span-1 flex items-center">
        <span className="text-text-primary">{builder.volume}</span>
      </div>

      {/* Trust Score */}
      <div className="col-span-2 flex items-center">
        <TrustScoreBadge score={builder.trustScore} category={builder.category} />
      </div>

      {/* Volume */}
      <div className="col-span-1 flex items-center">
        <span className="text-text-primary">{builder.marketCap}</span>
      </div>

      {/* Tips */}
      <div className="col-span-1 flex items-center">
        <span className="text-text-primary">{builder.tips}</span>
      </div>
    </div>
  );
}
