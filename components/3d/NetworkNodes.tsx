'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Create network of nodes representing agents
  const nodes = useMemo(() => {
    const temp = [];
    const radius = 5;
    const nodeCount = 24;

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      temp.push({
        position: [x, y, z] as [number, number, number],
        color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#06b6d4' : '#8b5cf6',
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Connecting lines between nodes */}
      {nodes.map((node, i) => {
        if (i < nodes.length - 1) {
          const nextNode = nodes[i + 1];
          const points = [
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...nextNode.position),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={`line-${i}`} geometry={geometry}>
              <lineBasicMaterial
                color="#3b82f6"
                opacity={0.2}
                transparent
              />
            </line>
          );
        }
        return null;
      })}
    </group>
  );
}
