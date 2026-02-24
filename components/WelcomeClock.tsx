'use client';

import { useEffect, useMemo, useState } from 'react';

type ClockData = {
  line: string;
};

function formatClock(d: Date) {
  const time = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(d);

  const date = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(d);

  return `${date} ${time}`;
}

export default function WelcomeClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [place, setPlace] = useState<string>('');

  // start ticking after mount (prevents hydration mismatch)
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // fetch location
  useEffect(() => {
    let cancelled = false;

    async function loadPlace() {
      try {
        const res = await fetch('https://ipinfo.io/json', { cache: 'no-store' });
        const data = await res.json();

        const city = data.city || '';
        const country =
          data.country === 'GB' ? 'United Kingdom' : data.country || '';

        const text = [city, country].filter(Boolean).join(', ');

        if (!cancelled) setPlace(text);
      } catch {
        if (!cancelled) setPlace('');
      }
    }

    loadPlace();
    return () => {
      cancelled = true;
    };
  }, []);

  const content: ClockData | null = useMemo(() => {
    if (!now) return null;
    const line = formatClock(now);
    return { line };
  }, [now]);

  // invisible placeholder prevents layout shift
  if (!content) {
    return (
      <div className="text-[18px] leading-none whitespace-nowrap">
        <span className="opacity-0">
          Tuesday 24 February 00:00:00 GMT Bolton, United Kingdom
        </span>
      </div>
    );
  }

  return (
    <div className="text-[18px] leading-none whitespace-nowrap tabular-nums">
      {content.line}
      {place && <span> {place}</span>}
    </div>
  );
}