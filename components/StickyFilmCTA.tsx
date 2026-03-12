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

    updateActiveCTA();
    window.addEventListener('scroll', updateActiveCTA, { passive: true });
    window.addEventListener('resize', updateActiveCTA);

    return () => {
      window.removeEventListener('scroll', updateActiveCTA);
      window.removeEventListener('resize', updateActiveCTA);
    };
  }, []);

  if (!activeCTA) return null;

  return (
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
  );
}
