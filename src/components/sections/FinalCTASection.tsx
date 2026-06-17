import {ArrowRight, Phone} from 'lucide-react';
import {NavLink} from '@/components/NavLink';
import {Button} from '@/components/ui/button';
import type {ScarcitySnapshot} from '@/lib/scarcity';

import bgInterior from '@/assets/renders/circle-interior-night.png';

interface Props {
  scarcity?: ScarcitySnapshot;
}

export default function FinalCTASection({scarcity}: Props) {
  const availableLots = scarcity?.availableLots ?? 14;
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-32 lg:py-40">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src={bgInterior.src}
          alt=""
          width={2400}
          height={1600}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/95" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(150 100% 50% / 0.08), transparent 65%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">
          L'invitation
        </p>

        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mx-auto mb-8">
          Vendredi soir.{' '}
          <br className="hidden sm:block" />
          <span className="font-serif-italic text-secondary">La cheminée est prête.</span>
        </h2>

        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          Trois lieux ouverts en 2026. Une visite, un appel, un compromis.
        </p>

        <p className="text-base lg:text-lg text-foreground/85 max-w-2xl mx-auto mb-12 leading-relaxed">
          Le reste de l'année, <span className="text-primary font-medium">on s'en occupe pour vous</span>, accueil, ménage, mise en location, reportings. Vous arrivez, c'est prêt. Vous partez, ça vous rapporte.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <NavLink to="/contact">
            <Button
              variant="moodl"
              size="lg"
              className="px-8"
              data-analytics-cta="final_cta_appel"
            >
              <Phone className="w-4 h-4 mr-1" aria-hidden="true" />
              Planifier mon appel
              <ArrowRight className="ml-1" aria-hidden="true" />
            </Button>
          </NavLink>
          <NavLink to="/simulateur">
            <Button
              variant="outline"
              size="lg"
              className="px-8"
              data-analytics-cta="final_cta_simulateur"
            >
              Simuler ma rentabilité
            </Button>
          </NavLink>
        </div>

        <p className="text-sm text-muted-foreground">
          <span className="text-foreground/90">{availableLots} lots ouverts</span> en Dordogne, Ardèche, Lac d'Annecy, <span className="italic">premiers acheteurs avantagés</span>
        </p>
      </div>
    </section>
  );
}
