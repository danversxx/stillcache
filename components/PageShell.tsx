import React from 'react';
import FloatingActions from './FloatingActions';
import Frame from './Frame';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

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

      <Frame className="flex flex-col gap-[40px] md:gap-[64px]">
        <div className="flex flex-col gap-[40px] md:gap-[64px]">{children}</div>
        <SiteFooter />
      </Frame>
    </main>
  );
}
