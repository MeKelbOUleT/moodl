import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';

export default function FinalCTASection() {
  return (
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden border-t border-border/60">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(150 100% 50% / 0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, hsl(43 70% 62% / 0.08), transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative text-center">
        <ScrollReveal animation="fade-up">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">
            Programmes limités
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={120}>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mx-auto mb-8">
            Reprenez{' '}
            <span className="font-serif-italic text-secondary">votre temps</span>.
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={240}>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Premiers arrivés, premiers servis. Quatorze lots restants sur l'édition 2026.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={360}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to="/contact">
              <Button variant="moodl" size="lg" className="px-8">
                Planifier un appel expert
                <ArrowRight className="ml-1" />
              </Button>
            </NavLink>
            <NavLink to="/simulateur">
              <Button variant="outline" size="lg" className="px-8">
                Recevoir le PDF complet
              </Button>
            </NavLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
