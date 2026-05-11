const stats = [
  {
    value: '3',
    label: 'Adresses ouvertes en 2026',
    hint: 'Dordogne · Ardèche · Lac d\'Annecy',
  },
  {
    value: '12',
    label: 'Lots disponibles à l\'instant',
    hint: 'Sur 18 lots de l\'édition 2026',
  },
  {
    value: '18',
    suffix: ' mois',
    label: 'Absorbés par l\'atelier',
    hint: 'PLU, plans, permis, instruction',
  },
  {
    value: '10–15',
    suffix: ' %',
    label: 'Rendement annuel net visé',
    hint: 'Projection — non garantie',
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-24 bg-muted/40 border-y border-border/60">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 lg:px-8 py-2">
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-3 leading-none">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-3xl md:text-4xl lg:text-5xl text-foreground/80">
                      {stat.suffix}
                    </span>
                  )}
                </p>
                <p className="text-[11px] lg:text-xs text-muted-foreground uppercase tracking-widest leading-snug mb-2">
                  {stat.label}
                </p>
                {stat.hint && (
                  <p className="text-[10px] lg:text-[11px] text-muted-foreground/70 italic leading-snug">
                    {stat.hint}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
