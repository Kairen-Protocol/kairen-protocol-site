'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface LayerProps {
  position: [number, number, number];
  color: string;
  label: string;
  sublabel: string;
  scale?: number;
}

function Layer({ position, color, label, sublabel, scale = 1 }: LayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[2.5 * scale, 2.5 * scale, 0.3, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {label}
      </Text>
      <Text
        position={[0, -0.4, 1]}
        fontSize={0.15}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-regular.woff"
      >
        {sublabel}
      </Text>
    </group>
  );
}

export default function ProtocolLayers() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const layers = [
    { y: 3, color: '#8b5cf6', label: 'X402N', sublabel: 'Negotiation & Payments' },
    { y: 1.5, color: '#3b82f6', label: 'Market', sublabel: 'Service Aggregator' },
    { y: 0, color: '#06b6d4', label: 'AgentNet', sublabel: 'Network Routing' },
    { y: -1.5, color: '#10b981', label: 'ForgeID', sublabel: 'Identity & Reputation' },
    { y: -3, color: '#f59e0b', label: 'Layer 0', sublabel: 'EVM + Solana + Circle', scale: 1.2 },
  ];

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <Layer
          key={i}
          position={[0, layer.y, 0]}
          color={layer.color}
          label={layer.label}
          sublabel={layer.sublabel}
          scale={layer.scale}
        />
      ))}
    </group>
  );
}
