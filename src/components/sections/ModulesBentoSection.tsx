import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

import circleMain from '@/assets/circle/circle-main.png';
import loveboatMain from '@/assets/loveboat/boat-1.jpg';
import novaMain from '@/assets/nova/nova-main.png';
import aframeMain from '@/assets/aframe/aframe-terrace.jpg';
import nebulaMain from '@/assets/nebula/capsul-1.jpg';

const modules = [
  {
    id: 'nebula',
    name: 'Nebula',
    subtitle: 'Capsule futuriste — 37 m²',
    price: '250 €/nuit',
    roi: '14 %+',
    image: nebulaMain,
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'loveboat',
    name: 'Love Boat',
    subtitle: 'Module flottant premium',
    price: '280 €/nuit',
    roi: '15 %+',
    image: loveboatMain,
    gridClass: 'md:col-span-2',
  },
  {
    id: 'circle',
    name: 'Circle',
    subtitle: 'Capsule panoramique 360°',
    price: '250 €/nuit',
    roi: '14 %+',
    image: circleMain,
    gridClass: 'md:col-span-1',
  },
  {
    id: 'nova',
    name: 'Nova',
    subtitle: 'Architecture haut de gamme',
    price: '200 €/nuit',
    roi: '12 %+',
    image: novaMain,
    gridClass: 'md:col-span-1',
  },
  {
    id: 'aframe',
    name: 'A-Frame',
    subtitle: 'Cabane iconique',
    price: '180 €/nuit',
    roi: '11 %+',
    image: aframeMain,
    gridClass: 'md:col-span-2',
  },
];

export default function ModulesBentoSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-5">
                Les habitats
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Cinq formes pour{' '}
                <span className="font-serif-italic text-secondary">cinq usages</span>.
              </h2>
            </div>
            <NavLink
              to="/modules"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-secondary transition-colors group"
            >
              Voir toute la collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[260px] gap-4 lg:gap-5">
          {modules.map((module, i) => (
            <ScrollReveal
              key={module.id}
              animation="fade-up"
              delay={i * 100}
              className={cn('group', module.gridClass)}
            >
              <NavLink
                to={`/modules#${module.id}`}
                className="relative block h-full w-full overflow-hidden rounded-2xl bg-foreground"
              >
                <img
                  src={module.image}
                  alt={module.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-[11px] font-mono font-medium text-foreground">
                  ROI {module.roi}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-background">
                  <p className="text-[11px] uppercase tracking-widest text-background/70 mb-2">
                    {module.subtitle}
                  </p>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold mb-1 tracking-tight">
                    {module.name}
                  </h3>
                  <p className="font-mono text-sm text-secondary">{module.price}</p>
                </div>
              </NavLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
