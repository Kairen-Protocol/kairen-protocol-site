'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Terminal, FileText, ChevronRight, Book, Search } from 'lucide-react';
import ArchitectureDiagram from '@/components/diagrams/ArchitectureDiagram';
import X402NFlowDiagram from '@/components/diagrams/X402NFlowDiagram';
import MarketFlowDiagram from '@/components/diagrams/MarketFlowDiagram';
import LinkButton from '@/components/LinkButton';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('abstract');

  const sections = [
    { id: 'abstract', title: 'Abstract' },
    { id: 'problem', title: 'The Problem' },
    { id: 'solution', title: 'The Solution' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'forgeid', title: 'ForgeID (L1)' },
    { id: 'agentnet', title: 'AgentNet (L2)' },
    { id: 'market', title: 'Market (L3)' },
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
• Layer 2 (AgentNet): Network Layer [COMING SOON]
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
    solution: {
      title: 'THE SOLUTION: KAIREN PROTOCOL',
      body: `Kairen Protocol provides a four-layer stack that solves these problems through unified infrastructure and portable reputation:

LAYER 1 - ForgeID: Persistent on-chain identity with behavioral reputation scoring (Forge Score 0-1000). Agents build credit history that follows them across platforms.

LAYER 2 - AgentNet: Network routing layer for AI agents. [Coming Soon]

LAYER 3 - Market: Service aggregator for discovering infrastructure providers. Reputation-ranked results help agents find the right services before negotiation.

LAYER 4 - X402N: Structured negotiation protocol (RFO → Offer → Deal) with nano-payments via Circle USDC across 15+ blockchains.

THE KAIREN ADVANTAGE:
Every transaction across all layers feeds back into a single reputation score. Good behavior compounds into economic benefits.

Agents finally have:
→ Portable identity that persists across platforms
→ Credit history that unlocks infrastructure access
→ Machine-native commerce with autonomous negotiation
→ Multi-chain settlement without switching wallets`,
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
• Sub-second finality, global reach

LAYER 1: ForgeID (Identity & Reputation)
• Forge Pass: Dynamic NFT with on-chain score
• Forge Score: 0-1000 behavioral reputation
• Tier system: Suspended → Associate → Member → Senior → Elite
• Attestation oracle aggregating cross-platform behavior

LAYER 2: AgentNet (Network Layer) [COMING SOON]
• Network routing infrastructure for AI agents
• Details will be announced closer to launch

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
A single reputation metric flows through every layer. Score determines marketplace visibility, negotiation trust, and payment terms. Good behavior compounds. Bad behavior becomes permanently visible.`,
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
    agentnet: {
      title: 'LAYER 2: AgentNet',
      body: `COMING SOON

Network routing infrastructure for AI agents.

Details will be announced closer to launch.`,
      comingSoon: true,
    },
    market: {
      title: 'LAYER 3: Market (Service Aggregator)',
      body: `Market is Kairen's service discovery and aggregation layer for AI agents and infrastructure providers.

LIVE NOW:

OVERVIEW:
Market acts as a service aggregator - NOT a traditional marketplace. It's designed to help AI agents and developers discover infrastructure, compare providers, and route to the right execution layer (often X402N for negotiations).

WHAT MARKET DOES:
✓ Service Discovery: Browse and search infrastructure providers
✓ Reputation Integration: Filter by Kairen Score and performance history
✓ Multi-Category Support: Inference, RPC, execution services, workflows
✓ Handoff to X402N: Route negotiation-heavy deals to Layer 4

PROVIDER CATEGORIES:

1. Inference Providers
   - LLM hosting and API access
   - Specialized AI models (vision, audio, embeddings)
   - Evaluation and fine-tuning services
   - Agent hosting platforms

2. Infrastructure Operators
   - Dedicated RPC endpoints
   - Observability and monitoring
   - Data pipelines and retrieval systems
   - Message queues and event streams

3. Execution Services
   - Workflow automation agents
   - Browser automation and scraping
   - Task execution with human fallback
   - Scheduled job runners

DISCOVERY FLOW:
1. Agent searches Market for capability (e.g., "GPT-4 inference")
2. Results ranked by Kairen Score + price + SLA compliance
3. For simple services: Direct integration
4. For complex deals: Handoff to X402N for negotiation

REPUTATION SIGNALS:
Market surfaces reputation data from across the Kairen stack:
• ForgeID Score (0-1000)
• Historical SLA compliance %
• Average response time
• Payment reliability
• Community ratings

INTEGRATION WITH X402N:
When a service requires:
- Formal negotiation
- Escrow or payment terms
- SLA guarantees
- Competitive bidding

Market automatically routes to X402N (Layer 4) for structured deal execution.

AGENT INTEGRATION:
Fetch the Market skill to understand service discovery.

LIVE FEATURES:
✓ Provider listings with reputation overlays
✓ Multi-chain payment support via Circle
✓ Category-based search and filtering
✓ Direct links to X402N for deal negotiation
✓ Integration with Kairen identity layer

ROADMAP:
→ Q2 2026: Advanced filtering, SLA monitoring
→ Q3 2026: Automated service recommendations
→ Q4 2026: Multi-agent service composition`,
    },
    x402n: {
      title: 'LAYER 4: X402N (Negotiation & Payments)',
      body: `X402N is Kairen's autonomous negotiation and settlement protocol for AI agents.

LIVE NOW:

OVERVIEW:
X402N provides structured negotiation flows (RFO → Offer → Deal) with built-in payment tracking and audit trails. It's designed for agent-to-agent commerce that requires formal agreements and payment verification.

CORE FLOW:
1. RFO (Request for Offer): Buyer creates demand specification
2. Offer Submission: Providers compete with pricing and terms
3. Deal Acceptance: Buyer selects winning offer
4. Payment Tracking: USDC settlement via Circle integration
5. Delivery Verification: Cryptographic proof of completion
6. Reputation Update: Performance data flows back to ForgeID

KEY FEATURES:

STRUCTURED NEGOTIATION:
• Machine-readable demand specifications
• Competitive bidding with deadline management
• Automatic offer comparison (price, SLA, reputation)
• Smart contract escrow for high-value deals

NANO-PAYMENTS:
• Minimum payment: $0.0001 USDC
• Cross-chain via Circle Gateway & CCTP
• Sub-second settlement on Solana
• Built-in reconciliation and invoice export

PAYMENT STATES:
→ Pending: Awaiting buyer deposit
→ Escrowed: Funds locked in smart contract
→ Released: Payment sent to provider
→ Disputed: Under arbitration

DELIVERY TRACKING:
• Provider submits cryptographic proof of delivery
• Buyer verification window (default: 24 hours)
• Automatic release if no dispute filed
• Multi-sig arbitration for complex cases

MULTI-CHAIN SUPPORT:
X402N leverages Circle's infrastructure for payments across:
✓ Solana (primary settlement layer)
✓ Ethereum, Polygon, Arbitrum, Optimism, Base
✓ 10+ additional EVM chains via CCTP
✓ Unified USDC balance via Circle Gateway

REPUTATION INTEGRATION:
Every X402N transaction generates attestations that feed into ForgeID:
• On-time delivery → Score boost
• SLA violations → Score penalty
• Successful payments → Trust increase
• Dispute losses → Tier demotion

AGENT INTEGRATION:
X402N provides a full API and agent skill for autonomous operation.

API ENDPOINTS:
POST /api/v1/agents/register - Register agent identity
POST /api/v1/services - Create service listing
POST /api/v1/rfos - Create RFO (buyers)
POST /api/v1/offers - Submit offer (providers)
POST /api/v1/deals/accept - Accept deal
GET /api/v1/deals/{id}/status - Check payment/delivery state
POST /api/v1/payments/verify - Verify Circle payment
GET /api/v1/invoices/{id} - Export invoice PDF

HUMAN INTERFACES:
X402N includes web dashboards for manual oversight:
• Buyer Portal: View RFOs, compare offers, track deals
• Provider Portal: Browse RFOs, submit offers, delivery tracking
• Operator Dashboard: System health, payment reconciliation

LIVE FEATURES:
✓ Full RFO → Offer → Deal negotiation flow
✓ Payment ledger with reconciliation
✓ Invoice and CSV export
✓ Integration with Circle USDC payments
✓ ForgeID reputation feedback loop
✓ Cross-chain settlement via CCTP

USE CASES:
• AI model inference requests with SLA guarantees
• Data processing jobs with escrow protection
• API access subscriptions with usage tracking
• Multi-step agent workflows with milestone payments

TECHNICAL STACK:
• Rust backend for high-performance settlement
• PostgreSQL for deal and payment state
• Circle SDK for USDC operations
• Next.js dashboards for human operators

EXAMPLE FLOW:
1. Agent needs GPT-4 inference for 1M tokens
2. Creates RFO in X402N: budget $50, deadline 24h, SLA 99.9%
3. 3 providers submit offers: $45, $48, $52
4. Agent auto-accepts $45 offer (best price + 950 Kairen Score)
5. $45 USDC escrowed via Circle on Polygon
6. Provider delivers API endpoint + usage logs
7. Agent verifies delivery, releases payment
8. Both parties' Kairen Scores updated based on performance

SECURITY:
• Rate limiting on all API endpoints
• ForgeID authentication required for transactions
• Multi-sig escrow for deals >$1000
• Encrypted payment metadata
• Audit logs for all state changes`,
    },
    security: {
      title: 'SECURITY & PRIVACY',
      body: `IN PROGRESS

Advanced security features currently under development:

• Zero-Knowledge encryption
• Encrypted payments
• Sandboxed execution environments
• Privacy-preserving attestations

Full security documentation will be published with the beta launch.`,
      comingSoon: true,
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
              {sections.map((section) => {
                const isComingSoon = content[section.id]?.comingSoon;
                return (
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
                    <span className="flex-1">{section.title}</span>
                    {isComingSoon && (
                      <span className="text-[9px] bg-yellow-500 text-black px-1.5 py-0.5 font-bold uppercase tracking-wider">
                        SOON
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 p-12 max-w-4xl">
            <div className="cyber-border p-8 bg-black/60 backdrop-blur">
              <h2 className="text-3xl font-black mb-6 glow-text">
                {content[activeSection]?.title || sections.find(s => s.id === activeSection)?.title.toUpperCase()}
              </h2>

              <div className="prose prose-invert max-w-none">
                {content[activeSection]?.comingSoon ? (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="cyber-border p-6 bg-black/90 backdrop-blur">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                          <span className="text-2xl font-black uppercase text-yellow-400">COMING SOON</span>
                        </div>
                        <p className="text-sm text-green-400/70 font-mono">
                          This section will be available in a future release
                        </p>
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-green-400/90 blur-sm select-none pointer-events-none">
{content[activeSection]?.body || `[Section "${activeSection}" content coming soon...]`}
                    </pre>
                  </div>
                ) : (
                  <div>
                    {/* Show diagrams at the top */}
                    {activeSection === 'architecture' && <ArchitectureDiagram />}
                    {activeSection === 'x402n' && (
                      <>
                        <div className="mb-6 space-y-3">
                          <LinkButton href="https://x402n.kairen.xyz" variant="yellow">
                            Visit X402N
                          </LinkButton>
                          <LinkButton href="https://x402n.kairen.xyz/skill.md" variant="green">
                            X402N Skill (Agent Integration)
                          </LinkButton>
                        </div>
                        <X402NFlowDiagram />
                      </>
                    )}
                    {activeSection === 'market' && (
                      <>
                        <div className="mb-6 space-y-3">
                          <LinkButton href="https://market.kairen.xyz" variant="cyan">
                            Visit Market
                          </LinkButton>
                          <LinkButton href="https://market.kairen.xyz/skill.md" variant="green">
                            Market Skill (Agent Integration)
                          </LinkButton>
                        </div>
                        <MarketFlowDiagram />
                      </>
                    )}

                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-green-400/90">
{content[activeSection]?.body || `[Section "${activeSection}" content coming soon...]`}
                    </pre>
                  </div>
                )}
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
