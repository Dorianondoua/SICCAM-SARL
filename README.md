# SICCAM SARL — site vitrine

Site vitrine de **SICCAM SARL** (Société Industrielle et Commerciale du Cameroun), exportateur
agricole camerounais : cacao, café arabica et robusta, soja grain et poivre blanc de Penja (IGP).

Le site présente les quatre filières, le procédé de la plantation au navire, les destinations
desservies au départ de Douala et Kribi, et recueille les demandes de devis.

## Démarrer

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:3000`.

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | Analyse statique |

## Déploiement

L'application est à la racine du dépôt : Vercel la détecte sans configuration.
Le réglage **Root Directory** doit rester à `./`.

## Socle technique

- **Next.js 16** (routeur Pages, compilation Turbopack) et **React 19**
- **TypeScript** en mode strict
- Styles en **jetons CSS natifs** — aucune valeur en dur dans les composants
- Polices auto-hébergées via `next/font` : Bricolage Grotesque (titres), Public Sans (texte),
  IBM Plex Mono (données)
- Images optimisées via `next/image`
- Page d'accueil générée statiquement

## Organisation

```
src/
├── pages/                index, _app (polices), _document
├── styles/               globals.css — jetons et styles
├── data/siccam.ts        contenu éditorial : produits, zones, étapes, coordonnées
└── components/
    ├── Logo.tsx          logo paramétrable, 3 variantes × 4 fonds
    ├── Bande.tsx         bandes d'analyse (séparateurs porteurs de données)
    ├── Icone.tsx         jeu d'icônes Lucide inline
    └── sections/         une section de page par fichier
public/images/accueil/    visuels servis par le site
images/                   visuels sources, classés par page
```

Le contenu éditorial est isolé dans `src/data/siccam.ts` : modifier un chiffre, une
spécification ou une coordonnée n'exige jamais de toucher à la mise en page.

## Identité visuelle

Système de design propre à SICCAM, appliqué sans exception.

| Rôle | Valeur |
| --- | --- |
| Primaire (action) | Brique `#B8402B` |
| Secondaire (agriculture, qualité) | Forêt `#1B5E4A` |
| Accent (bandeau du logo, notation) | Ocre `#E5B959` |
| Encre | `#1C1815` |

Les neutres sont volontairement chauds — aucun gris froid. Les boutons sont toujours des
pilules, les cartes ont un rayon de 16 px.

**Logo** : un S brique posé à cheval sur le bord gauche d'un bandeau ocre biseauté portant
« ICCAM SARL ». Toutes ses cotes sont proportionnelles et dérivent d'une seule taille de
référence : le verrouillage ne se recompose jamais à la main.

**Mouvement** : le mouvement porte sur les filets, jamais sur le contenu — le texte est présent
dès le premier rendu, rien n'attend d'apparaître au défilement. Tout est neutralisé sous
`prefers-reduced-motion`.

## État du projet

Livré :

- Page d'accueil complète, quinze blocs, responsive
- Système de design et composant logo
- Formulaire de devis avec écran de confirmation

À faire — le détail figure au chapitre 8 du cahier des charges :

- [ ] **Brancher l'envoi du formulaire.** Aujourd'hui seul l'écran de confirmation s'affiche :
      aucune demande n'est transmise. Bloquant avant mise en ligne.
- [ ] **Remplacer les photographies**, actuellement générées par IA.
- [ ] **Valider les chiffres et témoignages** publiés, repris de la maquette et non vérifiés.
- [ ] Réaliser les pages Produits et À propos.
- [ ] Vectoriser le S du favicon.

## Documentation

`Cahier des charges - Site SICCAM SARL.docx` — périmètre, exigences fonctionnelles et
techniques, arbitrages, réserves et critères de recette.
