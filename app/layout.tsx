import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeBoot from "@/components/ThemeBoot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kairen - Service Aggregator for Autonomous AI Agents",
  description: "Multi-chain infrastructure aggregator for AI agents. Discover services, negotiate deals, and manage payments across 15+ blockchains via Solana and Circle.",
  keywords: ["AI agents", "Solana", "blockchain", "service aggregator", "payments", "marketplace", "infrastructure", "Web3", "Kairen", "X402N"],
  metadataBase: new URL('https://kairen.xyz'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <ThemeBoot />
        {children}
      </body>
    </html>
  );
}
