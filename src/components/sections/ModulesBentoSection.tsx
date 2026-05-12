import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

import nebulaImg from '@/assets/renders/nebula-desert.jpg';
import loveboatImg from '@/assets/renders/loveboat-day.jpg';
import circleImg from '@/assets/renders/circle-exterior.png';
import novaImg from '@/assets/renders/nova-pergola.jpeg';
import aframeImg from '@/assets/renders/aframe-forest.png';

const lieux = [
  {
    id: 'nebula',
    name: 'Nebula',
    subtitle: 'Le cocon sous étoiles',
    promise: '14 % de rendement net visé',
    image: nebulaImg.src,
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'love-boat',
    name: 'Love Boat',
    subtitle: "La nuit, posée sur l'eau",
    promise: '15 % de rendement net visé',
    image: loveboatImg.src,
    gridClass: 'md:col-span-2',
  },
  {
    id: 'circle',
    name: 'Circle',
    subtitle: 'La vue, sans interruption',
    promise: '14 % de rendement net visé',
    image: circleImg.src,
    gridClass: 'md:col-span-1',
  },
  {
    id: 'nova',
    name: 'Nova',
    subtitle: 'Le bois et la forêt',
    promise: '12 % de rendement net visé',
    image: novaImg.src,
    gridClass: 'md:col-span-1',
  },
  {
    id: 'a-frame',
    name: 'A-Frame',
    subtitle: "L'épure des bois",
    promise: '11 % de rendement net visé',
    image: aframeImg.src,
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
                Les habitats Moodl
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Cinq formes, {' '}
                <span className="font-serif-italic text-secondary">cinq émotions</span>.
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-5 max-w-xl">
                Chaque habitat est dessiné pour dialoguer avec son terrain — orientation, lumière, matière, vue. Posés à la main, jamais alignés en série.
              </p>
            </div>
            <NavLink
              to="/lieux"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-secondary transition-colors group"
            >
              Voir tous les habitats
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[260px] lg:auto-rows-[300px] xl:auto-rows-[340px] gap-4 lg:gap-5">
          {lieux.map((lieu, i) => (
            <ScrollReveal
              key={lieu.id}
              animation="fade-up"
              delay={i * 100}
              className={cn('group', lieu.gridClass)}
            >
              <NavLink
                to={`/lieux/${lieu.id}`}
                className="relative block h-full w-full overflow-hidden rounded-2xl bg-foreground"
              >
                <img
                  src={lieu.image}
                  alt={`${lieu.name} — ${lieu.subtitle}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-[11px] font-mono font-medium text-foreground">
                  {lieu.promise}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-background">
                  <p className="text-[11px] uppercase tracking-widest text-background/70 mb-2">
                    {lieu.subtitle}
                  </p>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold mb-1 tracking-tight">
                    {lieu.name}
                  </h3>
                  <p className="font-mono text-sm text-secondary mt-2 inline-flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    Découvrir l'expérience
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </NavLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
