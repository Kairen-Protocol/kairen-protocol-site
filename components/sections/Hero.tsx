'use client';

import { motion } from 'framer-motion';
import KairenScene from '../3d/KairenScene';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <KairenScene />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-kairen-darker/50 via-kairen-darker/80 to-kairen-darker pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="text-gradient">Kairen Protocol</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto font-light">
            The Infrastructure for Autonomous AI Agents
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Identity, Network, Marketplace, and Payment Infrastructure on Solana
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-kairen-blue to-kairen-cyan text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-kairen-blue/50 transition-all duration-300"
            >
              Explore Protocol
            </motion.a>

            <motion.a
              href="#whitepaper"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-kairen-blue/50 text-white rounded-lg font-semibold hover:bg-kairen-blue/10 hover:border-kairen-blue transition-all duration-300"
            >
              Read Whitepaper
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Layers', value: '4' },
            { label: 'Networks', value: '15+' },
            { label: 'Finality', value: '<1s' },
            { label: 'Payment Size', value: '$0.0001' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-kairen-blue/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-kairen-blue rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
