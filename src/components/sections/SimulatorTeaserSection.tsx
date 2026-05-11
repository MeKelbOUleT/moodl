import { ArrowRight, Sliders } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';

export default function SimulatorTeaserSection() {
  return (
    <section className="py-24 lg:py-32 bg-card border-y border-border/60 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 50%, hsl(150 100% 50% / 0.08), transparent 60%)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal animation="fade-right">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-5">
                Le calcul
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
                Ce que rapporte{' '}
                <span className="font-serif-italic text-secondary">votre temps libre</span>.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Onze paramètres ajustables, projections sur 12 mois et 10 ans. Découvrez ce qu'une adresse Moodl peut vous reverser pendant que vous n'êtes pas là.
              </p>
              <NavLink to="/simulateur">
                <Button variant="moodl" size="lg" className="px-8">
                  Lancer le simulateur
                  <ArrowRight className="ml-1" />
                </Button>
              </NavLink>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="relative aspect-[5/4] rounded-2xl bg-background/60 border border-border/60 overflow-hidden p-8 lg:p-10 backdrop-blur-sm">
              <div className="space-y-6">
                {[
                  { label: 'Prix du Moodl', value: '55 000 €', pos: 22 },
                  { label: 'Prix du terrain', value: '30 000 €', pos: 15 },
                  { label: 'Apport personnel', value: '25 000 €', pos: 13 },
                  { label: 'Loyer par nuit', value: '150 €', pos: 25 },
                  { label: "Taux d'occupation", value: '70 %', pos: 70 },
                ].map((slider, i) => (
                  <div key={slider.label} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{slider.label}</span>
                      <span className="font-mono font-semibold text-foreground">
                        {slider.value}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden relative">
                      <div
                        className="absolute inset-y-0 left-0 bg-secondary transition-all"
                        style={{
                          width: `${slider.pos}%`,
                          transitionDelay: `${i * 80}ms`,
                          transitionDuration: '900ms',
                        }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary border-2 border-background shadow-md transition-all"
                        style={{
                          left: `calc(${slider.pos}% - 6px)`,
                          transitionDelay: `${i * 80}ms`,
                          transitionDuration: '900ms',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-6 right-6 left-6 lg:left-auto lg:right-10 lg:bottom-10 bg-background border border-border/60 rounded-xl p-5 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
                    <Sliders className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Cashflow mensuel
                    </p>
                    <p className="font-display text-2xl font-bold text-primary">
                      + 1 406 €
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
