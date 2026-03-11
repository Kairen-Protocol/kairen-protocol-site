'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: 'Abstract',
      content: `The autonomous AI agent economy is growing at unprecedented speed, projected to reach $52-100B by 2030. Kairen Protocol is a service aggregator that brings together infrastructure providers across 15+ blockchains, enabling agents to discover services, negotiate deals, and execute autonomous payments via a four-layer stack built on Solana and Circle.`,
    },
    {
      title: 'The Problem',
      content: `Every AI agent today is identified by nothing more than a cryptographic keypair. There is no portable reputation, no universal credential. An agent with a flawless record on one platform is indistinguishable from a brand-new malicious bot on the next.`,
    },
    {
      title: 'Architecture',
      content: `Four layers working as one: ForgeID (identity), AgentNet (network), Market (service aggregator), X402N (payments). Each layer depends on the one below it and enriches the one above it.`,
    },
    {
      title: 'ForgeID',
      content: `Every agent mints a Forge Pass - a dynamic NFT with a 0-1000 reputation score computed from behavioral attestations across platforms. The score maps to tiers (Suspended → Associate → Member → Senior → Elite) that unlock progressively better infrastructure.`,
    },
    {
      title: 'AgentNet',
      content: `Authenticated RPC gateway routing Senior and Elite agents over DoubleZero N1 fiber backbone. Deterministic sub-slot latency, 8x reduction in missed transactions, DDoS resistance via distributed mesh.`,
    },
    {
      title: 'Market',
      content: `Service aggregator marketplace where infrastructure providers list their offerings—GPU compute, RPC endpoints, data feeds, API access, and agent services. Agents discover providers, compare offerings via reputation-ranked search, and leverage automated SLA monitoring with auto-attestations after every deal.`,
    },
    {
      title: 'X402N',
      content: `Autonomous negotiation protocol (RFO → Offer → Accept) with nano-scale USDC payments ($0.0001+) across 15+ blockchains via Circle Gateway and CCTP. Automatic escrow, streaming payments, and cryptographic proof of delivery.`,
    },
    {
      title: 'Security & Privacy',
      content: `Zero-knowledge proofs for selective disclosure, Private Ephemeral Rollups in TEEs, encrypted computation via Arcium MPC, ZKML for verifiable AI inference. Privacy without sacrificing accountability.`,
    },
  ];

  return (
    <section id="whitepaper" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-kairen-darker via-kairen-dark to-kairen-darker" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Whitepaper</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore the complete technical architecture and design philosophy
          </p>

          <motion.a
            href="/KAIREN_PROTOCOL_WHITEPAPER.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-kairen-blue to-kairen-cyan text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-kairen-blue/50 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Whitepaper (PDF)
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="md:col-span-1 space-y-2">
            {sections.map((section, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveSection(i)}
                whileHover={{ x: 5 }}
                className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                  activeSection === i
                    ? 'bg-kairen-blue/20 border-l-4 border-kairen-blue text-white'
                    : 'bg-kairen-dark/30 border-l-4 border-transparent text-gray-400 hover:bg-kairen-dark/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${activeSection === i ? 'bg-kairen-blue' : 'bg-gray-600'} transition-colors`} />
                  <span className="font-semibold">{section.title}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-kairen-dark/50 backdrop-blur border border-kairen-blue/20 rounded-2xl p-8 min-h-[400px]"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-kairen-blue rounded-full" />
                  <h3 className="text-3xl font-bold text-white">
                    {sections[activeSection].title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {sections[activeSection].content}
              </p>

              {activeSection === sections.length - 1 && (
                <div className="mt-8 pt-8 border-t border-kairen-blue/20">
                  <p className="text-sm text-gray-400 italic">
                    "Kairen Protocol creates the credit history for machines that the autonomous
                    agent economy desperately needs."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">— March 2026</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
