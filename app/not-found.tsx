import Link from 'next/link';
import AppearanceControl from '@/components/AppearanceControl';

/* ──────────────────────────────────────────────────────────────
   404 — catches notFound() from /films/[slug] and any bad route
────────────────────────────────────────────────────────────── */
export default function NotFound() {
  return (
    <main className="bg-white text-black antialiased min-h-screen">
      <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
        <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1280px)]">

          <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px] flex items-center justify-between gap-[16px]">
            {/* STYLE: Static header — not fixed, so no clearance offset needed */}
            <Link
              href="/"
              className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-[24px] md:leading-[41px] transition-opacity hover:opacity-70"
            >
              Still Cache
            </Link>
            <div className="self-center">
              <AppearanceControl />
            </div>
          </header>

          <div className="flex flex-col gap-[24px] md:gap-[32px] pt-[80px] md:pt-[120px] pb-[64px]">
            <div className="flex flex-col gap-[8px] md:gap-[12px]">
              <p className="text-[12px] md:text-[14px] font-bold leading-[20px] tracking-[0.01em] opacity-[0.25]">
                404
              </p>
              <h1 className="text-[32px] md:text-[48px] font-bold leading-[36px] md:leading-[50px] tracking-[-0.02em]">
                Film not found
              </h1>
              <p className="text-[12px] md:text-[14px] leading-[20px] tracking-[0.01em] text-[#999999] max-w-[40ch]">
                This film isn’t in the cache. It may have been removed, or the link may be incorrect.
              </p>
            </div>

            <div>
              <Link
                href="/"
                className="film-stills-cta inline-flex items-center justify-center gap-[4px]"
              >
                <span className="film-stills-cta-label">Back to Still Cache</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
