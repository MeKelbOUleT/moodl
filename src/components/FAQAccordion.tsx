import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {cn} from '@/lib/utils';
import {track} from '@/lib/analytics';

export interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
  /** Optional id used for analytics: 'investir', 'simulateur', 'faq', 'programme' */
  context?: string;
}

export default function FAQAccordion({items, context = 'faq'}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number, question: string) {
    setOpenIndex((current) => {
      const next = current === index ? null : index;
      if (next !== null) {
        track('faq_open', {context, index, question});
      }
      return next;
    });
  }

  return (
    <ul className="space-y-3" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-${context}-panel-${i}`;
        const buttonId = `faq-${context}-button-${i}`;
        return (
          <li key={`${item.question}-${i}`} className="border border-border/60 rounded-2xl bg-card overflow-hidden">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i, item.question)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 lg:px-7 py-5 lg:py-6 font-display text-base lg:text-lg font-medium tracking-tight hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              >
                <span className="flex-1">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 shrink-0 text-primary transition-transform duration-200 motion-reduce:transition-none',
                    isOpen ? 'rotate-180' : 'rotate-0',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                'px-6 lg:px-7 pb-6 lg:pb-7 text-sm lg:text-base text-muted-foreground leading-relaxed',
              )}
            >
              <p>{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
