'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Terminal, Database, FileText, Activity, Network, Check, AlertCircle } from 'lucide-react';
import UserTypeToggle from '@/components/UserTypeToggle';

export default function Home() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['IDENTITY', 'NETWORK', 'MARKETPLACE', 'PAYMENTS', 'REPUTATION'];
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'An error occurred. Please try again.');
        return;
      }

      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Matrix rain background */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-0 left-0 text-xs text-green-500 whitespace-pre font-mono animate-matrix-fall">
          {Array(100).fill(0).map((_, i) => (
            <div key={i} className="inline-block mx-1">01010101</div>
          ))}
        </div>
      </div>

      {/* Left sidebar navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 border-r border-green-500/30 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center py-6 gap-6">
        <Link href="/" className="group relative" title="HOME">
          <Shield className="h-6 w-6 text-green-500 group-hover:text-green-400 group-hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] transition-all" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-black border border-green-500/50 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            HOME
          </div>
        </Link>
        <Link href="/docs" className="group relative" title="DOCS">
          <FileText className="h-5 w-5 text-green-500/70 hover:text-green-400 hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] transition-all" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-black border border-green-500/50 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            DOCS
          </div>
        </Link>
        <Link href="/about" className="group relative" title="ABOUT">
          <Terminal className="h-5 w-5 text-green-500/70 hover:text-green-400 hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] transition-all" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-black border border-green-500/50 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            ABOUT
          </div>
        </Link>
        <div className="flex-1" />
        <div className="w-8 h-px bg-green-500/30" />
        <div className="status-dot" />
      </aside>

      {/* Main content */}
      <div className="ml-16 relative z-10">
        {/* Top status bar */}
        <div className="border-b border-green-500/30 bg-black/90 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-yellow-400">[BETA COMING Q2 2026]</span>
              <span className="text-green-500/50">v0.1.0-alpha</span>
              <span className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-green-500 animate-pulse" />
                <span className="text-green-500">ONLINE</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <div className="hidden xl:block">
                <UserTypeToggle variant="compact" />
              </div>
              <span className="text-green-500/70">{new Date().toLocaleTimeString()}</span>
              <a href="#waitlist" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                JOIN WAITLIST →
              </a>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20 cyber-grid">
          <div className="max-w-6xl w-full">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
              {/* Left: Hero Copy */}
              <div>
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-yellow-400 text-xs uppercase tracking-widest">[SYSTEM INITIALIZING...]</span>
                  <div className="flex-1 h-px bg-green-500/20" />
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                  <div className="mb-2">INFRA FOR</div>
                  <div className="glow-text transition-all duration-300">
                    {words[currentWord]}
                    <span className="terminal-cursor">_</span>
                  </div>
                </h1>

                <p className="text-lg text-green-400/80 mb-8 max-w-2xl leading-relaxed font-mono">
                  /// SERVICE AGGREGATOR FOR AUTONOMOUS AI AGENTS
                  <br />
                  /// SOLANA + 15+ BLOCKCHAINS VIA CIRCLE
                  <br />
                  /// PAYMENTS • MARKETPLACE • NETWORK • IDENTITY
                </p>

                <div className="mb-8">
                  <UserTypeToggle />
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link href="/docs" className="cyber-btn">
                    READ DOCS
                  </Link>
                  <a href="#waitlist" className="cyber-btn-yellow">
                    JOIN BETA →
                  </a>
                </div>

                {/* Multi-chain emphasis */}
                <div className="cyber-border p-6 bg-black/60 backdrop-blur">
                  <div className="flex items-center gap-2 mb-4">
                    <Network className="h-5 w-5 text-cyan-400" />
                    <span className="text-cyan-400 text-sm font-bold uppercase">Multi-Chain Infrastructure</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-green-400/70">Solana (Native)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-green-400/70">Ethereum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-green-400/70">Polygon</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-green-400/70">Arbitrum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⚡</span>
                      <span className="text-green-400/70">+12 More via Circle</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Protocol Stack */}
              <div className="cyber-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-green-500 uppercase tracking-wider">Protocol Stack</span>
                  <span className="text-xs text-green-500/50">v1.0</span>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <a href="https://x402n.kairen.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-green-500/20 hover:bg-green-500/5 transition-all group">
                    <span className="text-green-500/50 text-xs">L4</span>
                    <span className="text-green-400 font-bold group-hover:text-green-300">X402N</span>
                    <span className="ml-auto text-xs text-green-400">LIVE</span>
                  </a>
                  <a href="https://market.kairen.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-green-500/20 hover:bg-green-500/5 transition-all group">
                    <span className="text-green-500/50 text-xs">L3</span>
                    <span className="text-green-400 font-bold group-hover:text-green-300">MARKET</span>
                    <span className="ml-auto text-xs text-green-400">LIVE</span>
                  </a>
                  <div className="flex items-center gap-3 py-3 border-b border-green-500/20">
                    <span className="text-green-500/50 text-xs">L2</span>
                    <span className="text-green-400/70 font-bold">AGENTNET</span>
                    <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-0.5 text-[10px] font-bold">SOON</span>
                  </div>
                  <div className="flex items-center gap-3 py-3 border-b border-green-500/20">
                    <span className="text-green-500/50 text-xs">L1</span>
                    <span className="text-green-400/70 font-bold">FORGEID</span>
                    <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-0.5 text-[10px] font-bold">SOON</span>
                  </div>
                  <div className="flex items-center gap-3 py-3">
                    <span className="text-green-500/50 text-xs">L0</span>
                    <span className="text-green-400 font-bold">EVM + SOLANA + CIRCLE</span>
                    <span className="ml-auto text-xs text-cyan-400">SETTLEMENT</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-green-500/20">
                  <p className="text-[10px] text-green-500/50 font-mono mb-2">INFRASTRUCTURE DETAILS:</p>
                  <p className="text-xs text-green-500/70 font-mono leading-relaxed">
                    X402N: Negotiations • Payments • Dashboard • Deals
                    <br />
                    Market: Service Aggregation • Provider Listings • Infrastructure Discovery
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-16 grid grid-cols-4 gap-6 font-mono">
              {[
                { label: 'LAYERS', value: '4' },
                { label: 'CHAINS', value: '15+' },
                { label: 'FINALITY', value: '<1s' },
                { label: 'MIN PAYMENT', value: '$0.0001' },
              ].map((stat, i) => (
                <div key={i} className="text-center cyber-border p-4 bg-black/60 hover:border-green-500 transition-all">
                  <div className="text-3xl font-bold text-green-400 glow-text mb-1">{stat.value}</div>
                  <div className="text-xs text-green-500/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="px-6 py-20 border-t border-yellow-500/30 bg-gradient-to-b from-yellow-500/5 to-black">
          <div className="max-w-3xl mx-auto cyber-border p-8 bg-black/80 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="status-dot bg-yellow-500 shadow-yellow-500" />
              <h2 className="text-3xl font-black uppercase">BETA WAITLIST</h2>
            </div>

            <p className="text-green-400/80 mb-8 font-mono text-sm">
              // JOIN THE INVITE-ONLY BETA PROGRAM
              <br />
              // EARLY ACCESS TO KAIREN PROTOCOL
              <br />
              // MINT YOUR KAIREN PASS • BUILD REPUTATION • UNLOCK INFRASTRUCTURE
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4 mb-6">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL ADDRESS..."
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-black border-2 border-green-500/30 text-green-400 placeholder-green-500/30 focus:border-green-500 focus:outline-none font-mono transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  className="cyber-btn-yellow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'JOIN NOW →'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30">
                  <Check className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-green-400 font-mono">
                    SUCCESS! Check your email to configure your beta access.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <p className="text-xs text-red-400 font-mono">
                    {errorMessage}
                  </p>
                </div>
              )}
            </form>

            <p className="text-xs text-green-500/50 font-mono">
              [LAUNCHING Q2 2026] • NO SPAM • UNSUBSCRIBE ANYTIME
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/30 px-6 py-8 bg-black/90">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
            <div className="text-green-500/50">
              © 2026 KAIREN • ALL SYSTEMS OPERATIONAL
            </div>
            <div className="flex items-center gap-6 text-green-500/70">
              <Link href="/docs" className="hover:text-green-400 transition-colors">DOCS</Link>
              <Link href="/about" className="hover:text-green-400 transition-colors">ABOUT</Link>
              <a href="https://github.com" className="hover:text-green-400 transition-colors">GITHUB</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
