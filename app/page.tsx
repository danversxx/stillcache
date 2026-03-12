import FilmSection from '@/components/FilmSection';
import AppearanceControl from '@/components/AppearanceControl';
import ScrollRestoration from '@/components/ScrollRestoration';
import FloatingActions from '@/components/FloatingActions';
import StickyFilmCTA from '@/components/StickyFilmCTA';
import { getFilms } from '@/lib/sanity';

/* ──────────────────────────────────────────────────────────────
   ALWAYS LIVE (no route caching)
────────────────────────────────────────────────────────────── */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* ──────────────────────────────────────────────────────────────
   HEADER
   - Desktop: title + appearance controls on one row
   - Mobile: title + appearance controls on one row
────────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px]">
      {/* STYLE: Header spacing (pt/pb) + responsive spacing (md:...) */}

      <div className="flex flex-col gap-[12px] md:gap-[16px]">
        {/* STYLE: Header stack creates a dedicated CTA slot beneath the title row without disturbing the shared page frame */}

        <div className="flex items-center justify-between gap-[16px]">
          {/* STYLE: Single-row header layout across all breakpoints */}

          <div className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-[24px] md:leading-[41px]">
            {/* STYLE: Title typography aligned with appearance controls */}
            Still Cache
          </div>

          <div className="self-center">
            {/* STYLE: Appearance controls aligned horizontally with title */}
            <AppearanceControl />
          </div>
        </div>

        <StickyFilmCTA />
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER
────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-[22px] md:py-[32px]">
      <div className="text-[10px] md:text-[14px] font-medium leading-[14px]">
        © 2026 · Still Cache · TEST
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────────── */
export default async function Page() {
  const films = await getFilms();

  return (
    <main className="bg-white text-black antialiased">
      <ScrollRestoration />
      <FloatingActions />

      {/* ────────────────────────────────────────────────────────
          FIXED HEADER LAYER
      ───────────────────────────────────────────────────────── */}
      <div className="fixed inset-x-0 top-0 z-30 bg-white">
        {/* STYLE: Fixed header wrapper pinned to viewport top + white surface */}
        <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
          {/* STYLE: Shared horizontal padding system */}
          <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1280px)]">
            {/* STYLE: Shared centered frame width */}
            <Header />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          PAGE CONTENT LAYER
      ───────────────────────────────────────────────────────── */}
      <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
        {/* STYLE: Shared horizontal padding system */}
        <div className="mx-auto pt-[88px] md:pt-[169px] w-full max-w-[clamp(1060px,68vw,1280px)] flex flex-col gap-[40px] md:gap-[64px]">
          {/* STYLE: Shared centered frame + top padding to clear fixed header */}

          <div className="flex flex-col gap-[40px] md:gap-[64px]">
            {films.map((film) => {
              const filmHref = film.slug ? `/films/${film.slug}` : undefined;

              return (
                <FilmSection
                  key={film._id}
                  film={film}
                  filmHref={filmHref}
                  galleryHref={filmHref}
                />
              );
            })}
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
