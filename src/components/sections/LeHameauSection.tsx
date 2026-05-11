import hamletAerial from '@/assets/renders/hamlet-aerial.jpg';
import hamletLake from '@/assets/renders/hamlet-lake.png';
import hamletValley from '@/assets/renders/hamlet-valley.jpg';
import hamletGarrigue from '@/assets/renders/hamlet-garrigue.jpg';
import hamletMirror from '@/assets/renders/hamlet-mirror-pond.jpg';

const etapes = [
  {
    num: '01',
    title: 'Une parcelle rare',
    body: "Un terrain sourcé un par un — bord de lac, clairière forestière, plateau face aux Cévennes. Vue, accès, voisinage, silence : quatre critères, des mois de recherche.",
  },
  {
    num: '02',
    title: 'Un hameau de 4 à 8',
    body: "On compose le hameau pour cette parcelle précisément. Orientation, lumière, intimité de chaque lot. Plan masse signé atelier — pas un alignement de cabanes, une architecture qui dialogue avec le sol.",
  },
  {
    num: '03',
    title: "L'intendance, à la carte",
    body: "Un opérateur unique peut s'occuper du hameau pour vous — accueil voyageurs, ménage, entretien, mise en ligne, reportings. Vous le prenez, ou vous gardez la main. Comme vous voulez.",
  },
  {
    num: '04',
    title: 'Habiter. Louer. Souvent les deux.',
    body: "Vous y passez vos semaines, vos week-ends, vos étés. Le reste du temps, le lot vit — voyageurs en quête de calme, revenus locatifs reversés chaque mois. 10 à 15 % de rendement annuel quand le hameau tourne.",
  },
];

const moodboard = [
  { src: hamletLake.src, alt: 'Hameau au bord du lac, lumière printanière', caption: 'Berges' },
  { src: hamletValley.src, alt: 'Hameau en vallée forestière, bois noir', caption: 'Vallées' },
  { src: hamletGarrigue.src, alt: 'Hameau en garrigue méditerranéenne, cor-ten', caption: 'Garrigue' },
  { src: hamletMirror.src, alt: 'Habitat miroir au bord d\'un étang', caption: 'Lisières' },
];

export default function LeHameauSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-muted/20 border-y border-border/40">
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6">
            Le concept
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Un hameau,{' '}
            <span className="font-serif-italic text-secondary">pas une maison isolée</span>.
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Sur une parcelle rare, <strong className="text-foreground">4 à 8 habitats Moodl</strong> composent un petit hameau touristique. Chaque lot — un habitat, sa parcelle privative, ses revenus. Une intendance commune si vous voulez.
          </p>
        </div>

        {/* Hero aérien — le hameau vu d'en haut */}
        <div className="relative rounded-3xl overflow-hidden mb-20 lg:mb-24 group">
          <div className="aspect-[16/9] lg:aspect-[21/9]">
            <img
              src={hamletAerial.src}
              alt="Vue aérienne d'un hameau Moodl en forêt, 12 habitats répartis autour d'une piscine commune"
              className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {/* Légende discrète en bas */}
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
            <p className="text-[11px] uppercase tracking-[0.25em] text-primary font-medium mb-2">
              Projection — Hameau Moodl
            </p>
            <p className="font-serif-italic text-xl lg:text-2xl text-white leading-snug max-w-2xl">
              «&nbsp;12 habitats. Un opérateur. Une saison qui tourne, toute l'année.&nbsp;»
            </p>
          </div>
        </div>

        {/* 4 étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20 lg:mb-24">
          {etapes.map((e) => (
            <div key={e.num} className="group">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-secondary mb-4">
                Étape&nbsp;<span className="text-primary">{e.num}</span>
              </p>
              <h3 className="font-display text-xl lg:text-2xl font-bold tracking-tight mb-3 leading-snug">
                {e.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {e.body}
              </p>
            </div>
          ))}
        </div>

        {/* Moodboard 4 ambiances */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Quatre ambiances
          </p>
          <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-2">
            Le même concept, des décors différents.
          </h3>
          <p className="text-muted-foreground text-sm lg:text-base max-w-2xl mb-10">
            La parcelle commande tout : matière, toiture, implantation. Un Moodl en garrigue ne ressemble pas à un Moodl en forêt.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {moodboard.map((img) => (
            <div key={img.caption} className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/90 font-medium">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
