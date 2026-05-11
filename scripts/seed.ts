/**
 * Seed Sanity avec les 5 lieux + 3 programmes + 6 témoignages + settings.
 *
 * Usage : npx tsx scripts/seed.ts
 *
 * Le token (SANITY_API_TOKEN) doit être présent dans .env (rôle Editor).
 * Les images sont uploadées depuis src/assets/.
 */

import 'dotenv/config';
import {createClient} from '@sanity/client';
import {readFileSync} from 'node:fs';
import {basename, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌ Manque PUBLIC_SANITY_PROJECT_ID ou SANITY_API_TOKEN dans .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-12-01',
  token,
  useCdn: false,
});

// ────────────────────────────────────────────────────────────────────
// Upload helper
// ────────────────────────────────────────────────────────────────────

async function uploadImage(relativePath: string): Promise<{_type: 'image'; asset: {_type: 'reference'; _ref: string}}> {
  const fullPath = resolve(ROOT, 'src', 'assets', relativePath);
  const buffer = readFileSync(fullPath);
  const asset = await client.assets.upload('image', buffer, {filename: basename(fullPath)});
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}};
}

// ────────────────────────────────────────────────────────────────────
// Données
// ────────────────────────────────────────────────────────────────────

const lieuxData = [
  {
    slug: 'nebula',
    name: 'Nebula',
    subtitle: 'Capsule futuriste — 37,6 m²',
    tagline: 'Le cocon signature.',
    description: "Architecture aluminium aviation, courbes inspirées de la nacelle spatiale, vitrages panoramiques sur trois faces. Nebula transforme le terrain en expérience contemplative.",
    surface_min_m2: 30,
    surface_max_m2: 38,
    capacite: '2 à 4 personnes',
    prix_a_partir_de: 65000,
    loyer_nuit_indicatif: 250,
    roi_indicatif: '14 %+',
    duree_pose: '1 jour — fondations sur plots vissés',
    image: 'nebula/capsul-1.jpg',
    order: 1,
  },
  {
    slug: 'love-boat',
    name: 'Love Boat',
    subtitle: 'Habitat flottant premium',
    tagline: "Sur l'eau, la nuit autrement.",
    description: "Houseboat haut de gamme amarré sur lac ou rivière calme. Terrasse panoramique, chambre suspendue au-dessus de l'eau. Demande très forte sur Annecy, Dordogne, Ardèche.",
    surface_min_m2: 30,
    surface_max_m2: 70,
    capacite: '2 à 6 personnes',
    prix_a_partir_de: 85000,
    loyer_nuit_indicatif: 280,
    roi_indicatif: '15 %+',
    duree_pose: '2 jours — mise à l\'eau et amarrage',
    image: 'loveboat/boat-1.jpg',
    order: 2,
  },
  {
    slug: 'circle',
    name: 'Circle',
    subtitle: 'Capsule panoramique 360°',
    tagline: 'La vue, sans interruption.',
    description: "Capsule cylindrique entièrement vitrée, terrasse couronne, jacuzzi extérieur en option. Idéale en altitude ou en clairière. La forme circulaire optimise les performances thermiques.",
    surface_min_m2: 20,
    surface_max_m2: 45,
    capacite: '2 à 4 personnes',
    prix_a_partir_de: 65000,
    loyer_nuit_indicatif: 250,
    roi_indicatif: '14 %+',
    duree_pose: '1 jour',
    image: 'circle/circle-main.png',
    order: 3,
  },
  {
    slug: 'nova',
    name: 'Nova',
    subtitle: 'Architecture haut de gamme — 25 à 80 m²',
    tagline: 'Le plus polyvalent.',
    description: "Lignes contemporaines, façade bois, pergola intégrée. Nova s'adapte à toutes les implantations grâce à un système modulaire 25 / 50 / 80 m². Le compromis le plus équilibré.",
    surface_min_m2: 25,
    surface_max_m2: 80,
    capacite: '2 à 6 personnes',
    prix_a_partir_de: 45000,
    loyer_nuit_indicatif: 200,
    roi_indicatif: '12 %+',
    duree_pose: '1 à 2 jours selon dimension',
    image: 'nova/nova-main.png',
    order: 4,
  },
  {
    slug: 'a-frame',
    name: 'A-Frame',
    subtitle: 'Cabane iconique — 20 à 50 m²',
    tagline: "L'archétype scandinave revisité.",
    description: "Toiture en A descendant jusqu'au sol, façade entièrement vitrée, terrasse en porte-à-faux. Excellence sur photos et performance booking exceptionnelle en zone montagne ou forêt.",
    surface_min_m2: 20,
    surface_max_m2: 50,
    capacite: '2 à 4 personnes',
    prix_a_partir_de: 35000,
    loyer_nuit_indicatif: 180,
    roi_indicatif: '11 %+',
    duree_pose: '1 jour',
    image: 'aframe/aframe-terrace.jpg',
    order: 5,
  },
];

