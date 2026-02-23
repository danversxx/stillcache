import Image from 'next/image';

interface Film {
  id: string;
  title: string;
  director: string;
  directorAvatarUrl: string;
  posterUrl: string;
  studio: string;
  country: string;
  copyright: string;
  genreRuntime: string;
  rating: string;
  studioLogoUrl: string;
  trailerUrl: string;
  letterboxdUrl: string;
  stills: string[];
}

const films: Film[] = [
  {
    id: 'kikis-delivery-service',
    title: "Kiki's Delivery Service",
    director: 'Hayao Miyazaki',
    directorAvatarUrl: 'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/directors/hayao-miyazaki.webp',
    posterUrl: 'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/posters/kikis-delivery-service.webp',
    studio: 'Studio Ghibli',
    country: 'Japan',
    copyright: '© 1989 Kiki\'s Delivery Service / Eiko Kadono\nStudio Ghibli · Nibariki · Tokuma Shoten',
    genreRuntime: 'Family/Fantasy ‧ 1hr 42m',
    rating: 'U',
    studioLogoUrl: 'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/studio-logos/studio-ghibli.svg',
    trailerUrl: 'https://www.youtube.com/watch?v=4bG17OYs-GA',
    letterboxdUrl: 'https://letterboxd.com/film/kikis-delivery-service/',
    stills: [
      'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/stills/kikis-delivery-service/kiki-1.webp',
      'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/stills/kikis-delivery-service/kiki-2.webp',
      'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/stills/kikis-delivery-service/kiki-3.webp',
      'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/stills/kikis-delivery-service/kiki-4.webp',
    ]
  }
];

export default function FilmSection() {
  const film = films[0];

  return (
    <div className="w-full px-4 md:px-[120px]">
      {/* Container - 32px gap between Section, Divider, Stills */}
      <div className="w-full flex flex-col gap-8">
        
        {/* Section - Poster + Data side by side on desktop */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          
          {/* Mobile: Avatar + Director/Title at top */}
          <div className="md:hidden flex flex-row items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={film.directorAvatarUrl}
                alt={film.director}
                width={42}
                height={42}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-normal leading-none tracking-tight text-black">
                {film.director}
              </span>
              <span className="text-[14px] font-semibold leading-none tracking-tight text-black">
                {film.title}
              </span>
            </div>
          </div>

          {/* Data - 600px height on desktop, evenly distributed */}
          <div className="w-full md:w-[718px] flex flex-col md:h-[600px] md:justify-between gap-4 md:gap-0">
            
            {/* Desktop: Avatar */}
            <div className="hidden md:block w-[52px] h-[52px] rounded-full overflow-hidden">
              <Image
                src={film.directorAvatarUrl}
                alt={film.director}
                width={52}
                height={52}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Desktop: Director Name */}
            <div className="hidden md:block text-[32px] font-normal leading-none text-black">
              {film.director}
            </div>

            {/* Desktop: Film Title - 82px, wraps after "Delivery" */}
            <div className="hidden md:block text-[82px] font-semibold leading-none text-black" style={{ maxWidth: '718px' }}>
              Kiki's Delivery<br />Service
            </div>

            {/* Studio Logo */}
            <div className="w-auto h-[45px] md:h-[57px]">
              <img
                src={film.studioLogoUrl}
                alt={film.studio}
                className="w-auto h-full object-contain"
                style={{ filter: 'brightness(0)' }}
              />
            </div>

            {/* Copyright */}
            <div className="text-[10px] md:text-[14px] font-normal leading-tight text-black whitespace-pre-line">
              {film.copyright}
            </div>

            {/* Information - horizontal on desktop, vertical on mobile */}
            <div className="w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-8 pt-4 border-t border-black">
              
              {/* Directed by */}
              <div className="flex flex-col gap-0 md:gap-0">
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">Directed by</span>
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">{film.director}</span>
              </div>

              {/* Overview */}
              <div className="flex flex-col gap-0">
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">Overview</span>
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">{film.genreRuntime}</span>
              </div>

              {/* Studio */}
              <div className="flex flex-col gap-0">
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">Studio</span>
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">{film.studio}</span>
              </div>

              {/* Country */}
              <div className="flex flex-col gap-0">
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">Country</span>
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">{film.country}</span>
              </div>
            </div>

            {/* External */}
            <div className="w-full flex flex-col gap-3">
              <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">External</span>
              
              <div className="flex flex-row items-center gap-2">
                {/* Watch Trailer */}
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-[6px] py-[6px] border border-black text-black"
                >
                  <span className="text-[11px] md:text-[12px] font-normal leading-none">
                    Watch Trailer
                  </span>
                </a>

                {/* Letterboxd */}
                <a
                  href={film.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[64px] h-[23px] md:w-[70px] md:h-[26px]"
                >
                  <svg viewBox="0 0 500 250" className="w-full h-full">
                    <path d="M196 133c23-21 57-21 80 0 8 7 14 15 18 25l8 20c1 4 3 7 7 7h46c6 0 10-6 8-12-20-58-78-99-145-99S89 115 69 173c-2 6 2 12 8 12h46c4 0 6-3 7-7 10-31 35-54 66-45z" fill="#00e054"/>
                    <path d="M304 133c-23-21-57-21-80 0-8 7-14 15-18 25l-8 20c-1 4-3 7-7 7h-46c-6 0-10-6-8-12 20-58 78-99 145-99s125 41 145 99c2 6-2 12-8 12h-46c-4 0-6-3-7-7-10-31-35-54-66-45z" fill="#40bcf4"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Poster - 400×600px desktop, full width mobile */}
          <div className="w-full md:w-[400px] md:h-[600px]">
            <Image
              src={film.posterUrl}
              alt={`${film.title} Poster`}
              width={400}
              height={600}
              className="w-full h-auto md:w-[400px] md:h-[600px] object-cover"
            />
          </div>

        </div>

        {/* Divider */}
        <div className="w-full flex items-center justify-center py-2">
          <span className="text-[14px] font-bold leading-none text-black">· · ·</span>
        </div>

        {/* Still Thumbnails */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {film.stills.map((still, index) => (
            <div key={index} className="w-full aspect-[3/2]">
              <Image
                src={still}
                alt={`${film.title} Still ${index + 1}`}
                width={285}
                height={190}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
