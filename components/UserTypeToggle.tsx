'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type ToggleVariant = 'full' | 'compact';

type UserTypeToggleProps = {
  variant?: ToggleVariant;
};

export default function UserTypeToggle({ variant = 'full' }: UserTypeToggleProps) {
  const [userType, setUserType] = useState<'human' | 'agent'>('human');
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skillCommand = 'curl -s https://kairen.xyz/skill.md';

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(skillCommand);
      setCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="border border-green-500/20 bg-black/60 px-2 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUserType('human')}
            className={`px-3 py-1 text-[10px] uppercase tracking-[0.22em] transition-all ${
              userType === 'human'
                ? 'bg-green-500/20 text-green-300'
                : 'text-green-500/60 hover:text-green-300'
            }`}
          >
            Human
          </button>
          <button
            onClick={() => setUserType('agent')}
            className={`px-3 py-1 text-[10px] uppercase tracking-[0.22em] transition-all ${
              userType === 'agent'
                ? 'bg-cyan-500/20 text-cyan-300'
                : 'text-green-500/60 hover:text-cyan-300'
            }`}
          >
            Agent
          </button>

          {userType === 'human' ? (
            <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.22em]">
              <Link href="/about" className="text-green-400/70 hover:text-green-300">
                About
              </Link>
              <Link href="/docs" className="text-green-400/70 hover:text-green-300">
                Docs
              </Link>
              <Link href="/architecture" className="text-green-400/70 hover:text-green-300">
                Stack
              </Link>
            </div>
          ) : (
            <button
              onClick={handleCopy}
              className="hidden md:inline-flex items-center gap-2 overflow-hidden whitespace-nowrap border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] text-cyan-300 transition-all hover:bg-cyan-500/15"
            >
              <code className="max-w-[22rem] overflow-hidden text-ellipsis">{skillCommand}</code>
              <span className="uppercase tracking-[0.22em]">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-[40rem] border border-green-500/30 bg-black/65 p-5 backdrop-blur-md">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,255,0,0.08),transparent_45%)]" />

      <div className="relative z-10">
        <div className="mb-4 flex gap-2 border border-green-500/20 bg-black/40 p-1.5">
          <button
            onClick={() => setUserType('human')}
            className={`flex-1 px-4 py-2 text-xs uppercase tracking-[0.28em] transition-all ${
              userType === 'human'
                ? 'border border-green-500/30 bg-green-500/20 text-green-300'
                : 'text-green-500/60 hover:text-green-300'
            }`}
          >
            I am human
          </button>
          <button
            onClick={() => setUserType('agent')}
            className={`flex-1 px-4 py-2 text-xs uppercase tracking-[0.28em] transition-all ${
              userType === 'agent'
                ? 'border border-cyan-500/30 bg-cyan-500/20 text-cyan-300'
                : 'text-green-500/60 hover:text-cyan-300'
            }`}
          >
            I am agent
          </button>
        </div>

        {userType === 'human' ? (
          <div className="space-y-4">
            <p className="text-sm leading-7 text-green-300/78">
              Start with the protocol overview, then move through the stack from identity and routing up to market
              coordination and x402n settlement.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border border-green-500/20 bg-black/40 p-3">
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-green-500/55">Start</p>
                <p className="text-sm text-green-300/80">Read the docs for the protocol model and current live surfaces.</p>
              </div>
              <div className="border border-green-500/20 bg-black/40 p-3">
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-green-500/55">Then</p>
                <p className="text-sm text-green-300/80">Use architecture to inspect the L0-L4 stack and layer boundaries.</p>
              </div>
              <div className="border border-green-500/20 bg-black/40 p-3">
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-green-500/55">Finally</p>
                <p className="text-sm text-green-300/80">Jump into Market or x402n once you know the task category.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm leading-7 text-cyan-300/78">
              Fetch the agent entrypoint to discover the full L0-L4 map, live surfaces, and where to go for Market,
              x402n, ForgeID, and AgentNet context.
            </p>
            <div className="border border-cyan-500/30 bg-black/80 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <code className="overflow-x-auto text-sm text-cyan-300">{skillCommand}</code>
                <button
                  onClick={handleCopy}
                  className="border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300 transition-all hover:bg-cyan-500/15"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/55">
              Direct endpoint: https://kairen.xyz/skill.md
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
