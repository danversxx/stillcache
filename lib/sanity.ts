import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '2jlzwuvy', // Replace with your project ID
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-02-15',
})

// Fetch all films ordered by display order
export async function getFilms() {
  return client.fetch(`
    *[_type == "film"] | order(order asc) {
      title,
      director,
      directorAvatarUrl,
      copyrightInfo,
      rating,
      genreRuntime,
      studio,
      country,
      trailerUrl,
      letterboxdUrl,
      posterUrl,
      homepageStills,
      order
    }
  `)
}
