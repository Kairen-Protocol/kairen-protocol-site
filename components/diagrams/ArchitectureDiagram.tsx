'use client';

import { ArrowDown, Shield, Network, Store, Zap } from 'lucide-react';

export default function ArchitectureDiagram() {
  return (
    <div className="my-8 p-6 cyber-border bg-black/60">
      <h3 className="text-xs uppercase tracking-wider text-green-500/70 mb-6 text-center">
        KAIREN PROTOCOL STACK
      </h3>

      <div className="space-y-4">
        {/* Layer 4 - X402N */}
        <div className="relative">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/20 to-green-500/5 border-l-4 border-green-500">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-green-500/50">L4</span>
                <span className="text-sm font-bold text-green-400 uppercase tracking-wider">X402N</span>
                <span className="ml-auto text-xs bg-green-500 text-black px-2 py-0.5 font-bold">LIVE</span>
              </div>
              <p className="text-xs text-green-400/70 font-mono">
                Negotiation • Payments • Deals • Settlement
              </p>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <ArrowDown className="h-4 w-4 text-green-500/50" />
          </div>
        </div>

        {/* Layer 3 - Market */}
        <div className="relative">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 border-l-4 border-cyan-500">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center">
                <Store className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-cyan-500/50">L3</span>
                <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Market</span>
                <span className="ml-auto text-xs bg-cyan-500 text-black px-2 py-0.5 font-bold">LIVE</span>
              </div>
              <p className="text-xs text-cyan-400/70 font-mono">
                Service Aggregation • Discovery • Reputation
              </p>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <ArrowDown className="h-4 w-4 text-green-500/50" />
          </div>
        </div>

        {/* Layer 2 - AgentNet */}
        <div className="relative">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-l-4 border-yellow-500">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center">
                <Network className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-yellow-500/50">L2</span>
                <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">AgentNet</span>
                <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-0.5 font-bold">Q3 2026</span>
              </div>
              <p className="text-xs text-yellow-400/70 font-mono">
                Premium RPC • Routing • Infrastructure
              </p>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <ArrowDown className="h-4 w-4 text-green-500/50" />
          </div>
        </div>

        {/* Layer 1 - ForgeID */}
        <div className="relative">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/20 to-purple-500/5 border-l-4 border-purple-500">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-purple-500/50">L1</span>
                <span className="text-sm font-bold text-purple-400 uppercase tracking-wider">ForgeID</span>
                <span className="ml-auto text-xs bg-purple-500 text-black px-2 py-0.5 font-bold">Q2 2026</span>
              </div>
              <p className="text-xs text-purple-400/70 font-mono">
                Identity • Reputation • Forge Score (0-1000)
              </p>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <ArrowDown className="h-4 w-4 text-green-500/50" />
          </div>
        </div>

        {/* Layer 0 - Foundation */}
        <div className="relative">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/20 to-blue-500/5 border-l-4 border-blue-500">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                <span className="text-blue-400 font-bold text-xs">L0</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-blue-500/50">L0</span>
                <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Foundation</span>
              </div>
              <p className="text-xs text-blue-400/70 font-mono">
                EVM + Solana • Circle USDC • 15+ Chains
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-green-500/20">
        <p className="text-[10px] text-green-500/50 font-mono text-center">
          Each layer enriches the one above • Unified by Kairen Score
        </p>
      </div>
    </div>
  );
}
