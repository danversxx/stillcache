'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type ActiveCTA = {
  title: string;
  href: string;
};

type DebugState = {
  sectionsFound: number;
  activeTitle: string;
  triggerOffset: number;
};

const HEADER_OFFSET_MOBILE = 88;
const HEADER_OFFSET_DESKTOP = 169;

function getHeaderTriggerOffset() {
  if (typeof window === 'undefined') return HEADER_OFFSET_MOBILE;
  return window.innerWidth >= 768 ? HEADER_OFFSET_DESKTOP : HEADER_OFFSET_MOBILE;
}

export default function StickyFilmCTA() {
  const [activeCTA, setActiveCTA] = useState<ActiveCTA | null>(null);
  const [debugState, setDebugState] = useState<DebugState>({
    sectionsFound: 0,
    activeTitle: 'none',
    triggerOffset: HEADER_OFFSET_MOBILE,
  });

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
      setDebugState({
        sectionsFound: sections.length,
        activeTitle: nextActiveCTA?.title ?? 'none',
        triggerOffset: headerTriggerOffset,
      });
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

  return (
    <>
      {activeCTA ? (
        <div className="header-sticky-film-cta-slot" aria-label="Active film stills">
          <Link href={activeCTA.href} className="header-sticky-film-cta-button">
            <span className="min-w-0 truncate header-sticky-film-cta-title">
              {activeCTA.title}
            </span>
            <span className="shrink-0 header-sticky-film-cta-label">
              Stills
            </span>
          </Link>
        </div>
      ) : null}

      <div
        style={{
          position: 'fixed',
          left: 12,
          bottom: 12,
          zIndex: 9999,
          background: 'rgba(0,0,0,0.85)',
          color: '#fff',
          padding: '8px 10px',
          fontSize: '11px',
          lineHeight: '1.4',
          borderRadius: '8px',
          fontFamily:
            "'Helvetica Now Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        sections: {debugState.sectionsFound}
        <br />
        active: {debugState.activeTitle}
        <br />
        offset: {debugState.triggerOffset}
      </div>
    </>
  );
}
