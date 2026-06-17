import {defineQuery} from 'groq';

// ─── Settings ──────────────────────────────────────────────────────────────

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    title,
    description,
    contact_email,
    contact_phone,
    calendly_url,
    edition_label,
    social_links,
    mentions_editeur
  }
`);

// ─── Lieux ─────────────────────────────────────────────────────────────────

export const lieuxAllQuery = defineQuery(`
  *[_type == "lieu"] | order(order asc, name asc){
    _id,
    name,
    "slug": slug.current,
    subtitle,
    tagline,
    surface_min_m2,
    surface_max_m2,
    capacite,
    prix_a_partir_de,
    loyer_nuit_indicatif,
    roi_indicatif,
    duree_pose,
    hero_image,
    galerie
  }
`);

export const lieuBySlugQuery = defineQuery(`
  *[_type == "lieu" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    subtitle,
    tagline,
    description,
    surface_min_m2,
    surface_max_m2,
    capacite,
    prix_a_partir_de,
    loyer_nuit_indicatif,
    roi_indicatif,
    duree_pose,
    caracteristiques,
    hero_image,
    galerie,
    meta_title,
    meta_description
  }
`);

// ─── Programmes ────────────────────────────────────────────────────────────

export const programmesAllQuery = defineQuery(`
  *[_type == "programme" && status != "brouillon"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    tagline,
    region,
    commune,
    status,
    lots_total,
    lots_disponibles,
    date_livraison,
    prix_total,
    rendement_min,
    rendement_max,
    surface_terrain_m2,
    surface_module_m2,
    capacite,
    coordonnees_gps,
    hero_image,
    "modele": modele->{name, "slug": slug.current}
  }
`);

export const programmeBySlugQuery = defineQuery(`
  *[_type == "programme" && slug.current == $slug][0]{
    ...,
    "modele": modele->{
      _id,
      name,
      "slug": slug.current,
      subtitle,
      hero_image,
      surface_min_m2,
      surface_max_m2
    }
  }
`);

// ─── Articles ──────────────────────────────────────────────────────────────

export const articlesAllQuery = defineQuery(`
  *[_type == "article"] | order(published_at desc){
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    excerpt,
    published_at,
    reading_time_min,
    author,
    hero_image,
    tags
  }
`);

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    ...,
    related_programmes[]->{
      _id,
      title,
      "slug": slug.current,
      region,
      hero_image
    }
  }
`);

// ─── Témoignages ───────────────────────────────────────────────────────────

export const temoignagesAllQuery = defineQuery(`
  *[_type == "temoignage"] | order(order asc, _createdAt desc){
    _id,
    name,
    location,
    extract,
    monthly_revenue,
    photo,
    video_url,
    rating,
    "programme": programme->{title, region, "slug": slug.current}
  }
`);

// ─── Equipe ────────────────────────────────────────────────────────────────

export const teamMembersAllQuery = defineQuery(`
  *[_type == "teamMember"] | order(order asc, name asc){
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    photo,
    is_founder,
    linkedin_url,
    order
  }
`);

export const founderQuery = defineQuery(`
  *[_type == "teamMember" && is_founder == true][0]{
    _id,
    name,
    role,
    bio,
    photo,
    linkedin_url
  }
`);

// ─── FAQ ───────────────────────────────────────────────────────────────────

export const faqsAllQuery = defineQuery(`
  *[_type == "faq"] | order(category asc, order asc){
    _id,
    question,
    answer,
    category,
    visible_on,
    order
  }
`);

export const faqsByPageQuery = defineQuery(`
  *[_type == "faq" && $page in visible_on] | order(category asc, order asc){
    _id,
    question,
    answer,
    category
  }
`);
