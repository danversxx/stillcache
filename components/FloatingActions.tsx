'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  showHome?: boolean;
};

function ArrowUpIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path
        d="M7 17V1M7 1L1 7M7 1L13 7"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" aria-hidden="true">
      <path
        d="M1.00015 9.29821C1.00015 8.72385 1.00015 8.43667 1.07418 8.17221C1.13975 7.93794 1.24752 7.7176 1.39218 7.52201C1.55549 7.30121 1.78217 7.1249 2.23554 6.77228L9.01785 1.49715C9.36917 1.2239 9.54484 1.08727 9.73881 1.03476C9.90996 0.988415 10.0903 0.988415 10.2615 1.03476C10.4555 1.08727 10.6311 1.2239 10.9825 1.49715L17.7648 6.77228C18.2181 7.1249 18.4448 7.30121 18.6081 7.52201C18.7528 7.7176 18.8606 7.93794 18.9261 8.17221C19.0002 8.43667 19.0002 8.72385 19.0002 9.29821V16.5331C19.0002 17.6532 19.0002 18.2133 18.7822 18.6411C18.5904 19.0174 18.2845 19.3234 17.9081 19.5152C17.4803 19.7331 16.9203 19.7331 15.8002 19.7331H4.20015C3.08005 19.7331 2.52 19.7331 2.09217 19.5152C1.71585 19.3234 1.40989 19.0174 1.21814 18.6411C1.00015 18.2133 1.00015 17.6532 1.00015 16.5331V9.29821Z"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FloatingActions({ showHome = false }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setShowBackToTop(window.scrollY > 320);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  if (!showHome && !showBackToTop) {
    return null;
  }

  return (
    <div className="floating-actions-stack" aria-label="Page actions">
      {showHome ? (
        <Link href="/" aria-label="Home" className="floating-action-button">
          <HomeIcon />
        </Link>
      ) : null}

      {showBackToTop ? (
        <button
          type="button"
          aria-label="Back to top"
          className="floating-action-button"
          onClick={scrollToTop}
        >
          <ArrowUpIcon />
        </button>
      ) : null}
    </div>
  );
}
