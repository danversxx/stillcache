import Image from 'next/image';
import WelcomeMessage from './WelcomeMessage';

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-responsive {
          background-position: center;
          height: min(400px, 85vh);
        }
        @media (min-width: 1024px) {
          .hero-responsive {
            background-position: center;
            height: calc(100vh - 140px);
          }
        }
      `}</style>
      <section 
        className="hero-responsive w-full lg:h-auto flex flex-col justify-end"
        style={{
          backgroundImage: 'url(https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-hero.webp)',
          backgroundSize: 'cover',
        }}
      >

      {/* Hero Film - poster + film text, responsive padding and gap */}
      <div className="w-full flex items-end gap-4 lg:gap-[30px] pb-6 lg:pb-8 px-4 lg:px-24 xl:px-[120px]">
        {/* Hero Film Poster - larger on mobile, scales to desktop */}
        <div className="flex-shrink-0 w-[80px] h-[113px] sm:w-[105px] sm:h-[148px] lg:w-[140px] lg:h-[198px]">
          <img
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-poster.webp"
            alt="Sentimental Value Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Film Text - film name, director, and copyright */}
        <div className="flex flex-col gap-2 lg:gap-3">
          {/* Hero Film Name - title + director */}
          <div className="flex flex-col">
            <span className="text-[14px] sm:text-[16px] lg:text-[22px] font-bold leading-none tracking-tight-2">
              Sentimental Value
            </span>
            <span className="text-[14px] sm:text-[16px] lg:text-[22px] font-normal leading-none tracking-tight-2">
              Joachim Trier
            </span>
          </div>
          {/* Copyright info */}
          <div className="text-[11px] sm:text-[12px] lg:text-[14px] font-normal leading-tight tracking-tight-2">
            © 2025 Sentimental Value / Joachim Trier<br />
            Nordisk Film · Neon
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
