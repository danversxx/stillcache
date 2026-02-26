import FilmSection from '@/components/FilmSection';
import WelcomeClock from '@/components/WelcomeClock';
import { getFilms } from '@/lib/sanity';

function Header() {
  return (
    <header className="pt-[32px] md:pt-[64px] pb-[32px] flex flex-col md:flex-row md:items-center md:justify-between gap-[18px] md:gap-0">
      <div className="flex items-center gap-[14px]">
        <img
          src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
          alt="Muybridge horse animation"
          className="w-[72px] h-[48px] md:w-[90px] md:h-[60px] object-contain"
          loading="eager"
        />
        <div className="text-[24px] md:text-[28px] font-bold tracking-[-0.02em] leading-none md:leading-[41px]">
          Still Cache
        </div>
      </div>

      <div className="self-start md:self-auto">
        <WelcomeClock />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-[32px]">
      <div className="text-[12px] leading-[14px]">© 2026 · Still Cache</div>
    </footer>
  );
}

export default async function Page() {
  const films = await getFilms();
  const film = films[0] ?? null;

  return (
    <main className="bg-white text-black antialiased">
      {/* Outer: Figma-like fluid side padding on desktop */}
      <div className="w-full px-[clamp(64px,13.2vw,260px)]">
        {/* Inner: one shared content frame for ALL sections (Header / Film / Footer) */}
        <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1240px)] flex flex-col gap-[64px]">
          <Header />
          <FilmSection film={film} />
          <Footer />
        </div>
      </div>
    </main>
  );
}
