import { Star } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const testimonials = [
  {
    name: 'Camille R.',
    location: 'Paris 16',
    extract:
      "Le module a été posé en une matinée. Trois mois plus tard on est à 78 % d'occupation, c'est au-delà de ce qu'on espérait.",
    monthly: '2 850 €',
    program: 'Dordogne',
  },
  {
    name: 'Jean-Pierre M.',
    location: 'Lyon',
    extract:
      "Je cherchais un placement immobilier qui ait du sens et qui rapporte. Le module dialogue avec le terrain — c'est ce qui m'a convaincu.",
    monthly: '3 120 €',
    program: 'Ardèche',
  },
  {
    name: 'Sophie & Marc L.',
    location: 'Annecy',
    extract:
      "On utilise le module nous-mêmes 3 semaines par an, le reste est géré par Moodl. La transparence des reportings est rare dans ce milieu.",
    monthly: '4 480 €',
    program: 'Lac d\'Annecy',
  },
  {
    name: 'Antoine V.',
    location: 'Bordeaux',
    extract:
      "L'angle architecte fait la différence. Le module n'est pas posé n'importe où — il y a un vrai dialogue avec le terrain.",
    monthly: '2 680 €',
    program: 'Dordogne',
  },
  {
    name: 'Hélène D.',
    location: 'Genève',
    extract:
      'Investissement long terme rassurant. La conciergerie tient ses engagements, je n\'ai eu aucun appel client à gérer en 8 mois.',
    monthly: '3 340 €',
    program: 'Ardèche',
  },
  {
    name: 'Olivier B.',
    location: 'Marseille',
    extract:
      'Premier acheteur du programme Dordogne, j\'ai eu un tarif d\'amorçage. Aujourd\'hui mon ROI annoncé est conservé sur 12 mois glissants.',
    monthly: '2 920 €',
    program: 'Dordogne',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-5">
                Ils y vont. Ils y reviennent.
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Une aventure{' '}
                <span className="font-serif-italic text-secondary">partagée</span>.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground italic max-w-xs">
              Témoignages issus des programmes pilotes Dordogne, Ardèche et Lac d'Annecy.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal animation="fade-up" delay={200}>
        <div className="overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
          <div className="flex gap-5 lg:gap-6 px-6 lg:px-12 min-w-max">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="snap-start shrink-0 w-[320px] md:w-[380px] bg-card border border-border/60 rounded-2xl p-7 lg:p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-5 text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary" />
                  ))}
                </div>
                <p className="font-serif-italic text-lg lg:text-xl leading-snug text-foreground mb-7">
                  "{t.extract}"
                </p>
                <div className="flex items-center justify-between border-t border-border/50 pt-5">
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.location} · {t.program}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-primary">{t.monthly}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Net mensuel
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
