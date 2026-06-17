import {motion, useReducedMotion} from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import {formatRelativeFromNow, type ScarcitySnapshot} from '@/lib/scarcity';

type Stat = {
  numericValue: number | null;
  displayValue: string;
  suffix?: string;
  label: string;
  hint?: string;
};

interface Props {
  scarcity?: ScarcitySnapshot;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {staggerChildren: 0.08, delayChildren: 0.05},
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 24},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number]},
  },
};

export default function StatsSection({scarcity}: Props) {
  const reduce = useReducedMotion();
  const programmesCount = scarcity?.programmesCount ?? 3;
  const availableLots = scarcity?.availableLots ?? 12;
  const totalLots = scarcity?.totalLots ?? 18;
  const updatedAgo = scarcity?.lastUpdated ? formatRelativeFromNow(scarcity.lastUpdated) : 'aujourd\'hui';

  const stats: Stat[] = [
    {
      numericValue: programmesCount,
      displayValue: String(programmesCount),
      label: 'Adresses ouvertes en 2026',
      hint: 'Dordogne, Ardèche, Lac d\'Annecy',
    },
    {
      numericValue: availableLots,
      displayValue: String(availableLots),
      label: 'Lots disponibles',
      hint: `Sur ${totalLots} lots, mis à jour ${updatedAgo}`,
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
      displayValue: '10-15',
      suffix: ' %',
      label: 'Rendement annuel net visé',
      hint: 'Projection, non garantie',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-muted/40 border-y border-border/60" aria-label="Chiffres clés Moodl">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60"
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{once: true, margin: '-80px'}}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={reduce ? undefined : itemVariants}
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
