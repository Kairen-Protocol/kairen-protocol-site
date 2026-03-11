'use client';

import { Search, Filter, Link2, TrendingUp } from 'lucide-react';

export default function MarketFlowDiagram() {
  return (
    <div className="my-8 p-6 cyber-border bg-black/60">
      <h3 className="text-xs uppercase tracking-wider text-green-500/70 mb-6 text-center">
        MARKET SERVICE AGGREGATION FLOW
      </h3>

      <div className="space-y-6">
        {/* Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-green-500/30 bg-green-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Search className="h-5 w-5 text-green-400" />
              <span className="text-xs font-bold text-green-400 uppercase">1. Discover</span>
            </div>
            <p className="text-xs text-green-400/70 font-mono">
              Browse providers by category and capability
            </p>
          </div>

          <div className="p-4 border border-cyan-500/30 bg-cyan-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-5 w-5 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 uppercase">2. Filter</span>
            </div>
            <p className="text-xs text-cyan-400/70 font-mono">
              Rank by Kairen Score, SLA, price, chain support
            </p>
          </div>

          <div className="p-4 border border-yellow-500/30 bg-yellow-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="h-5 w-5 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase">3. Route</span>
            </div>
            <p className="text-xs text-yellow-400/70 font-mono">
              Simple: Direct integration<br/>Complex: Handoff to X402N
            </p>
          </div>

          <div className="p-4 border border-purple-500/30 bg-purple-500/5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <span className="text-xs font-bold text-purple-400 uppercase">4. Compound</span>
            </div>
            <p className="text-xs text-purple-400/70 font-mono">
              Transaction data feeds back to ForgeID reputation
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="border-t border-green-500/20 pt-6">
          <p className="text-xs uppercase tracking-wider text-green-500/70 mb-4">Service Categories</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 border border-green-500/20 bg-green-500/5">
              <p className="text-xs font-bold text-green-400 mb-2 uppercase">Inference</p>
              <ul className="text-[10px] text-green-400/60 space-y-1 font-mono">
                <li>• LLM APIs</li>
                <li>• Model hosting</li>
                <li>• Fine-tuning</li>
              </ul>
            </div>
            <div className="p-3 border border-cyan-500/20 bg-cyan-500/5">
              <p className="text-xs font-bold text-cyan-400 mb-2 uppercase">Infrastructure</p>
              <ul className="text-[10px] text-cyan-400/60 space-y-1 font-mono">
                <li>• Dedicated RPC</li>
                <li>• Observability</li>
                <li>• Data pipelines</li>
              </ul>
            </div>
            <div className="p-3 border border-purple-500/20 bg-purple-500/5">
              <p className="text-xs font-bold text-purple-400 mb-2 uppercase">Execution</p>
              <ul className="text-[10px] text-purple-400/60 space-y-1 font-mono">
                <li>• Workflow agents</li>
                <li>• Browser automation</li>
                <li>• Task runners</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-green-500/20">
        <p className="text-[10px] text-green-500/50 font-mono text-center">
          Market is NOT a marketplace • It's a service aggregator with reputation overlays
        </p>
      </div>
    </div>
  );
}
