'use client';

import { useEffect, useMemo, useState } from 'react';

type ClockData = {
  timeText: string;
  placeText: string;
};

function formatTimeParts(d: Date) {
  // Locale-aware time + timezone abbreviation (GMT, PST, IST, etc.)
  const timeText = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(d);

  // e.g. "Tuesday 24 February"
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

  // Prevent hydration mismatch by only rendering the ticking clock after mount
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPlace() {
      try {
        // Uses ipinfo.io (you already tested it works)
        const res = await fetch('https://ipinfo.io/json', { cache: 'no-store' });
        const data = (await res.json()) as {
          city?: string;
          region?: string;
          country?: string;
        };

        const city = data.city || '';
        const countryCode = data.country || '';
        // Prefer "City, United Kingdom" instead of "GB"
        const country =
          countryCode === 'GB' ? 'United Kingdom' : countryCode;

        const placeText = [city, country].filter(Boolean).join(', ');
        if (!cancelled) setPlace(placeText);
      } catch {
        // If it fails, just omit location rather than breaking UI
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
    const { timeText, dateText } = formatTimeParts(now);
    return {
      timeText: `${dateText} ${timeText}`,
      placeText: place,
    };
  }, [now, place]);

  // Keep layout stable: render a placeholder line on first paint
  if (!content) {
    return (
      <div className="text-[18px] leading-none font-normal whitespace-nowrap">
        <span className="opacity-0">Tuesday 24 February 00:00:00 GMT</span>
      </div>
    );
  }

  return (
    <div className="text-[18px] leading-none font-normal">
      <div className="whitespace-nowrap tabular-nums">{content.timeText}</div>
      {content.placeText ? (
        <div className="whitespace-nowrap">{content.placeText}</div>
      ) : null}
    </div>
  );
}
