import { ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';

import bgInterior from '@/assets/renders/circle-interior-night.png';

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-32 lg:py-40">
      {/* Image de fond — Circle intérieur nuit, vue lac étoilé */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src={bgInterior.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"
          loading="lazy"
        />
        {/* Overlay assombrissant pour la lisibilité du texte (centré sur le bloc texte) */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/95" />
        {/* Voile lime subtil */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(150 100% 50% / 0.08), transparent 65%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative text-center">
        <ScrollReveal animation="fade-up">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">
            L'invitation
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={120}>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mx-auto mb-8">
            Vendredi soir.{' '}
            <br className="hidden sm:block" />
            <span className="font-serif-italic text-secondary">La cheminée est prête.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={240}>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            Trois lieux ouverts en 2026. Une visite, un appel, un compromis.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={300}>
          <p className="text-base lg:text-lg text-foreground/85 max-w-2xl mx-auto mb-12 leading-relaxed">
            Le reste de l'année, <span className="text-primary font-medium">on s'en occupe pour vous</span> — accueil, ménage, mise en location, reportings. Vous arrivez, c'est prêt. Vous partez, ça vous rapporte.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={420}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <NavLink to="/contact">
              <Button variant="moodl" size="lg" className="px-8">
                <Phone className="w-4 h-4 mr-1" />
                Planifier un appel
                <ArrowRight className="ml-1" />
              </Button>
            </NavLink>
            <NavLink to="/simulateur">
              <Button variant="outline" size="lg" className="px-8">
                Simuler ma rentabilité
              </Button>
            </NavLink>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={540}>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/90">14 lots ouverts</span> en Dordogne, Ardèche, Lac d'Annecy &middot;{' '}
            <span className="italic">Premiers acheteurs avantagés</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
