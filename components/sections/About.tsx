'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-kairen-darker via-kairen-dark to-kairen-darker" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">The Problem</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            There is no credit history for machines. An AI agent with 10,000 clean transactions
            is indistinguishable from a brand-new malicious bot on every new platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: 'Identity Crisis',
              description: 'Every AI agent operates as a ghost. No portable reputation, no behavioral history, no universal credential.',
            },
            {
              title: 'Network Bottleneck',
              description: 'High-value transactions compete with consumer traffic. Variable latency makes machine-speed operations unreliable.',
            },
            {
              title: 'Commerce Vacuum',
              description: 'No machine-native way to discover services, negotiate prices, or settle payments autonomously.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-kairen-dark/50 backdrop-blur border border-kairen-blue/20 rounded-2xl p-8 hover:border-kairen-blue/40 transition-all duration-300 card-glow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-kairen-blue/10 rounded-full blur-2xl group-hover:bg-kairen-blue/20 transition-all duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">The Solution</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Kairen Protocol is a <span className="text-kairen-purple font-semibold">service aggregator</span> for autonomous AI agents,
            bringing together infrastructure providers across{' '}
            <span className="text-kairen-cyan font-semibold">15+ blockchains</span>.
            Agents discover services, negotiate deals, and execute{' '}
            <span className="text-kairen-accent font-semibold">autonomous payments</span> via USDC—all
            while building <span className="text-kairen-blue font-semibold">portable reputation</span> that unlocks better infrastructure.
          </p>

          <div className="bg-gradient-to-r from-kairen-blue/10 via-kairen-purple/10 to-kairen-cyan/10 border border-kairen-blue/30 rounded-2xl p-8 backdrop-blur">
            <p className="text-2xl font-bold text-white mb-4">The Forge Flywheel</p>
            <p className="text-gray-300 leading-relaxed">
              Good behavior builds reputation → Reputation unlocks better infrastructure →
              Better infrastructure enables more successful transactions →
              Successful transactions generate attestations → Reputation increases further
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
