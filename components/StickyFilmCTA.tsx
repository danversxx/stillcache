'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type ActiveCTA = {
  title: string;
  href: string;
};

const HEADER_OFFSET_MOBILE = 88;
const HEADER_OFFSET_DESKTOP = 169;

function getHeaderTriggerOffset() {
  if (typeof window === 'undefined') return HEADER_OFFSET_MOBILE;
  return window.innerWidth >= 768 ? HEADER_OFFSET_DESKTOP : HEADER_OFFSET_MOBILE;
}

export default function StickyFilmCTA() {
  const [activeCTA, setActiveCTA] = useState<ActiveCTA | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateActiveCTA = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-film-section]')
      );

      const headerTriggerOffset = getHeaderTriggerOffset();
      let nextActiveCTA: ActiveCTA | null = null;

      for (const section of sections) {
        const cta = section.querySelector<HTMLElement>('[data-film-cta]');
        const href = section.dataset.filmHref?.trim();
        const title = section.dataset.filmTitle?.trim();

        if (!cta || !href || !title) continue;

        const sectionRect = section.getBoundingClientRect();
        const ctaRect = cta.getBoundingClientRect();

        const ctaIsFullyHiddenByHeader = ctaRect.bottom <= headerTriggerOffset;
        const sectionIsStillActive = sectionRect.bottom > headerTriggerOffset + ctaRect.height;

        if (ctaIsFullyHiddenByHeader && sectionIsStillActive) {
          nextActiveCTA = { title, href };
        }
      }

      setActiveCTA(nextActiveCTA);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveCTA);
    };

    /* STYLE: Perform multiple startup passes so the CTA system remains correct across dev, local production, and delayed production hydration on Vercel */
    scheduleUpdate();

    const startupTimers = [
      window.setTimeout(scheduleUpdate, 0),
      window.setTimeout(scheduleUpdate, 120),
      window.setTimeout(scheduleUpdate, 360),
      window.setTimeout(scheduleUpdate, 800),
    ];

    const mutationObserver = new MutationObserver(() => {
      scheduleUpdate();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(rafId);

      startupTimers.forEach((timer) => {
        window.clearTimeout(timer);
      });

      mutationObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('load', scheduleUpdate);
    };
  }, []);

  if (!activeCTA) return null;

  return (
    <div className="header-sticky-film-cta-slot" aria-label="Active film stills">
      <Link
        href={activeCTA.href}
        className="header-sticky-film-cta-button film-stills-cta flex items-center justify-center gap-[4px]"
      >
        {/* STYLE: Sticky CTA explicitly preserves the same flex layout behavior as the inline Stills CTA so promoted state and default state remain visually identical */}
        <span className="min-w-0 truncate film-stills-cta-title">
          {activeCTA.title}
        </span>
        <span className="shrink-0 film-stills-cta-label">
          Stills
        </span>
      </Link>
    </div>
  );
}
