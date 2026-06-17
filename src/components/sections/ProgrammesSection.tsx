import { MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { NavLink } from '@/components/NavLink';

const programmes = [
  {
    slug: 'domaine-perigord-nebula',
    name: 'Domaine du Périgord',
    region: 'Dordogne',
    lots: 8,
    sold: 3,
    coords: { x: 38, y: 58 },
  },
  {
    slug: 'plateau-ardeche-aframe',
    name: "Plateau de l'Ardèche",
    region: 'Ardèche',
    lots: 6,
    sold: 2,
    coords: { x: 56, y: 62 },
  },
  {
    slug: 'rivage-lac-annecy-loveboat',
    name: 'Rivage du Lac',
    region: "Lac d'Annecy",
    lots: 4,
    sold: 1,
    coords: { x: 70, y: 47 },
  },
];

export default function ProgrammesSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 75% 50%, hsl(35 38% 60% / 0.06), transparent 60%)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-5">
              Nos adresses
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Trois adresses{' '}
              <span className="font-serif-italic text-secondary">à demeure</span>.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <ScrollReveal animation="fade-right" className="lg:col-span-5 space-y-4">
            {programmes.map((p, i) => {
              const remaining = p.lots - p.sold;
              const progress = (p.sold / p.lots) * 100;
              return (
                <NavLink
                  key={p.slug}
                  to={`/programmes/${p.slug}`}
                  className="group block bg-card hover:bg-card/80 border border-border/60 hover:border-secondary/50 rounded-2xl p-6 lg:p-7 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center transition-transform group-hover:scale-110">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
                        {p.region}
                      </p>
                      <h3 className="font-display text-xl font-bold tracking-tight mb-3">
                        {p.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground">
                          {remaining} lot{remaining > 1 ? 's' : ''} disponible
                          {remaining > 1 ? 's' : ''} sur {p.lots}
                        </span>
                        <span className="font-mono text-secondary">
                          {p.sold}/{p.lots}
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-secondary transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  {i === 0 && (
                    <p className="mt-4 text-xs text-secondary/90 italic">
                      Premier programme - premiers acheteurs avantagés.
                    </p>
                  )}
                </NavLink>
              );
            })}
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-7">
            <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-2xl bg-card border border-border/60 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full p-8 lg:p-12"
                aria-hidden="true"
              >
                <path
                  d="M 30 18 Q 25 25 22 35 Q 18 48 25 60 Q 28 70 35 78 Q 45 85 55 82 Q 68 78 75 70 Q 80 60 78 48 Q 75 35 70 28 Q 60 18 50 16 Q 40 16 30 18 Z"
                  fill="currentColor"
                  fillOpacity="0.05"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="0.3"
                />
                {programmes.map((p, i) => (
                  <g key={p.slug}>
                    <circle
                      cx={p.coords.x}
                      cy={p.coords.y}
                      r="4"
                      fill="hsl(35 38% 60%)"
                      opacity="0.25"
                    >
                      <animate
                        attributeName="r"
                        values="4;9;4"
                        dur="3s"
                        begin={`${i * 0.7}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0;0.5"
                        dur="3s"
                        begin={`${i * 0.7}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={p.coords.x}
                      cy={p.coords.y}
                      r="1.5"
                      fill="hsl(35 38% 60%)"
                    />
                    <text
                      x={p.coords.x}
                      y={p.coords.y - 3}
                      textAnchor="middle"
                      className="fill-foreground"
                      style={{ fontSize: 2.4, fontWeight: 500 }}
                    >
                      {p.region}
                    </text>
                  </g>
                ))}
              </svg>
              <p className="absolute bottom-6 left-6 text-[11px] uppercase tracking-widest text-muted-foreground">
                Carte indicative - France métropolitaine
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
