import FilmSection from '@/components/FilmSection';
import WelcomeClock from '@/components/WelcomeClock';
import { getFilms } from '@/lib/sanity';

function Header() {
  return (
    <header className="pt-[20px] md:pt-[64px] pb-[20px] md:pb-[32px] flex flex-col md:flex-row md:items-center md:justify-between gap-[14px] md:gap-0">
      <div className="flex items-center gap-[12px]">
        <img
          src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
          alt="Muybridge horse animation"
          className="w-[62px] h-[42px] md:w-[90px] md:h-[60px] object-contain"
          loading="eager"
        />
        <div className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] leading-none md:leading-[41px]">
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
    <footer className="py-[22px] md:py-[32px]">
      <div className="text-[10px] md:text-[12px] leading-[14px]">© 2026 · Still Cache</div>
    </footer>
  );
}

export default async function Page() {
  const films = await getFilms();
  const film = films[0] ?? null;

  return (
    <main className="bg-white text-black antialiased">
      {/* Mobile: comfortable padding.
          Desktop+: fluid “Figma-like” padding. */}
      <div className="w-full px-[18px] sm:px-[24px] md:px-[clamp(64px,13.2vw,260px)]">
        {/* Shared frame for Header / Film / Footer alignment */}
        <div className="mx-auto w-full max-w-[clamp(1060px,68vw,1240px)] flex flex-col gap-[40px] md:gap-[64px]">
          <Header />
          <FilmSection film={film} />
          <Footer />
        </div>
      </div>
    </main>
  );
}
