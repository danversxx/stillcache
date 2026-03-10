'use client';

import { useEffect } from 'react';

const KEY = 'stillcache_scroll';

export default function ScrollRestoration() {
  useEffect(() => {
    const saved = sessionStorage.getItem(KEY);

    if (saved) {
      const y = parseInt(saved, 10);

      if (!Number.isNaN(y)) {
        window.scrollTo(0, y);
      }

      sessionStorage.removeItem(KEY);
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      const link = target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href');

      if (!href) return;

      if (href.startsWith('/films/')) {
        sessionStorage.setItem(KEY, String(window.scrollY));
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
