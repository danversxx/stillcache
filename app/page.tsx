import FilmSection from '@/components/FilmSection';
import WelcomeClock from '@/components/WelcomeClock';

function Header() {
  return (
    <header className="h-[124px] pt-[64px] flex items-center justify-between">
      <div className="flex items-center gap-[14px] h-[60px]">
        <img
          src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
          alt="Horse"
          className="w-[90px] h-[60px] object-contain"
        />
        <div className="text-[28px] font-bold tracking-[-0.02em] leading-none">
          Still Cache
        </div>
      </div>

      <WelcomeClock />
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-[32px]">
      <div className="text-[12px] leading-none">© 2026 · Still Cache</div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="bg-white text-black antialiased">
      <div className="w-full mx-auto max-w-[2200px] px-[24px] md:px-[64px] xl:px-[120px] 2xl:px-[220px] flex flex-col gap-[64px]">
        <Header />
        <FilmSection />
        <Footer />
      </div>
    </main>
  );
}
