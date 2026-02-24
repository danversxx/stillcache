import { getFilms } from '@/lib/sanity';

interface Film {
  _id: string;
  filmTitle: string;
  directorName: string;
  directorAvatarUrl?: string;
  copyrightInformation?: string;
  rating?: string;
  genreRuntime?: string;
  studio?: string;
  country?: string;
  trailerUrl?: string;
  letterboxdUrl?: string;
  posterImageUrl?: string;
  homepageStills?: Array<{
    _key: string;
    url?: string;
    alt?: string;
  }>;
  displayOrder?: number;
}

export default async function FilmSection() {
  const films: Film[] = await getFilms();
  const film = films?.[0];

  if (!film) return <div>No films found</div>;

  return (
    <section className="w-[1440px] px-[120px] mx-auto flex flex-col gap-[32px]">
      {/* SECTION */}
      <div className="w-[1200px] flex items-center justify-between">
        {/* DATA */}
        <div className="w-[718px] h-[597px] flex flex-col justify-between">
          {/* 1 Avatar */}
          {film.directorAvatarUrl ? (
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
              <img
                src={film.directorAvatarUrl}
                alt={film.directorName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          {/* 2 Director */}
          <div className="text-[32px] font-normal leading-none text-black">
            {film.directorName}
          </div>

          {/* 3 Title */}
          <div className="text-[82px] font-semibold leading-[1] text-black w-[718px]">
            {film.filmTitle}
          </div>

          {/* 4 Studio logo */}
          <div className="w-[118px] h-[57px]">
            <img
              src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/studio-logos/studio-ghibli.svg"
              alt={film.studio || 'Studio logo'}
              className="w-full h-full object-contain"
              style={{ filter: 'brightness(0)' }}
            />
          </div>

          {/* 5 Copyright */}
          {film.copyrightInformation ? (
            <div className="text-[14px] font-normal leading-tight text-black whitespace-pre-line">
              {film.copyrightInformation}
            </div>
          ) : null}

          {/* GALLERY button (above Information) */}
          <a
            href="#stills"
            className="w-[718px] border border-black px-[6px] py-[6px] text-black flex items-center justify-center"
          >
            <span className="text-[12px] font-normal leading-none">
              {film.filmTitle} Stills Gallery
            </span>
          </a>

          {/* 6 Information */}
          <div className="w-[718px] pt-[16px] border-t border-black flex items-center gap-[32px]">
            <div className="flex flex-col">
              <span className="text-[14px] font-normal leading-none text-black">Directed by</span>
              <span className="text-[14px] font-normal leading-none text-black">{film.directorName}</span>
            </div>

            {film.genreRuntime ? (
              <div className="flex flex-col">
                <span className="text-[14px] font-normal leading-none text-black">Overview</span>
                <span className="text-[14px] font-normal leading-none text-black">{film.genreRuntime}</span>
              </div>
            ) : null}

            {film.studio ? (
              <div className="flex flex-col">
                <span className="text-[14px] font-normal leading-none text-black">Studio</span>
                <span className="text-[14px] font-normal leading-none text-black">{film.studio}</span>
              </div>
            ) : null}

            {film.country ? (
              <div className="flex flex-col">
                <span className="text-[14px] font-normal leading-none text-black">Country</span>
                <span className="text-[14px] font-normal leading-none text-black">{film.country}</span>
              </div>
            ) : null}
          </div>

          {/* 7 External */}
          <div className="w-[718px] flex flex-col gap-[12px]">
            <div className="text-[14px] font-normal leading-none text-black">External</div>

            <div className="w-[162px] h-[26px] flex items-center gap-[8px]">
              {film.trailerUrl ? (
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-[6px] py-[6px] text-black inline-flex items-center"
                >
                  <span className="text-[12px] font-normal leading-none">Watch Trailer</span>
                </a>
              ) : null}

              {film.letterboxdUrl ? (
                <a
                  href={film.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[70px] h-[26px] flex items-center"
                >
                  <img
                    src="https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev/misc/letterboxd.svg"
                    alt="Letterboxd"
                    className="w-full h-full object-contain"
                  />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* POSTER */}
        {film.posterImageUrl ? (
          <div className="w-[718px] h-[597px]">
            <img
              src={film.posterImageUrl}
              alt={`${film.filmTitle} Poster`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
      </div>

      {/* DIVIDER */}
      <div className="w-[1200px] h-[17px] flex items-center justify-center">
        <span className="text-[14px] font-bold leading-none text-black">· · ·</span>
      </div>

      {/* STILL THUMBNAILS */}
      <div id="stills" className="w-[1200px] grid grid-cols-4 gap-[16px]">
        {film.homepageStills?.map((still: { _key: string; url?: string; alt?: string }) => {
          if (!still?.url) return null;
          return (
            <div key={still._key} className="w-full aspect-[3/2]">
              <img
                src={still.url}
                alt={still.alt || `${film.filmTitle} Still`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}