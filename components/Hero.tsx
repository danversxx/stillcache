import Image from 'next/image';
import WelcomeMessage from './WelcomeMessage';

export default function Hero() {
  return (
    <section 
      className="hero-responsive w-full h-[90vh] lg:h-auto flex flex-col justify-between"
      style={{
        backgroundImage: 'url(https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header - Stacked on mobile, horizontal on desktop */}
      <header className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0 px-4 lg:px-24 xl:px-[120px]" style={{ 
        paddingTop: 'max(1rem, env(safe-area-inset-top))', 
        paddingBottom: '1rem'
      }}>
        {/* Logo - horse gif + "Still Cache" text */}
        <div className="flex items-center gap-2 lg:gap-[14px]">
          <div className="w-[54px] h-[36px] lg:w-[90px] lg:h-[60px]">
            <img 
              src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
              alt="Muybridge Horse"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-[36px] lg:text-[60px] font-bold leading-none tracking-tight-2 whitespace-nowrap">
            Still Cache
          </h1>
        </div>

        {/* Welcome - date/time + location/greeting side by side */}
        <div className="flex-shrink min-w-0">
          <WelcomeMessage />
        </div>
      </header>

      {/* Hero Film - poster + film text, responsive padding and gap */}
      <div className="w-full flex items-end gap-4 lg:gap-[30px] pb-4 px-4 lg:px-24 xl:px-[120px] lg:pb-8">
        {/* Hero Film Poster - larger on mobile, scales to desktop */}
        <div className="flex-shrink-0 w-[80px] h-[113px] sm:w-[105px] sm:h-[148px] lg:w-[140px] lg:h-[198px]">
          <img
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-poster.webp"
            alt="Sentimental Value Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Film Text - film name + director, fluid gap */}
        <div className="flex flex-col" style={{ gap: 'min(0.83vw, 12px)' }}> {/* 12px at 1440px */}
          {/* Hero Film Name - title + director */}
          <div className="flex flex-col">
            <span className="text-[14px] sm:text-[16px] lg:text-[22px] font-bold leading-none tracking-tight-2">
              Sentimental Value
            </span>
            <span className="text-[14px] sm:text-[16px] lg:text-[22px] font-normal leading-none tracking-tight-2">
              Joachim Trier
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
