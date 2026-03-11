'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import ProtocolLayers from '../3d/ProtocolLayers';

export default function HowItWorks() {
  const layers = [
    {
      name: 'Layer 4: X402N',
      subtitle: 'Negotiation & Payments',
      description: 'Autonomous negotiation protocol with nano-scale USDC payments across 15+ blockchains. RFO → Offer → Accept cycle with automatic escrow.',
      features: ['Nano payments ($0.0001 USDC)', 'Cross-chain escrow', 'Circle Gateway integration', 'Streaming payments'],
      color: 'purple',
    },
    {
      name: 'Layer 3: Market',
      subtitle: 'Service Aggregator',
      description: 'Service aggregator marketplace where infrastructure providers list their offerings and agents discover services, compare options, and transact.',
      features: ['Service discovery', 'SLA monitoring', 'Reputation-ranked results', 'Auto-attestations'],
      color: 'blue',
    },
    {
      name: 'Layer 2: AgentNet',
      subtitle: 'Network Routing',
      description: 'Authenticated RPC gateway routing high-reputation agents over DoubleZero N1 fiber, bypassing public internet.',
      features: ['DoubleZero N1 fiber', 'Tier-based routing', 'Sub-slot latency', 'DDoS resistance'],
      color: 'cyan',
    },
    {
      name: 'Layer 1: ForgeID',
      subtitle: 'Identity & Reputation',
      description: 'Dynamic NFT identity (Forge Pass) with behavioral reputation score (0-1000) computed from cross-platform attestations.',
      features: ['Forge Pass NFT (EVM + Solana)', 'Forge Score (0-1000)', 'Tier system', 'Attestation oracle'],
      color: 'accent',
    },
    {
      name: 'Layer 0: Foundation',
      subtitle: 'EVM + Solana + Circle',
      description: 'Multi-chain settlement layer on EVM and Solana blockchains, with payment rails through Circle USDC across 15+ chains.',
      features: ['EVM + Solana blockchains', 'Circle USDC', 'Multi-chain support', 'Sub-second finality'],
      color: 'yellow-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-kairen-darker" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Four integrated layers working as one unified platform
          </p>
        </motion.div>

        {/* 3D Visualization */}
        <div className="mb-20">
          <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-kairen-blue/20 bg-kairen-dark/50 backdrop-blur">
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[8, 2, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
                <ProtocolLayers />
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minDistance={5}
                  maxDistance={15}
                />
              </Suspense>
            </Canvas>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            🖱️ Drag to rotate • Scroll to zoom
          </p>
        </div>

        {/* Layer Details */}
        <div className="space-y-8">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-kairen-dark/50 backdrop-blur border border-kairen-blue/20 rounded-2xl p-8 hover:border-kairen-blue/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-bold text-white mb-2">{layer.name}</h3>
                  <p className="text-kairen-cyan text-sm font-mono mb-4">{layer.subtitle}</p>
                  <p className="text-gray-400">{layer.description}</p>
                </div>

                <div className="md:w-2/3">
                  <div className="grid grid-cols-2 gap-4">
                    {layer.features.map((feature, j) => (
                      <div
                        key={j}
                        className={`bg-kairen-${layer.color}/10 border border-kairen-${layer.color}/30 rounded-lg p-4`}
                      >
                        <p className="text-white font-medium">✓ {feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-kairen-blue/10 via-kairen-purple/10 to-kairen-cyan/10 border border-kairen-blue/30 rounded-2xl p-12 backdrop-blur">
            <h3 className="text-3xl font-bold text-white mb-4">The Forge Score Thread</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A single reputation metric flows through every layer: Score determines routing quality,
              marketplace visibility, negotiation trust, and payment terms. Good behavior compounds into
              tangible economic advantage. Bad behavior becomes permanently visible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
