'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'kairen_theme_mode';

export default function ThemeBoot() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const mode = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
      const resolved = mode === 'system' ? (media.matches ? 'dark' : 'light') : mode;
      document.documentElement.setAttribute('data-theme', resolved);
    };

    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return null;
}
