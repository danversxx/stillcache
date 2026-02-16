export default {
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    // Film Title
    {
      name: 'title',
      title: 'Film Title',
      type: 'string',
      description: 'e.g., Kiki\'s Delivery Service',
      validation: (Rule: any) => Rule.required()
    },
    // Director Name
    {
      name: 'director',
      title: 'Director Name',
      type: 'string',
      description: 'e.g., Hayao Miyazaki',
      validation: (Rule: any) => Rule.required()
    },
    // Director Avatar URL
    {
      name: 'directorAvatarUrl',
      title: 'Director Avatar URL',
      type: 'url',
      description: 'Cloudflare R2 URL for director photo'
    },
    // Information - Copyright Text
    {
      name: 'copyrightInfo',
      title: 'Copyright Information',
      type: 'text',
      description: 'e.g., © 1989 Kiki\'s Delivery Service / Eiko Kadono\nStudio Ghibli · Nibariki · Tokuma Shoten',
      rows: 3
    },
    // Rating (U, PG, 12A, etc)
    {
      name: 'rating',
      title: 'Rating',
      type: 'string',
      description: 'e.g., U, PG, 12A, 15, 18',
      validation: (Rule: any) => Rule.required()
    },
    // Genre and Runtime
    {
      name: 'genreRuntime',
      title: 'Genre & Runtime',
      type: 'string',
      description: 'e.g., Family/Fantasy ‧ 1h 42m',
      validation: (Rule: any) => Rule.required()
    },
    // Studio
    {
      name: 'studio',
      title: 'Studio',
      type: 'string',
      description: 'e.g., Studio Ghibli',
      validation: (Rule: any) => Rule.required()
    },
    // Country
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'e.g., Japan',
      validation: (Rule: any) => Rule.required()
    },
    // Trailer URL
    {
      name: 'trailerUrl',
      title: 'Trailer URL',
      type: 'url',
      description: 'YouTube or other video URL'
    },
    // Letterboxd URL
    {
      name: 'letterboxdUrl',
      title: 'Letterboxd URL',
      type: 'url',
      description: 'Letterboxd film page URL'
    },
    // Poster URL
    {
      name: 'posterUrl',
      title: 'Poster Image URL',
      type: 'url',
      description: 'Cloudflare R2 URL for film poster',
      validation: (Rule: any) => Rule.required()
    },
    // Homepage Stills (6 images for preview)
    {
      name: 'homepageStills',
      title: 'Homepage Stills (6 images)',
      type: 'array',
      description: 'Select 6 stills to display on homepage',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'url',
            title: 'Image URL',
            type: 'url',
            description: 'Cloudflare R2 URL'
          },
          {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Brief description of the still'
          }
        ]
      }],
      validation: (Rule: any) => Rule.required().length(6)
    },
    // Display Order
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order films appear on homepage (1, 2, 3...)',
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'director'
    }
  }
}
