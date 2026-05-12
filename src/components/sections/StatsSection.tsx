import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

type Stat = {
  numericValue: number | null;
  displayValue: string;
  suffix?: string;
  label: string;
  hint?: string;
};

const stats: Stat[] = [
  {
    numericValue: 3,
    displayValue: '3',
    label: 'Adresses ouvertes en 2026',
    hint: 'Dordogne · Ardèche · Lac d\'Annecy',
  },
  {
    numericValue: 12,
    displayValue: '12',
    label: 'Lots disponibles à l\'instant',
    hint: 'Sur 18 lots de l\'édition 2026',
  },
  {
    numericValue: 18,
    displayValue: '18',
    suffix: ' mois',
    label: 'Absorbés par l\'atelier',
    hint: 'PLU, plans, permis, instruction',
  },
  {
    numericValue: null,
    displayValue: '10–15',
    suffix: ' %',
    label: 'Rendement annuel net visé',
    hint: 'Projection — non garantie',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-24 bg-muted/40 border-y border-border/60">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="px-4 lg:px-8 py-2"
            >
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-3 leading-none">
                  {stat.numericValue !== null ? (
                    <AnimatedCounter value={stat.numericValue} duration={1600} />
                  ) : (
                    stat.displayValue
                  )}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
