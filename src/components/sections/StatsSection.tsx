import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';

const stats = [
  {
    value: 12.8,
    decimals: 1,
    suffix: ' %',
    label: 'Rentabilité moyenne nette annuelle',
  },
  {
    value: 18,
    suffix: '',
    label: "Lots disponibles sur l'édition 2026",
  },
  {
    value: 1,
    suffix: ' jour',
    label: 'Pose du module sur plots vissés',
  },
  {
    value: 100,
    suffix: ' %',
    label: 'Gestion locative déléguée',
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-24 bg-muted/40 border-y border-border/60">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              animation="fade-up"
              delay={i * 80}
              className="px-6 lg:px-10"
            >
              <div className="text-center">
                <p className="font-display text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-3">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-xs lg:text-sm text-muted-foreground uppercase tracking-widest leading-snug">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
