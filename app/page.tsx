import FilmSection from '@/components/FilmSection';

function Header() {
  return (
    <header className="w-[1440px] h-[124px] px-[120px] pt-[64px] flex items-center justify-between mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-[14px]">
        <img
          src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/misc/horse.gif"
          alt="Horse"
          className="w-[90px] h-[60px] object-contain"
        />
        <div className="text-[28px] font-bold tracking-[-0.02em] leading-none text-black">
          Still Cache
        </div>
      </div>

      {/* Welcome */}
      <div className="flex items-center gap-[8px] text-[18px] font-normal leading-none text-black">
        <span>Tuesday 17 February 18:00:00 EST</span>
        <span>Manchester, United Kingdom</span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-[1440px] px-[120px] py-[32px] mx-auto">
      <div className="text-[12px] font-normal leading-none text-black">
        © 2026 · Still Cache
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="bg-white text-black">
      {/* Main wrapper */}
      <div className="w-[1440px] mx-auto flex flex-col gap-[64px]">
        <Header />
        <FilmSection />
        <Footer />
      </div>
    </main>
  );
}