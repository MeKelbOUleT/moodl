const piliers = [
  {
    roman: 'I',
    title: "L'œil",
    line1: 'Trouver le terrain qui chante.',
    line2: 'Vue, accès, voisinage, silence — quatre critères, des mois de recherche.',
  },
  {
    roman: 'II',
    title: 'Le sésame',
    line1: 'Convertir une zone naturelle en autorisation.',
    line2: 'PLU, STECAL, AOT. 18 mois de paperasse absorbés à votre place.',
  },
  {
    roman: 'III',
    title: 'Le geste',
    line1: 'Composer un hameau de 4 à 8 habitats pour cette parcelle précisément.',
    line2: 'Orientation, lumière, matière, vue. Atelier français, savoir signé.',
  },
  {
    roman: 'IV',
    title: 'La main',
    line1: 'Vos clés, les nôtres si vous voulez.',
    line2: 'Accueil, ménage, mise en ligne, reportings — à la carte. Vous gardez la main si vous préférez.',
  },
];

export default function WhyMoodlSection() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-40 bg-background">
      {/* Voile lime central — donne une lumière douce */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, hsl(150 100% 50% / 0.06), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, hsl(43 70% 62% / 0.04), transparent 55%)',
        }}
      />
      {/* Étoiles très fines (suggestion de constellation, signature d'atelier) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 22%, hsl(150 100% 50% / 0.4) 0.5px, transparent 1px), radial-gradient(circle at 88% 14%, hsl(43 70% 62% / 0.5) 0.5px, transparent 1px), radial-gradient(circle at 23% 78%, hsl(150 100% 50% / 0.3) 0.5px, transparent 1px), radial-gradient(circle at 75% 88%, hsl(43 70% 62% / 0.4) 0.5px, transparent 1px), radial-gradient(circle at 50% 50%, hsl(150 100% 50% / 0.3) 0.5px, transparent 1px), radial-gradient(circle at 92% 50%, hsl(43 70% 62% / 0.3) 0.5px, transparent 1px)',
          backgroundSize: '600px 400px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Eyebrow + Titre + Citation centrée */}
        <div className="max-w-3xl mx-auto text-center mb-20 lg:mb-28">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6">
            L'art Moodl
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-10">
            On a inventé un métier{' '}
            <span className="font-serif-italic text-secondary whitespace-nowrap">qui n'existait pas</span>.
          </h2>

          {/* Citation en serif — note d'atelier */}
          <div className="relative inline-block mx-auto max-w-2xl">
            <p className="font-serif-italic text-lg md:text-xl lg:text-2xl text-foreground/85 leading-relaxed">
              «&nbsp;Trouver l'adresse. Convaincre la mairie. Dessiner le hameau. Tenir la maison à votre place — si vous voulez. Personne ne fait les quatre. Sauf nous.&nbsp;»
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-5">
              Note d'atelier — 2026
            </p>
          </div>
        </div>

        {/* 4 piliers — numéros romains, pas de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 lg:gap-x-14 max-w-7xl mx-auto">
          {piliers.map((p) => (
            <div key={p.roman} className="group relative">
              {/* Numéro romain en grand, lime/gold alterné via CSS sibling pas possible — on garde lime */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display text-6xl lg:text-7xl font-bold leading-none text-primary/90 group-hover:text-primary transition-colors duration-500">
                  {p.roman}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary translate-y-[-12px] shadow-[0_0_8px_hsl(43_70%_62%/0.6)]" />
              </div>

              {/* Trait fin séparateur */}
              <div className="h-px w-12 bg-primary/40 group-hover:w-20 group-hover:bg-primary transition-all duration-500 mb-5" />

              <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                {p.title}
              </h3>
              <p className="text-foreground/90 leading-relaxed text-base mb-2">
                {p.line1}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {p.line2}
              </p>
            </div>
          ))}
        </div>

        {/* Ligne de fin — sceau de l'atelier */}
        <div className="max-w-3xl mx-auto mt-24 lg:mt-32 text-center">
          <div className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-12 bg-border" />
            <span>Atelier signé Moodl</span>
            <span className="h-px w-12 bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
