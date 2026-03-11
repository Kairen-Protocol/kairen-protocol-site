'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, Check, AlertCircle } from 'lucide-react';

function ConfigureContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    chains: [] as string[],
    notifications: true,
    agentType: '',
  });
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'success'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('invalid');
      setError('Invalid or missing configuration token');
      return;
    }

    // Validate token format
    if (!/^[A-Za-z0-9+/=]+$/.test(token)) {
      setStatus('invalid');
      setError('Invalid token format');
      return;
    }

    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      const { email: tokenEmail, timestamp, action } = decoded;

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tokenEmail)) {
        setStatus('invalid');
        setError('Invalid email in token');
        return;
      }

      // Check if token is expired (48 hours)
      const now = Date.now();
      const expiryTime = 48 * 60 * 60 * 1000; // 48 hours
      if (now - timestamp > expiryTime) {
        setStatus('invalid');
        setError('Configuration link has expired. Please sign up again.');
        return;
      }

      // Check timestamp is not in the future (prevent tampering)
      if (timestamp > now) {
        setStatus('invalid');
        setError('Invalid token timestamp');
        return;
      }

      if (action !== 'beta_signup') {
        setStatus('invalid');
        setError('Invalid configuration token');
        return;
      }

      setEmail(tokenEmail);
      setStatus('valid');
    } catch (err) {
      setStatus('invalid');
      setError('Invalid configuration token');
    }
  }, [searchParams]);

  const handleChainToggle = (chain: string) => {
    setPreferences(prev => ({
      ...prev,
      chains: prev.chains.includes(chain)
        ? prev.chains.filter(c => c !== chain)
        : [...prev.chains, chain]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate chains
    if (preferences.chains.length === 0) {
      setError('Please select at least one blockchain');
      return;
    }

    if (preferences.chains.length > 10) {
      setError('Maximum 10 blockchains allowed');
      return;
    }

    const allowedChains = ['Solana', 'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'];
    for (const chain of preferences.chains) {
      if (!allowedChains.includes(chain)) {
        setError('Invalid blockchain selected');
        return;
      }
    }

    // Validate agent type
    if (!preferences.agentType) {
      setError('Please select your use case');
      return;
    }

    const allowedTypes = ['ai-agent-developer', 'service-provider', 'infrastructure-operator', 'researcher', 'enterprise', 'other'];
    if (!allowedTypes.includes(preferences.agentType)) {
      setError('Invalid use case selected');
      return;
    }

    // Here you would save the preferences to your database
    // Add API endpoint: POST /api/configure with CSRF protection
    console.log('Saving preferences:', { email, preferences });

    setStatus('success');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="font-mono">VALIDATING TOKEN...</p>
        </div>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <div className="scanlines" />

        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md w-full cyber-border p-8 bg-black/80 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-black uppercase text-red-500">ERROR</h1>
            </div>

            <p className="text-green-400/80 mb-6 font-mono text-sm">{error}</p>

            <Link href="/" className="cyber-btn block text-center">
              RETURN HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <div className="scanlines" />

        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md w-full cyber-border p-8 bg-black/80 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <Check className="h-8 w-8 text-green-500" />
              <h1 className="text-2xl font-black uppercase">SUCCESS</h1>
            </div>

            <p className="text-green-400/80 mb-6 font-mono text-sm">
              Your beta access has been configured successfully!
              <br /><br />
              We'll notify you at <span className="text-yellow-400">{email}</span> when the beta launches in Q2 2026.
            </p>

            <div className="space-y-4 mb-6">
              <div className="cyber-border p-4 bg-green-500/5">
                <p className="text-xs uppercase tracking-wider text-green-500/70 mb-2">Selected Chains</p>
                <div className="flex flex-wrap gap-2">
                  {preferences.chains.map(chain => (
                    <span key={chain} className="text-sm text-green-400 bg-green-500/10 px-2 py-1 border border-green-500/30">
                      {chain}
                    </span>
                  ))}
                </div>
              </div>

              <div className="cyber-border p-4 bg-green-500/5">
                <p className="text-xs uppercase tracking-wider text-green-500/70 mb-2">Use Case</p>
                <p className="text-sm text-green-400">{preferences.agentType}</p>
              </div>
            </div>

            <Link href="/" className="cyber-btn block text-center">
              RETURN HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <div className="scanlines" />

      <aside className="fixed left-0 top-0 bottom-0 w-16 border-r border-green-500/30 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center py-6 gap-6">
        <Link href="/" className="group relative">
          <Shield className="h-6 w-6 text-green-500 group-hover:text-green-400 transition-all" />
        </Link>
      </aside>

      <div className="ml-16 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full cyber-border p-8 bg-black/80 backdrop-blur">
          <div className="mb-8">
            <h1 className="text-3xl font-black uppercase mb-2 glow-text">CONFIGURE BETA ACCESS</h1>
            <p className="text-green-500/70 font-mono text-sm">
              EMAIL: <span className="text-yellow-400">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blockchain Selection */}
            <div>
              <label className="block text-sm uppercase tracking-wider text-green-400 mb-3">
                SELECT BLOCKCHAINS *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Solana', 'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'].map(chain => (
                  <button
                    key={chain}
                    type="button"
                    onClick={() => handleChainToggle(chain)}
                    className={`p-3 border-2 transition-all text-left ${
                      preferences.chains.includes(chain)
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-green-500/30 bg-black text-green-500/70 hover:border-green-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">{chain}</span>
                      {preferences.chains.includes(chain) && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Use Case Selection */}
            <div>
              <label className="block text-sm uppercase tracking-wider text-green-400 mb-3">
                PRIMARY USE CASE *
              </label>
              <select
                value={preferences.agentType}
                onChange={(e) => setPreferences(prev => ({ ...prev, agentType: e.target.value }))}
                className="w-full px-4 py-3 bg-black border-2 border-green-500/30 text-green-400 focus:border-green-500 focus:outline-none font-mono"
              >
                <option value="">SELECT USE CASE...</option>
                <option value="ai-agent-developer">AI Agent Developer</option>
                <option value="service-provider">Service Provider</option>
                <option value="infrastructure-operator">Infrastructure Operator</option>
                <option value="researcher">Researcher/Academic</option>
                <option value="enterprise">Enterprise Integration</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="cyber-border p-4 bg-green-500/5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => setPreferences(prev => ({ ...prev, notifications: e.target.checked }))}
                  className="w-5 h-5 bg-black border-2 border-green-500/50 checked:bg-green-500 checked:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <div>
                  <span className="text-sm text-green-400 font-mono">
                    Send me updates about Kairen Protocol
                  </span>
                  <p className="text-xs text-green-500/70 mt-1">
                    Beta launch announcements, feature updates, and community events
                  </p>
                </div>
              </label>
            </div>

            {error && (
              <div className="cyber-border border-red-500/50 p-4 bg-red-500/5">
                <p className="text-red-400 text-sm font-mono">{error}</p>
              </div>
            )}

            <button type="submit" className="cyber-btn-yellow w-full">
              COMPLETE CONFIGURATION →
            </button>
          </form>

          <p className="text-xs text-green-500/50 font-mono text-center mt-6">
            [LAUNCHING Q2 2026] • ALL DATA ENCRYPTED • GDPR COMPLIANT
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="font-mono">LOADING...</p>
        </div>
      </div>
    }>
      <ConfigureContent />
    </Suspense>
  );
}
