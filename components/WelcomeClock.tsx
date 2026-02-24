'use client';

import { useEffect, useMemo, useState } from 'react';

type ClockData = {
  dateText: string;
  timeText: string;
  tzText: string;
  placeText: string;
};

function getTimezoneAbbrev(d: Date) {
  // Try to extract "GMT", "BST", "PST", etc from formatToParts
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    }).formatToParts(d);

    const tz = parts.find((p) => p.type === 'timeZoneName')?.value?.trim();
    return tz || '';
  } catch {
    return '';
  }
}

function formatClockParts(d: Date): ClockData {
  const dateText = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(d);

  const timeText = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(d);

  const tzText = getTimezoneAbbrev(d);

  return {
    dateText,
    timeText,
    tzText,
    placeText: '',
  };
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
        const res = await fetch('https://ipinfo.io/json', { cache: 'no-store' });
        const data = (await res.json()) as {
          city?: string;
          region?: string;
          country?: string;
        };

        const city = data.city || '';
        const countryCode = data.country || '';
        const country = countryCode === 'GB' ? 'United Kingdom' : countryCode;

        const placeText = [city, country].filter(Boolean).join(', ');
        if (!cancelled) setPlace(placeText);
      } catch {
        if (!cancelled) setPlace('');
      }
    }

    loadPlace();
    return () => {
      cancelled = true;
    };
  }, []);

  const content = useMemo(() => {
    if (!now) return null;
    const { dateText, timeText, tzText } = formatClockParts(now);
    return {
      dateText,
      timeText,
      tzText,
      placeText: place,
    };
  }, [now, place]);

  // Keep layout stable: placeholder on first paint
  if (!content) {
    return (
      <div className="text-[18px] leading-none font-normal">
        <div className="opacity-0 tabular-nums whitespace-nowrap">
          Tuesday 24 February 00:00:00 GMT
        </div>
        <div className="opacity-0 whitespace-nowrap">Manchester, United Kingdom</div>
      </div>
    );
  }

  const topLine = `${content.dateText} ${content.timeText}${content.tzText ? ` ${content.tzText}` : ''}`;

  return (
    <div className="text-[18px] leading-none font-normal">
      {/* Desktop: single line, never wrap. Mobile: can be its own line naturally. */}
      <div className="tabular-nums whitespace-nowrap">{topLine}</div>

      {/* Location: show on its own line (mobile & desktop), never wrap */}
      {content.placeText ? <div className="whitespace-nowrap">{content.placeText}</div> : null}
    </div>
  );
}