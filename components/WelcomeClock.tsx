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
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
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
  } catch {
    // Storage can be unavailable in some contexts; non-critical.
  }
}

export default function WelcomeClock() {
  const [now, setNow] = useState(() => new Date());
  const [place, setPlace] = useState('');

  /**
   * Minute-accurate clock update:
   * - Aligns first tick to the next minute boundary
   * - Then updates every 60 seconds
   */
  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const schedule = () => {
      const d = new Date();
      setNow(d);

      const msToNextMinute = (60 - d.getSeconds()) * 1000 - d.getMilliseconds();

      timeoutId = window.setTimeout(() => {
        setNow(new Date());
        intervalId = window.setInterval(() => setNow(new Date()), 60_000);
      }, msToNextMinute);
    };

    schedule();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  /**
   * Lightweight location line:
   * - Fast path: reads from session cache
   * - Network path: fetch with timeout + abort for robustness
   */
  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) setPlace(cached);

    async function loadPlace() {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 3000);

      try {
        const res = await fetch('https://ipapi.co/json/', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) return;

        const data: unknown = await res.json();

        const city =
          typeof (data as { city?: unknown }).city === 'string'
            ? (data as { city: string }).city
            : '';

        const country =
          typeof (data as { country_name?: unknown }).country_name === 'string'
            ? (data as { country_name: string }).country_name
            : '';

        const text = [city, country].filter(Boolean).join(', ');
        if (!text) return;

        writeCache(text);
        if (!cancelled) setPlace(text);
      } catch {
        // Non-critical UI enhancement; ignore failures silently.
      } finally {
        window.clearTimeout(timeoutId);
      }
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
    return `${date} ${time}${tz ? ` ${tz}` : ''}`;
  }, [now]);

  return (
    <div
      className="text-[13px] sm:text-[14px] md:text-[18px] leading-[18px] sm:leading-[22px] text-left text-[#999999] md:text-black"
      style={{
        fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
        fontWeight: 500,
      }}
    >
      <div>{line1}</div>
      <div className="hidden sm:block">{place}</div>
    </div>
  );
}
