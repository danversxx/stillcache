import FilmSection from '@/components/FilmSection';
import AppearanceControl from '@/components/AppearanceControl';
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
   - Sticky at top during scroll
────────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px]">
      {/* STYLE: Sticky header positioning + white surface + header spacing */}

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
        © 2026 · Still Cache
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
      <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
        <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1280px)] flex flex-col gap-[36px] md:gap-[64px]">
          <Header />

          <div className="flex flex-col gap-[40px] md:gap-[64px]">
            {films.map((film) => (
              <FilmSection key={film._id} film={film} />
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
