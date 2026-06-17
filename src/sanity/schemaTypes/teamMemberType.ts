import {defineType, defineField} from 'sanity';

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Membre de l\'atelier',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 80},
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Ex. Fondateur, Architecte, Conciergerie, Photographe',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio courte',
      type: 'text',
      rows: 4,
      description: '2 à 3 phrases. Parcours, expertise, signature.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo portrait',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Texte alternatif', type: 'string'}],
    }),
    defineField({
      name: 'is_founder',
      title: 'Fondateur ?',
      type: 'boolean',
      description: 'Cocher pour mettre en avant et lier au schema Organization.founder',
      initialValue: false,
    }),
    defineField({
      name: 'linkedin_url',
      title: 'URL LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
});
