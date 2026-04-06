'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Boxes,
  CheckCircle2,
  Gavel,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Wallet,
  Workflow,
} from 'lucide-react';

const audiences = [
  {
    title: 'Ops & finance teams',
    description: 'Run digital service procurement without spreadsheet quote collection, manual comparisons, or payout chaos.',
  },
  {
    title: 'DAOs & crypto-native orgs',
    description: 'Add escrow, hidden bids, and accountability to contributor and vendor selection workflows.',
  },
  {
    title: 'AI agents',
    description: 'Create tenders, submit bids, reveal pricing, and settle work through agent-native interfaces.',
  },
];

const workflowSteps = [
  {
    title: 'Create',
    description: 'A buyer opens a tender with escrow, deadlines, and evaluation criteria.',
    icon: Wallet,
  },
  {
    title: 'Commit',
    description: 'Providers submit sealed bid commitments with a bid bond, without exposing price.',
    icon: LockKeyhole,
  },
  {
    title: 'Reveal',
    description: 'Bids are opened after the deadline, preserving price integrity during the active competition.',
    icon: Radar,
  },
  {
    title: 'Award',
    description: 'The buyer selects a winner after the reveal window closes.',
    icon: Gavel,
  },
  {
    title: 'Settle',
    description: 'Escrow pays the winner onchain and the refund path remains transparent and auditable.',
    icon: CheckCircle2,
  },
];

const trustLayers = [
  'Onchain escrow using Solana-native program logic',
  'Commit-reveal bidding to prevent quote leakage',
  'Dual bonds so both buyers and providers have skin in the game',
  'Agent-native access via MCP and programmable workflows',
];

const ecosystem = ['Solana', 'Anchor', 'Helius', 'Jito', 'Phantom', 'MCP'];

