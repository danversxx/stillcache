import { getFilms } from '@/lib/sanity';

interface Film {
  _id: string;
  filmTitle: string;
  directorName: string;
  directorAvatarUrl: string;
  copyrightInformation: string;
  rating: string;
  genreRuntime: string;
  studio: string;
  country: string;
  trailerUrl: string;
  letterboxdUrl: string;
  posterImageUrl: string;
  homepageStills: Array<{
  _key: string;
  url: string;
}>;
  displayOrder: number;
}

export default async function FilmSection() {
  const films = await getFilms();
  const film = films[0];

  if (!film) {
    return <div>No films found</div>;
  }

  return (
    <div className="w-full px-4 md:px-[120px]">
      {/* Container - 32px gap between Section, Divider, Stills */}
      <div className="w-full flex flex-col gap-8">
        
        {/* Section - Poster + Data side by side on desktop */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          
          {/* Mobile: Avatar */}
          <div className="md:hidden w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src={film.directorAvatarUrl}
              alt={film.directorName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile: Director Name - 22px (text-2xl = 24px) */}
          <div className="md:hidden text-2xl font-normal leading-none text-black">
            {film.directorName}
          </div>

          {/* Mobile: Film Title - 42px */}
          <div className="md:hidden text-[42px] font-semibold leading-none text-black">
            {film.filmTitle}
          </div>

          {/* Mobile: Poster (comes before Studio logo on mobile) */}
          <div className="md:hidden w-full aspect-[2/3]">
            <img
              src={film.posterImageUrl}
              alt={`${film.filmTitle} Poster`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Data - 600px height on desktop, evenly distributed */}
          <div className="w-full md:w-[718px] flex flex-col md:h-[600px] md:justify-between gap-4 md:gap-0">
            
            {/* Desktop: Avatar */}
            <div className="hidden md:block w-[52px] h-[52px] rounded-full overflow-hidden">
              <img
                src={film.directorAvatarUrl}
                alt={film.directorName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Desktop: Director Name */}
            <div className="hidden md:block text-[32px] font-normal leading-none text-black">
              {film.directorName}
            </div>

            {/* Desktop: Film Title - 82px */}
            <div className="hidden md:block text-[82px] font-semibold leading-none text-black" style={{ maxWidth: '718px' }}>
              {film.filmTitle}
            </div>

            {/* Studio Logo - hardcoded for now, can be made dynamic later */}
            <div className="w-auto h-[45px] md:h-[57px]">
              <img
                src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/studio-logos/studio-ghibli.svg"
                alt={film.studio}
                className="w-auto h-full object-contain"
                style={{ filter: 'brightness(0)' }}
              />
            </div>

            {/* Copyright */}
            <div className="text-[10px] md:text-[14px] font-normal leading-tight text-black whitespace-pre-line">
              {film.copyrightInformation}
            </div>

            {/* Gallery Button */}
            <a
              href="#stills"
              className="w-full flex items-center justify-center px-[6px] py-[6px] border border-black text-black"
            >
              <span className="text-[12px] font-normal leading-none">
                {film.filmTitle} · Full Gallery →
              </span>
            </a>

            {/* Information - horizontal on desktop, vertical on mobile */}
            <div className="w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
              
              {/* Directed by */}
              <div className="flex flex-col gap-0">
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">Directed by</span>
                <span className="text-[10px] md:text-[14px] font-normal leading-none text-black">{film.directorName}</span>
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
                  className="flex items-center w-[64px] h-[23px] md:w-[70px] md:h-[26px]"
                >
                  <img
                    src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/misc/letterboxd.svg"
                    alt="Letterboxd"
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>
            </div>

          </div>

          {/* Desktop: Poster - 400×600px */}
          <div className="hidden md:block w-[400px] h-[600px]">
            <img
              src={film.posterImageUrl}
              alt={`${film.filmTitle} Poster`}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Divider */}
        <div className="w-full flex items-center justify-center py-2">
          <span className="text-[14px] font-bold leading-none text-black">· · ·</span>
        </div>

        {/* Still Thumbnails */}
        <div id="stills" className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {film.homepageStills?.map((still: { _key: string; url: string }) => (
            <div key={still._key} className="w-full aspect-[3/2]">
             <div className="w-full h-full border border-black p-2 overflow-auto text-[10px] leading-tight">
  {JSON.stringify(still, null, 2)}
</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
