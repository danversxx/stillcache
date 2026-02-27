import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '78tpiznj',
  dataset: 'production',
  apiVersion: '2024-02-15',
  useCdn: process.env.NODE_ENV === 'production',
});

export type Film = {
  _id: string;

  filmTitle: string;

  directorName: string;
  directorAvatarUrl?: string;
  directorBirthYear?: number;
  directorNationality?: string;

  releaseDate?: string;

  copyrightInformation?: string;

  rating: string;
  genreRuntime: string;

  studio: string;
  studioLogoUrl?: string;

  country: string;

  trailerUrl?: string;
  letterboxdUrl?: string;

  posterImageUrl: string;

  homepageStills: Array<{
    _key: string;
    url: string;
    alt?: string;
  }>;

  displayOrder: number;
};

const FILMS_QUERY = /* groq */ `
  *[_type == "film"] | order(order asc) {
    _id,

    "filmTitle": title,

    "directorName": director,
    "directorAvatarUrl": directorAvatarUrl,
    directorBirthYear,
    directorNationality,

    releaseDate,

    "copyrightInformation": copyrightInfo,

    rating,
    genreRuntime,

    studio,
    "studioLogoUrl": studioLogoUrl,

    country,

    trailerUrl,
    letterboxdUrl,

    "posterImageUrl": coalesce(posterUrl, posterImageUrl),

    "homepageStills": homepageStills[]{
      _key,
      "url": coalesce(url, asset->url),
      alt
    },

    "displayOrder": order
  }
`;

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function asNumber(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined;
}

function normalizeFilm(input: any): Film {
  const stills = asArray(input?.homepageStills)
    .map((s: any) => ({
      _key: asString(s?._key) || cryptoRandomKey(),
      url: asString(s?.url),
      alt: typeof s?.alt === 'string' ? s.alt : undefined,
    }))
    .filter((s) => Boolean(s.url));

  const directorNationality =
    typeof input?.directorNationality === 'string' ? input.directorNationality.trim() : '';

  return {
    _id: asString(input?._id),

    filmTitle: asString(input?.filmTitle),

    directorName: asString(input?.directorName),
    directorAvatarUrl: typeof input?.directorAvatarUrl === 'string' ? input.directorAvatarUrl : undefined,
    directorBirthYear: asNumber(input?.directorBirthYear),
    directorNationality: directorNationality || undefined,

    releaseDate: typeof input?.releaseDate === 'string' ? input.releaseDate : undefined,

    copyrightInformation: typeof input?.copyrightInformation === 'string' ? input.copyrightInformation : undefined,

    rating: asString(input?.rating),
    genreRuntime: asString(input?.genreRuntime),

    studio: asString(input?.studio),
    studioLogoUrl: typeof input?.studioLogoUrl === 'string' ? input.studioLogoUrl : undefined,

    country: asString(input?.country),

    trailerUrl: typeof input?.trailerUrl === 'string' ? input.trailerUrl : undefined,
    letterboxdUrl: typeof input?.letterboxdUrl === 'string' ? input.letterboxdUrl : undefined,

    posterImageUrl: asString(input?.posterImageUrl),

    homepageStills: stills,

    displayOrder: typeof input?.displayOrder === 'number' ? input.displayOrder : 0,
  };
}

export async function getFilms(): Promise<Film[]> {
  const raw = await client.fetch(FILMS_QUERY);
  return asArray(raw)
    .map(normalizeFilm)
    .filter((f) => Boolean(f._id && f.filmTitle && f.posterImageUrl));
}

function cryptoRandomKey() {
  try {
    // @ts-ignore
    return globalThis.crypto?.randomUUID?.() ?? `k_${Math.random().toString(16).slice(2)}`;
  } catch {
    return `k_${Math.random().toString(16).slice(2)}`;
  }
}
