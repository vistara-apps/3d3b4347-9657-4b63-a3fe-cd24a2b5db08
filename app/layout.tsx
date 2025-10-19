import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Base Builder Score',
  description: 'Discover, track, and support the most trusted builders on Base and Farcaster',
  openGraph: {
    title: 'Base Builder Score',
    description: 'Discover, track, and support the most trusted builders on Base and Farcaster',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
