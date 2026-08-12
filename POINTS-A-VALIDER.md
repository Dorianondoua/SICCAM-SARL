# Points à valider avant mise en ligne

Dernière revue : 10 août 2026.

Ce fichier ne liste que des questions de **véracité** : des affirmations
publiées sur le site qui engagent SICCAM SARL et qui n'ont pas de source
vérifiée. Les points techniques restants sont au chapitre 8 du cahier des
charges.

Règle appliquée dans tout le projet : **on ne publie pas un chiffre qu'on ne
peut pas produire sur demande.** Un champ vide se remplit ; une donnée fausse
se retourne contre l'entreprise au premier litige.

---

## 1. Millésime de campagne — À REPRENDRE CHAQUE ANNÉE

La bande sous le héros annonce « CAMPAGNE 2025–2026 ». Nous sommes en août
2026 : le millésime est sur le point d'être périmé, et une bande datée est
pire que pas de bande.

Fichier : [src/data/siccam.ts](src/data/siccam.ts) → `BANDE_HERO`.

---

## 2. Spécifications des 17 produits hors filières d'export — MANQUANT

La page catalogue affiche 21 produits. Seuls les quatre premiers portent une
origine, une étiquette de qualité et une ligne d'analyse : ce sont les seuls
documentés au cahier des charges §3.1.

Les dix-sept autres affichent « Spécifications sur demande ». C'est volontaire
et honnête, mais moins vendeur qu'une fiche complète.

Pour compléter une fiche, il faut trois informations par produit :

| Champ | Exemple attendu | Ce que ça devient à l'écran |
|---|---|---|
| `origine` | « Ouest, Adamaoua, Nord » | La ligne avec le pictogramme de localisation |
| `etiquette` | « Jaune n° 2 » | La pastille blanche en haut à gauche de la photo |
| `spec` | « HUM. ≤ 14 % · BRISÉS ≤ 3 % » | La ligne d'analyse encadrée de filets |
| `description` | Deux phrases, sans superlatif | Le paragraphe sous le nom |

Produits concernés — locaux : maïs, riz, manioc, mil rouge, farine, tourteau
d'arachide, banane plantain, fruits et légumes, produits d'élevage, intrants
agricoles. Importés : riz, maïs, farine, pâtes alimentaires, sucre, sardines,
tourteau de soja.

Fichier : [src/data/siccam.ts](src/data/siccam.ts) → `PRODUITS_LOCAUX` et
`PRODUITS_IMPORTES`. Le gabarit de carte s'adapte seul dès qu'un champ est
renseigné.

---

## 3. Prestation de services — DOMAINE SANS CONTENU

La section « Nos activités » affiche les sept domaines de l'en-tête officiel
(Yaoundé, 3 août 2026). Six se comprennent seuls ; « Prestation de services »
ne dit rien de ce qui est vendu, parce que l'en-tête ne le précise pas.

Quels services, concrètement : transit et dédouanement, stockage, appui
technique aux producteurs, transport ? Un domaine annoncé sans contenu attire
surtout des demandes hors sujet.

**Commerce général.** Le domaine figure dans la section activités, ce qui est
honnête et suffit peut-être. Une rubrique produit détaillée (fournitures,
sacherie, entretien…) reste possible : elle demande la liste des familles
réellement couvertes et le périmètre géographique.

Fichiers : [src/data/siccam.ts](src/data/siccam.ts) → `ACTIVITES`,
[src/components/sections/Activites.tsx](src/components/sections/Activites.tsx).

---

## 4. Photographies — IMAGES DE SYNTHÈSE

Les vingt-sept visuels du site sont générés par intelligence artificielle
(cahier des charges R2). Sur un site dont l'argument central est le contrôle
physique des lots, c'est une faiblesse de crédibilité, pas seulement une
question de goût.

Prise de vue à commanditer : plantations, entrepôt de tri, quai de Douala.

Les prompts ayant servi à générer les visuels actuels sont conservés dans
[images/PROMPTS-IMAGES-PRODUITS.md](images/PROMPTS-IMAGES-PRODUITS.md) — ils
décrivent les cadrages attendus et peuvent servir de brief au photographe.

---

## 5. Transmission du formulaire — IL MANQUE LES IDENTIFIANTS SMTP

Le formulaire est branché. La route [src/pages/api/devis.ts](src/pages/api/devis.ts)
valide la demande côté serveur puis l'expédie par courriel ; le bouton WhatsApp
fonctionne dès maintenant, sans aucune configuration.

**Ce qu'il reste à faire :** copier `.env.example` en `.env.local` et
renseigner les cinq variables SMTP. N'importe quel fournisseur convient —
Brevo (gratuit à 300 courriels par jour), Gmail ou Yahoo avec un mot de passe
d'application.

Tant que ces variables sont vides, la route répond 503 et l'interface affiche
« L'envoi n'a pas abouti » avec le renvoi WhatsApp. Elle n'affiche **jamais**
une confirmation mensongère : c'était le défaut d'origine (cahier R1).

À la mise en ligne, ces variables devront être déclarées chez l'hébergeur, pas
seulement dans le fichier local.

**Expéditeur provisoire.** Faute de nom de domaine, les notifications partent
au nom d'une adresse Gmail personnelle vérifiée dans Brevo. Impossible
d'utiliser `siccamsarl@yahoo.com` : le domaine yahoo.com publie une politique
DMARC en « reject », et Yahoo rejetterait ses propres messages relayés par
Brevo. Dès que le domaine SICCAM sera réservé, il faudra l'authentifier dans
Brevo (DKIM + DMARC) et basculer `DEVIS_EXPEDITEUR` sur une adresse maison.
C'est une raison de plus de traiter le point « nom de domaine » rapidement.

---

## Traité — pour mémoire

| Point | Décision du 10 août 2026 |
|---|---|
| Trois témoignages clients | **Retirés.** Ils ne correspondaient à aucun client réel |
| Bandeau CICC · GICAM · IGP Penja · Port de Douala · ANOR | **Retiré.** Aucune adhésion ni agrément établi |
| Origines et specs inventées sur les 17 nouveaux produits | **Retirées.** Remplacées par « Spécifications sur demande » |
| Chiffre « 20+ partenaires commerciaux » | **Validé** le 10 août 2026 |
| Engagement « réponse sous 24 h » | **Validé** le 10 août 2026 |
| Volume minimum d'un conteneur 20 pieds | **Retiré.** SICCAM n'impose pas de plancher de commande |
| Lecture « Agriculture bio et industrielle » | **Confirmé** : un seul domaine, les sept tiennent |

Le code des deux sections retirées reste récupérable dans l'historique git
(`src/components/sections/Temoignages.tsx`).
