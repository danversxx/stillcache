import Image from 'next/image';
import WelcomeMessage from './WelcomeMessage';

export default function Hero() {
  return (
    <section 
      className="w-full h-[352px] sm:h-[660px] lg:h-[880px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] flex flex-col justify-between"
      style={{
        backgroundImage: 'url(https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Header - Logo + Welcome, evenly spread, scaled padding with safe area support */}
      <header className="w-full flex flex-row items-center justify-between py-4 sm:py-6 lg:py-8" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        {/* Logo - horse gif + "Still Cache" text, scaled gap */}
        <div className="flex items-center gap-[5px] sm:gap-[10px] lg:gap-[14px]">
          <div className="w-[30px] h-[20px] sm:w-[68px] sm:h-[45px] lg:w-[90px] lg:h-[60px]">
            <img 
              src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
              alt="Muybridge Horse"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-[20px] sm:text-[45px] lg:text-[60px] font-bold leading-none tracking-tight-2 whitespace-nowrap">
            Still Cache
          </h1>
        </div>

        {/* Welcome - date/time + location/greeting, scaled gap */}
        <div className="flex-shrink min-w-0">
          <WelcomeMessage />
        </div>
      </header>

      {/* Hero Film - poster + film text, scaled gap and padding */}
      <div className="w-full flex items-end gap-[15px] sm:gap-[22px] lg:gap-[30px] py-4 sm:py-6 lg:py-8">
        {/* Hero Film Poster - proportionally scaled */}
        <div className="w-[70px] h-[99px] sm:w-[105px] sm:h-[148px] lg:w-[140px] lg:h-[198px] flex-shrink-0">
          <img
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-poster.webp"
            alt="Sentimental Value Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Film Text - film name + director, scaled gap */}
        <div className="flex flex-col gap-[6px] sm:gap-[9px] lg:gap-3">
          {/* Hero Film Name - title + director */}
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-[16px] lg:text-[22px] font-bold leading-none tracking-tight-2">
              Sentimental Value
            </span>
            <span className="text-[11px] sm:text-[16px] lg:text-[22px] font-normal leading-none tracking-tight-2">
              Joachim Trier
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
