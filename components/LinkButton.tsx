'use client';

import { ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'yellow' | 'green' | 'cyan';
}

export default function LinkButton({ href, children, variant = 'yellow' }: LinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variantStyles = {
    yellow: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500',
      text: 'text-yellow-400',
      shadow: 'shadow-[4px_4px_0px_0px_rgba(234,179,8,0.4)]',
      shadowPressed: 'shadow-[2px_2px_0px_0px_rgba(234,179,8,0.4)]',
      darkBorder: 'border-yellow-600',
    },
    green: {
      bg: 'bg-green-500/20',
      border: 'border-green-500',
      text: 'text-green-400',
      shadow: 'shadow-[4px_4px_0px_0px_rgba(34,197,94,0.4)]',
      shadowPressed: 'shadow-[2px_2px_0px_0px_rgba(34,197,94,0.4)]',
      darkBorder: 'border-green-600',
    },
    cyan: {
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500',
      text: 'text-cyan-400',
      shadow: 'shadow-[4px_4px_0px_0px_rgba(6,182,212,0.4)]',
      shadowPressed: 'shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]',
      darkBorder: 'border-cyan-600',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="inline-block my-1">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          group relative inline-flex items-center gap-2
          px-3 py-1.5
          border ${styles.border}
          ${styles.bg}
          ${styles.text}
          font-mono text-xs uppercase tracking-wide
          transition-all duration-100
          ${isPressed ? 'translate-y-[1px]' : 'translate-y-0'}
          hover:brightness-125 hover:${styles.border}
          active:translate-y-[1px]
        `}
      >
        {/* Link icon */}
        <ExternalLink className="h-3 w-3 flex-shrink-0" />

        {/* Content */}
        <span>{children}</span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="ml-auto flex-shrink-0 p-0.5 hover:bg-black/30 rounded transition-colors"
          title="Copy link"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />
          )}
        </button>
      </a>
    </div>
  );
}
