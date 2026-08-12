# Prompts de génération d'images — catalogue produits SICCAM SARL

Format cible : **4:3** (`.produit-media { aspect-ratio: 4/3 }`), livrable ≥ 1456 × 1092 px, PNG ou JPG.

Deux contraintes de mise en page à respecter dans **chaque** image :

1. **Coin supérieur gauche libre** — une pastille blanche (étiquette « Grade I », « IGP »…) est posée à 16 px du bord. Garder cette zone calme, sans sujet ni texte.
2. **Aucun texte, logo, marque ou étiquette lisible** dans l'image : le site pose sa propre typographie par-dessus.

---

## 1. Bloc de style commun (à coller devant chaque sujet)

Ce bloc verrouille la cohérence avec les visuels existants (`images/produits/Cacao.png`, `Poivre.png`) et avec les jetons de couleur du design system (brique `#b8402b`, forêt `#1b5e4a`, ocre `#e5b959`, neutres chauds — **aucun gris froid**).

```
Photorealistic documentary photograph, Cameroon agricultural trade context,
shot on a 50mm lens at f/2.8, natural daylight, soft overcast or golden-hour
light, shallow but readable depth of field. Warm earthy colour grade: terracotta
and brick reds, deep forest greens, ochre and sun-dried straw tones, warm
neutral browns — absolutely no cold grey or blue cast. Authentic, unstaged,
professional export-quality feel; clean and orderly, never messy or poor.
Composition leaves the top-left corner calm and uncluttered. No text, no
lettering, no logos, no packaging labels, no watermarks. 4:3 aspect ratio,
high resolution, sharp focus on the product.
```

> Astuce Midjourney : ajouter `--ar 4:3 --style raw --v 6.1` en fin de prompt.
> Astuce DALL·E / Gemini / Firefly : coller le bloc puis le sujet, en une seule phrase continue.

---

## 2. Produits locaux (terroir)

### Cacao
```
[BLOC DE STYLE] Subject: fermented cocoa beans drying in the sun on raised
wooden slat trays on a Cameroonian farm, beans a deep burgundy-brown, a
farmer's hand raking through them in the mid-ground, whole yellow and orange
cocoa pods and broad green banana leaves at the edge of the frame.
```

### Café — arabica et robusta
```
[BLOC DE STYLE] Subject: green coffee beans in an open jute sack inside a warm
warehouse, a wooden scoop lifting a handful of beans, two distinct lots side by
side — smaller bluish-green washed arabica and larger amber robusta beans — with
stacked jute bags softly blurred behind.
```

### Maïs
```
[BLOC DE STYLE] Subject: dried golden maize kernels flowing from a raffia basket
onto a woven mat, whole dried cobs with pale husks arranged beside the pile,
sunlit red-earth courtyard softly blurred in the background.
```

### Soja
```
[BLOC DE STYLE] Subject: pale cream-yellow soybeans heaped in a shallow wooden
sorting crate, a hand levelling the surface, clean and uniform grain, a few dry
soybean pods and stems laid alongside on hessian cloth.
```

### Tourteau d'arachide
```
[BLOC DE STYLE] Subject: pressed groundnut cake (peanut meal) in coarse ochre
pellets and broken slabs, spilling from a burlap sack onto a wooden table,
unshelled peanuts and a few kernels scattered beside for context, warm dusty
light.
```

### Mil rouge
```
[BLOC DE STYLE] Subject: red millet grain in a calabash bowl, deep russet
reddish-brown seeds catching the light, tall dried millet panicles bundled
upright behind, Sahelian northern-Cameroon setting with warm ochre earth.
```

### Manioc
```
[BLOC DE STYLE] Subject: freshly harvested cassava roots with brown bark-like
skin and cut ends showing bright white flesh, stacked on a wooden crate, one
root sliced open in the foreground, green cassava leaves framing the right side.
```

### Riz (local)
```
[BLOC DE STYLE] Subject: white long-grain rice poured in a clean stream into a
woven basket, a second basket of unhusked paddy rice beside it, wooden scoop
resting in the grain, green paddy field softly out of focus far behind.
```