const programmesData = [
  {
    slug: 'domaine-perigord-nebula',
    title: 'Domaine du Périgord — Nebula',
    region: 'Dordogne',
    commune: 'Sarlat-la-Canéda',
    tagline: 'Forêt, lac, silence. Le Périgord à l\'état pur.',
    description: "Au cœur d'une forêt préservée du Périgord noir, ce domaine de 4 hectares accueille 8 habitats Nebula posés en clairière. Vue sur lac privé, randonnées au départ du lieu, gastronomie locale à 10 minutes.",
    modele: 'nebula',
    status: 'ouvert' as const,
    lots_total: 8,
    lots_disponibles: 5,
    date_livraison: 'Q3 2026',
    prix_terrain: 89000,
    prix_module: 65000,
    prix_total: 154000,
    rendement_min: 12,
    rendement_max: 14.5,
    loyer_nuit_min: 220,
    loyer_nuit_max: 280,
    taux_occupation_cible: 70,
    surface_terrain_m2: 4500,
    surface_module_m2: 37,
    capacite: '2 à 4 personnes',
    plu_zonage: 'Zone N (naturelle) — STECAL touristique',
    image: 'general/moodl-1.png',
    order: 1,
  },
  {
    slug: 'plateau-ardeche-aframe',
    title: "Plateau de l'Ardèche — A-Frame",
    region: 'Ardèche',
    commune: 'Vals-les-Bains',
    tagline: 'Plateau ouvert, ciel étoilé, randonnée à pied.',
    description: "Sur un plateau ardéchois protégé, 6 cabanes A-Frame avec vue panoramique sur les Cévennes. Ciel parmi les plus sombres de France pour observer les étoiles. Réserve naturelle à proximité.",
    modele: 'a-frame',
    status: 'ouvert' as const,
    lots_total: 6,
    lots_disponibles: 4,
    date_livraison: 'Q4 2026',
    prix_terrain: 95000,
    prix_module: 45000,
    prix_total: 140000,
    rendement_min: 13,
    rendement_max: 15,
    loyer_nuit_min: 180,
    loyer_nuit_max: 240,
    taux_occupation_cible: 68,
    surface_terrain_m2: 3200,
    surface_module_m2: 32,
    capacite: '2 à 4 personnes',
    plu_zonage: 'Zone Nh — habitations en zone naturelle',
    image: 'general/moodl-2.jpeg',
    order: 2,
  },
  {
    slug: 'rivage-lac-annecy-loveboat',
    title: "Rivage du Lac — Love Boat",
    region: "Lac d'Annecy",
    commune: 'Sevrier',
    tagline: "Berges du lac, montagnes alpines, l'eau toute proche.",
    description: "Sur une rive paisible du lac d'Annecy, 4 habitats Love Boat amarrés sur ponton privatif. Vue directe sur le lac, montagnes en arrière-plan, baignade depuis la terrasse. Marché premium ultra-tendu.",
    modele: 'love-boat',
    status: 'ouvert' as const,
    lots_total: 4,
    lots_disponibles: 3,
    date_livraison: 'Q1 2027',
    prix_terrain: 125000,
    prix_module: 85000,
    prix_total: 210000,
    rendement_min: 13,
    rendement_max: 15,
    loyer_nuit_min: 260,
    loyer_nuit_max: 380,
    taux_occupation_cible: 72,
    surface_terrain_m2: 1800,
    surface_module_m2: 45,
    capacite: '2 à 6 personnes',
    plu_zonage: 'Zone UA — habitat amarré, AOT lac',
    image: 'general/moodl-3.jpeg',
    order: 3,
  },
];

const temoignagesData = [
  {name: 'Camille R.', location: 'Paris 16e', extract: "Le module a été posé en une matinée. Trois mois plus tard on est à 78 % d'occupation, c'est au-delà de ce qu'on espérait.", monthly_revenue: 2850, programme_slug: 'domaine-perigord-nebula', rating: 5, order: 1},
  {name: 'Jean-Pierre M.', location: 'Lyon', extract: "Je cherchais un placement immobilier qui ait du sens. Le module dialogue avec le terrain — c'est ce qui m'a convaincu.", monthly_revenue: 3120, programme_slug: 'plateau-ardeche-aframe', rating: 5, order: 2},
  {name: 'Sophie & Marc L.', location: 'Annecy', extract: "On utilise le cocon 3 semaines par an en famille, le reste est géré par Moodl. La transparence des reportings est rare dans ce milieu.", monthly_revenue: 4480, programme_slug: 'rivage-lac-annecy-loveboat', rating: 5, order: 3},
  {name: 'Antoine V.', location: 'Bordeaux', extract: "L'angle architecte fait la différence. Le cocon n'est pas posé n'importe où — il y a un vrai dialogue avec le terrain.", monthly_revenue: 2680, programme_slug: 'domaine-perigord-nebula', rating: 5, order: 4},
  {name: 'Hélène D.', location: 'Genève', extract: "Investissement long terme rassurant. La conciergerie tient ses engagements, je n'ai eu aucun appel client à gérer en 8 mois.", monthly_revenue: 3340, programme_slug: 'plateau-ardeche-aframe', rating: 5, order: 5},
  {name: 'Olivier B.', location: 'Marseille', extract: "Premier acheteur du programme Dordogne, j'ai eu un tarif d'amorçage. Aujourd'hui mon ROI annoncé est conservé sur 12 mois glissants.", monthly_revenue: 2920, programme_slug: 'domaine-perigord-nebula', rating: 5, order: 6},
];

