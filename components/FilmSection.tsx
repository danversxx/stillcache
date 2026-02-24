import { getFilms } from '@/lib/sanity';

interface Still {
  _key: string;
  url: string;
}

interface Film {
  filmTitle: string;
  directorName: string;
  directorAvatarUrl: string;
  copyrightInformation: string;
  genreRuntime: string;
  studio: string;
  country: string;
  trailerUrl: string;
  letterboxdUrl: string;
  posterImageUrl: string;
  homepageStills: Still[];
  rating: string;
}

export default async function FilmSection() {
  const films = await getFilms();
  const film: Film | undefined = films?.[0];

  if (!film) return null;

  const stills = film.homepageStills || [];

  return (
    <section className="w-full flex flex-col gap-[32px]">

      {/* SECTION */}
      <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-[48px]">

        {/* DATA COLUMN */}
        <div className="flex flex-col w-full xl:w-[718px] gap-[18px]">

          {/* Avatar */}
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
            <img
              src={film.directorAvatarUrl}
              alt={film.directorName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Director */}
          <div className="text-[34px] leading-[41px] font-medium text-[#999999]">
            {film.directorName}
          </div>

          {/* Title */}
          <div className="text-[82px] leading-[80px] font-bold tracking-tight">
            {film.filmTitle}
          </div>

          {/* Studio logo */}
          <div className="h-[57px]">
            <img
              src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/studio-logos/studio-ghibli.svg"
              alt={film.studio}
              className="h-full w-auto object-contain"
              style={{ filter: 'brightness(0)' }}
            />
          </div>

          {/* Copyright */}
          <div className="text-[14px] leading-[22px] whitespace-pre-line">
            {film.copyrightInformation}
          </div>

          {/* Gallery Button */}
          <a
            href="#stills"
            className="w-full border border-black text-center py-[12px] text-[14px] leading-[22px] font-bold"
          >
            {film.filmTitle} Stills Gallery
          </a>

          {/* Information */}
          <div className="flex flex-wrap gap-[32px] text-[14px] leading-[22px]">

            <div className="flex flex-col">
              <span className="font-bold">Directed By</span>
              <span>{film.directorName}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold">Overview</span>

              <div className="flex items-center gap-[10px]">

                {/* Certificate Circle */}
                <div className="w-[24px] h-[24px] border border-black rounded-full flex items-center justify-center leading-none">
                  <span className="text-[11px] font-bold">
                    {(film.rating || '').toUpperCase()}
                  </span>
                </div>

                <span>{film.genreRuntime}</span>

              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-bold">Studio</span>
              <span>{film.studio}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold">Country</span>
              <span>{film.country}</span>
            </div>

          </div>

          {/* External */}
          <div className="flex flex-col gap-[12px]">
            <span className="font-bold text-[14px] leading-[22px]">External</span>

            <div className="flex items-center gap-[12px]">
              <a
                href={film.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-[12px] py-[6px] border border-black text-[14px] leading-[22px] font-bold"
              >
                Watch Trailer
              </a>

              <a
                href={film.letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[70px] h-[26px]"
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

        {/* POSTER */}
        <div className="w-full xl:w-[400px] h-[600px]">
          <img
            src={film.posterImageUrl}
            alt={`${film.filmTitle} Poster`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex justify-center">
        <span className="font-bold">· · ·</span>
      </div>

      {/* Stills */}
      <div id="stills" className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
        {stills.map((still) => (
          <div key={still._key} className="aspect-[3/2] overflow-hidden">
            <img
              src={still.url}
              alt={film.filmTitle}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}