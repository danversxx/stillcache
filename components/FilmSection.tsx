import Image from 'next/image';
import { getFilms } from '@/lib/sanity';

type Film = {
  title: string;
  director: string;
  directorAvatarUrl: string;
  copyrightInfo: string;
  rating: string;
  genreRuntime: string;
  studio: string;
  country: string;
  trailerUrl: string;
  letterboxdUrl: string;
  posterUrl: string;
  homepageStills: Array<{
    url: string;
    alt: string;
  }>;
  order: number;
};

export default async function FilmSection() {
  const films: Film[] = await getFilms();
  const film = films[0];

  if (!film) return <div>No films found</div>;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Content Section - 24px gap desktop between poster and data */}
      <div className="w-full flex flex-col md:flex-row gap-6">

        {/* Mobile: Film Heading */}
        <div className="md:hidden w-full flex flex-row items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={film.directorAvatarUrl}
              alt={film.director}
              width={42}
              height={42}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Director/Title - 22px text on mobile (14px-18px), 4px gap */}
          <div className="flex flex-col gap-1">
            <span className="text-[14px] sm:text-[18px] font-normal leading-none tracking-tight-2">
              {film.director}
            </span>
            <span className="text-[14px] sm:text-[18px] font-bold leading-none tracking-tight-2">
              {film.title}
            </span>
          </div>
        </div>

        {/* Poster - 402px to match Figma Film Data height */}
        <div className="w-full md:w-[288px] md:h-[402px] flex-shrink-0">
          <Image
            src={film.posterUrl}
            alt={`${film.title} Poster`}
            width={288}
            height={402}
            className="w-full h-auto md:h-[402px] object-cover aspect-[288/432]"
          />
        </div>

        {/* Mobile: Full Gallery Button - 14px text, consistent padding */}
        <div className="md:hidden w-full">
          <a
            href="#"
            className="w-full flex items-center justify-center px-3 py-3 border border-white rounded"
          >
            <span className="text-[14px] font-bold leading-none tracking-tight-2">
              {film.title} · Full Gallery →
            </span>
          </a>
        </div>

        {/* Film Data - 402px: Heading(52) + gap(24) + Gallery(32) + gap(24) + Data(270) */}
        <div className="w-full flex flex-col gap-6 md:h-[402px]">

          {/* Desktop: Film Heading - 52px hug */}
          <div className="hidden md:flex flex-row items-center gap-3">
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={film.directorAvatarUrl}
                alt={film.director}
                width={52}
                height={52}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Director/Title - 22px text, 4px gap */}
            <div className="flex flex-col gap-1">
              <span className="text-[22px] font-normal leading-none tracking-tight-2">
                {film.director}
              </span>
              <span className="text-[22px] font-bold leading-none tracking-tight-2">
                {film.title}
              </span>
            </div>
          </div>

          {/* Desktop: Full Gallery Link - 32px hug (8px padding top/bottom) */}
          <div className="hidden md:block w-full">
            <a
              href="#"
              className="inline-flex items-center px-2 py-2 border border-white rounded"
            >
              <span className="text-[14px] font-bold leading-none tracking-tight-2">
                {film.title} · Full Gallery →
              </span>
            </a>
          </div>

          {/* Data Section - 270px fill, 12px gaps between rows */}
          <div className="w-full flex flex-col gap-3 md:flex-grow">

            {/* Information - smart flex sizing */}
            <div className="w-full flex flex-row items-start justify-between pb-3 border-b border-white/10">
              <div className="flex flex-col gap-2 overflow-hidden pr-3 flex-1">
                <h3 className="text-[14px] font-bold leading-none tracking-tight-2">
                  Information
                </h3>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-normal leading-tight tracking-tight-2">© 1989 Kiki's Delivery Service / Eiko Kadono</span>
                  <span className="text-[10px] md:text-[12px] font-normal leading-tight tracking-tight-2">Studio Ghibli · Nibariki · Tokuma Shoten</span>
                </div>
              </div>
              <img
                src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/studio-logos/studio-ghibli.svg"
                alt="Studio Ghibli"
                className="w-auto object-contain flex-shrink-0 h-[45px] md:h-[57px]"
              />
            </div>

            {/* Directed By - 10px mobile, 12px desktop */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2 opacity-60">
                Directed by
              </span>
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2">
                {film.director}
              </span>
            </div>

            {/* Overview - 10px mobile, 12px desktop */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2 opacity-60">
                Overview
              </span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center rounded bg-[#00E054]/50 border border-[#64FF9E]">
                  <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2">{film.rating}</span>
                </div>
                <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2">
                  {film.genreRuntime}
                </span>
              </div>
            </div>

            {/* Studio - 10px mobile, 12px desktop */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2 opacity-60">
                Studio
              </span>
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2">
                {film.studio}
              </span>
            </div>

            {/* Country - 10px mobile, 12px desktop */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2 opacity-60">
                Country
              </span>
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2">
                {film.country}
              </span>
            </div>

            {/* External - 10px mobile, 12px desktop */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] md:text-[12px] font-normal leading-none tracking-tight-2 opacity-60">
                External
              </span>
              <div className="flex items-center gap-2">
                {/* Watch Trailer - 14px text */}
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-[8px] py-[6px] border border-white rounded flex items-center justify-center"
                >
                  <span className="text-[11px] sm:text-[12px] md:text-[14px] font-normal leading-none tracking-tight-2">
                    Watch Trailer
                  </span>
                </a>
                {/* Letterboxd logo - matches button height */}
                <a
                  href={film.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[64px] h-[23px] sm:w-[68px] sm:h-[25px] md:w-[76px] md:h-[28px]"
                >
                  <svg className="w-full h-full" viewBox="0 0 82 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2056_71)">
                      <path d="M40.9998 30C49.3984 30 56.2067 23.2795 56.2067 14.9893C56.2067 6.69911 49.3984 -0.0214233 40.9998 -0.0214233C32.6013 -0.0214233 25.793 6.69911 25.793 14.9893C25.793 23.2795 32.6013 30 40.9998 30Z" fill="#00E054"/>
                      <mask id="mask0_2056_71" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="53" y="0" width="29" height="31">
                        <path d="M81.9897 0H53.832V30.3217H81.9897V0Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0_2056_71)">
                        <path d="M66.8045 30C75.2031 30 82.0114 23.2795 82.0114 14.9893C82.0114 6.69911 75.2031 -0.0214233 66.8045 -0.0214233C58.406 -0.0214233 51.5977 6.69911 51.5977 14.9893C51.5977 23.2795 58.406 30 66.8045 30Z" fill="#40BCF4"/>
                      </g>
                      <mask id="mask1_2056_71" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="31">
                        <path d="M28.1577 0H0V30.3217H28.1577V0Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask1_2056_71)">
                        <path d="M15.2069 30C23.6054 30 30.4138 23.2795 30.4138 14.9893C30.4138 6.69911 23.6054 -0.0214233 15.2069 -0.0214233C6.80835 -0.0214233 0 6.69911 0 14.9893C0 23.2795 6.80835 30 15.2069 30Z" fill="#FF8000"/>
                      </g>
                      <path fillRule="evenodd" clipRule="evenodd" d="M28.0924 22.945C26.639 20.6505 25.793 17.9271 25.793 15.0107C25.793 12.0943 26.639 9.37097 28.0924 7.07648C29.5459 9.37097 30.3919 12.0943 30.3919 15.0107C30.3919 17.9271 29.5676 20.6505 28.0924 22.945Z" fill="#556677"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M53.9074 7.05505C55.3608 9.34955 56.2069 12.0729 56.2069 14.9893C56.2069 17.9057 55.3608 20.629 53.9074 22.9235C52.4539 20.629 51.6079 17.9057 51.6079 14.9893C51.6079 12.0729 52.4323 9.34955 53.9074 7.05505Z" fill="#556677"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2056_71">
                        <rect width="82" height="30" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full flex justify-center">
        <span className="text-[14px] font-bold leading-none tracking-tight-2">· · ·</span>
      </div>

      {/* Still Thumbnails */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          {film.homepageStills.slice(0, 3).map((still, index) => (
            <div key={index} className="w-full md:flex-1">
              <Image
                src={still.url}
                alt={still.alt}
                width={400}
                height={225}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          {film.homepageStills.slice(3, 6).map((still, index) => (
            <div key={index} className="w-full md:flex-1">
              <Image
                src={still.url}
                alt={still.alt}
                width={400}
                height={225}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
