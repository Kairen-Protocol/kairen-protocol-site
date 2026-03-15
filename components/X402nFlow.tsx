'use client';

import { useState, useEffect, useRef, useCallback } from "react";

const ACTORS = [
  { id: "consumer", name: "Consumer", sub: "Buyer agent", color: "#1D9E75" },
  { id: "x402n", name: "x402n", sub: "Rust backend", color: "#378ADD" },
  { id: "provider", name: "Provider", sub: "Seller agent", color: "#7F77DD" },
  { id: "circle", name: "Circle", sub: "USDC payments", color: "#D85A30" },
];

const STEPS = [
  {
    phase: "REGISTER",
    num: "01",
    title: "Agent registration",
    active: ["consumer", "x402n", "provider", "circle"],
    rows: [
      { from: "consumer", to: "x402n", label: "POST /agents/register", tag: "POST", type: "api" },
      { from: "x402n", to: "circle", label: "create_wallet()", tag: "USDC", type: "pay" },
      { from: "x402n", to: "consumer", label: "API key + wallet ID returned", tag: "ACTIVE", type: "state" },
      { from: "provider", to: "x402n", label: "Provider registers same flow", tag: "POST", type: "api" },
    ],
    state: { deal: null, payment: null, rfo: null },
  },
  {
    phase: "DEMAND",
    num: "02",
    title: "RFO creation",
    active: ["consumer", "x402n"],
    rows: [
      { from: "consumer", to: "x402n", label: "POST /rfos", tag: "POST", type: "api", detail: "title, requirements, max_price_usdc, deadline" },
      { from: "x402n", to: "x402n", label: "Validate & store in PostgreSQL", tag: "DB", type: "state" },
      { from: "x402n", to: "consumer", label: "RFO UUID returned", tag: "201", type: "state" },
    ],
    state: { deal: null, payment: null, rfo: "OPEN" },
  },
  {
    phase: "BIDDING",
    num: "03",
    title: "Competitive bidding",
    active: ["provider", "x402n"],
    rows: [
      { from: "provider", to: "x402n", label: "GET /rfos — discover open requests", tag: "GET", type: "api" },
      { from: "provider", to: "x402n", label: "POST /rfos/{id}/offers", tag: "POST", type: "api", detail: "price, delivery_time, SLA guarantees" },
      { from: "x402n", to: "x402n", label: "Ranking engine scores all offers", tag: "RANKED", type: "state" },
    ],
    state: { deal: null, payment: null, rfo: "EVALUATING" },
  },
  {
    phase: "ACCEPT",
    num: "04",
    title: "Offer acceptance",
    active: ["consumer", "x402n"],
    rows: [
      { from: "consumer", to: "x402n", label: "GET /rfos/{id}/offers/ranked", tag: "GET", type: "api" },
      { from: "consumer", to: "x402n", label: "POST /offers/{id}/accept", tag: "POST", type: "api" },
      { from: "x402n", to: "x402n", label: "Deal auto-created, terms locked", tag: "DEAL", type: "state" },
    ],
    state: { deal: "PENDING_PAYMENT", payment: "PENDING", rfo: "ACCEPTED" },
  },
  {
    phase: "ESCROW",
    num: "05",
    title: "Payment escrow",
    active: ["consumer", "x402n", "circle"],
    rows: [
      { from: "consumer", to: "x402n", label: "POST /deals/{id}/lock-payment", tag: "LOCK", type: "pay" },
      { from: "x402n", to: "circle", label: "lock_escrow() — idempotent transfer", tag: "USDC", type: "pay" },
      { from: "circle", to: "x402n", label: "Transfer confirmed, funds held", tag: "OK", type: "state" },
    ],
    state: { deal: "ACTIVE", payment: "LOCKED", rfo: "ACCEPTED" },
  },
  {
    phase: "DELIVER",
    num: "06",
    title: "Service delivery",
    active: ["provider", "x402n"],
    rows: [
      { from: "provider", to: "x402n", label: "POST /deals/{id}/deliverables", tag: "POST", type: "api", detail: "deliverables, completion_proof" },
      { from: "x402n", to: "x402n", label: "Deal → DELIVERED", tag: "STATE", type: "state" },
      { from: "x402n", to: "consumer", label: "Awaiting consumer verification", tag: "REVIEW", type: "state" },
    ],
    state: { deal: "DELIVERED", payment: "LOCKED", rfo: "ACCEPTED" },
  },
  {
    phase: "COMPLETE",
    num: "07",
    title: "Completion & release",
    active: ["consumer", "x402n", "circle"],
    rows: [
      { from: "consumer", to: "x402n", label: "POST /deals/{id}/complete", tag: "DONE", type: "state" },
      { from: "x402n", to: "circle", label: "release_escrow()", tag: "RELEASE", type: "pay" },
      { from: "circle", to: "provider", label: "USDC → provider wallet", tag: "USDC", type: "pay" },
      { from: "x402n", to: "x402n", label: "Stats updated, reputation recalculated", tag: "✓", type: "state" },
    ],
    state: { deal: "COMPLETED", payment: "RELEASED", rfo: "ACCEPTED" },
  },
  {
    phase: "DISPUTE",
    num: "08",
    title: "Dispute flow",
    active: ["consumer", "x402n", "provider"],
    rows: [
      { from: "consumer", to: "x402n", label: "POST /deals/{id}/dispute", tag: "DISPUTE", type: "err" },
      { from: "x402n", to: "x402n", label: "Funds held, manual resolution", tag: "HELD", type: "err" },
      { from: "x402n", to: "provider", label: "Resolution: release, refund, or split", tag: "RESOLVE", type: "pay" },
    ],
    state: { deal: "DISPUTED", payment: "LOCKED", rfo: "ACCEPTED" },
  },
  {
    phase: "CANCEL",
    num: "09",
    title: "Cancellation & refund",
    active: ["consumer", "x402n", "circle"],
    rows: [
      { from: "consumer", to: "x402n", label: "POST /deals/{id}/cancel", tag: "CANCEL", type: "err" },
      { from: "x402n", to: "circle", label: "refund_escrow()", tag: "REFUND", type: "pay" },
      { from: "circle", to: "consumer", label: "USDC → consumer wallet", tag: "USDC", type: "pay" },
    ],
    state: { deal: "CANCELLED", payment: "REFUNDED", rfo: "CANCELLED" },
  },
];

