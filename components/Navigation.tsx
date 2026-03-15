'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-4 z-50 flex items-center justify-between gap-4 px-5 py-4 transition-all duration-300 rounded-3xl ${
        scrolled
          ? 'bg-[rgba(255,253,250,0.88)] backdrop-blur-xl shadow-[0_20px_50px_rgba(15,20,25,0.1)] border border-[rgba(15,20,25,0.09)]'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="text-4xl font-serif italic font-normal hover:opacity-70 transition-opacity">
        forge
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6 font-medium text-[var(--forge-muted)]">
        <Link href="/about" className="hover:text-[var(--forge-ink)] transition-colors">
          About
        </Link>
        <Link href="https://x402n.kairen.xyz" target="_blank" className="hover:text-[var(--forge-ink)] transition-colors">
          X402N
        </Link>
        <Link href="https://market.kairen.xyz" target="_blank" className="hover:text-[var(--forge-ink)] transition-colors">
          Marketplace
        </Link>
        <Link href="/docs" className="hover:text-[var(--forge-ink)] transition-colors">
          Docs
        </Link>
        <Link href="/docs#layers" className="hover:text-[var(--forge-ink)] transition-colors">
          Architecture
        </Link>
      </div>

      {/* CTA */}
      <Link
        href="/#waitlist"
        className="bg-[var(--forge-primary)] text-white px-5 py-2.5 rounded-full font-semibold shadow-[0_8px_20px_rgba(79,124,255,0.3)] hover:bg-[var(--forge-primary-dark)] hover:shadow-[0_12px_30px_rgba(79,124,255,0.4)] transition-all"
      >
        Early Access
      </Link>
    </nav>
  );
}
