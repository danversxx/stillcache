export default {
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Film Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'director',
      title: 'Director Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'directorAvatarUrl',
      title: 'Director Avatar URL',
      type: 'url',
    },

    // ✅ Director metadata (kept simple + reusable across UI)
    {
      name: 'directorBirthYear',
      title: 'Director Birth Year',
      type: 'number',
      description: 'e.g. 1941',
      validation: (Rule: any) =>
        Rule.integer().min(1800).max(new Date().getFullYear()),
    },
    {
      name: 'directorNationality',
      title: 'Director Nationality',
      type: 'string',
      description: 'e.g. Japan',
    },

    // ✅ Release Date (stored as ISO; we format on frontend)
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      options: {
        dateFormat: 'D MMMM YYYY',
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'copyrightInfo',
      title: 'Copyright Information',
      type: 'text',
      rows: 3,
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'genreRuntime',
      title: 'Genre & Runtime',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'studio',
      title: 'Studio',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'studioLogoUrl',
      title: 'Studio Logo URL',
      type: 'url',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trailerUrl',
      title: 'Trailer URL',
      type: 'url',
    },
    {
      name: 'letterboxdUrl',
      title: 'Letterboxd URL',
      type: 'url',
    },
    {
      name: 'posterUrl',
      title: 'Poster Image URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'homepageStills',
      title: 'Homepage Stills (6 images)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'url', title: 'Image URL', type: 'url' },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().length(6),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'director',
    },
  },
};
