'use client';

import { useEffect } from 'react';

/* ──────────────────────────────────────────────────────────────
   ERROR BOUNDARY — catches Sanity fetch failures and render errors
   TRAP: must be a client component; error.tsx cannot be a server component
────────────────────────────────────────────────────────────── */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-white text-black antialiased min-h-screen">
      <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
        <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1280px)]">

          <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px]">
            <div className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-[24px] md:leading-[41px]">
              Still Cache
            </div>
          </header>

          <div className="flex flex-col gap-[24px] md:gap-[32px] pt-[80px] md:pt-[120px] pb-[64px]">
            <div className="flex flex-col gap-[8px] md:gap-[12px]">
              <p className="text-[12px] md:text-[14px] font-bold leading-[20px] tracking-[0.01em] opacity-[0.25]">
                Error
              </p>
              <h1 className="text-[32px] md:text-[48px] font-bold leading-[36px] md:leading-[50px] tracking-[-0.02em]">
                Something went wrong
              </h1>
              <p className="text-[12px] md:text-[14px] leading-[20px] tracking-[0.01em] text-[#999999] max-w-[40ch]">
                The archive couldn’t be reached. This is usually temporary.
              </p>
            </div>

            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                onClick={reset}
                className="film-stills-cta inline-flex items-center justify-center"
              >
                <span className="film-stills-cta-label">Try again</span>
              </button>
              <a href="/" className="film-trailer-cta inline-flex items-center justify-center px-[14px] text-[12px] md:text-[14px] leading-[24px] md:leading-[20px] tracking-[0.01em]">
                Home
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
