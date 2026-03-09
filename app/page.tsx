import FilmSection from '@/components/FilmSection';
import WelcomeClock from '@/components/WelcomeClock';
import AppearanceControl from '@/components/AppearanceControl';
import { getFilms } from '@/lib/sanity';

/* ──────────────────────────────────────────────────────────────
   ALWAYS LIVE (no route caching)
   - Forces a fresh server render on every request
   - Prevents Vercel/Next from serving a cached HTML result for this route
────────────────────────────────────────────────────────────── */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* ──────────────────────────────────────────────────────────────
   HEADER (visual top)
   - Mobile/tablet: stacked flow
   - Desktop: single horizontal row
────────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px]">
      {/* STYLE: Header spacing (pt/pb) + responsive spacing (md:...) */}

      {/* Mobile / tablet */}
      <div className="flex flex-col gap-[14px] lg:hidden">
        {/* STYLE: Stacked header flow below desktop breakpoint */}

        <div className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-none md:leading-[41px]">
          {/* STYLE: Title typography */}
          Still Cache
        </div>

        <div className="self-start">
          {/* STYLE: Clock alignment while stacked */}
          <WelcomeClock />
        </div>

        <AppearanceControl />
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center lg:gap-x-[16px]">
        {/* STYLE: Desktop header grid with reduced spacing */}

        <div className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-none md:leading-[41px]">
          {/* STYLE: Title */}
          Still Cache
        </div>

        <div className="justify-self-end self-center">
          {/* STYLE: Clock */}
          <WelcomeClock />
        </div>

        <div className="self-center">
          {/* STYLE: AppearanceControls */}
          <AppearanceControl />
        </div>

      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER (visual bottom)
────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-[22px] md:py-[32px]">
      {/* STYLE: Footer vertical padding */}
      <div className="text-[10px] md:text-[14px] font-medium leading-[14px]">
        © 2026 · Still Cache
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
   PAGE (overall layout + spacing)
   Visual order: Header → FilmSection → Footer
────────────────────────────────────────────────────────────── */
export default async function Page() {
  const films = await getFilms();

  return (
    <main className="bg-white text-black antialiased">
      {/* STYLE: Global surface */}

      <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
        {/* STYLE: Global container padding */}

        <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1280px)] flex flex-col gap-[40px] md:gap-[64px]">
          {/* STYLE: Shared frame */}

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
