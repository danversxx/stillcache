import Image from 'next/image';
import { getFilms } from '@/lib/sanity';

type Still = { _key: string; url: string; alt?: string };

type Film = {
  _id?: string;
  filmTitle: string;
  directorName: string;
  directorAvatarUrl?: string;
  copyrightInformation?: string;
  rating: string;
  genreRuntime: string;
  studio: string;
  studioLogoUrl?: string;
  country: string;
  trailerUrl?: string;
  letterboxdUrl?: string;
  posterImageUrl: string;
  homepageStills: Still[];
};

export default async function FilmSection() {
  const films = await getFilms();
  if (!Array.isArray(films) || films.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-[64px]">
      {films.map((film: Film, idx: number) => (
        <FilmBlock key={film._id ?? `${film.filmTitle}-${idx}`} film={film} index={idx} />
      ))}
    </section>
  );
}

function FilmBlock({ film, index }: { film: Film; index: number }) {
  const stills = Array.isArray(film.homepageStills) ? film.homepageStills : [];
  const stillAnchor = `stills-${slugify(film.filmTitle) || String(index)}`;

  return (
    <div className="w-full flex flex-col gap-[28px] md:gap-[32px]">
      <div
        className={[
          'w-full grid grid-cols-1 gap-[28px] md:gap-[48px]',
          'xl:grid-cols-[718px_var(--poster-w)] xl:justify-between xl:items-start',
          'xl:[--poster-w:400px] xl:[--poster-h:calc(var(--poster-w)*3/2)]',
        ].join(' ')}
      >
        <FilmData film={film} stillAnchor={stillAnchor} />
        <FilmPoster film={film} />
      </div>

      <div className="flex justify-center">
        <span className="font-bold">· · ·</span>
      </div>

      <StillsGrid id={stillAnchor} filmTitle={film.filmTitle} stills={stills} />
    </div>
  );
}

const RHYTHM_Y = 'gap-[12px]';
const FILMDATA_SLOT = 'shrink-0 xl:py-[2px]';

function FilmData({ film, stillAnchor }: { film: Film; stillAnchor: string }) {
  const rating = safeUpper(film.rating);

  return (
    <div className="w-full flex flex-col gap-[20px] xl:gap-0 xl:h-[var(--poster-h)] xl:justify-between">
      
      <div className={['flex flex-col gap-[14px]', FILMDATA_SLOT].join(' ')}>
        <Avatar src={film.directorAvatarUrl} alt={film.directorName} />
        <div className="text-[20px] md:text-[34px] xl:leading-snug font-medium text-[#999999]">
          {film.directorName}
        </div>
      </div>

      <div className={FILMDATA_SLOT}>
        <h2 className="text-[44px] sm:text-[56px] md:text-[72px] xl:text-[82px] xl:leading-[0.98] font-bold tracking-tight">
          {film.filmTitle}
        </h2>
      </div>

      <div className={FILMDATA_SLOT}>
        <StudioMark studio={film.studio} studioLogoUrl={film.studioLogoUrl} />
      </div>

      <div className={[FILMDATA_SLOT, 'text-[14px] xl:leading-normal whitespace-pre-line'].join(' ')}>
        {film.copyrightInformation || ''}
      </div>

      <div className={FILMDATA_SLOT}>
        <a
          href={`#${stillAnchor}`}
          className="w-full border border-black text-center py-[12px] xl:py-[10px] text-[14px] font-bold"
        >
          {film.filmTitle} Stills Gallery
        </a>
      </div>

      <div className={FILMDATA_SLOT}>
        <FilmMetaRow
          directorName={film.directorName}
          rating={rating}
          genreRuntime={film.genreRuntime}
          studio={film.studio}
          country={film.country}
        />
      </div>

      <div className={FILMDATA_SLOT}>
        <ExternalLinks trailerUrl={film.trailerUrl} letterboxdUrl={film.letterboxdUrl} />
      </div>
    </div>
  );
}

