'use client';

import { useEffect, useMemo, useState } from 'react';

type AppearanceMode = 'auto' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'stillcache_appearance_mode';

/* ──────────────────────────────────────────────────────────────
   STORAGE HELPERS
────────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────────
   THEME RESOLUTION
────────────────────────────────────────────────────────────── */

function resolveAutoTheme(): ResolvedTheme {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? 'light' : 'dark';
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/* ──────────────────────────────────────────────────────────────
   ICONS
────────────────────────────────────────────────────────────── */

function AutoIcon() {
  return (
    <svg width="15" height="14" viewBox="0 0 22 20" fill="none">
      <path
        d="M7 19H15M11 15V19M5.8 15H16.2C17.8802 15 18.7202 15 19.362 14.673C19.9265 14.3854 20.3854 13.9265 20.673 13.362C21 12.7202 21 11.8802 21 10.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V10.2C1 11.8802 1 12.7202 1.32698 13.362C1.6146 13.9265 2.07354 14.3854 2.63803 14.673C3.27976 15 4.11984 15 5.8 15Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 22 22" fill="none">
      <path
        d="M11 1V3M11 19V21M3 11H1M5.31412 5.31412L3.8999 3.8999M16.6859 5.31412L18.1001 3.8999M5.31412 16.69L3.8999 18.1042M16.6859 16.69L18.1001 18.1042M21 11H19M16 11C16 13.7614 13.7614 16 11 16C8.23858 16 6 13.7614 6 11C6 8.23858 8.23858 6 11 6C13.7614 6 16 8.23858 16 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DarkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 22 22" fill="none">
      <path
        d="M21 14.8442C19.6866 15.4382 18.2286 15.7688 16.6935 15.7688C10.9153 15.7688 6.23116 11.0847 6.23116 5.30654C6.23116 3.77135 6.5618 2.3134 7.15577 1C3.52576 2.64163 1 6.2947 1 10.5377C1 16.3159 5.68414 21 11.4623 21C15.7053 21 19.3584 18.4742 21 14.8442Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   APPEARANCE CONTROL
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
    <div className="inline-flex items-center gap-[10px] md:gap-[12px] text-black">
      {/* STYLE: Inline icon row + responsive spacing + icon color */}
      {(['auto', 'light', 'dark'] as AppearanceMode[]).map((v) => {
        const active = mode === v;

        return (
          <button
            key={v}
            type="button"
            aria-label={`Set appearance to ${v}`}
            aria-pressed={active}
            onClick={() => updateMode(v)}
            className={[
              'inline-flex h-[18px] w-[18px] items-center justify-center transition-opacity duration-150',
              active ? 'opacity-100' : 'opacity-[0.25] hover:opacity-[0.55]',
            ].join(' ')}
          >
            <span className="relative -top-[1px]">
              {v === 'auto' ? <AutoIcon /> : v === 'light' ? <LightIcon /> : <DarkIcon />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
