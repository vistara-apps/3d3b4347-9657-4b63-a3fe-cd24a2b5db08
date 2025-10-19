'use client';

import { useEffect, useState } from 'react';
import { Search, TrendingUp, Award, DollarSign } from 'lucide-react';
import { BuilderCard } from './components/BuilderCard';
import { TrustScoreBadge } from './components/TrustScoreBadge';

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

const mockBuilders: Builder[] = [
  {
    id: '1',
    name: 'Name',
    username: 'Coin Nanane',
    avatar: '🟡',
    trustScore: 8.1,
    projects: 'Coin Nanane',
    symbol: '+$',
    price: '$18.70',
    priceChange: 3.4,
    volume: '$34',
    marketCap: '$.0',
    tips: '$4',
    category: 'high',
  },
  {
    id: '2',
    name: 'Market Cap',
    username: 'Coin Nume',
    avatar: '🟣',
    trustScore: 7.45,
    projects: 'Coin Nume',
    symbol: '+1',
    price: '$18.50',
    priceChange: 2.8,
    volume: '$28',
    marketCap: '$.0',
    tips: '$1',
    category: 'high',
  },
  {
    id: '3',
    name: 'Market Cap',
    username: '$24.15y',
    avatar: '⚪',
    trustScore: 6.51,
    projects: '$24.15y',
    symbol: '+$',
    price: '$15.70',
    priceChange: 1.2,
    volume: '$25',
    marketCap: '$.1',
    tips: '$1',
    category: 'medium',
  },
  {
    id: '4',
    name: 'Trust Cap',
    username: '1,245 Hrvos',
    avatar: '🟡',
    trustScore: 5.765,
    projects: '1,245 Hrvos',
    symbol: '+$',
    price: '$15.00',
    priceChange: -1.5,
    volume: '$34',
    marketCap: '$.0',
    tips: '$4',
    category: 'medium',
  },
  {
    id: '5',
    name: 'Market Cap',
    username: '1,140 Fruns',
    avatar: '🔵',
    trustScore: 5.5,
    projects: '1,140 Fruns',
    symbol: '+$',
    price: '$16.50',
    priceChange: 4.4,
    volume: '$25',
    marketCap: '$.4',
    tips: '$4',
    category: 'medium',
  },
  {
    id: '6',
    name: 'Low Score',
    username: '$.25.Gelcoun',
    avatar: '🔴',
    trustScore: 3.27,
    projects: '$.25.Gelcoun',
    symbol: '+$',
    price: '$10.80',
    priceChange: -2.3,
    volume: '$34',
    marketCap: '$.4',
    tips: '$4',
    category: 'low',
  },
  {
    id: '7',
    name: 'Trust Score',
    username: '1.36 Nevel',
    avatar: '🔷',
    trustScore: 3.77,
    projects: '1.36 Nevel',
    symbol: '+$',
    price: '$18.50',
    priceChange: 1.8,
    volume: '$24',
    marketCap: '$.4',
    tips: '$3',
    category: 'low',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBuilders = mockBuilders.filter(
    (builder) =>
      builder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      builder.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-bg p-4 md:p-8 scan-line">
      <div className="max-w-7xl mx-auto">
        {/* Terminal Header */}
        <div className="mb-8 terminal-border bg-surface border-2 border-primary/40 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary text-2xl animate-pulse">█</span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary font-mono terminal-glow">
              {'>'} BASE_BUILDER_TERMINAL
            </h1>
          </div>
          <p className="text-text-secondary font-mono text-sm">
            {'>'} TRACKING_VERIFIED_BUILDERS_ON_BASE_MAINNET | STATUS: <span className="text-success">ONLINE</span>
          </p>
          <p className="text-text-secondary/60 font-mono text-xs mt-2">
            SYSTEM_VERSION: 2.0.1 | PROTOCOL: X402 | CHAIN: BASE
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="> SEARCH_BUILDERS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface text-primary px-4 py-3 pl-12 rounded border-2 border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-mono terminal-border"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface p-6 rounded border-2 border-primary/40 terminal-border hover:border-primary transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-text-secondary text-sm font-mono">TOTAL_BUILDERS</span>
            </div>
            <p className="text-2xl font-bold text-primary font-mono terminal-glow">1,245</p>
          </div>
          <div className="bg-surface p-6 rounded border-2 border-primary/40 terminal-border hover:border-primary transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-text-secondary text-sm font-mono">AVG_TRUST_SCORE</span>
            </div>
            <p className="text-2xl font-bold text-accent font-mono terminal-glow">6.8</p>
          </div>
          <div className="bg-surface p-6 rounded border-2 border-primary/40 terminal-border hover:border-primary transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-warning" />
              <span className="text-text-secondary text-sm font-mono">TOTAL_TIPS_USDC</span>
            </div>
            <p className="text-2xl font-bold text-warning font-mono terminal-glow">$45.2K</p>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-surface rounded-lg border-2 border-primary/40 overflow-hidden terminal-border">
          <div className="bg-primary/10 border-b-2 border-primary/40">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-bold text-primary font-mono">
              <div className="col-span-3">{'>'} COIN_NAME</div>
              <div className="col-span-2">PROJECTS</div>
              <div className="col-span-1">SYMBOL</div>
              <div className="col-span-1">PRICE</div>
              <div className="col-span-1">VOLUME</div>
              <div className="col-span-2">TRUST_SCORE</div>
              <div className="col-span-1">MCAP</div>
              <div className="col-span-1">TIPS</div>
            </div>
          </div>

          {/* Builder List */}
          <div className="divide-y divide-primary/20">
            {filteredBuilders.map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredBuilders.length === 0 && (
          <div className="text-center py-12 bg-surface rounded-b-lg border-2 border-t-0 border-primary/40">
            <p className="text-text-secondary font-mono">{'>'} NO_RESULTS_FOUND</p>
          </div>
        )}
      </div>
    </main>
  );
}
