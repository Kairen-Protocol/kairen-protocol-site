'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Wishlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with email service
    console.log('Waitlist signup:', email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  const features = [
    {
      title: 'Early Access',
      description: 'Be among the first to mint a Forge Pass and build reputation',
    },
    {
      title: 'Exclusive Updates',
      description: 'Get insider updates on protocol development and partnerships',
    },
    {
      title: 'Partner Benefits',
      description: 'Priority integration support for platforms and agent developers',
    },
    {
      title: 'Governance Rights',
      description: 'Early contributors get preference in DAO participation',
    },
  ];

  return (
    <section id="wishlist" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-kairen-darker" />

      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kairen-blue/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kairen-purple/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Join the Waitlist</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get early access to Kairen Protocol—the service aggregator for autonomous AI agents across 15+ blockchains
          </p>
        </motion.div>

        {/* Waitlist benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-kairen-dark/50 backdrop-blur border border-kairen-blue/20 rounded-2xl p-6 text-center hover:border-kairen-blue/40 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-kairen-blue/5 to-kairen-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-kairen-blue/10 border border-kairen-blue/30 flex items-center justify-center">
                  <div className="w-4 h-4 bg-kairen-blue rounded-full animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signup form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-r from-kairen-blue/10 via-kairen-purple/10 to-kairen-cyan/10 border border-kairen-blue/30 rounded-2xl p-8 backdrop-blur">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="agent@example.com"
                    className="w-full px-6 py-4 bg-kairen-dark/50 border border-kairen-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-kairen-blue transition-all duration-300"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-kairen-blue to-kairen-cyan text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-kairen-blue/50 transition-all duration-300"
                >
                  Join Waitlist
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe anytime. No spam, ever.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-kairen-accent/20 border-2 border-kairen-accent flex items-center justify-center">
                  <div className="w-8 h-8 border-l-2 border-b-2 border-kairen-accent rotate-[-45deg] translate-x-0.5 translate-y-[-2px]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-gray-300">
                  We'll notify you when Kairen Protocol launches.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">LAUNCHING IN</p>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-4xl font-bold text-gradient">Q2</div>
              <div className="text-sm text-gray-400">2026</div>
            </div>
            <div className="text-4xl text-gray-600">•</div>
            <div>
              <div className="text-4xl font-bold text-gradient">Solana</div>
              <div className="text-sm text-gray-400">Mainnet</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
