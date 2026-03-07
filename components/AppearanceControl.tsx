'use client';

import { useEffect, useMemo, useState } from 'react';

type AppearanceMode = 'auto' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'stillcache_appearance_mode';

function getStoredMode(): AppearanceMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark' || v === 'auto') return v;
  } catch {}
  return 'auto';
}

function setStoredMode(mode: AppearanceMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {}
}

function resolveAutoTheme(): ResolvedTheme {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? 'light' : 'dark';
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/* ──────────────────────────────────────────────────────────────
   APPEARANCE CONTROL (Header → under WelcomeClock)
────────────────────────────────────────────────────────────── */

export default function AppearanceControl() {
  const [mode, setMode] = useState<AppearanceMode>('auto');

  useEffect(() => {
    const stored = getStoredMode();
    setMode(stored);
  }, []);

  const resolved = useMemo<ResolvedTheme>(() => {
    if (mode === 'light') return 'light';
    if (mode === 'dark') return 'dark';
    return resolveAutoTheme();
  }, [mode]);

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  function updateMode(next: AppearanceMode) {
    setMode(next);
    setStoredMode(next);
  }

  return (
    <div className="flex items-center gap-[10px] text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.01em] text-black">
      {/* STYLE: Inline control layout + spacing + typography */}

      <p className="font-medium">
        {/* STYLE: Label weight */}
        Appearance
      </p>

      <div className="flex items-center gap-[8px]">
        {(['auto','light','dark'] as AppearanceMode[]).map(v => {
          const active = mode === v;

          return (
            <button
              key={v}
              onClick={() => updateMode(v)}
              className={active ? 'opacity-100' : 'opacity-50'}
            >
              {v === 'auto' ? 'Auto' : v === 'light' ? 'Light' : 'Dark'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
