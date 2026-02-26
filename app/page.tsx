import FilmSection from '@/components/FilmSection';
import WelcomeClock from '@/components/WelcomeClock';

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

export default function Page() {
  return (
    <main className="bg-white text-black antialiased">
      <div className="w-full mx-auto max-w-[2200px] px-[18px] sm:px-[24px] md:px-[64px] xl:px-[190px] 2xl:px-[190px] flex flex-col gap-[64px]">
        <Header />
        <FilmSection />
        <Footer />
      </div>
    </main>
  );
}
