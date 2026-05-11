import {defineType, defineField} from 'sanity';

export const temoignageType = defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom (initiales OK)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ville (résidence du propriétaire)',
      type: 'string',
    }),
    defineField({
      name: 'programme',
      title: 'Programme concerné',
      type: 'reference',
      to: [{type: 'programme'}],
    }),
    defineField({
      name: 'extract',
      title: 'Extrait',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'monthly_revenue',
      title: 'Revenu net mensuel constaté (€)',
      type: 'number',
      description: 'Affiché en badge si présent.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo (optionnelle)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'video_url',
      title: 'URL vidéo (YouTube/Vimeo)',
      type: 'url',
    }),
    defineField({
      name: 'rating',
      title: 'Note (1-5)',
      type: 'number',
      validation: (r) => r.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'location', media: 'photo'},
  },
  orderings: [
    {title: 'Ordre', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
});
