'use client';

import Link from 'next/link';
import { Activity, ArrowLeft, FileText, Network, Shield, Terminal } from 'lucide-react';

const principles = [
  {
    label: 'Identity',
    copy: 'ForgeID makes agent behavior legible. Reputation compounds instead of resetting at every platform boundary.',
  },
  {
    label: 'Routing',
    copy: 'AgentNet turns network quality into an earned privilege for reliable agents that need machine-speed execution.',
  },
  {
    label: 'Discovery',
    copy: 'Market aggregates supply across providers so autonomous buyers can compare infrastructure instead of browsing manually.',
  },
  {
    label: 'Settlement',
    copy: 'x402n handles negotiation, escrow, and proof-backed settlement so services can transact without human babysitting.',
  },
];

const stack = [
  { level: 'L4', name: 'x402n', status: 'Closed Beta', desc: 'Negotiation, escrow, and payment execution.' },
  { level: 'L3', name: 'Market', status: 'Closed Beta', desc: 'Service aggregation and provider discovery.' },
  { level: 'L2', name: 'AgentNet', status: 'Soon', desc: 'Dedicated routing and authenticated network access.' },
  { level: 'L1', name: 'ForgeID', status: 'Soon', desc: 'Portable identity, behavioral scoring, and access tiers.' },
  { level: 'L0', name: 'EVM + Solana + Circle', status: 'Foundation', desc: 'Cross-chain settlement, USDC rails, and finality.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="scanlines" />

      <aside className="fixed left-0 top-0 bottom-0 w-16 border-r border-green-500/30 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center py-6 gap-6">
        <Link href="/" className="group relative" title="HOME">
          <Shield className="h-6 w-6 text-green-500 group-hover:text-green-400 transition-all" />
        </Link>
        <Link href="/docs" className="group relative" title="DOCS">
          <FileText className="h-5 w-5 text-green-500/70 hover:text-green-400 transition-all" />
        </Link>
        <Link href="/about" className="group relative" title="ABOUT">
          <Terminal className="h-5 w-5 text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.6)]" />
        </Link>
        <Link href="/architecture" className="group relative" title="ARCHITECTURE">
          <Network className="h-5 w-5 text-green-500/70 hover:text-green-400 transition-all" />
        </Link>
        <div className="flex-1" />
        <div className="status-dot" />
      </aside>

      <div className="ml-16 relative z-10">
        <header className="border-b border-green-500/30 bg-black/90 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-green-500/55">About / Protocol Context</p>
              <h1 className="text-3xl font-black">WHY KAIREN EXISTS</h1>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-green-400/70 hover:text-green-300">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </header>

        <main className="px-6 py-12">
          <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="cyber-border bg-black/70 p-8 backdrop-blur-sm">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-yellow-400">Mission</p>
              <h2 className="mb-6 text-5xl leading-none glow-text">INFRASTRUCTURE FOR AGENTS THAT NEED MEMORY, ACCESS, AND MONEY MOVEMENT</h2>
              <div className="space-y-4 text-sm leading-7 text-green-300/80">
                <p>
                  Kairen is a stack for autonomous agents that need more than a wallet address. Agents need history,
                  routing priority, discovery surfaces, and programmable settlement.
                </p>
                <p>
                  The protocol is structured as four product layers on top of a shared foundation. You can think of it
                  as a five-layer system from L0 to L4: settlement, identity, network, market, and x402n execution.
                </p>
                <p>
                  The key design idea is continuity. A good agent should be able to build trust once and use that trust
                  across every surface in the stack.
                </p>
              </div>
            </div>

            <div className="cyber-card p-8">
              <div className="mb-4 flex items-center gap-3">
                <Activity className="h-5 w-5 text-cyan-400" />
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Operating Thesis</p>
              </div>
              <div className="space-y-4 text-sm leading-7 text-green-300/75">
                <p>Agents fail today because each marketplace, API, and payment rail treats them like strangers.</p>
                <p>Kairen makes agent reputation portable, then uses it to improve routing, discovery, pricing, and settlement quality.</p>
                <p>That means better infra for reliable agents and visible downside for bad behavior.</p>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-12 max-w-6xl">
            <div className="mb-6 flex items-center gap-3">
              <Network className="h-5 w-5 text-cyan-400" />
              <h2 className="text-2xl font-black">THE STACK</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {stack.map((layer) => (
                <div key={layer.level} className="cyber-border bg-black/60 p-5 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-green-500/50">{layer.level}</p>
                  <h3 className="mt-2 text-lg">{layer.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-yellow-400">{layer.status}</p>
                  <p className="mt-4 text-sm leading-6 text-green-300/70">{layer.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-12 max-w-6xl">
            <div className="grid gap-4 md:grid-cols-2">
              {principles.map((item) => (
                <div key={item.label} className="cyber-card p-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-400">{item.label}</p>
                  <p className="text-sm leading-7 text-green-300/75">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-12 max-w-6xl cyber-border bg-gradient-to-r from-green-500/8 via-cyan-500/6 to-black p-8">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-green-500/60">Next steps</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/docs" className="cyber-btn text-xs">
                Read whitepaper
              </Link>
              <Link href="/architecture" className="cyber-btn text-xs">
                Inspect architecture
              </Link>
              <a href="https://market.kairen.xyz" target="_blank" rel="noopener noreferrer" className="cyber-btn text-xs">
                Open market
              </a>
              <a href="https://x402n.kairen.xyz" target="_blank" rel="noopener noreferrer" className="cyber-btn-yellow text-xs">
                Open x402n
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
