import React from 'react';
import FloatingActions from './FloatingActions';
import Frame from './Frame';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

/* ──────────────────────────────────────────────────────────────
   CLEARANCE — offsets content past the fixed header
   TRAP: hardcoded, not measured. A mobile film title long enough to
   wrap to two lines will grow the header past 116px and slide under it.
────────────────────────────────────────────────────────────── */
const CLEARANCE = {
  home: 'pt-[88px] md:pt-[169px]',
  film: 'pt-[116px] md:pt-[169px]',
};

export default function PageShell({
  filmTitle,
  children,
}: {
  filmTitle?: string;
  children: React.ReactNode;
}) {
  const isFilm = Boolean(filmTitle);

  return (
    <main className="bg-white text-black antialiased">
      <FloatingActions showHome={isFilm} />
      <SiteHeader filmTitle={filmTitle} />

      <Frame
        className={`${isFilm ? CLEARANCE.film : CLEARANCE.home} flex flex-col gap-[40px] md:gap-[64px]`}
      >
        <div className="flex flex-col gap-[40px] md:gap-[64px]">{children}</div>
        <SiteFooter />
      </Frame>
    </main>
  );
}
