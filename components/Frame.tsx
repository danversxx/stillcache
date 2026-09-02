import React from 'react';

/* ──────────────────────────────────────────────────────────────
   FRAME — single source of truth for page gutters + content width
   TRAP: edit here only; both routes and the fixed header share this
────────────────────────────────────────────────────────────── */
export default function Frame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
      <div className={`mx-auto w-full max-w-[clamp(1060px,68vw,1280px)] ${className}`}>
        {children}
      </div>
    </div>
  );
}