// ────────────────────────────────────────────────────────────────────
// Run
// ────────────────────────────────────────────────────────────────────

async function run() {
  console.log('🌱 Seed Sanity — Moodl');

  // Settings
  console.log('  · Settings…');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'settings',
    title: 'Moodl',
    description: "Atelier qui conçoit des cocons en pleine nature. À habiter, à louer, souvent les deux.",
    contact_email: 'shelter@moodl.fr',
    contact_phone: '+33 7 66 87 30 40',
    edition_label: 'Édition 2026 — N°01',
  });

  // Lieux
  console.log('  · Upload des images + 5 lieux…');
  const lieuxIds: Record<string, string> = {};
  for (const lieu of lieuxData) {
    process.stdout.write(`    → ${lieu.name}…`);
    const heroImage = await uploadImage(lieu.image);
    const doc = await client.createOrReplace({
      _id: `lieu-${lieu.slug}`,
      _type: 'lieu',
      name: lieu.name,
      slug: {_type: 'slug', current: lieu.slug},
      subtitle: lieu.subtitle,
      tagline: lieu.tagline,
      description: [{_type: 'block', _key: 'd1', style: 'normal', children: [{_type: 'span', _key: 's1', text: lieu.description}], markDefs: []}],
      surface_min_m2: lieu.surface_min_m2,
      surface_max_m2: lieu.surface_max_m2,
      capacite: lieu.capacite,
      prix_a_partir_de: lieu.prix_a_partir_de,
      loyer_nuit_indicatif: lieu.loyer_nuit_indicatif,
      roi_indicatif: lieu.roi_indicatif,
      duree_pose: lieu.duree_pose,
      hero_image: heroImage,
      order: lieu.order,
    });
    lieuxIds[lieu.slug] = doc._id;
    console.log(' ✓');
  }

  // Programmes
  console.log('  · Upload des images + 3 programmes…');
  const programmesIds: Record<string, string> = {};
  for (const prog of programmesData) {
    process.stdout.write(`    → ${prog.title}…`);
    const heroImage = await uploadImage(prog.image);
    const lieuId = lieuxIds[prog.modele];
    const doc = await client.createOrReplace({
      _id: `programme-${prog.slug}`,
      _type: 'programme',
      title: prog.title,
      slug: {_type: 'slug', current: prog.slug},
      region: prog.region,
      commune: prog.commune,
      tagline: prog.tagline,
      description: [{_type: 'block', _key: 'd1', style: 'normal', children: [{_type: 'span', _key: 's1', text: prog.description}], markDefs: []}],
      modele: {_type: 'reference', _ref: lieuId},
      status: prog.status,
      lots_total: prog.lots_total,
      lots_disponibles: prog.lots_disponibles,
      date_livraison: prog.date_livraison,
      prix_terrain: prog.prix_terrain,
      prix_module: prog.prix_module,
      prix_total: prog.prix_total,
      rendement_min: prog.rendement_min,
      rendement_max: prog.rendement_max,
      loyer_nuit_min: prog.loyer_nuit_min,
      loyer_nuit_max: prog.loyer_nuit_max,
      taux_occupation_cible: prog.taux_occupation_cible,
      surface_terrain_m2: prog.surface_terrain_m2,
      surface_module_m2: prog.surface_module_m2,
      capacite: prog.capacite,
      plu_zonage: prog.plu_zonage,
      hero_image: heroImage,
      order: prog.order,
    });
    programmesIds[prog.slug] = doc._id;
    console.log(' ✓');
  }

  // Témoignages
  console.log('  · 6 témoignages…');
  for (const t of temoignagesData) {
    process.stdout.write(`    → ${t.name}…`);
    await client.createOrReplace({
      _id: `temoignage-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      _type: 'temoignage',
      name: t.name,
      location: t.location,
      extract: t.extract,
      monthly_revenue: t.monthly_revenue,
      rating: t.rating,
      order: t.order,
      programme: {_type: 'reference', _ref: programmesIds[t.programme_slug]},
    });
    console.log(' ✓');
  }

  console.log('\n✅ Seed terminé. Va sur le studio pour voir tes documents.');
}

run().catch((err) => {
  console.error('❌ Erreur seed:', err);
  process.exit(1);
});
