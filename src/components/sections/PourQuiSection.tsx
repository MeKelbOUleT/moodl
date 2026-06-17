import {Heart, TrendingUp, ArrowRight} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import {NavLink} from '@/components/NavLink';

const profiles = [
  {
    icon: Heart,
    eyebrow: 'Le citadin',
    title: 'Vous voulez juste profiter.',
    body: "Vendredi soir, vous arrivez. La cheminée est allumée, le frigo est plein, le lit est fait. Aucun jardinier à briefer. Aucun entretien. Aucune facture à régler. Quand vous n'y êtes pas, c'est nous qui louons, vous touchez un revenu, c'est tout.",
    bullets: [
      'Aucune corvée, jamais',
      "Vous arrivez, c'est prêt",
      'Loué pour vous quand vous partez',
    ],
    ctaLabel: 'Voir les lieux disponibles',
    ctaHref: '/programmes',
    analyticsId: 'pourqui_citadin',
  },
  {
    icon: TrendingUp,
    eyebrow: "L'investisseur",
    title: 'Vous cherchez un actif vivant.',
    body: "Un patrimoine immobilier qui se transmet, qui s'apprécie, qui rapporte. 10 à 15 % de rendement annuel net après gestion. Conception architecte signée, classement et mise en location compris. Reportings mensuels, contrôle total.",
    bullets: [
      'Rendement net 10-15 % par an',
      'Tout est pris en charge',
      'Reportings et contrôle total',
    ],
    ctaLabel: 'Demander le dossier investisseur',
    ctaHref: '/investir',
    analyticsId: 'pourqui_investisseur',
  },
];

export default function PourQuiSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 25% 50%, hsl(135 18% 50% / 0.04), transparent 60%), radial-gradient(ellipse 50% 40% at 75% 50%, hsl(35 38% 60% / 0.04), transparent 60%)',
        }}
      />
      <div className="container mx-auto px-6 lg:px-8 relative">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-14 lg:mb-20 text-center mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-5">
              Pour qui ?
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Deux profils.{' '}
              <span className="font-serif-italic text-secondary">Un même rêve.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {profiles.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <ScrollReveal key={profile.title} animation="fade-up" delay={i * 100}>
                <div className="group h-full bg-card border border-border/60 rounded-3xl p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(106,142,114,0.10)] flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {profile.eyebrow}
                    </p>
                  </div>

                  <h3 className="font-display text-2xl lg:text-3xl font-bold mb-5 tracking-tight leading-tight">
                    {profile.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm lg:text-base">
                    {profile.body}
                  </p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {profile.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm">
                        <span className="font-mono text-xs text-primary mt-1 shrink-0">→</span>
                        <span className="text-foreground/85">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <NavLink
                    to={profile.ctaHref}
                    data-analytics-cta={profile.analyticsId}
                    className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow-md hover:shadow-[0_0_30px_rgba(106,142,114,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-reduce:transition-none motion-reduce:hover:scale-100"
                  >
                    {profile.ctaLabel}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </NavLink>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
