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
    *[_type == "film"] | order(order asc) {
      _id,

      // map schema field names -> frontend field names
      "filmTitle": title,
      "directorName": director,
      directorAvatarUrl,
      "copyrightInformation": copyrightInfo,
      rating,
      genreRuntime,
      studio,
      country,
      trailerUrl,
      letterboxdUrl,

      // poster can exist under different names depending on old/new docs
      "posterImageUrl": coalesce(posterUrl, posterImageUrl),

      // stills: support both formats (url directly OR asset->url from older structure)
      "homepageStills": homepageStills[]{
        _key,
        "url": coalesce(url, asset->url),
        alt
      },

      "displayOrder": order
    }
  `)
}