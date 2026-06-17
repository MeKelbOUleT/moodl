import bgCadre from '@/assets/renders/hamlet-mirror-pond.jpg';

const sansMoodl = [
  { duree: '6 mois', etape: 'Trouver le terrain rare', detail: 'Géoportail. Cadastre. Mairies. Notaires. Refus.' },
  { duree: '2 mois', etape: 'Comprendre le PLU', detail: 'STECAL, zones N, AOT lac, règlement écrit, plan graphique.' },
  { duree: '4 mois', etape: 'Monter le permis', detail: 'Architecte HMO, bureau d\'étude, pièces du dossier, plans, notice.' },
  { duree: '3 mois', etape: 'Instruction administrative', detail: 'ABF, DREAL, services consultés. Recours possibles.' },
  { duree: '3 mois', etape: 'Chantier', detail: 'Viabilisation, fondations, raccordements, pose, finitions.' },
  { duree: '6 semaines', etape: 'Trouver une conciergerie', detail: 'Briefing, contrat, calendrier, ménage, accueil.' },
];

const cadre = [
  {
    titre: 'Le terrain',
    detail: "Choisi un par un par nos experts. Vue, accès, voisinage, silence - la rareté est dans le sol, jamais reproductible ailleurs.",
  },
  {
    titre: "L'urbanisme",
    detail: 'PLU décrypté, STECAL négocié, permis instruit. 18 mois absorbés en silence - vous n\'en voyez rien.',
  },
  {
    titre: "L'architecture",
    detail: 'Le hameau composé pour ce terrain précisément. Orientation, lumière, matière, vue. Atelier français, savoir signé.',
  },
  {
    titre: "L'intendance",
    detail: "Vos clés, les nôtres si vous voulez. À la carte. Vous gardez la main si vous préférez.",
  },
];

export default function SansMoodlSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background">
      {/* HERO IMAGE - Le cadre privilégié */}
      <div className="relative h-[60vh] lg:h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={bgCadre.src}
          alt="Cadre privilégié Moodl, habitat miroir au bord d'un étang en forêt, lumière dorée"
          width={2400}
          height={1600}
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        {/* Overlay très doux pour préserver l'image */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/95" />

        {/* Citation flottante */}
        <div className="absolute inset-x-0 bottom-0 pb-16 lg:pb-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-5">
                Le cadre
              </p>
              <p className="font-serif-italic text-2xl md:text-3xl lg:text-4xl text-white leading-tight max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                «&nbsp;Vue. Silence. Voisinage choisi. Quatre critères. Des mois de recherche.&nbsp;»
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/80 mt-5">
                - Moodl
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION TEXTE */}
      <div className="py-24 lg:py-32 relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 80% 20%, hsl(150 100% 50% / 0.05), transparent 60%)',
          }}
        />

        <div className="container mx-auto px-6 lg:px-8 relative">
          {/* HEADER */}
          <div className="max-w-3xl mb-16 lg:mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6">
              Le cadre, et le chemin pour y arriver
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-8">
              Un cadre que vous n'auriez jamais trouvé.{' '}
              <span className="font-serif-italic text-secondary">Et 18 mois qu'on a faits à votre place</span>.
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Trouver un terrain qui chante demande des mois. Convertir une zone naturelle en autorisation, plus encore. Composer une architecture qui dialogue avec le sol, en faire un cadre habité - c'est un savoir-faire qui ne s'invente pas. <strong className="text-foreground">Nos experts s'en chargent.</strong> Vous, vous n'avez qu'à venir.
            </p>
          </div>

          {/* SPLIT VIEW : Sans / Avec */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/60">
            {/* SANS MOODL */}
            <div className="bg-card/40 p-7 lg:p-10">
              <div className="mb-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  - Si vous le faisiez seul -
                </p>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground/70 line-through decoration-foreground/30 decoration-[1.5px]">
                  Vous, et 5 prestataires.
                </h3>
              </div>

              <ul className="space-y-5">
                {sansMoodl.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70 mt-1 shrink-0 w-16 text-right">
                      {item.duree}
                    </span>
                    <span className="text-muted-foreground/50 shrink-0 mt-1.5">·</span>
                    <div className="flex-1">
                      <p className="text-base font-medium text-foreground/65 leading-snug">
                        {item.etape}
                      </p>
                      <p className="text-xs text-muted-foreground/70 leading-snug mt-1">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-7 border-t border-border/40">
                <p className="font-display text-4xl lg:text-5xl font-bold text-foreground/80 leading-none mb-2">
                  18 mois.
                </p>
                <p className="text-sm text-muted-foreground">
                  Et beaucoup d'incertitude. Si vous arrivez au bout.
                </p>
              </div>
            </div>

            {/* AVEC MOODL - le cadre prêt */}
            <div className="bg-card p-7 lg:p-10 relative border-l-2 border-primary/40">
              <div
                aria-hidden="true"
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(150_100%_50%/0.6)]"
              />

              <div className="mb-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary font-medium mb-3">
                  - Ce qu'on a fait pour vous -
                </p>
                <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
                  Un cadre{' '}
                  <span className="font-serif-italic text-secondary">prêt à habiter</span>.
                </h3>
              </div>

              <ul className="space-y-6">
                {cadre.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-primary mt-0.5 shrink-0 w-6">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-base font-bold text-foreground leading-snug mb-1.5">
                        {item.titre}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-7 border-t border-primary/30">
                <p className="font-display text-4xl lg:text-5xl font-bold text-primary leading-none mb-2">
                  Vous arrivez.
                </p>
                <p className="text-sm text-foreground/85">
                  <span className="text-primary font-medium">C'est prêt.</span> Le hameau tourne, ou se repose - comme vous voulez.
                </p>
              </div>
            </div>
          </div>

          {/* CITATION CLOSURE */}
          <div className="max-w-3xl mx-auto mt-20 lg:mt-24 text-center">
            <p className="font-serif-italic text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-snug">
              «&nbsp;On a passé <strong className="not-italic text-primary">18 mois</strong> à apprendre. Pour que vous n'ayez plus à le faire.&nbsp;»
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-5">
              - Moodl
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
