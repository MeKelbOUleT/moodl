// Static FAQ fallback used until Sanity is populated.
// Any item can be overridden by creating a faq document in Sanity with the same question text.

export interface FaqGroup {
  id: string;
  label: string;
  items: {question: string; answer: string}[];
}

export const FAQ_FALLBACK: FaqGroup[] = [
  {
    id: 'investir',
    label: 'Investir',
    items: [
      {
        question: 'Quel est le ticket d\'entrée pour acheter un lot Moodl ?',
        answer: "L'acompte de réservation est de 5 000 EUR à la signature du bon de réservation. Le prix total du programme dépend de la parcelle et du modèle d'habitat retenu. Les fiches programme et le simulateur donnent une estimation précise pour chaque adresse.",
      },
      {
        question: 'Quel rendement annuel net peut-on espérer ?',
        answer: "Les projections actuelles visent 10 à 15 % de rendement annuel net une fois le hameau en exploitation, charges, conciergerie et fiscalité retirées. Ces projections reposent sur les performances réelles des hébergements atypiques premium ; elles ne constituent pas une garantie de performance future.",
      },
      {
        question: 'Combien de temps entre la réservation et le premier loyer ?',
        answer: "Comptez 60 à 90 jours entre la signature du compromis et la pose de l'habitat, puis 30 jours pour l'aménagement, le shooting et la mise en ligne sur les plateformes. Le premier loyer tombe en général dans le trimestre qui suit la livraison.",
      },
      {
        question: 'Le statut LMNP est-il applicable ?',
        answer: "Oui, le statut Loueur en Meublé Non Professionnel s'applique à la quasi-totalité de nos acquéreurs. Il permet d'amortir le bien et de minorer fortement la fiscalité locative. Un expert-comptable partenaire peut vous accompagner sur le montage.",
      },
      {
        question: 'Le prêt bancaire est-il possible ?',
        answer: "Oui. Les banques françaises financent en général jusqu'à 80 % du montant total, sur 15 à 25 ans. Moodl peut vous orienter vers des courtiers partenaires familiers de la résidence de tourisme atypique.",
      },
    ],
  },
  {
    id: 'juridique',
    label: 'Juridique',
    items: [
      {
        question: 'Comment Moodl obtient-il un permis sur une zone naturelle ?',
        answer: "Nos terrains sont sélectionnés sur des zones autorisant l'hébergement touristique, le plus souvent en STECAL (secteur de taille et de capacité d'accueil limitées) inscrit au PLU communal. L'instruction du permis prend en général entre 9 et 18 mois, absorbés par l'atelier avant la commercialisation.",
      },
      {
        question: 'Quelles garanties contractuelles sont incluses ?',
        answer: "Garantie de parfait achèvement (1 an), garantie biennale (2 ans), garantie décennale (10 ans), plus le délai de rétractation de 10 jours prévu par l'article L. 271-1 du Code de la construction et de l'habitation. Les conditions précises figurent au compromis.",
      },
      {
        question: 'Que se passe-t-il si je veux revendre le bien ?',
        answer: "Vous restez plein propriétaire et pouvez revendre quand vous voulez. Moodl peut vous mettre en relation avec d'autres prospects intéressés par votre lot, en gardant ou en transférant le contrat d'intendance au nouvel acquéreur.",
      },
      {
        question: 'Le terrain est-il en pleine propriété ?',
        answer: "Oui, vous achetez en pleine propriété le terrain et l'habitat. Le programme n'est pas un démembrement, pas un bail emphytéotique. La taxe foncière, l'assurance et les impôts locaux sont à votre charge.",
      },
    ],
  },
  {
    id: 'intendance',
    label: 'Intendance',
    items: [
      {
        question: 'Suis-je obligé de passer par la conciergerie Moodl ?',
        answer: "Non. Le mandat d'intendance est optionnel et résiliable annuellement. Vous pouvez gérer la location vous-même, ou la déléguer à un autre opérateur. La majorité de nos propriétaires choisissent l'intendance Moodl pour la transparence des reportings et la présence physique sur l'adresse.",
      },
      {
        question: 'Combien coûte la conciergerie ?',
        answer: "La commission d'intendance Moodl s'aligne sur les standards du marché, entre 18 et 25 % du chiffre d'affaires locatif TTC selon le niveau de service. Elle couvre l'accueil voyageurs, le ménage entre séjours, la maintenance, la gestion des annonces et les reportings mensuels.",
      },
      {
        question: 'Puis-je bloquer des semaines pour mon usage personnel ?',
        answer: "Oui, sans frais. Vous bloquez les semaines que vous voulez via votre espace propriétaire. La conciergerie prépare le lit, allume la cheminée et vous remet les clés à l'arrivée.",
      },
      {
        question: 'Comment sont reversés les loyers ?',
        answer: "Les loyers nets de charges et de commission sont reversés mensuellement sur votre compte bancaire, accompagnés du reporting détaillé : taux d'occupation, revenus, charges, photos après chaque ménage.",
      },
    ],
  },
  {
    id: 'technique',
    label: 'Technique',
    items: [
      {
        question: 'Comment l\'habitat est-il livré et posé ?',
        answer: "Les habitats Moodl sont construits en atelier français, transportés sur la parcelle puis posés sur plots vissés ou semelles préparées en amont. La pose dure 1 à 2 jours selon le modèle. Cette technique préserve le sol et permet le démontage en fin de cycle.",
      },
      {
        question: 'Quelle isolation et quel confort en hiver ?',
        answer: "Tous les habitats Moodl sont isolés selon la norme RE2020 résidentielle, avec triple vitrage, poêle à bois ou pompe à chaleur réversible, plancher chauffant et eau chaude solaire selon les modèles. Confort quatre saisons garanti.",
      },
      {
        question: 'Le terrain est-il viabilisé ?',
        answer: "Oui. Eau potable, électricité, fosse autonome ou raccordement tout-à-l'égout, internet par fibre optique ou 4G+ : la viabilisation est comprise dans le prix du programme, sauf cas particulier signalé à la fiche.",
      },
      {
        question: 'Que se passe-t-il en cas de dégât ou de panne ?',
        answer: "L'intendance Moodl gère la maintenance corrective dans la journée pour les urgences (eau, électricité, chauffage) et sous 72 heures pour le reste. Les coûts couverts par les garanties construction (parfait achèvement, biennale, décennale) restent à la charge de Moodl.",
      },
    ],
  },
  {
    id: 'programmes',
    label: 'Programmes',
    items: [
      {
        question: 'Quels programmes sont ouverts en 2026 ?',
        answer: "Trois adresses sont ouvertes à la commercialisation pour l'édition 2026 : Domaine du Périgord en Dordogne, Plateau de l'Ardèche, et Rivage du Lac d'Annecy. La liste complète et l'état des lots se trouvent sur la page Programmes.",
      },
      {
        question: 'Puis-je visiter avant de réserver ?',
        answer: "Oui, une visite sur site est possible une fois la candidature pré-qualifiée. Pour les programmes en chantier, nous organisons des visites virtuelles drone et une visite physique du terrain dès que la phase d'aménagement le permet.",
      },
      {
        question: 'Y a-t-il une priorité pour les premiers acheteurs ?',
        answer: "Oui. Les premiers acheteurs de chaque programme bénéficient du choix de la parcelle au sein du hameau et d'une grille tarifaire d'amorçage. Cette priorité disparaît dès que 50 % des lots sont réservés.",
      },
      {
        question: 'Peut-on acheter à plusieurs (SCI, indivision) ?',
        answer: "Oui. L'achat via SCI familiale, indivision ou société est possible. Le notaire associé au programme vous accompagne sur le montage juridique le plus adapté à votre situation patrimoniale.",
      },
    ],
  },
];

export function flattenFAQ(groups: FaqGroup[]): {question: string; answer: string}[] {
  return groups.flatMap((g) => g.items);
}
