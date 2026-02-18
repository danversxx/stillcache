import Image from 'next/image';
import WelcomeMessage from './WelcomeMessage';

export default function Hero() {
  return (
    <section 
      className="w-full flex flex-col justify-between"
      style={{
        backgroundImage: 'url(https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: '1440 / 880', // Maintains Figma's exact proportions
        maxHeight: '100vh' // Never exceeds viewport height
      }}
    >
      {/* Header - Logo + Welcome, evenly spread, fluid padding */}
      <header className="w-full flex flex-row items-center justify-between" style={{ 
        paddingTop: 'max(1rem, env(safe-area-inset-top))', 
        paddingBottom: '2.22vw', // 32px at 1440px
        paddingLeft: '8.33vw', // 120px at 1440px
        paddingRight: '8.33vw'
      }}>
        {/* Logo - horse gif + "Still Cache" text, fluid gap */}
        <div className="flex items-center" style={{ gap: '0.97vw' }}> {/* 14px at 1440px */}
          <div style={{ 
            width: '6.25vw', // 90px at 1440px
            height: '4.17vw' // 60px at 1440px
          }}>
            <img 
              src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/muybridge-horse.gif"
              alt="Muybridge Horse"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-bold leading-none tracking-tight-2 whitespace-nowrap" style={{ fontSize: '4.17vw' }}> {/* 60px at 1440px */}
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
        gap: '2.08vw', // 30px at 1440px
        paddingBottom: '2.22vw', // 32px at 1440px
        paddingLeft: '8.33vw', // 120px at 1440px
        paddingRight: '8.33vw'
      }}>
        {/* Hero Film Poster - proportionally fluid */}
        <div className="flex-shrink-0" style={{ 
          width: '9.72vw', // 140px at 1440px
          height: '13.75vw' // 198px at 1440px
        }}>
          <img
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-poster.webp"
            alt="Sentimental Value Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Film Text - film name + director, fluid gap */}
        <div className="flex flex-col" style={{ gap: '0.83vw' }}> {/* 12px at 1440px */}
          {/* Hero Film Name - title + director */}
          <div className="flex flex-col">
            <span className="font-bold leading-none tracking-tight-2" style={{ fontSize: '1.53vw' }}> {/* 22px at 1440px */}
              Sentimental Value
            </span>
            <span className="font-normal leading-none tracking-tight-2" style={{ fontSize: '1.53vw' }}>
              Joachim Trier
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