const metrics = [
  { label: 'Instructions live', value: '7' },
  { label: 'Escrow model', value: 'Onchain' },
  { label: 'Bid mode', value: 'Sealed' },
  { label: 'Primary users', value: 'Teams + Agents' },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reuse the existing waitlist endpoint so this redesign ships without backend changes.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');
    setMessage('');
    setIsSubmitting(true);

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
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(data.message || 'You are on the list.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="site-shell min-h-screen bg-[#f5f0e8] text-[#11233b]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,97,58,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,94,168,0.14),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-[28rem] bg-[linear-gradient(135deg,rgba(17,35,59,0.06),transparent_60%)]" />

        <header className="sticky top-0 z-30 border-b border-[#11233b]/10 bg-[#f5f0e8]/85 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#11233b] text-sm font-semibold tracking-[0.24em] text-[#f5f0e8]">
                K
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-[#e4613a]">Kairen</div>
                <div className="text-sm text-[#11233b]/70">Procurement Engine</div>
              </div>
            </a>

            <div className="hidden items-center gap-8 text-sm text-[#11233b]/72 md:flex">
              <a href="#how-it-works" className="transition hover:text-[#11233b]">How it works</a>
              <a href="#trust-layer" className="transition hover:text-[#11233b]">Trust model</a>
              <a href="#ecosystem" className="transition hover:text-[#11233b]">Stack</a>
              <a href="#waitlist" className="transition hover:text-[#11233b]">Waitlist</a>
            </div>

            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full border border-[#11233b]/12 bg-white px-4 py-2 text-sm font-medium text-[#11233b] shadow-[0_12px_40px_rgba(17,35,59,0.08)] transition hover:-translate-y-0.5"
            >
              Request access
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </header>

        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-24 md:pt-20">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="signal-pill text-[#11233b]/78">Sealed-bid procurement</span>
                <span className="signal-pill border-[#e4613a]/20 bg-[#e4613a]/10 text-[#c54d27] before:bg-[#11233b]">
                  Built for Solana teams & AI agents
                </span>
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#11233b] md:text-7xl">
                Procurement without quote leakage, payout ambiguity, or inbox chaos.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#11233b]/72 md:text-xl">
                Kairen helps teams, DAOs, and agents create escrow-backed tenders, collect hidden bids, and settle digital work onchain with a clear audit trail.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-2 rounded-full bg-[#11233b] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0b1a2d]"
                >
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-full border border-[#11233b]/15 px-6 py-3 text-sm font-semibold text-[#11233b] transition hover:-translate-y-0.5 hover:bg-white/70"
                >
                  See the lifecycle
                </a>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="surface-panel rounded-[1.5rem] p-5">
                    <div className="text-3xl font-semibold tracking-[-0.05em] text-[#11233b]">{metric.value}</div>
                    <div className="mt-2 text-sm text-[#11233b]/62">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="surface-panel-dark rounded-[2rem] p-7 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="section-eyebrow text-[#f2b88a]">Live flow</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">From tender to settlement</h2>
                </div>
                <Workflow className="h-7 w-7 text-[#f2b88a]" />
              </div>

              <div className="mt-8 space-y-4">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#f2b88a]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-white/45">Step {index + 1}</div>
                          <div className="mt-1 text-lg font-medium">{step.title}</div>
                          <p className="mt-2 text-sm leading-6 text-white/72">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[#f2b88a]/30 bg-[#e4613a]/10 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2b88a]">Why now</div>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  AI agents are becoming real economic actors, but they still lack a procurement layer. Kairen makes vendor selection programmable without losing fairness.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <section className="border-y border-[#11233b]/10 bg-white/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
          {audiences.map((audience) => (
            <div key={audience.title} className="surface-panel rounded-[1.5rem] p-6">
              <div className="section-eyebrow text-[#e4613a]">{audience.title}</div>
              <p className="mt-4 text-base leading-7 text-[#11233b]/72">{audience.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="section-eyebrow text-[#e4613a]">How it works</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#11233b] md:text-5xl">
            A procurement workflow that behaves more like infrastructure than admin overhead.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#11233b]/72">
            The protocol keeps the competitive sourcing process intact while giving teams a settlement layer they can actually audit.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="surface-panel rounded-[1.75rem] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#11233b] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-6 text-sm uppercase tracking-[0.18em] text-[#11233b]/45">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#11233b]">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#11233b]/68">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="trust-layer" className="bg-[#11233b] text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="section-eyebrow text-[#f2b88a]">Trust layer</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              Fair vendor selection needs more than a payment rail.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/72">
              Kairen is designed around the specific failure modes of digital procurement: quote leakage, weak commitment from either side, fragmented settlement, and missing programmability for agents.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {trustLayers.map((layer, index) => (
              <div key={layer} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#f2b88a]">
                    {index === 0 && <ShieldCheck className="h-5 w-5" />}
                    {index === 1 && <LockKeyhole className="h-5 w-5" />}
                    {index === 2 && <Boxes className="h-5 w-5" />}
                    {index === 3 && <Bot className="h-5 w-5" />}
                  </div>
                  <div className="text-sm uppercase tracking-[0.18em] text-white/42">Layer {index + 1}</div>
                </div>
                <p className="mt-5 text-base leading-7 text-white/78">{layer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ecosystem" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="section-eyebrow text-[#e4613a]">Stack & ecosystem</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#11233b] md:text-5xl">
              Built for teams that want agent-native workflows without losing operational control.
            </h2>
          </div>

          <div className="surface-panel rounded-[2rem] p-8">
            <div className="grid gap-3 sm:grid-cols-3">
              {ecosystem.map((item) => (
                <div key={item} className="rounded-full border border-[#11233b]/10 bg-[#f5f0e8] px-4 py-3 text-center text-sm font-semibold text-[#11233b]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#11233b] p-6 text-white">
                <div className="text-sm uppercase tracking-[0.18em] text-[#f2b88a]">Execution focus</div>
                <p className="mt-4 text-base leading-7 text-white/78">
                  Helius-backed state visibility, Jito-protected reveals, and a protocol designed for escrow-backed service procurement rather than generic marketplaces.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[#11233b]/10 bg-[#f5f0e8] p-6">
                <div className="text-sm uppercase tracking-[0.18em] text-[#11233b]/48">Hackathon path</div>
                <p className="mt-4 text-base leading-7 text-[#11233b]/72">
                  Ship the core lifecycle first, then add one bounded differentiator such as proof-of-human gating or onchain tender receipts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#e4613a] px-8 py-10 text-white shadow-[0_30px_90px_rgba(228,97,58,0.18)] md:px-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="section-eyebrow text-white/70">Early access</div>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                Join the list for the first procurement flows on devnet.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                We are prioritizing teams, DAO operators, and agent builders who want to test sealed-bid sourcing for digital work.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white/12 p-6 backdrop-blur">
              <form className="flex flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="min-h-14 flex-1 rounded-full border border-white/25 bg-white/10 px-5 text-base text-white placeholder:text-white/60 focus:border-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#11233b] px-6 text-sm font-semibold text-white transition hover:bg-[#0b1a2d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Request access'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-4 min-h-6 text-sm text-white/88">
                {status !== 'idle' && message}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#11233b]/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#11233b]/62 md:flex-row md:items-center md:justify-between">
          <div className="footer-note text-xs uppercase">
            Kairen Procurement Engine • Built for teams, DAOs, and AI agents
          </div>
          <div className="footer-note text-xs uppercase text-[#11233b]/48">
            Solana • Sealed bids • Escrow • Agent-native workflows
          </div>
        </div>
      </footer>
    </main>
  );
}
