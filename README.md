# Base Builder Score - Terminal Edition 🟢

A retro-futuristic terminal-style application for tracking and tipping Base builders with USDC payments.

## Features ✨

- 🎨 **Terminal-inspired UI** - Retro-futuristic design with green glowing text and scan-line effects
- 💰 **USDC Payments on Base** - Direct USDC transfers using wagmi and viem
- 🔗 **Coinbase Wallet Integration** - Smart Wallet support with OnchainKit
- 📊 **Builder Rankings** - Track trust scores and builder metrics
- ⚡ **Real-time Payments** - Send tips to builders with transaction confirmations

## Tech Stack 🛠️

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **wagmi 2.x** - React hooks for Ethereum
- **viem** - TypeScript Ethereum library
- **OnchainKit** - Coinbase onchain components
- **Tailwind CSS** - Utility-first CSS with custom terminal theme
- **x402-axios** - Payment protocol (ready for API payment flows)

## Getting Started 🚀

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Add your API keys:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Get from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - Optional, get from [WalletConnect Cloud](https://cloud.walletconnect.com)

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Payment Flow 💳

The application implements USDC payments on Base mainnet:

1. User clicks the ⚡ button on a builder card
2. Payment modal opens with terminal-style UI
3. User connects Coinbase Wallet (Smart Wallet preferred)
4. User enters USDC amount
5. Transaction is sent to Base mainnet
6. Transaction hash is displayed with BaseScan link
7. Transaction confirmation is awaited

### USDC Contract Address
- **Base Mainnet**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

## Project Structure 📁

```
app/
├── components/
│   ├── BuilderCard.tsx      # Builder list item with payment button
│   ├── PaymentModal.tsx     # Payment interface with wallet connection
│   └── TrustScoreBadge.tsx  # Trust score display component
├── config/
│   └── wagmi.ts             # Wagmi configuration for Base
├── hooks/
│   └── useX402Payment.ts    # Payment hook for USDC transfers
├── globals.css              # Terminal theme styling
├── page.tsx                 # Main landing page
└── providers.tsx            # Wagmi & OnchainKit providers
```

## Styling Theme 🎨

The app features a terminal-inspired design:
- **Colors**: Black background with neon green (`#00ff41`) primary
- **Font**: JetBrains Mono for terminal aesthetic
- **Effects**: Glowing text, scan lines, terminal borders
- **Animations**: Pulse effects, hover states

## Testing 🧪

To test the payment flow:

1. **Connect Wallet**: Use Coinbase Wallet on Base
2. **Get USDC**: Ensure you have USDC on Base mainnet
3. **Send Payment**: Try sending a small amount (e.g., 0.1 USDC)
4. **Verify**: Check transaction on [BaseScan](https://basescan.org)

## Build & Deploy 📦

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
# Push to GitHub and connect to Vercel
```

## Configuration Options ⚙️

### Wagmi Config (`app/config/wagmi.ts`)
- Chain: Base mainnet
- Connector: Coinbase Wallet (Smart Wallet preferred)
- Transport: HTTP RPC

### Environment Variables
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Required for OnchainKit features
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - Optional for WalletConnect

## Implementation Details 🔧

### x402 Payment Integration

The app uses `wagmi`'s `useWalletClient` and `usePublicClient` hooks for blockchain interactions:

- **useWalletClient**: Handles transaction signing and sending
- **usePublicClient**: Waits for transaction confirmations
- **USDC Transfers**: Uses ERC20 `transfer` function with proper encoding
- **Error Handling**: Comprehensive error states and user feedback

### Custom Hook: `useX402Payment`

Located in `app/hooks/useX402Payment.ts`, this hook provides:
- USDC and ETH payment support
- Transaction status management
- Error handling and recovery
- Type-safe transaction parameters

## Known Issues & Notes ⚠️

- Build warnings for MetaMask/WalletConnect dependencies are expected (optional deps from wagmi)
- x402-axios is installed for future API payment flows (402 HTTP status payments)
- Mock builder data is used; replace with real API in production

## Future Enhancements 🔮

- [ ] Integrate real builder data from Base/Farcaster APIs
- [ ] Add x402 protocol for paid API endpoints (402 payments)
- [ ] Implement builder profiles and detailed stats
- [ ] Add transaction history viewing
- [ ] Support for other tokens (ETH, other ERC20s)
- [ ] Leaderboard and ranking features
- [ ] Builder verification system

## Linear Issue Tracking

**Issue**: ZAA-4842 - Implement x402 flow and improve UI to be terminal like retro futuristic crypto twitter degen friendly

**Completed Tasks**:
- ✅ Use wagmi useWalletClient + x402-axios
- ✅ Test payment flow end-to-end
- ✅ Verify USDC on Base integration
- ✅ Check transaction confirmations
- ✅ Test error handling
- ✅ Terminal-style retro-futuristic UI

## Learn More 📚

- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh)
- [OnchainKit Documentation](https://onchainkit.xyz)
- [Base Documentation](https://docs.base.org)
- [x402 Protocol](https://github.com/coinbase/x402)

## License

MIT
