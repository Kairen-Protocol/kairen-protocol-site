'use client';

import { useState } from 'react';

const LAYERS: Array<{
  id: string;
  name: string;
  description: string;
  file: string;
  color: string;
  comingSoon?: boolean;
}> = [
  {
    id: 'overview',
    name: 'Protocol Overview',
    description: 'Unified four-layer stack',
    file: '/animations/01_kairen_protocol_overview.html',
    color: '#fafafa',
  },
  {
    id: 'forgeid',
    name: 'Layer 1: ForgeID',
    description: 'Identity & Reputation',
    file: '/animations/02_forgeid_identity.html',
    color: '#a78bfa',
  },
  {
    id: 'agentnet',
    name: 'Layer 2: AgentNet',
    description: 'Network Routing',
    file: '/animations/03_agentnet_routing.html',
    color: '#4ade80',
    comingSoon: true,
  },
  {
    id: 'market',
    name: 'Layers 3+4: Market + X402N',
    description: 'Discovery & Payments',
    file: '/animations/04_market_x402n_flow.html',
    color: '#fb923c',
  },
];

export default function LayerAnimations() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        fontFamily: '"Inter", "IBM Plex Mono", sans-serif',
        background: '#000',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Top progress bar */}
      <div style={{ height: 2, background: 'rgba(255,255,255,0.04)', position: 'relative' }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #a78bfa, #4ade80, #fb923c)',
          width: `${((activeLayer + 1) / LAYERS.length) * 100}%`,
          transition: 'width 0.5s ease',
        }} />
      </div>

      <div style={{ padding: '24px 28px' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11,
            color: '#71717a',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 6,
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            Kairen Protocol
          </div>
          <div style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#fafafa',
            marginBottom: 4,
            letterSpacing: '-0.02em',
          }}>
            Interactive Architecture
          </div>
          <div style={{
            fontSize: 12,
            color: '#52525b',
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 300,
          }}>
            Select a layer to view its detailed animation
          </div>
        </div>

        {/* Layer selector tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}>
          {LAYERS.map((layer, index) => {
            const isActive = activeLayer === index;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(index)}
                style={{
                  flex: '1 1 200px',
                  padding: '12px 14px',
                  borderRadius: 8,
                  textAlign: 'left',
                  border: `1px solid ${isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
                  background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                  color: isActive ? layer.color : '#52525b',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: layer.color,
                    opacity: 0.6,
                  }} />
                )}
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 3,
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  {layer.name}
                  {layer.comingSoon && (
                    <span style={{
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 3,
                      background: 'rgba(251, 146, 60, 0.1)',
                      color: '#fb923c',
                      border: '1px solid rgba(251, 146, 60, 0.2)',
                      fontWeight: 500,
                      letterSpacing: 0.5,
                    }}>
                      SOON
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: 10,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 300,
                  color: isActive ? '#a1a1aa' : '#3f3f46',
                }}>
                  {layer.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* Animation iframe */}
        <div style={{
          width: '100%',
          height: 560,
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          background: '#000',
          position: 'relative',
        }}>
          {activeLayer === 2 ? (
            // Coming Soon overlay for AgentNet
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}>
              <div style={{
                background: 'rgba(24,24,27,0.95)',
                border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: 12,
                padding: '32px 48px',
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(74,222,128,0.12)',
              }}>
                <div style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#4ade80',
                  marginBottom: 12,
                  letterSpacing: '-0.01em',
                }}>
                  <span style={{
                    width: 12,
                    height: 12,
                    background: '#4ade80',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: 8,
                    animation: 'pulse 2s ease-in-out infinite',
                  }} />
                  Coming Soon
                </div>
                <div style={{
                  fontSize: 14,
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}>
                  AgentNet infrastructure details will be revealed closer to launch
                  <br />
                  Q2 2026 · Network routing layer for AI agents
                </div>
              </div>
            </div>
          ) : (
            <iframe
              key={activeLayer}
              src={LAYERS[activeLayer].file}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title={LAYERS[activeLayer].name}
              sandbox="allow-scripts allow-same-origin"
            />
          )}
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.8); }
            }
          `}</style>
        </div>

        {/* Layer indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {LAYERS.map((_, i) => (
              <div key={i} style={{
                width: i === activeLayer ? 28 : 8,
                height: 4,
                borderRadius: 2,
                background: i === activeLayer
                  ? `linear-gradient(90deg, ${LAYERS[i].color}, ${LAYERS[(i + 1) % LAYERS.length].color})`
                  : i < activeLayer ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
          <div style={{
            fontSize: 10,
            color: '#52525b',
            letterSpacing: 1,
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            {activeLayer + 1} / {LAYERS.length}
          </div>
        </div>
      </div>
    </div>
  );
}
