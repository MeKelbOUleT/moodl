import {FAQ_FALLBACK, type FaqGroup} from './faq-fallback';

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Return a curated subset of FAQ items for a given context page.
 * Order matters: highest-intent questions first.
 */
export function getFaqSubsetFor(page: 'investir' | 'simulateur' | 'home' | 'programme'): FAQItem[] {
  const all = FAQ_FALLBACK.reduce<Record<string, FAQItem[]>>((acc, group) => {
    acc[group.id] = group.items;
    return acc;
  }, {});

  switch (page) {
    case 'investir':
      return [
        ...all.investir,
        ...(all.juridique?.slice(0, 3) ?? []),
      ];
    case 'simulateur':
      return [
        all.investir?.[0],
        all.investir?.[1],
        all.investir?.[2],
        all.investir?.[4],
        all.juridique?.[3],
        all.intendance?.[1],
      ].filter(Boolean) as FAQItem[];
    case 'home':
      return [
        all.investir?.[0],
        all.investir?.[1],
        all.investir?.[2],
        all.intendance?.[0],
        all.juridique?.[2],
      ].filter(Boolean) as FAQItem[];
    case 'programme':
      return [
        all.programmes?.[0],
        all.programmes?.[1],
        all.programmes?.[2],
        all.investir?.[2],
      ].filter(Boolean) as FAQItem[];
    default:
      return [];
  }
}

export function buildFaqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {'@type': 'Answer', text: item.answer},
    })),
  };
}

export type {FAQItem, FaqGroup};
