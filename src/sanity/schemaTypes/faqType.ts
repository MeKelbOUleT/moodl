import {defineType, defineField} from 'sanity';

export const faqType = defineType({
  name: 'faq',
  title: 'Question fréquente',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Investir', value: 'investir'},
          {title: 'Juridique', value: 'juridique'},
          {title: 'Intendance', value: 'intendance'},
          {title: 'Technique', value: 'technique'},
          {title: 'Programmes', value: 'programmes'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
    }),
    defineField({
      name: 'visible_on',
      title: 'Affichage',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '/faq (page dédiée)', value: 'faq'},
          {title: '/investir', value: 'investir'},
          {title: '/simulateur', value: 'simulateur'},
          {title: '/programmes/[slug]', value: 'programme'},
          {title: '/ (home)', value: 'home'},
        ],
      },
      initialValue: ['faq'],
    }),
  ],
  preview: {
    select: {title: 'question', subtitle: 'category'},
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
});
