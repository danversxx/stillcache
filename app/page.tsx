import FilmSection from '@/components/FilmSection';
import WelcomeClock from '@/components/WelcomeClock';
import AppearanceControl from '@/components/AppearanceControl';
import { getFilms } from '@/lib/sanity';

/* ──────────────────────────────────────────────────────────────
   ALWAYS LIVE (no route caching)
────────────────────────────────────────────────────────────── */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* ──────────────────────────────────────────────────────────────
   HEADER
   - Mobile: stacked editorial layout
   - Desktop: single horizontal row
────────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px]">

      {/* Mobile / tablet */}
      <div className="flex flex-col gap-[10px] lg:hidden">
        {/* STYLE: Mobile vertical header stack */}

        <div className="text-[32px] md:text-[28px] font-bold tracking-[-0.02em] leading-none md:leading-[41px]">
          {/* STYLE: Mobile title increased +4px again */}
          Still Cache
        </div>

        <div className="flex flex-col">
          {/* STYLE: Clock and controls share typographic rhythm */}
          <WelcomeClock mobileStack />

          <div className="mt-[1px] lg:mt-0">
            {/* STYLE: +1px vertical breathing space for mobile rhythm */}
            <AppearanceControl mobileSplit />
          </div>
        </div>

      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:items-center lg:gap-x-[10px]">
        {/* STYLE: Desktop header grid with evenly spaced utility groups */}

        <div className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-none md:leading-[41px]">
          Still Cache
        </div>

        <div className="justify-self-end self-center">
          <WelcomeClock />
        </div>

        <div className="self-center">
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
          {/* STYLE: Shared frame with mobile gap reduced by 4px */}

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
