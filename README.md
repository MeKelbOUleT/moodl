# Moodl — v3

Site Moodl en Astro v6 + Sanity + Tailwind v4.

## Stack

- **Astro 6** (SSG) + **React 19** (islands)
- **Tailwind v4** + palette Architectural Warm (vert lime + gold + noir bleuté)
- **Sanity CMS** standalone (Studio sur port 3333)
- **Recharts** pour le simulateur
- **Framer Motion** pour les animations
- **Deploy** : Vercel (adapter installé)

## Commandes

| Commande | Action |
|---|---|
| `npm run dev` | Astro dev server (port 4321) |
| `npm run studio` | Sanity Studio standalone (port 3333) |
| `npm run build` | Build de production |
| `npm run preview` | Preview du build local |
| `npm run studio:deploy` | Déploie le studio sur `<project>.sanity.studio` |
| `/moodl-blog <keyword>` | Génère un article SEO (Claude Code) |

## CMS Sanity

- **Project ID** : `bw1frczz`
- **Dataset** : `production`
- **Studio local** : `http://localhost:3333`

Pour ajouter du contenu : `npm run studio` → se logger avec ton compte Sanity → créer programme / lieu / article via l'interface visuelle → publier.

## Déploiement (Vercel)

1. Push sur GitHub
2. Connecter le repo à Vercel
3. Ajouter les variables d'env Vercel :
   - `PUBLIC_SANITY_PROJECT_ID=bw1frczz`
   - `PUBLIC_SANITY_DATASET=production`
   - `SITE_URL=https://moodl.fr`
4. Ajouter `https://moodl.fr` en CORS origin sur Sanity

## Voix Moodl (à respecter dans tous les contenus)

- **Autorisé** : *cocon · adresse · habitat · intendance · atelier · signé · blottir · veille*
- **Interdit** : ~~luxe~~ ~~hôtel~~ ~~exception~~ ~~rare~~ ~~module~~ ~~foncier~~