const ROW_DELAY = 700;
const STEP_PAUSE = 1800;

const tagColors = {
  api: { bg: "rgba(55,138,221,0.12)", text: "#378ADD", border: "rgba(55,138,221,0.25)" },
  state: { bg: "rgba(29,158,117,0.12)", text: "#1D9E75", border: "rgba(29,158,117,0.25)" },
  pay: { bg: "rgba(186,117,23,0.12)", text: "#BA7517", border: "rgba(186,117,23,0.25)" },
  err: { bg: "rgba(226,75,74,0.12)", text: "#E24B4A", border: "rgba(226,75,74,0.25)" },
};

const stateColors = {
  OPEN: "#1D9E75", EVALUATING: "#BA7517", ACCEPTED: "#378ADD",
  PENDING_PAYMENT: "#BA7517", PENDING: "#888780", ACTIVE: "#378ADD",
  LOCKED: "#D4537E", DELIVERED: "#7F77DD", COMPLETED: "#1D9E75",
  RELEASED: "#1D9E75", DISPUTED: "#E24B4A", CANCELLED: "#888780",
  REFUNDED: "#BA7517",
};

export default function X402nFlow() {
  const [step, setStep] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const actorIdx = (id: string) => ACTORS.findIndex((a) => a.id === id);

  const advance = useCallback(() => {
    setVisibleRows((prev) => {
      const maxRows = STEPS[step]?.rows.length || 0;
      if (prev < maxRows) return prev + 1;
      return prev;
    });
  }, [step]);

  useEffect(() => {
    if (paused) return;
    const maxRows = STEPS[step].rows.length;
    if (visibleRows < maxRows) {
      timerRef.current = setTimeout(advance, ROW_DELAY);
    } else {
      timerRef.current = setTimeout(() => {
        setStep((s) => (s + 1) % STEPS.length);
        setVisibleRows(0);
      }, STEP_PAUSE);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step, visibleRows, paused, advance]);

  const cur = STEPS[step];
  const progress = ((step + visibleRows / cur.rows.length) / STEPS.length) * 100;

  return (
    <div
      ref={containerRef}
      onClick={() => setPaused((p) => !p)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 780,
        margin: "0 auto",
        fontFamily: '"IBM Plex Mono", "SF Mono", "Fira Code", monospace',
        cursor: "pointer",
        userSelect: "none",
        background: "#0a0a0f",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid bg */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      {/* Top progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.04)", position: "relative" }}>
        <div style={{
          height: "100%", background: "linear-gradient(90deg, #378ADD, #7F77DD, #1D9E75)",
          width: `${progress}%`, transition: "width 0.5s ease",
        }} />
      </div>

      <div style={{ padding: "28px 28px 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 11, color: "#999", letterSpacing: 2 }}>x402n</span>
            <span style={{ fontSize: 11, color: "#666", letterSpacing: 1 }}>PROTOCOL FLOW</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: paused ? "#E24B4A" : "#1D9E75",
              display: "inline-block",
              animation: paused ? "none" : "pulse 2s ease infinite",
            }} />
            <span style={{ fontSize: 10, color: "#888", letterSpacing: 1 }}>
              {paused ? "PAUSED" : "LIVE"}
            </span>
          </div>
        </div>

        {/* Step counter + title */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
          <span style={{ fontSize: 36, fontWeight: 200, color: "#444", lineHeight: 1 }}>{cur.num}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#e0e0e0", letterSpacing: 0.5 }}>
              {cur.title}
            </div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2, letterSpacing: 0.5 }}>
              {cur.phase}
            </div>
          </div>
        </div>

        {/* Actor lane headers */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {ACTORS.map((a) => {
            const isActive = cur.active.includes(a.id);
            return (
              <div key={a.id} style={{
                flex: 1, padding: "10px 8px", borderRadius: 8, textAlign: "center",
                border: `1px solid ${isActive ? a.color + "40" : "rgba(255,255,255,0.04)"}`,
                background: isActive ? a.color + "0D" : "transparent",
                transition: "all 0.5s ease",
                position: "relative", overflow: "hidden",
              }}>
                {isActive && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: a.color, opacity: 0.6,
                  }} />
                )}
                <div style={{
                  fontSize: 12, fontWeight: 500, letterSpacing: 0.5,
                  color: isActive ? "#e0e0e0" : "#555",
                  transition: "color 0.4s",
                }}>{a.name}</div>
                <div style={{
                  fontSize: 10, color: isActive ? "#999" : "#444",
                  marginTop: 2, transition: "color 0.4s",
                }}>{a.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Animated flow rows */}
        <div style={{ minHeight: 210 }}>
          {cur.rows.map((row, i) => {
            const visible = i < visibleRows;
            const fromIdx = actorIdx(row.from);
            const toIdx = actorIdx(row.to);
            const tc = tagColors[row.type] || tagColors.api;
            const isLoop = row.from === row.to;

            return (
              <div key={`${step}-${i}`} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", marginBottom: 6, borderRadius: 8,
                background: visible ? "rgba(255,255,255,0.03)" : "transparent",
                borderLeft: visible ? `2px solid ${tc.text}` : "2px solid transparent",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              }}>
                {/* From label */}
                <span style={{
                  fontSize: 11, fontWeight: 500, color: ACTORS[fromIdx]?.color || "#888",
                  minWidth: 66, letterSpacing: 0.3,
                }}>{ACTORS[fromIdx]?.name || row.from}</span>

                {/* Arrow */}
                <span style={{ color: "#444", fontSize: 14 }}>
                  {isLoop ? "↻" : fromIdx < toIdx ? "→" : "←"}
                </span>

                {/* To label */}
                <span style={{
                  fontSize: 11, fontWeight: 500, color: ACTORS[toIdx]?.color || "#888",
                  minWidth: 66, letterSpacing: 0.3,
                }}>{ACTORS[toIdx]?.name || row.to}</span>

                {/* Message + tag */}
                <span style={{ flex: 1, fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>
                  {row.label}
                  {row.detail && (
                    <span style={{ display: "block", fontSize: 10, color: "#777", marginTop: 1 }}>
                      {row.detail}
                    </span>
                  )}
                </span>

                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: 1,
                  padding: "3px 8px", borderRadius: 4,
                  background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`,
                  whiteSpace: "nowrap",
                }}>{row.tag}</span>
              </div>
            );
          })}
        </div>

        {/* State pills */}
        {cur.state && (
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {Object.entries(cur.state).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 6,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: stateColors[v as string] || "#888",
                }} />
                <span style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>
                  {k}
                </span>
                <span style={{ fontSize: 10, color: stateColors[v as string] || "#aaa", fontWeight: 600, letterSpacing: 0.5 }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step indicators */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 20, paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ display: "flex", gap: 4 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 24 : 8, height: 4, borderRadius: 2,
                background: i === step
                  ? "linear-gradient(90deg, #378ADD, #7F77DD)"
                  : i < step ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                transition: "all 0.4s ease",
              }} />
            ))}
          </div>
          <span style={{ fontSize: 10, color: "#666", letterSpacing: 1 }}>
            {paused ? "CLICK TO RESUME" : "CLICK TO PAUSE"}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
