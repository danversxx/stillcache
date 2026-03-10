import { notFound } from 'next/navigation';
import FilmSection from '@/components/FilmSection';
import AppearanceControl from '@/components/AppearanceControl';
import BackLink from '@/components/BackLink';
import { getFilmBySlug } from '@/lib/sanity';

/* ──────────────────────────────────────────────────────────────
   ALWAYS LIVE (no route caching)
────────────────────────────────────────────────────────────── */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* ──────────────────────────────────────────────────────────────
   HEADER
────────────────────────────────────────────────────────────── */
function Header({ filmTitle }: { filmTitle?: string }) {
  return (
    <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px]">
      <div className="flex items-start justify-between gap-[16px]">

        <div className="min-w-0 flex flex-1 flex-wrap items-baseline gap-x-[8px] md:gap-x-[10px] text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-[24px] md:leading-[41px]">

          <BackLink
            fallbackHref="/"
            className="shrink-0 opacity-[0.25] transition-opacity duration-150 hover:opacity-100"
          >
            Still Cache
          </BackLink>

          <span className="shrink-0" aria-hidden="true">
            /
          </span>

          <span className="min-w-0 break-words">
            {filmTitle || 'Film'}
          </span>

        </div>

        <div className="shrink-0 self-center">
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
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const film = await getFilmBySlug(slug);

  if (!film) {
    notFound();
  }

  return (
    <main className="bg-white text-black antialiased">

      {/* HEADER */}
      <div className="fixed inset-x-0 top-0 z-30 bg-white">
        <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
          <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1280px)]">
            <Header filmTitle={film.filmTitle} />
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(44px,calc(13.2vw-20px),240px)]">
        <div className="mx-auto pt-[88px] md:pt-[169px] w-full max-w-[clamp(1060px,68vw,1280px)] flex flex-col gap-[40px] md:gap-[64px]">

          <div className="flex flex-col gap-[40px] md:gap-[64px]">
            <FilmSection
              film={film}
              imageSet="gallery"
              hideGalleryButton
            />
          </div>

          <Footer />

        </div>
      </div>

    </main>
  );
}
