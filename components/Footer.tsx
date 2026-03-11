'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const links = {
    Product: [
      { label: 'ForgeID', href: 'https://id.kairen.xyz' },
      { label: 'AgentNet', href: 'https://net.kairen.xyz' },
      { label: 'Market', href: 'https://market.kairen.xyz' },
      { label: 'X402N', href: 'https://x402n.kairen.xyz' },
    ],
    Developers: [
      { label: 'Documentation', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'SDK', href: '#' },
      { label: 'API Reference', href: '#' },
    ],
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Whitepaper', href: '#whitepaper' },
      { label: 'Roadmap', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    Community: [
      { label: 'Twitter', href: '#' },
      { label: 'Discord', href: '#' },
      { label: 'Telegram', href: '#' },
      { label: 'Forum', href: '#' },
    ],
  };

  return (
    <footer className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-kairen-darker via-kairen-dark to-kairen-darker" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-kairen-blue to-kairen-cyan rounded-lg flex items-center justify-center font-bold text-white">
                K
              </div>
              <span className="text-lg font-bold text-white">Kairen</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Service aggregator for autonomous AI agents across 15+ blockchains.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-kairen-blue/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Kairen Protocol. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600 font-mono">
              Built on Solana • Powered by DoubleZero N1 • Payments via Circle
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
