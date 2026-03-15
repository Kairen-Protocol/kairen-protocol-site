'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Terminal, FileText, Layers, Network, ShoppingBag, CreditCard, Database } from 'lucide-react';
import LayerAnimations from '@/components/LayerAnimations';

export default function ArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const layers = [
    {
      id: 'x402n',
      level: 'L4',
      name: 'X402N',
      icon: CreditCard,
      category: 'PAYMENTS',
      description: 'Autonomous negotiation and nano-payment protocol',
      features: [
        'RFO → Offer → Accept negotiation cycle',
        'Nano-scale USDC payments ($0.0001+)',
        'Cross-chain via Circle Gateway & CCTP',
        'Cryptographic proof of delivery'
      ],
      color: 'text-green-400'
    },
    {
      id: 'forgemarket',
      level: 'L3',
      name: 'Market',
      icon: ShoppingBag,
      category: 'SERVICE AGGREGATOR',
      description: 'Service aggregator marketplace where providers list infrastructure',
      features: [
        'Machine-native service discovery',
        'Reputation-ranked search results',
        'Automated SLA monitoring',
        'Auto-attestations after every transaction'
      ],
      color: 'text-green-400'
    },
    {
      id: 'agentnet',
      level: 'L2',
      name: 'AgentNet',
      icon: Network,
      category: 'NETWORK',
      description: 'Premium network routing infrastructure',
      features: [
        'Authenticated RPC gateway',
        'Premium routing for high-reputation agents',
        'Sub-slot latency guarantee',
        'DDoS resistance via distributed mesh'
      ],
      color: 'text-yellow-400',
      comingSoon: true
    },
    {
      id: 'forgeid',
      level: 'L1',
      name: 'ForgeID',
      icon: Shield,
      category: 'IDENTITY',
      description: 'Dynamic NFT identity with behavioral reputation scoring',
      features: [
        'Forge Pass: Dynamic NFT (EVM + Solana)',
        'Forge Score: 0-1000 behavioral reputation',
        'Tier system: Suspended → Associate → Member → Senior → Elite',
        'Attestation oracle aggregating cross-platform behavior'
      ],
      color: 'text-green-400'
    },
    {
      id: 'foundation',
      level: 'L0',
      name: 'EVM + Solana + Circle',
      icon: Database,
      category: 'SETTLEMENT',
      description: 'Multi-chain foundation layer',
      features: [
        'EVM + Solana blockchains (settlement)',
        'Circle USDC (payments across 15+ chains)',
        'Premium fiber network infrastructure',
        'Sub-second finality, global reach'
      ],
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="scanlines" />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 border-r border-green-500/30 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center py-6 gap-6">
        <Link href="/" className="group relative">
          <Shield className="h-6 w-6 text-green-500 group-hover:text-green-400 transition-all" />
        </Link>
        <Link href="/docs" className="group relative">
          <FileText className="h-5 w-5 text-green-500/70 hover:text-green-400 transition-all" />
        </Link>
        <Link href="/about" className="group relative">
          <Terminal className="h-5 w-5 text-green-500/70 hover:text-green-400 transition-all" />
        </Link>
        <Link href="/architecture" className="group relative">
          <Network className="h-5 w-5 text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.6)]" />
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
              <Layers className="h-5 w-5 text-green-500" />
              <h1 className="text-xl font-black uppercase">KAIREN PROTOCOL // ARCHITECTURE</h1>
            </div>
            <Link href="/" className="text-xs text-green-500/70 hover:text-green-400 transition-colors">
              ← BACK TO HOME
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-0">
          {/* Main Content */}
          <div className="p-12 max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-black mb-4 glow-text">FOUR-LAYER ARCHITECTURE</h2>
              <p className="text-sm text-green-400/80 font-mono leading-relaxed mb-8">
                Kairen Protocol is a unified stack where each layer depends on the one below it and enriches the one above it. A single reputation metric (Forge Score) flows through every layer, compounding good behavior into tangible economic advantage.
              </p>

              {/* Interactive Layer Animations */}
              <div className="mb-12">
                <LayerAnimations />
              </div>
            </div>

            <div className="space-y-6">
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`cyber-border p-6 bg-black/60 backdrop-blur transition-all cursor-pointer ${
                    activeLayer === layer.id ? 'border-green-500' : ''
                  } ${layer.comingSoon ? 'coming-soon-blur' : ''}`}
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="mt-1">
                      <layer.icon className={`h-6 w-6 ${layer.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-green-500/50 font-mono">{layer.level}</span>
                        <h3 className="text-xl font-black uppercase">{layer.name}</h3>
                        <span className={`ml-auto text-xs px-2 py-1 border ${
                          layer.comingSoon
                            ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10'
                            : 'border-cyan-500 text-cyan-400 bg-cyan-500/10'
                        }`}>
                          {layer.category}
                        </span>
                      </div>
                      <p className="text-sm text-green-400/70 mb-4">{layer.description}</p>

                      {activeLayer === layer.id && !layer.comingSoon && (
                        <ul className="space-y-2 font-mono text-xs">
                          {layer.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">→</span>
                              <span className="text-green-400/80">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reputation Flow */}
            <div className="mt-12 cyber-border p-6 bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur">
              <h3 className="text-lg font-black uppercase mb-4 text-cyan-400">THE FORGE SCORE THREAD</h3>
              <p className="text-xs text-green-400/80 font-mono leading-relaxed">
                A single reputation metric flows through every layer. Score determines routing quality, marketplace visibility, negotiation trust, and payment terms. Good behavior compounds. Bad behavior becomes permanently visible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
