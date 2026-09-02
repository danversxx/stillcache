import FilmSection from '@/components/FilmSection';
import PageShell from '@/components/PageShell';
import ScrollRestoration from '@/components/ScrollRestoration';
import { getFilms } from '@/lib/sanity';

export const revalidate = 60;

export default async function Page() {
  const films = await getFilms();

  return (
    <PageShell>
      <ScrollRestoration />
      {films.map((film) => {
        const filmHref = film.slug ? `/films/${film.slug}` : undefined;
        return (
          <FilmSection
            key={film._id}
            film={film}
            filmHref={filmHref}
            galleryHref={filmHref}
          />
        );
      })}
    </PageShell>
  );
}
