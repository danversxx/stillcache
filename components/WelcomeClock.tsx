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
    const payload: CachedPlace = { placeText, expiresAt: Date.now() + CACHE_TTL_MS };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can be unavailable in some contexts; non-critical.
  }
}

/* ──────────────────────────────────────────────────────────────
   WELCOME CLOCK (Header → right side)
   - Desktop: split into date/time + location groups
   - Mobile: stacked date/time + location
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

  const dateTimeText = useMemo(() => {
    const date = formatDate(now);
    const time = formatTimeHMS(now);
    const tz = formatTzShort(now);
    return `${date} ${time}${tz ? ` ${tz}` : ''}`;
  }, [now]);

  if (mobileStack) {
    return (
      <div
        className="text-left tabular-nums"
        /* STYLE: Left aligned stacked mobile header clock + stable numeral widths */
        style={{
          fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
          /* STYLE: Font family/stack */
        }}
      >
        <div className="text-[13px] sm:text-[14px] md:text-[14px] font-medium leading-[18px] sm:leading-[22px] md:leading-[21px] text-black">
          {dateTimeText}
        </div>

        {place ? (
          <div className="text-[13px] sm:text-[14px] md:text-[14px] font-medium leading-[18px] sm:leading-[22px] md:leading-[21px] text-black">
            {place}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="text-left lg:text-right tabular-nums"
      /* STYLE: Left aligned while stacked, right aligned on desktop */
      /* STYLE: tabular-nums prevents time jitter */
      style={{
        fontFamily: '"Helvetica Now Display","Helvetica Neue",Helvetica,Arial,sans-serif',
        /* STYLE: Font family/stack */
      }}
    >
      <div className="flex flex-wrap items-center gap-[10px] lg:flex-nowrap lg:justify-end text-[13px] sm:text-[14px] md:text-[14px] font-medium leading-[18px] sm:leading-[22px] md:leading-[21px] text-black">
        {/* STYLE: Desktop clock row split into spaced groups; mobile natural wrap if reused */}
        <span>{dateTimeText}</span>

        {place ? <span>{place}</span> : null}
      </div>
    </div>
  );
}
