import {defineType, defineField} from 'sanity';

export const lieuType = defineType({
  name: 'lieu',
  title: 'Lieu (modèle d\'hébergement)',
  type: 'document',
  groups: [
    {name: 'identite', title: 'Identité'},
    {name: 'specs', title: 'Spécifications'},
    {name: 'visuel', title: 'Visuels'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      group: 'identite',
      description: 'Ex. Circle, Love Boat, Nova, A-Frame, Nebula',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identite',
      options: {source: 'name', maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      group: 'identite',
      description: 'Ex. Capsule panoramique 360°',
    }),
    defineField({
      name: 'tagline',
      title: 'Phrase d\'accroche',
      type: 'string',
      group: 'identite',
      description: 'Une ligne courte, qui touche.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'identite',
    }),
    defineField({
      name: 'surface_min_m2',
      title: 'Surface minimale (m²)',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'surface_max_m2',
      title: 'Surface maximale (m²)',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'capacite',
      title: 'Capacité (texte libre)',
      type: 'string',
      group: 'specs',
      description: 'Ex. 2 à 4 personnes',
    }),
    defineField({
      name: 'prix_a_partir_de',
      title: 'Prix à partir de (€)',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'loyer_nuit_indicatif',
      title: 'Loyer indicatif par nuit (€)',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'roi_indicatif',
      title: 'Rendement indicatif (%)',
      type: 'string',
      group: 'specs',
      description: 'Ex. 14 %+',
    }),
    defineField({
      name: 'duree_pose',
      title: 'Durée d\'installation',
      type: 'string',
      group: 'specs',
      description: 'Ex. 1 jour — fondations sur plots vissés',
    }),
    defineField({
      name: 'caracteristiques',
      title: 'Caractéristiques',
      type: 'array',
      group: 'specs',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Étiquette', type: 'string'},
            {name: 'value', title: 'Valeur', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'hero_image',
      title: 'Image principale',
      type: 'image',
      group: 'visuel',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'galerie',
      title: 'Galerie',
      type: 'array',
      group: 'visuel',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Texte alternatif', type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      group: 'identite',
      description: 'Plus le nombre est petit, plus le lieu apparaît tôt.',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'subtitle', media: 'hero_image'},
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
});
