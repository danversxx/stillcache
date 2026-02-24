'use client';

import { useEffect, useMemo, useState } from 'react';

type ClockData = {
  timeText: string;
  placeText: string;
};

function formatTimeParts(d: Date) {
  const timeText = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(d);

  const dateText = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(d);

  return { timeText, dateText };
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
        const countryCode = data.country || '';

        const country =
          countryCode === 'GB' ? 'United Kingdom' : countryCode;

        const placeText = [city, country].filter(Boolean).join(', ');

        if (!cancelled) setPlace(placeText);
      } catch {
        if (!cancelled) setPlace('');
      }
    }

    loadPlace();
    return () => { cancelled = true; };
  }, []);

  const content: ClockData | null = useMemo(() => {
    if (!now) return null;

    const { timeText, dateText } = formatTimeParts(now);

    return {
      timeText: `${dateText} ${timeText}`,
      placeText: place,
    };
  }, [now, place]);

  // placeholder to avoid layout shift
  if (!content) {
    return (
      <div className="text-[18px] leading-none whitespace-nowrap">
        <span className="opacity-0 tabular-nums">
          Tuesday 24 February 00:00:00 GMT
        </span>
      </div>
    );
  }

  return (
    <div className="text-[18px] leading-none whitespace-nowrap tabular-nums">
      {content.timeText}
      {content.placeText && ` · ${content.placeText}`}
    </div>
  );
}