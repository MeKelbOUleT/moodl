import {MapPin, FileCheck, Compass, KeyRound} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const pillars = [
  {
    icon: MapPin,
    title: "L'adresse",
    text: "Sélectionnée un par un. Vue, accès, voisinage, environnement. La rareté est dans le terrain, pas dans la cabane.",
  },
  {
    icon: FileCheck,
    title: "L'urbanisme",
    text: "Autorisations en mairie, viabilisation, déclarations. On absorbe les 18 mois de paperasse à votre place.",
  },
  {
    icon: Compass,
    title: "L'architecture",
    text: "Habitat dessiné pour ce terrain précis — orientation, lumière, matière. Atelier français, savoir-faire signé.",
  },
  {
    icon: KeyRound,
    title: "L'intendance",
    text: "Accueil, ménage, photos, mise en ligne, reportings. Vous arrivez, c'est prêt. Vous partez, ça se loue.",
  },
];

export default function WhyMoodlSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8 relative">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-5">
              L'ADN Moodl
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
              Quatre métiers,{' '}
              <span className="font-serif-italic text-secondary">un seul interlocuteur</span>.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Là où d'autres vous livrent une cabane, Moodl orchestre toute la chaîne — de la sélection du terrain au premier voyageur. Votre seul travail&nbsp;: choisir, et venir.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} animation="fade-up" delay={i * 100}>
                <div className="group h-full bg-card border border-border/60 rounded-2xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(0,255,128,0.12)]">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                    {`0${i + 1}`}
                  </p>
                  <h3 className="font-display text-xl lg:text-2xl font-bold mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    {pillar.text}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
