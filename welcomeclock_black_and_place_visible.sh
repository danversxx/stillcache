#!/bin/bash

set +H
cd /Users/j/Downloads/stillcache

cat <<'INNER' > components/WelcomeClock.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

type CachedPlace = {
  placeText: string;
  expiresAt: number;
};

const CACHE_KEY = 'stillcache_place_v3';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function formatDate(d: Date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(d);
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function formatTimeHM(d: Date) {
  return \`\${pad2(d.getHours())}:\${pad2(d.getMinutes())}\`;
}

function formatTzShort(d: Date) {
  try {
    const parts = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' }).formatToParts(d);
    return parts.find((p) => p.type === 'timeZoneName')?.value || '';
  } catch {
    return '';
  }
}

function readCache(): string {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return '';
    const parsed = JSON.parse(raw) as CachedPlace;
    if (!parsed?.placeText || !parsed?.expiresAt) return '';
    if (Date.now() > parsed.expiresAt) return '';
    return parsed.placeText;
  } catch {
    return '';
  }
}

function writeCache(placeText: string) {
  try {
    const payload: CachedPlace = { placeText, expiresAt: Date.now() + CACHE_TTL_MS };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {}
}

/* ──────────────────────────────────────────────────────────────
   WELCOME CLOCK (Header → right side)
   Visual output order: Mobile/Tablet block → Desktop block
────────────────────────────────────────────────────────────── */
export default function WelcomeClock() {
  const [now, setNow] = useState(() => new Date());
  const [place, setPlace] = useState('');

  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const schedule = () => {
      const d = new Date();
      setNow(d);

      const msToNextMinute = (60 - d.getSeconds()) * 1000 - d.getMilliseconds();

      timeoutId = window.setTimeout(() => {
        setNow(new Date());
        intervalId = window.setInterval(() => setNow(new Date()), 60000);
      }, msToNextMinute);
    };

    schedule();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) setPlace(cached);

    async function loadPlace() {
      try {
        const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
        if (!res.ok) return;

        const data: any = await res.json();

        const city = typeof data.city === 'string' ? data.city : '';
        const country = typeof data.country_name === 'string' ? data.country_name : '';

        const text = [city, country].filter(Boolean).join(', ');
        if (!text) return;

        writeCache(text);
        if (!cancelled) setPlace(text);
      } catch {}
    }

    loadPlace();

    return () => {
      cancelled = true;
    };
  }, []);

  const line1 = useMemo(() => {
    const date = formatDate(now);
    const time = formatTimeHM(now);
    const tz = formatTzShort(now);
    return \`\${date} \${time}\${tz ? \` \${tz}\` : ''}\`;
  }, [now]);

  return (
    <div
      className="text-left"
      style={{
        fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
      }}
    >
      {/* ────────────────────────────────────────────────────────
          MOBILE / TABLET
          Visible: < md
      ───────────────────────────────────────────────────────── */}
      <div className="md:hidden text-[13px] sm:text-[14px] font-medium leading-[18px] sm:leading-[22px] text-black">
        <div>{line1}</div>
        <div>
          {place}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          DESKTOP
          Visible: ≥ md
      ───────────────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center justify-end gap-[8px] text-black font-medium text-[14px] leading-[21px] tracking-[0.01em]">
        <span>{line1}</span>
        <span>{place}</span>
      </div>
    </div>
  );
}
INNER

echo "WelcomeClock.tsx updated successfully."
