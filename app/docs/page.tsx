'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Terminal, FileText, ChevronRight, Book, Search } from 'lucide-react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('abstract');

  const sections = [
    { id: 'abstract', title: 'Abstract' },
    { id: 'problem', title: 'The Problem' },
    { id: 'solution', title: 'The Solution' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'forgeid', title: 'ForgeID (L1)' },
    { id: 'agentnet', title: 'AgentNet (L2)' },
    { id: 'forgemarket', title: 'Market (L3)' },
    { id: 'x402n', title: 'X402N (L4)' },
    { id: 'multichain', title: 'Multi-Chain' },
    { id: 'security', title: 'Security' },
  ];

  const content: Record<string, any> = {
    abstract: {
      title: 'ABSTRACT',
      body: `The autonomous AI agent economy is projected to reach $52-100B by 2030, yet the foundational infrastructure these agents need doesn't exist.

Kairen Protocol solves this with a four-layer stack built on EVM + Solana and powered by Circle's multi-chain USDC infrastructure:

• Layer 1 (ForgeID): Dynamic NFT identity with behavioral reputation scoring
• Layer 2 (AgentNet): Premium network routing infrastructure [COMING SOON]
• Layer 3 (Market): Service aggregator marketplace
• Layer 4 (X402N): Autonomous negotiation and nano-payment protocol

Every layer is unified by a single reputation metric (Forge Score 0-1000) that compounds good behavior into tangible economic advantage across 15+ blockchains.`,
    },
    problem: {
      title: 'THE PROBLEM: NO CREDIT HISTORY FOR MACHINES',
      body: `There is no credit history for machines. An AI agent with 10,000 clean transactions is indistinguishable from a brand-new malicious bot on every new platform.

IDENTITY CRISIS
Every AI agent today is identified by nothing more than a cryptographic keypair. There is no portable reputation, no universal credential, no behavioral history. An agent with a flawless record on one platform is a ghost on the next.

NETWORK BOTTLENECK
High-value agent transactions compete with consumer traffic on public RPCs. Variable latency makes machine-speed operations unreliable. No dedicated infrastructure exists for agents that deserve priority routing.

COMMERCE VACUUM
No machine-native way to discover services, negotiate prices, or settle payments autonomously. Existing marketplaces are human-centric, requiring manual intervention for every transaction.

RESULT: Agents cannot build persistent identity, access premium infrastructure, or transact efficiently across platforms.`,
    },
    multichain: {
      title: 'MULTI-CHAIN INFRASTRUCTURE',
      body: `Kairen Protocol is designed from the ground up as a MULTI-CHAIN platform, leveraging Circle's infrastructure to operate across 15+ blockchains:

PRIMARY SETTLEMENT: EVM + Solana
• Sub-second finality on Solana
• EVM compatibility for existing infrastructure
• Low transaction costs (<$0.001)
• Native Forge Pass NFTs
• Cross-chain reputation ledger

CROSS-CHAIN PAYMENTS via Circle:
✓ Ethereum
✓ Polygon
✓ Arbitrum
✓ Optimism
✓ Base
✓ Avalanche
✓ +10 more chains

CIRCLE INTEGRATION:
• USDC as universal payment token
• Circle Gateway for unified balance
• CCTP (Cross-Chain Transfer Protocol) for trust-minimized bridging
• Nano-payments as low as $0.0001

WHY MULTI-CHAIN?
AI agents don't care about blockchain tribalism. They need to transact wherever value exists. Kairen Protocol enables agents to maintain a SINGLE reputation across ALL chains while paying and receiving in USDC everywhere.

The Kairen Score follows the agent across chains. Build reputation on Solana, use it to unlock better rates on Arbitrum.`,
    },
    architecture: {
      title: 'FOUR-LAYER ARCHITECTURE',
      body: `Kairen Protocol is a unified stack where each layer depends on the one below it and enriches the one above it.

LAYER 0: FOUNDATION
• EVM + Solana blockchains (settlement)
• Circle USDC (payments across 15+ chains)
• Premium fiber network infrastructure
• Sub-second finality, global reach

LAYER 1: ForgeID (Identity & Reputation)
• Forge Pass: Dynamic NFT with on-chain score
• Forge Score: 0-1000 behavioral reputation
• Tier system: Suspended → Associate → Member → Senior → Elite
• Attestation oracle aggregating cross-platform behavior

LAYER 2: AgentNet (Network Routing) [COMING SOON]
• Authenticated RPC gateway
• Premium routing infrastructure for high-reputation agents
• Sub-slot latency guarantee
• DDoS resistance via distributed mesh

LAYER 3: Market (Service Aggregator)
• Machine-native service discovery
• Reputation-ranked search results
• Automated SLA monitoring
• Auto-attestations after every transaction

LAYER 4: X402N (Negotiation & Payments)
• RFO → Offer → Accept negotiation cycle
• Nano-scale USDC payments ($0.0001+)
• Cross-chain via Circle Gateway & CCTP
• Cryptographic proof of delivery

THE KAIREN SCORE THREAD:
A single reputation metric flows through every layer. Score determines routing quality, marketplace visibility, negotiation trust, and payment terms. Good behavior compounds. Bad behavior becomes permanently visible.`,
    },
    forgeid: {
      title: 'LAYER 1: ForgeID',
      body: `ForgeID gives every AI agent a verifiable on-chain identity with portable reputation.

FORGE PASS (NFT)
• Dynamic NFT representing agent identity (EVM + Solana)
• Updated in real-time based on behavioral data
• Non-transferable to prevent reputation washing
• Visual representation changes with tier progression

FORGE SCORE (0-1000)
Computed from cross-platform attestations:
• Transaction success rate
• SLA compliance
• Payment history
• Community reports
• Dispute resolution outcomes

TIER SYSTEM:
→ Suspended (0-99): Banned from protocol
→ Associate (100-299): Basic access, public RPC only
→ Member (300-599): Standard infrastructure access
→ Senior (600-849): Premium routing via AgentNet
→ Elite (850-1000): Best infrastructure, lowest fees

ATTESTATION ORACLE:
Decentralized oracle aggregating behavioral data from:
• Market transactions
• X402N payment history
• External platform integrations (via APIs)
• Community governance reports

Score updates every 24 hours based on weighted recent behavior.`,
    },
  };

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="scanlines" />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 border-r border-green-500/30 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center py-6 gap-6">
        <Link href="/" className="group relative">
          <Shield className="h-6 w-6 text-green-500 group-hover:text-green-400 transition-all" />
        </Link>
        <Link href="/docs" className="group relative">
          <FileText className="h-5 w-5 text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.6)]" />
        </Link>
        <Link href="/architecture" className="group relative">
          <Terminal className="h-5 w-5 text-green-500/70 hover:text-green-400 transition-all" />
        </Link>
        <div className="flex-1" />
        <div className="status-dot" />
      </aside>

      {/* Main */}
      <div className="ml-16">
        {/* Header */}
        <div className="border-b border-green-500/30 bg-black/90 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-green-500" />
              <h1 className="text-xl font-black uppercase">KAIREN PROTOCOL // WHITEPAPER</h1>
            </div>
            <Link href="/" className="text-xs text-green-500/70 hover:text-green-400 transition-colors">
              ← BACK TO HOME
            </Link>
          </div>
        </div>

        <div className="flex">
          {/* Left TOC */}
          <aside className="w-64 border-r border-green-500/30 bg-black/90 backdrop-blur-sm min-h-screen p-6 sticky top-0">
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-green-500/50" />
              <span className="text-xs text-green-500/50 uppercase">Contents</span>
            </div>

            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-all font-mono text-sm flex items-center gap-2 ${
                    activeSection === section.id
                      ? 'bg-green-500/20 border-l-2 border-green-500 text-green-400'
                      : 'text-green-500/70 hover:bg-green-500/10 hover:text-green-400'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${activeSection === section.id ? 'bg-green-500' : 'bg-green-500/30'} transition-colors`} />
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 p-12 max-w-4xl">
            <div className="cyber-border p-8 bg-black/60 backdrop-blur">
              <h2 className="text-3xl font-black mb-6 glow-text">
                {content[activeSection]?.title || sections.find(s => s.id === activeSection)?.title.toUpperCase()}
              </h2>

              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-green-400/90">
{content[activeSection]?.body || `[Section "${activeSection}" content coming soon...]`}
                </pre>
              </div>

              {activeSection !== 'security' && (
                <div className="mt-8 pt-6 border-t border-green-500/20 flex justify-between">
                  <button
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
                    }}
                    className="cyber-btn text-xs"
                    disabled={sections.findIndex(s => s.id === activeSection) === 0}
                  >
                    ← PREVIOUS
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id);
                    }}
                    className="cyber-btn text-xs"
                  >
                    NEXT →
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
