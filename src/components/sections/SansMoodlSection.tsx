const sansMoodl = [
  { duree: '6 mois', etape: 'Trouver le terrain rare', detail: 'Géoportail. Cadastre. Mairies. Notaires. Refus.' },
  { duree: '2 mois', etape: 'Comprendre le PLU', detail: 'STECAL, zones N, AOT lac, règlement écrit, plan graphique.' },
  { duree: '4 mois', etape: 'Monter le permis', detail: 'Architecte HMO, bureau d\'étude, pièces du dossier, plans, notice.' },
  { duree: '3 mois', etape: 'Instruction administrative', detail: 'ABF, DREAL, services consultés. Recours possibles.' },
  { duree: '3 mois', etape: 'Chantier', detail: 'Viabilisation, fondations, raccordements, pose, finitions.' },
  { duree: '6 semaines', etape: 'Trouver une conciergerie', detail: 'Briefing, contrat, calendrier, ménage, accueil.' },
];

const avecMoodl = [
  { etape: '1 appel', detail: 'On regarde ensemble si une adresse vous correspond.' },
  { etape: '1 visite', detail: 'Sur place, à pied. Vous sentez le lieu.' },
  { etape: '1 compromis', detail: 'Chez le notaire. Acompte 5 000 € remboursable.' },
  { etape: '1 livraison', detail: "L'habitat est posé. Vous arrivez. C'est prêt." },
];

export default function SansMoodlSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-background border-y border-border/60">
      {/* Voile rouge très subtil côté gauche, lime côté droit — séparation émotionnelle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 60% at 20% 50%, hsl(0 70% 50% / 0.04), transparent 60%), radial-gradient(ellipse 40% 60% at 80% 50%, hsl(150 100% 50% / 0.07), transparent 60%)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6">
            L'envers du décor
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-8">
            Faire seul,{' '}
            <span className="font-serif-italic text-secondary whitespace-nowrap">c'est 18 mois</span>
            {' '}de votre vie.
          </h2>
          <div className="prose prose-lg max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Vous trouvez le terrain. Vous appelez la mairie : <em>« Zone naturelle, monsieur. »</em> Vous engagez un urbaniste. Vous lisez 80 pages de PLU. Vous déposez. On vous demande des compléments. Vous redéposez. L'architecte demande un acompte. Le bureau d'étude un autre. Six mois plus tard, c'est instruit.
            </p>
            <p>
              <strong className="text-foreground/90">Vous arrivez deux ans après l'avoir imaginé. Si vous arrivez.</strong>
            </p>
          </div>
        </div>

        {/* Split view : Sans / Avec */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/60">
          {/* SANS MOODL */}
          <div className="bg-card/40 p-7 lg:p-10 relative">
            <div className="mb-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                — Sans Moodl —
              </p>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground/70 line-through decoration-foreground/30 decoration-[1.5px]">
                Vous, tout seul.
              </h3>
            </div>

            <ul className="space-y-5">
              {sansMoodl.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
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
                Et 5 prestataires. Et 7 décisions critiques. Et beaucoup de doutes.
              </p>
            </div>
          </div>

          {/* AVEC MOODL */}
          <div className="bg-card p-7 lg:p-10 relative border-l-2 border-primary/40">
            {/* Sceau lime en haut à droite */}
            <div
              aria-hidden="true"
              className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(150_100%_50%/0.6)]"
            />

            <div className="mb-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary font-medium mb-3">
                — Avec Moodl —
              </p>
              <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
                Vous, et un atelier{' '}
                <span className="font-serif-italic text-secondary">qui a tout préparé</span>.
              </h3>
            </div>

            <ol className="space-y-5">
              {avecMoodl.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-primary mt-1 shrink-0 w-6 text-center">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-medium text-foreground leading-snug">
                      {item.etape}
                    </p>
                    <p className="text-sm text-muted-foreground leading-snug mt-1">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 pt-7 border-t border-primary/30">
              <p className="font-display text-4xl lg:text-5xl font-bold text-primary leading-none mb-2">
                6 mois.
              </p>
              <p className="text-sm text-foreground/85">
                Pendant lesquels <span className="text-primary font-medium">vous vivez la vôtre</span>. On vous tient au courant. C'est tout.
              </p>
            </div>
          </div>
        </div>

        {/* Citation closure */}
        <div className="max-w-3xl mx-auto mt-20 lg:mt-24 text-center">
          <p className="font-serif-italic text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-snug">
            «&nbsp;On a passé <strong className="not-italic text-primary">18 mois</strong> à apprendre. Pour que vous n'ayez plus à le faire.&nbsp;»
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-5">
            Note d'atelier — 2026
          </p>
        </div>
      </div>
    </section>
  );
}
