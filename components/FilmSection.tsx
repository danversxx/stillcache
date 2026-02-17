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
    <div className="w-full flex flex-col gap-8">
      {/* Content Section */}
      <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-8">

        {/* Mobile: Film Heading (Avatar + Title side by side) */}
        <div className="lg:hidden w-full flex flex-row items-center gap-3">
          {/* Avatar - same height as text block */}
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={film.directorAvatarUrl}
              alt={film.director}
              width={42}
              height={42}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Film Title - vertical, no gap between text layers */}
          <div className="flex flex-col justify-center h-[42px]">
            <span className="text-[18px] font-normal leading-none tracking-tight-2">
              {film.director}
            </span>
            <span className="text-[18px] font-bold leading-none tracking-tight-2">
              {film.title}
            </span>
          </div>
        </div>

        {/* Poster */}
        <div className="w-full lg:w-[288.14px] lg:h-[432px] flex-shrink-0">
          <Image
            src={film.posterUrl}
            alt={`${film.title} Poster`}
            width={288}
            height={432}
            className="w-full h-auto lg:h-[432px] object-cover aspect-[288/432]"
          />
        </div>

        {/* Mobile: Full Gallery Button Under Poster */}
        <div className="lg:hidden w-full">
          <a
            href="#"
            className="w-full flex items-center justify-center px-2 py-4 border border-white rounded"
          >
            <span className="text-[14px] font-bold leading-none tracking-tight-2">
              {film.title} · Full Gallery →
            </span>
          </a>
        </div>

        {/* Film Data */}
        <div className="w-full flex flex-col gap-5 lg:gap-6 lg:h-[432px]">

          {/* Desktop: Film Heading (Avatar + Title side by side) */}
          <div className="hidden lg:flex flex-row items-center gap-3">
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={film.directorAvatarUrl}
                alt={film.director}
                width={52}
                height={52}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center h-[52px]">
              <span className="text-[22px] font-normal leading-none tracking-tight-2">
                {film.director}
              </span>
              <span className="text-[22px] font-bold leading-none tracking-tight-2">
                {film.title}
              </span>
            </div>
          </div>

          {/* Desktop: Full Gallery Link */}
          <div className="hidden lg:block w-full">
            <a
              href="#"
              className="inline-flex items-center px-2 py-2 border border-white rounded"
            >
              <span className="text-[14px] font-bold leading-none tracking-tight-2">
                {film.title} · Full Gallery →
              </span>
            </a>
          </div>

          {/* Data Section */}
          <div className="w-full flex flex-col gap-3">

            {/* Information */}
            <div className="w-full flex flex-col gap-3 pb-3 border-b border-white/10">
              <h3 className="text-[14px] font-bold leading-none tracking-tight-2">
                Information
              </h3>
              {/* Items: Text auto layout + Studio Logo, both 57px, evenly spread */}
              <div className="w-full flex flex-row items-center justify-between h-[57px]">
                {/* Text - vertical auto layout, fill width, 57px height, 12px gap */}
                <div className="flex flex-col justify-between h-[57px] gap-3">
                  <p className="text-[12px] font-normal leading-none tracking-tight-2 whitespace-pre-line">
                    {film.copyrightInfo}
                  </p>
                </div>
                {/* Studio Ghibli Logo - 57px height, width auto */}
                <img
                  src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/studio-logos/studio-ghibli.svg"
                  alt="Studio Ghibli"
                  style={{ height: '57px', width: 'auto', maxWidth: '40%' }}
                  className="object-contain flex-shrink-0"
                />
              </div>
            </div>

            {/* Directed By (no avatar - moved to Film Heading) */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                Directed by
              </span>
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                {film.director}
              </span>
            </div>

            {/* Overview */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                Overview
              </span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center rounded bg-[#00E054]/50 border border-[#64FF9E]">
                  <span className="text-[12px] font-normal leading-none tracking-tight-2">{film.rating}</span>
                </div>
                <span className="text-[12px] font-normal leading-none tracking-tight-2">
                  {film.genreRuntime}
                </span>
              </div>
            </div>

            {/* Studio */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                Studio
              </span>
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                {film.studio}
              </span>
            </div>

            {/* Country */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                Country
              </span>
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                {film.country}
              </span>
            </div>

            {/* External Links */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[12px] font-normal leading-none tracking-tight-2">
                External
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-[6px] py-[6px] border border-white rounded flex items-center justify-center"
                >
                  <span className="text-[12px] font-normal leading-none tracking-tight-2">
                    Watch Trailer
                  </span>
                </a>
                <a
                  href={film.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[82px] h-[30px]"
                >
                  <svg width="82" height="30" viewBox="0 0 82 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
