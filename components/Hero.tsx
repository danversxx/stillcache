import Image from 'next/image';
import WelcomeMessage from './WelcomeMessage';

export default function Hero() {
  return (
    <section 
      className="w-full h-[880px] px-[120px] flex flex-col justify-between"
      style={{
        backgroundImage: 'url(https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Header - Logo + Welcome, evenly spread, 32px top/bottom padding */}
      <header className="w-full flex items-center justify-between py-8">
        {/* Logo - horse gif + "Still Cache" text, 14px gap */}
        <div className="flex items-center gap-[14px]">
          <div className="w-[90px] h-[60px]">
            <img 
              src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
              alt="Muybridge Horse"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-[60px] font-bold leading-none tracking-tight-2 whitespace-nowrap">
            Still Cache
          </h1>
        </div>

        {/* Welcome - date/time + location/greeting, 14px gap */}
        <WelcomeMessage />
      </header>

      {/* Hero Film - poster + film text, 30px gap, 32px top/bottom padding */}
      <div className="w-full flex items-end gap-[30px] py-8">
        {/* Hero Film Poster - 140x198px */}
        <div className="w-[140px] h-[198px] flex-shrink-0">
          <img
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-poster.webp"
            alt="Sentimental Value Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Film Text - film name + director, 12px gap */}
        <div className="flex flex-col gap-3">
          {/* Hero Film Name - title + director */}
          <div className="flex flex-col">
            <span className="text-[22px] font-bold leading-none tracking-tight-2">
              Sentimental Value
            </span>
            <span className="text-[22px] font-normal leading-none tracking-tight-2">
              Joachim Trier
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
