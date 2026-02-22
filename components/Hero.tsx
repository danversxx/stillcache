import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-responsive {
          background-position: center;
          height: min(400px, 85vh);
        }
        @media (min-width: 768px) {
          .hero-responsive {
            background-position: center;
            height: calc(100vh - 140px);
          }
        }
      `}</style>
      <section 
        className="hero-responsive w-full md:h-auto flex flex-col justify-end"
        style={{
          backgroundImage: 'url(https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-hero.webp)',
          backgroundSize: 'cover',
        }}
      >
      {/* Hero Film - poster + film text, 24px gap desktop */}
      <div className="w-full flex items-end gap-6 pb-6 md:pb-8 px-4 md:px-8 xl:px-[120px]">
        {/* Hero Film Poster */}
        <div className="flex-shrink-0 w-[80px] h-[113px] sm:w-[105px] sm:h-[148px] md:w-[140px] md:h-[198px]">
          <img
            src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/hero/sentimental-value-poster.webp"
            alt="Sentimental Value Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Film Text - 12px gap between items */}
        <div className="flex flex-col gap-3">
          {/* Director/Title - 22px text, 4px gap for optical balance */}
          <div className="flex flex-col gap-1">
            <span className="text-[14px] sm:text-[16px] md:text-[22px] font-normal leading-none tracking-tight-2">
              Joachim Trier
            </span>
            <span className="text-[14px] sm:text-[16px] md:text-[22px] font-bold leading-none tracking-tight-2">
              Sentimental Value
            </span>
          </div>
          
          {/* Rating - 12px text, 8px gap */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center rounded" style={{ backgroundColor: 'rgba(224, 97, 0, 0.5)', border: '1px solid #FFAA64' }}>
              <span className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-none tracking-tight-2">15</span>
            </div>
            <span className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-none tracking-tight-2">
              Drama/Comedy ‧ 2hr 13m
            </span>
          </div>
          
          {/* Copyright - 12px text, 4px gap between lines */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-tight tracking-tight-2">
              © 2025 Sentimental Value / Joachim Trier
            </span>
            <span className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-tight tracking-tight-2">
              Nordisk Film · Neon
            </span>
          </div>
          
          {/* Watch Trailer Button - 14px text */}
          <a
            href="https://www.youtube.com/watch?v=lKbcKQN5Yrw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-[8px] py-[6px] border border-white rounded w-fit"
          >
            <span className="text-[11px] sm:text-[12px] md:text-[14px] font-normal leading-none tracking-tight-2">
              Watch Trailer
            </span>
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