### Farine (locale)
```
[BLOC DE STYLE] Subject: fine white flour in an open hessian sack, a smooth
mound of flour with a wooden scoop set into it and a light dusting on the dark
wooden table, soft side light modelling the powder's texture.
```

### Poivre blanc (Penja)
```
[BLOC DE STYLE] Subject: white Penja peppercorns, pale ivory and uniformly
calibrated, filling a hand-woven basket on dark volcanic soil, a few whole dried
pepper spikes laid beside, deep green pepper vine leaves at the frame edge.
```

### Banane plantain
```
[BLOC DE STYLE] Subject: a full hand of green plantains, thick ribbed fingers,
resting on broad banana leaves next to a crate of ripening yellow-green
plantains, plantation foliage softly blurred behind, dappled tropical light.
```

### Intrants agricoles
```
[BLOC DE STYLE] Subject: neatly stacked unbranded agricultural input sacks —
fertiliser granules and certified seed — in a clean warehouse, one open sack
showing pale grey-green granules, a wooden pallet and a sprayer set aside, order
and professionalism.
```

### Produits d'élevage
```
[BLOC DE STYLE] Subject: a well-kept Cameroonian livestock yard at golden hour,
healthy zebu cattle and goats behind a clean wooden fence, a herder standing
calmly in the mid-ground, dry savannah grass and acacia trees behind.
```

### Fruits et légumes
```
[BLOC DE STYLE] Subject: an abundant market display of fresh Cameroonian produce
in woven baskets — tomatoes, green peppers, okra, mangoes, avocados, leafy
greens — arranged in tidy rows on a wooden stall, glossy and freshly washed,
warm morning light.
```

---

## 3. Produits importés

Note de direction artistique : pour cette famille, glisser du **champ** vers la
**logistique** — entrepôt, palettes, conteneur, quai du port de Douala — pour que
la grille se lise d'un coup d'œil comme « importation ». Même bloc de style,
même palette chaude.

### Riz (importé)
```
[BLOC DE STYLE] Subject: stacked 50 kg woven polypropylene rice sacks on wooden
pallets in a clean import warehouse, one sack open at the top showing long white
grains, forklift and container doors softly blurred behind. Sacks plain and
unbranded, no printed text.
```

### Maïs (importé)
```
[BLOC DE STYLE] Subject: bulk yellow maize kernels filling the frame in a
warehouse bay, a metal scoop and an open unbranded sack in the foreground,
palletised sacks receding into soft focus behind.
```

### Farine (importée)
```
[BLOC DE STYLE] Subject: palletised plain white flour sacks shrink-wrapped and
stacked in an import warehouse, one sack opened in the foreground revealing fine
white flour with a wooden scoop, warm overhead warehouse light. No printed text
on the sacks.
```

### Pâtes alimentaires
```
[BLOC DE STYLE] Subject: dry pasta — long spaghetti bundles and short macaroni —
displayed loose in open wooden crates and unbranded transparent bags on a
warehouse table, golden wheat tones, soft warm light. No labels or printed
packaging.
```

### Sucre
```
[BLOC DE STYLE] Subject: white granulated sugar spilling from a plain opened
sack onto a dark wooden surface, crystals sparkling in raking light, stacked
unbranded sugar sacks on a pallet blurred behind.
```

### Sardines
```
[BLOC DE STYLE] Subject: stacked plain unlabelled cylindrical tin cans of
sardines in an import warehouse, one open can showing neatly packed silvery
sardine fillets in oil, cardboard cartons and pallets softly blurred behind. No
printed labels or branding of any kind.
```

### Tourteau de soja
```
[BLOC DE STYLE] Subject: soybean meal in coarse light-tan flakes and pellets
spilling from an open bulk sack onto a wooden warehouse floor, whole soybeans
scattered beside for reference, palletised sacks in soft focus behind.
```

---

## 4. Commerce général — fournitures de bureau

Ces visuels posent un problème que les produits agricoles n'avaient pas : les
fournitures de bureau sont majoritairement **bleues, grises et plastiques**,
c'est-à-dire précisément les teintes froides que le design system interdit. Un
générateur laissé libre produira une image bleutée qui jurera avec le reste de
la grille.

D'où un **bloc de style modifié** pour cette famille — à utiliser à la place du
bloc de la section 1 :

