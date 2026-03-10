'use client';

import { useEffect, useMemo, useState } from 'react';

type CachedPlace = {
  placeText: string;
  countryCode: string;
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

function readCache(): { placeText: string; countryCode: string } {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return { placeText: '', countryCode: '' };

    const parsed = JSON.parse(raw) as CachedPlace;
    if (!parsed?.placeText || !parsed?.expiresAt) return { placeText: '', countryCode: '' };
    if (Date.now() > parsed.expiresAt) return { placeText: '', countryCode: '' };

    return {
      placeText: parsed.placeText,
      countryCode: typeof parsed.countryCode === 'string' ? parsed.countryCode : '',
    };
  } catch {
    return { placeText: '', countryCode: '' };
  }
}

function writeCache(placeText: string, countryCode: string) {
  try {
    const payload: CachedPlace = {
      placeText,
      countryCode,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can be unavailable in some contexts; non-critical.
  }
}

/* ──────────────────────────────────────────────────────────────
   WELCOME CLOCK
────────────────────────────────────────────────────────────── */
export default function WelcomeClock({ mobileStack = false }: Props) {
  const [now, setNow] = useState(() => new Date());
  const [place, setPlace] = useState('');
  const [countryCode, setCountryCode] = useState('');

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
    if (cached.placeText) setPlace(cached.placeText);
    if (cached.countryCode) setCountryCode(cached.countryCode);

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

        const code =
          typeof (data as { country_code?: unknown }).country_code === 'string'
            ? (data as { country_code: string }).country_code
            : '';

        const text = [city, country].filter(Boolean).join(', ');
        if (!text) return;

        writeCache(text, code);

        if (!cancelled) {
          setPlace(text);
          setCountryCode(code);
        }
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

  const dateTimeText = useMemo(() => {
    const date = formatDate(now);
    const time = formatTimeHMS(now);
    const tz = formatTzShort(now);
    return `${date} ${time}${tz ? ` ${tz}` : ''}`;
  }, [now]);

  if (mobileStack) {
    return (
      <div
        className="text-left tabular-nums text-[12px] leading-[16px] text-black"
        style={{
          fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
          fontWeight: 400,
        }}
      >
        <div>{dateTimeText}</div>
        {place ? <div>{place}</div> : null}
      </div>
    );
  }

  return (
    <div
      className="text-left tabular-nums text-[14px] leading-[20px] text-black"
      style={{
        fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
        fontWeight: 400,
      }}
    >
      <div>{dateTimeText}</div>
      {place ? <div>{place}</div> : null}
    </div>
  );
}
