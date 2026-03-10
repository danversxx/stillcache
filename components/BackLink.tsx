'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  fallbackHref?: string;
  className?: string;
};

export default function BackLink({
  children,
  fallbackHref = '/',
  className = '',
}: Props) {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <a href={fallbackHref} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
