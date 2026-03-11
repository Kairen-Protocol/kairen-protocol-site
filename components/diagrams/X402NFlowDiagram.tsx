'use client';

import { ArrowRight, FileText, DollarSign, CheckCircle, Package } from 'lucide-react';

export default function X402NFlowDiagram() {
  return (
    <div className="my-8 p-6 cyber-border bg-black/60">
      <h3 className="text-xs uppercase tracking-wider text-green-500/70 mb-6 text-center">
        X402N NEGOTIATION FLOW
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Step 1: RFO */}
        <div className="relative">
          <div className="p-4 border-2 border-green-500/50 bg-green-500/5 h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-xs font-bold text-green-400">
                1
              </div>
              <FileText className="h-4 w-4 text-green-400" />
            </div>
            <h4 className="text-sm font-bold text-green-400 mb-2 uppercase">RFO</h4>
            <p className="text-xs text-green-400/70 font-mono leading-relaxed">
              Buyer creates Request for Offer with specs, budget, deadline
            </p>
          </div>
          <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
            <ArrowRight className="h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* Step 2: Offers */}
        <div className="relative">
          <div className="p-4 border-2 border-cyan-500/50 bg-cyan-500/5 h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-400">
                2
              </div>
              <Package className="h-4 w-4 text-cyan-400" />
            </div>
            <h4 className="text-sm font-bold text-cyan-400 mb-2 uppercase">Offers</h4>
            <p className="text-xs text-cyan-400/70 font-mono leading-relaxed">
              Providers submit competing bids with pricing and terms
            </p>
          </div>
          <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
            <ArrowRight className="h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* Step 3: Accept */}
        <div className="relative">
          <div className="p-4 border-2 border-yellow-500/50 bg-yellow-500/5 h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center text-xs font-bold text-yellow-400">
                3
              </div>
              <CheckCircle className="h-4 w-4 text-yellow-400" />
            </div>
            <h4 className="text-sm font-bold text-yellow-400 mb-2 uppercase">Accept</h4>
            <p className="text-xs text-yellow-400/70 font-mono leading-relaxed">
              Buyer selects best offer based on price + reputation
            </p>
          </div>
          <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
            <ArrowRight className="h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* Step 4: Payment */}
        <div className="relative">
          <div className="p-4 border-2 border-purple-500/50 bg-purple-500/5 h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-xs font-bold text-purple-400">
                4
              </div>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </div>
            <h4 className="text-sm font-bold text-purple-400 mb-2 uppercase">Payment</h4>
            <p className="text-xs text-purple-400/70 font-mono leading-relaxed">
              USDC escrowed via Circle on any chain
            </p>
          </div>
          <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
            <ArrowRight className="h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* Step 5: Delivery */}
        <div className="relative">
          <div className="p-4 border-2 border-blue-500/50 bg-blue-500/5 h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-400">
                5
              </div>
              <CheckCircle className="h-4 w-4 text-blue-400" />
            </div>
            <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase">Delivery</h4>
            <p className="text-xs text-blue-400/70 font-mono leading-relaxed">
              Provider delivers + payment released + reputation updated
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-green-500/20 grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-green-500/70 mb-2 font-mono uppercase">Features</p>
          <ul className="space-y-1 text-green-400/60 font-mono">
            <li>• Nano-payments ($0.0001+)</li>
            <li>• Cross-chain USDC</li>
            <li>• Automatic escrow</li>
          </ul>
        </div>
        <div>
          <p className="text-green-500/70 mb-2 font-mono uppercase">Outputs</p>
          <ul className="space-y-1 text-green-400/60 font-mono">
            <li>• Cryptographic proofs</li>
            <li>• Invoice export</li>
            <li>• Reputation updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
