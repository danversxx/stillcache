'use client';

import { useEffect, useMemo, useState } from 'react';

type CachedPlace = {
  placeText: string;
  expiresAt: number;
};

type Props = {
  mobileStack?: boolean;
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

function formatTimeHMS(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
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
    const payload: CachedPlace = {
      placeText,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {}
}

/* ──────────────────────────────────────────────────────────────
   WELCOME CLOCK
────────────────────────────────────────────────────────────── */
export default function WelcomeClock({ mobileStack = false }: Props) {
  const [now, setNow] = useState(() => new Date());
  const [place, setPlace] = useState('');

  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const schedule = () => {
      const d = new Date();
      setNow(d);

      const msToNextSecond = (1000 - d.getMilliseconds()) % 1000 || 1000;

      timeoutId = window.setTimeout(() => {
        setNow(new Date());
        intervalId = window.setInterval(() => setNow(new Date()), 1000);
      }, msToNextSecond);
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
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 3000);

      try {
        const res = await fetch('https://ipapi.co/json/', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) return;

        const data: any = await res.json();

        const city = typeof data.city === 'string' ? data.city : '';
        const country = typeof data.country_name === 'string' ? data.country_name : '';

        const text = [city, country].filter(Boolean).join(', ');
        if (!text) return;

        writeCache(text);

        if (!cancelled) setPlace(text);
      } catch {} finally {
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
    const time = formatTimeHMS(now);
    const tz = formatTzShort(now);
    return `${date} ${time}${tz ? ` ${tz}` : ''}`;
  }, [now]);

  const typography =
    "text-[12px] md:text-[14px] leading-[20px] font-bold tracking-[0.01em] text-black";

  if (mobileStack) {
    return (
      <div
        className={`${typography} tabular-nums`}
        style={{
          fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
        }}
      >
        <div>{line1}</div>
        {place ? <div>{place}</div> : null}
      </div>
    );
  }

  return (
    <div
      className={`${typography} tabular-nums`}
      style={{
        fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
      }}
    >
      <div>{line1}</div>
      {place ? <div>{place}</div> : null}
    </div>
  );
}
