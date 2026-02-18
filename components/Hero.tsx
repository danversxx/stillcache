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
      {/* Header - Logo + Welcome, evenly spread, fluid padding */}
      <header className="w-full flex flex-row items-center justify-between" style={{ 
        paddingTop: 'max(1rem, env(safe-area-inset-top))', 
        paddingBottom: 'min(2.22vw, 32px)', // 32px at 1440px, scales down
        paddingLeft: 'min(8.33vw, 120px)', // 120px at 1440px, scales down
        paddingRight: 'min(8.33vw, 120px)'
      }}>
        {/* Logo - horse gif + "Still Cache" text, fluid gap */}
        <div className="flex items-center" style={{ gap: 'min(0.97vw, 14px)' }}> {/* 14px at 1440px */}
          <div style={{ 
            width: 'min(6.25vw, 90px)', // 90px at 1440px
            height: 'min(4.17vw, 60px)' // 60px at 1440px
          }}>
            <img 
              src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
              alt="Muybridge Horse"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-bold leading-none tracking-tight-2 whitespace-nowrap" style={{ fontSize: 'min(4.17vw, 60px)' }}> {/* 60px at 1440px */}
            Still Cache
          </h1>
        </div>

        {/* Welcome - date/time + location/greeting, fluid gap */}
        <div className="flex-shrink min-w-0">
          <WelcomeMessage />
        </div>
      </header>

      {/* Hero Film - poster + film text, fluid gap and padding */}
      <div className="w-full flex items-end" style={{ 
        gap: 'min(2.08vw, 30px)', // 30px at 1440px
        paddingBottom: 'min(2.22vw, 32px)', // 32px at 1440px
        paddingLeft: 'min(8.33vw, 120px)', // 120px at 1440px
        paddingRight: 'min(8.33vw, 120px)'
      }}>
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