```
Photorealistic product photograph in a West African trading-company setting,
shot on a 50mm lens at f/4, soft natural window light from the left. Everything
sits on warm wood, kraft paper or hessian; warm earthy colour grade with
terracotta, ochre, kraft brown and cream tones — no cold grey, no blue cast, no
plastic-looking shine. Orderly, well-stocked, professional wholesale feel;
neatly aligned stacks, nothing cluttered. Composition leaves the top-left
corner calm and uncluttered. No text, no lettering, no numbers, no logos, no
brand names, no printed packaging of any kind. 4:3 aspect ratio, high
resolution, sharp focus.
```

> Le « no lettering, no numbers » est plus critique ici que pour l'agricole :
> cahiers, ramettes et classeurs portent naturellement des mentions imprimées,
> et les modèles génèrent du faux texte illisible qui trahit l'image de synthèse.

### Cahiers et papeterie scolaire
```
[BLOC FOURNITURES] Subject: neat stacks of plain unbranded exercise books with
kraft-brown and cream covers on a warm wooden counter, one book lying open
showing blank ruled pages, a few stacked notebooks fanned slightly to show
their edges.
```

### Ramettes de papier
```
[BLOC FOURNITURES] Subject: stacked reams of white A4 copy paper in plain
unprinted cream wrappers on a wooden shelf, one ream opened at the corner to
reveal the crisp white sheet edges, warm side light raking across the paper
stack.
```

### Matériel d'écriture
```
[BLOC FOURNITURES] Subject: ballpoint pens, pencils and markers standing
upright in a woven basket and laid in rows on kraft paper, warm wood surface, a
sharpened wooden pencil and a few loose pens in the foreground, shallow depth
of field.
```

### Articles de classement
```
[BLOC FOURNITURES] Subject: kraft-brown cardboard document folders, box files
and ring binders stacked and standing on a wooden shelf, one folder open
showing blank sheets inside, warm archival feel, cream and tan tones only.
```

### Petit matériel de bureau
```
[BLOC FOURNITURES] Subject: a tidy arrangement of small office equipment on a
warm wooden desk — stapler, hole punch, scissors, tape dispenser, paper clips
in a small dish — all in matte black and brushed metal, warm light, no plastic
glare, no branding.
```

### Vue d'ensemble — rayon fournitures
```
[BLOC FOURNITURES] Subject: a well-stocked wholesale stationery shelf in a
Cameroonian trading company, wooden shelving filled with neat stacks of plain
exercise books, paper reams and kraft folders, a warm interior with natural
light from the side, orderly and abundant. Plain unbranded packaging
throughout.
```

**Note de périmètre.** Ces six visuels ne couvrent que les fournitures de
bureau, seule catégorie de commerce général confirmée par SICCAM à ce jour.
Sacherie, produits d'entretien et quincaillerie ne sont pas repris : tant que
la liste réelle n'est pas arrêtée, illustrer une famille revient à annoncer une
offre. Voir POINTS-A-VALIDER.md, section 3.

---

## 5. Recommandations de cohérence

- **Générer en série** : lancer les 21 images avec le même bloc de style et, si
  l'outil le permet, la même *seed* de style (Midjourney `--sref`, Firefly
  « référence de style ») en prenant `images/produits/Cacao.png` comme référence.
- **Alterner les cadrages** : macro produit / geste humain / plan d'ambiance.
  Trois macros à la suite dans la grille donnent un effet de catalogue plat.
- **Vérifier après génération** : pas de texte parasite, coin supérieur gauche
  calme, aucune dominante grise ou bleutée, recadrage 4:3 propre.
- **Nommage** : kebab-case sans accent, aligné sur le champ `image` de
  `src/data/siccam.ts`. Les répertoires existants sont
  `public/images/produits/locaux/` et `public/images/produits/importes/` ; les
  fournitures iraient dans `public/images/produits/bureau/`
  (`cahiers.png`, `ramettes.png`, `ecriture.png`, `classement.png`,
  `petit-materiel.png`, `rayon.png`).
- **Attention aux espaces et aux accents** dans les noms de fichiers : ils se
  transforment en `%20%C3%A9` dans les URL et cassent au déploiement sur Linux.
  C'est ce qui a imposé de renommer les 21 premiers visuels.