function FilmPoster({ film }: { film: Film }) {
  return (
    <div className="w-full xl:w-[var(--poster-w)] xl:h-[var(--poster-h)]">
      <div className="relative w-full aspect-[2/3] xl:aspect-auto xl:h-full overflow-hidden bg-white">
        <Image
          src={film.posterImageUrl}
          alt={`${film.filmTitle} Poster`}
          fill
          sizes="(min-width: 1280px) 400px, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function StillsGrid({ id, filmTitle, stills }: { id: string; filmTitle: string; stills: Still[] }) {
  const safe = Array.isArray(stills) ? stills.filter((s) => Boolean(s?.url)) : [];
  if (!safe.length) return null;

  return (
    <div id={id} className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
      {safe.map((still) => (
        <div key={still._key} className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={still.url}
            alt={still.alt || filmTitle}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function FilmMetaRow({ directorName, rating, genreRuntime, studio, country }:{
  directorName: string; rating: string; genreRuntime: string; studio: string; country: string;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex flex-nowrap items-start gap-[16px] text-[14px] leading-[22px]">
        <MetaItem label="Directed By" value={directorName} />
        <div className={['flex flex-col whitespace-nowrap', RHYTHM_Y].join(' ')}>
          <span className="font-bold">Overview</span>
          <div className="flex items-center gap-[10px]">
            <RatingPill rating={rating} />
            <span>{genreRuntime}</span>
          </div>
        </div>
        <MetaItem label="Studio" value={studio} />
        <MetaItem label="Country" value={country} />
      </div>
    </div>
  );
}

function ExternalLinks({ trailerUrl, letterboxdUrl }:{ trailerUrl?: string; letterboxdUrl?: string }) {
  return (
    <div className={['flex flex-col', RHYTHM_Y].join(' ')}>
      <span className="font-bold text-[14px]">External</span>
      <div className="flex flex-wrap items-center gap-[16px]">
        <ExternalButton href={trailerUrl} label="Watch Trailer" />
        <ExternalButton href={letterboxdUrl} label="Letterboxd" />
      </div>
    </div>
  );
}

function MetaItem({ label, value }:{ label: string; value: string }) {
  return (
    <div className={['flex flex-col whitespace-nowrap text-[14px]', RHYTHM_Y].join(' ')}>
      <span className="font-bold">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function RatingPill({ rating }:{ rating: string }) {
  return (
    <div className="w-[24px] h-[24px] border border-black rounded-full flex items-center justify-center">
      <span className="text-[11px] font-bold">{rating}</span>
    </div>
  );
}

function StudioMark({ studio, studioLogoUrl }:{ studio: string; studioLogoUrl?: string }) {
  if (studioLogoUrl) {
    return (
      <div className="h-[40px] md:h-[57px] relative">
        <Image src={studioLogoUrl} alt={studio || 'Studio'} width={220} height={57} className="h-full w-auto object-contain" />
      </div>
    );
  }
  return (
    <div className="inline-flex items-center border border-black px-[10px] py-[6px] text-[14px] font-bold">
      {studio}
    </div>
  );
}

function Avatar({ src, alt }:{ src?: string; alt: string }) {
  if (!src) return <div className="w-[52px] h-[52px] rounded-full border border-black/20" />;
  return (
    <div className="w-[52px] h-[52px] rounded-full overflow-hidden relative">
      <Image src={src} alt={alt} fill sizes="52px" className="object-cover" />
    </div>
  );
}

function ExternalButton({ href, label }:{ href?: string; label: string }) {
  const safe = href && (href.startsWith('http://') || href.startsWith('https://'));
  return (
    <a
      href={safe ? href : '#'}
      target={safe ? '_blank' : undefined}
      rel={safe ? 'noopener noreferrer' : undefined}
      aria-disabled={!safe}
      className={[
        'inline-flex items-center border border-black px-[12px] py-[6px] xl:py-[4px] text-[14px] font-bold',
        safe ? '' : 'opacity-50 pointer-events-none',
      ].join(' ')}
    >
      {label}
    </a>
  );
}

function safeUpper(input: string) {
  return (input || '').toUpperCase().trim();
}

function slugify(s: string) {
  return (s || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
