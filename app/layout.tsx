import type { Metadata } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Kairen | Sealed-Bid Procurement on Solana',
  description:
    'Kairen is a sealed-bid procurement engine for teams, DAOs, and AI agents. Create escrow-backed tenders, collect hidden bids, and settle digital work onchain.',
  keywords: [
    'Kairen',
    'procurement',
    'Solana',
    'sealed bids',
    'escrow',
    'AI agents',
    'DAO tooling',
  ],
  metadataBase: new URL('https://kairen.xyz'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
