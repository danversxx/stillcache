import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '78tpiznj',
  dataset: 'production',
  apiVersion: '2024-02-15',
  useCdn: process.env.NODE_ENV === 'production',
});

export type Film = {
  _id: string;

  // Frontend-friendly aliases
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

    // Map schema field names -> frontend field names (keep frontend stable)
    "filmTitle": title,
    "directorName": director,
    "directorAvatarUrl": directorAvatarUrl,
    "copyrightInformation": copyrightInfo,
    rating,
    genreRuntime,
    studio,
    "studioLogoUrl": studioLogoUrl,
    country,
    trailerUrl,
    letterboxdUrl,

    // Poster can exist under different names depending on old/new docs
    "posterImageUrl": coalesce(posterUrl, posterImageUrl),

    // Stills: support both formats (url directly OR asset->url from older structure)
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

function normalizeFilm(input: any): Film {
  const stills = asArray(input?.homepageStills)
    .map((s: any) => ({
      _key: asString(s?._key) || cryptoRandomKey(),
      url: asString(s?.url),
      alt: typeof s?.alt === 'string' ? s.alt : undefined,
    }))
    .filter((s) => Boolean(s.url));

  return {
    _id: asString(input?._id),

    filmTitle: asString(input?.filmTitle),
    directorName: asString(input?.directorName),
    directorAvatarUrl: typeof input?.directorAvatarUrl === 'string' ? input.directorAvatarUrl : undefined,
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

/**
 * Fetch all films ordered by display order.
 * Returns frontend-ready objects with stable keys and defensive normalization.
 */
export async function getFilms(): Promise<Film[]> {
  const raw = await client.fetch(FILMS_QUERY);
  return asArray(raw).map(normalizeFilm).filter((f) => Boolean(f._id && f.filmTitle && f.posterImageUrl));
}

/**
 * Small helper to avoid breaking React keying if `_key` is missing.
 * Not security-related; just stability.
 */
function cryptoRandomKey() {
  try {
    // @ts-ignore - crypto may not exist in some environments, fallback below.
    return globalThis.crypto?.randomUUID?.() ?? `k_${Math.random().toString(16).slice(2)}`;
  } catch {
    return `k_${Math.random().toString(16).slice(2)}`;
  }
}
