import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FilmSection from '@/components/FilmSection';
import PageShell from '@/components/PageShell';
import { getFilmBySlug } from '@/lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* ──────────────────────────────────────────────────────────────
   PER-FILM METADATA
   TRAP: runs its own fetch — Sanity is hit twice per request
────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);

  if (!film) return { title: 'Film not found · Still Cache' };

  const year = film.releaseDate?.slice(0, 4) ?? '';
  const title = year ? `${film.filmTitle} (${year})` : film.filmTitle;

  const description =
    [film.directorName ? `Directed by ${film.directorName}` : '', film.genreRuntime, film.country]
      .filter(Boolean)
      .join(' · ') || 'Film stills';

  const previewImage = film.galleryImages?.[0]?.url || film.posterImageUrl;

  return {
    title: `${title} · Still Cache`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Still Cache',
      images: previewImage ? [{ url: previewImage, alt: `${film.filmTitle} still` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: previewImage ? [previewImage] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);

  if (!film) notFound();

  return (
    <PageShell filmTitle={film.filmTitle}>
      <FilmSection film={film} imageSet="gallery" hideGalleryButton />
    </PageShell>
  );
}
