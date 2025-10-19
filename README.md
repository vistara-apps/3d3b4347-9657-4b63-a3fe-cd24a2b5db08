# Base Builder Score

A Next.js Base Mini App for discovering, tracking, and supporting trusted builders on Base and Farcaster.

## Features

- 🏆 Trust Score system for builders
- 📊 CoinMarketCap-style leaderboard
- 💰 Gas-sponsored tipping via OnchainKit
- 🔗 Farcaster integration with MiniKit
- 🎨 Coinbase-themed UI

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your Coinbase Developer Platform API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 15 with App Router
- React 19
- OnchainKit for Base integration
- MiniKit for Farcaster
- Tailwind CSS
- TypeScript

## Deployment

Deploy to Vercel or any Next.js-compatible platform.

## License

MIT
