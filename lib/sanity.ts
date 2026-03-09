import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '78tpiznj',
  dataset: 'production',
  apiVersion: '2024-02-15',
  useCdn: false,
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

type RawStill = {
  _key?: unknown;
  url?: unknown;
  alt?: unknown;
};

type RawFilm = {
  _id?: unknown;

  filmTitle?: unknown;

  directorName?: unknown;
  directorAvatarUrl?: unknown;
  directorBirthYear?: unknown;
  directorNationality?: unknown;

  releaseDate?: unknown;

  copyrightInformation?: unknown;

  rating?: unknown;
  genreRuntime?: unknown;

  studio?: unknown;
  studioLogoUrl?: unknown;

  country?: unknown;

  trailerUrl?: unknown;
  letterboxdUrl?: unknown;

  posterImageUrl?: unknown;

  homepageStills?: unknown;

  displayOrder?: unknown;
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

function asOptionalString(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined;
}

function asNumber(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined;
}

function normalizeFilm(input: RawFilm): Film {
  const stills = asArray<RawStill>(input.homepageStills)
    .map((s) => ({
      _key: asString(s._key) || cryptoRandomKey(),
      url: asString(s.url),
      alt: asOptionalString(s.alt),
    }))
    .filter((s) => Boolean(s.url));

  const directorNationality =
    typeof input.directorNationality === 'string' ? input.directorNationality.trim() : '';

  return {
    _id: asString(input._id),

    filmTitle: asString(input.filmTitle),

    directorName: asString(input.directorName),
    directorAvatarUrl: asOptionalString(input.directorAvatarUrl),
    directorBirthYear: asNumber(input.directorBirthYear),
    directorNationality: directorNationality || undefined,

    releaseDate: asOptionalString(input.releaseDate),

    copyrightInformation: asOptionalString(input.copyrightInformation),

    rating: asString(input.rating),
    genreRuntime: asString(input.genreRuntime),

    studio: asString(input.studio),
    studioLogoUrl: asOptionalString(input.studioLogoUrl),

    country: asString(input.country),

    trailerUrl: asOptionalString(input.trailerUrl),
    letterboxdUrl: asOptionalString(input.letterboxdUrl),

    posterImageUrl: asString(input.posterImageUrl),

    homepageStills: stills,

    displayOrder: asNumber(input.displayOrder) ?? 0,
  };
}

export async function getFilms(): Promise<Film[]> {
  const raw = await client.fetch<RawFilm[]>(FILMS_QUERY);
  return asArray<RawFilm>(raw)
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
