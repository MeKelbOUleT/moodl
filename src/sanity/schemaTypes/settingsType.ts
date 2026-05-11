import {defineType, defineField} from 'sanity';

export const settingsType = defineType({
  name: 'settings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du site',
      type: 'string',
      initialValue: 'Moodl',
    }),
    defineField({
      name: 'description',
      title: 'Description par défaut',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contact_email',
      title: 'E-mail de contact',
      type: 'string',
      initialValue: 'shelter@moodl.fr',
    }),
    defineField({
      name: 'contact_phone',
      title: 'Téléphone de contact',
      type: 'string',
      initialValue: '+33 7 66 87 30 40',
    }),
    defineField({
      name: 'calendly_url',
      title: 'URL Calendly principale',
      type: 'url',
    }),
    defineField({
      name: 'edition_label',
      title: 'Édition courante (eyebrow)',
      type: 'string',
      initialValue: 'Édition 2026 — N°01',
    }),
    defineField({
      name: 'social_links',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {name: 'instagram', type: 'url'},
        {name: 'linkedin', type: 'url'},
        {name: 'youtube', type: 'url'},
      ],
    }),
    defineField({
      name: 'mentions_editeur',
      title: 'Mentions légales — éditeur',
      type: 'object',
      fields: [
        {name: 'raison_sociale', type: 'string'},
        {name: 'siren', type: 'string'},
        {name: 'rcs', type: 'string'},
        {name: 'adresse', type: 'text', rows: 2},
        {name: 'directeur_publication', type: 'string'},
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Paramètres du site Moodl'}),
  },
});
