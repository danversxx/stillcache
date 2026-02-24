import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '78tpiznj',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-02-15',
})

// Fetch all films ordered by display order
export async function getFilms() {
  return client.fetch(`
    *[_type == "film"] | order(displayOrder asc) {
      _id,
      filmTitle,
      directorName,
      directorAvatarUrl,
      copyrightInformation,
      rating,
      genreRuntime,
      studio,
      country,
      trailerUrl,
      letterboxdUrl,
      posterImageUrl,
      homepageStills[]{
        _key,
        asset->{
          url
        }
      },
      displayOrder
    }
  `)
}
