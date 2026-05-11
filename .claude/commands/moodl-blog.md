---
description: Génère un article SEO de journal Moodl prêt à coller dans Sanity, à partir d'un mot-clé cible
argument-hint: <keyword cible>
allowed-tools: [WebSearch, WebFetch, Read, Write, Bash]
---

# Skill : moodl-blog

Tu génères un article de journal Moodl prêt à publier, optimisé SEO et fidèle à la voix Moodl.

## Étape 1 — Recherche concurrentielle

Pour le keyword `$ARGUMENTS` :

1. Utilise **WebSearch** pour trouver les 3 premiers résultats Google français (ignorer Reddit, Quora, YouTube)
2. Avec **WebFetch**, lis le contenu des 3 articles
3. Note pour chaque : longueur (nombre de mots), nombre de H2, structure des sections, angle du contenu
4. **Synthétise** : longueur moyenne (vise +20 %), thèmes communs, ce qui manque

## Étape 2 — Voix et vocabulaire Moodl

**Voix** : atelier-architecte, posé, factuel-mais-évocateur. Pas de superlatifs ni de marketing-speak.

### Vocabulaire AUTORISÉ
- *cocon · adresse · habitat · intendance · atelier · signé · blottir · veille · pleine nature*
- *propriétaire · investisseur · voyageur · week-end · revenu locatif · rendement*
- *terrain choisi · architecture pensée · matière · lumière · silence*

### Vocabulaire INTERDIT
- ~~luxe~~ ~~hôtel~~ ~~cinq étoiles~~ ~~palace~~ ~~exception~~ ~~rare~~ ~~d'auteur~~
- ~~module~~ (utilise *habitat*) ~~foncier~~ (utilise *adresse* ou *terrain*)
- ~~paradis~~ ~~unique~~ (cliché)

### Ton
- Phrases courtes. Listes plutôt que paragraphes longs.
- Une touche d'humour pince-sans-rire, jamais lourde.
- Première personne du pluriel ("nous", "chez Moodl") quand on parle de l'atelier.
- Deuxième personne du pluriel ("vous") pour parler au lecteur.

## Étape 3 — Structure de l'article

Reproduis (ou améliore) la structure moyenne des top 3 + applique ce checklist on-page SEO :

- [ ] H1 unique (le titre) avec keyword principal dans les 5 premiers mots
- [ ] Excerpt de 140-180 caractères qui contient le keyword
- [ ] Keyword principal dans les 100 premiers mots du body
- [ ] 4 à 8 H2, chacun rédigé sous forme de question si pertinent
- [ ] 1 à 2 H3 par section si elle dépasse 200 mots
- [ ] Une liste à puces ou un tableau dans la moitié supérieure (engagement)
- [ ] 2 liens internes vers des pages Moodl (`/programmes`, `/simulateur`, `/lieux/...`)
- [ ] 1 lien externe vers une source officielle (ADEME, Insee, service-public, etc.)
- [ ] Encart callout au milieu (concept Moodl mis en avant)
- [ ] CTA final qui pointe vers `/simulateur` ou `/contact`
- [ ] Meta title 50-60 chars, meta description 140-160 chars

## Étape 4 — Format de sortie

Sors deux blocs :

### Bloc A — Document Sanity (à coller dans le studio)

Donne le contenu structuré sous forme de tableau prêt à copier-coller dans Sanity :

```
title:            [titre H1]
slug:             [kebab-case-fr]
eyebrow:          [catégorie courte — Coulisses / Investir / Architecture / Conseils]
excerpt:          [140-180 chars]
keyword_principal: $ARGUMENTS
keyword_cluster:  [tags secondaires séparés par virgules]
author:           Atelier Moodl
reading_time_min: [calcul automatique : nb_mots / 220]
meta_title:       [50-60 chars]
meta_description: [140-160 chars]
```

### Bloc B — Corps de l'article (Portable Text ou markdown)

Écris le corps complet en **markdown** avec syntaxe Sanity-compatible :
- `## H2` pour les sous-titres
- `### H3` pour les sous-sous-titres
- `- ` pour les listes
- `> ` pour les encarts callout
- Liens internes : `[texte](/programmes)`
- Liens externes : `[texte](https://service-public.fr/...)`
- Images : `![alt](placeholder-image.jpg)` (Olivier remplacera dans le studio)

## Étape 5 — Vérification finale

Avant de remettre le résultat, **relis tout** et vérifie :

1. Aucun mot interdit n'est utilisé
2. Le keyword principal apparaît bien dans les 100 premiers mots
3. Aucun superlatif ni marketing-speak (relis tout avec un œil critique)
4. Les 3 sources concurrentielles ont été synthétisées, pas plagiées
5. Le ton "atelier Moodl" est tenu d'un bout à l'autre

Si l'un de ces points cloche, **réécris** la section concernée.

## Notes

- Si `$ARGUMENTS` est vide, demande à l'utilisateur quel keyword cibler
- Si la recherche Google échoue, baser l'article sur la connaissance générale + le ton Moodl
- Ne jamais inventer de chiffres faux (ROI, taux d'occupation, etc.) — rester sur les fourchettes connues : 10-15 % rendement, 70 % taux d'occupation cible, etc.
- Si l'article parle de fiscalité, ne pas entrer dans le détail (Olivier ne veut pas).
- Si l'article parle de "résidence secondaire", utiliser plutôt "adresse Moodl" ou "cocon en pleine nature".
