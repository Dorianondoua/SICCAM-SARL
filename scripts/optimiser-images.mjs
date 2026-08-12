/**
 * Convertit les photographies PNG du site en WebP.
 *
 * Le PNG est un format sans perte, conçu pour les aplats et la transparence.
 * Appliqué à une photographie, il produit des fichiers dix fois trop lourds
 * pour ce qu'ils montrent. Chaque visuel du site pèse ici 2 à 3 Mo.
 *
 * Deux gabarits de largeur, selon l'usage réel :
 *   - 1600 px pour les images affichées en pleine largeur (héros, débords) ;
 *   - 1000 px pour les cartes produit, qui ne dépassent jamais 285 px à
 *     l'écran — soit 570 px sur un écran à densité double.
 */
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const PLEINE_LARGEUR = new Set([
  "public/images/accueil/hero.png",
  "public/images/accueil/savoir-faire.png",
  "public/images/produits/locaux/cacao.png", // héros de la page catalogue
  "public/images/produits/bureau/rayon.png",
]);

const DOSSIERS = [
  "public/images/accueil",
  "public/images/produits/locaux",
  "public/images/produits/importes",
  "public/images/produits/bureau",
];

let avant = 0;
let apres = 0;
const lignes = [];

for (const dossier of DOSSIERS) {
  for (const fichier of readdirSync(dossier)) {
    if (!fichier.endsWith(".png")) continue;

    const source = join(dossier, fichier);
    const cible = source.replace(/\.png$/, ".webp");
    const normalise = source.split("\\").join("/");
    const largeur = PLEINE_LARGEUR.has(normalise) ? 1600 : 1000;

    const poidsAvant = statSync(source).size;

    await sharp(source)
      .resize({ width: largeur, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(cible);

    const poidsApres = statSync(cible).size;
    unlinkSync(source);

    avant += poidsAvant;
    apres += poidsApres;
    lignes.push(
      `${String(Math.round(poidsAvant / 1024)).padStart(5)} Ko → ` +
        `${String(Math.round(poidsApres / 1024)).padStart(4)} Ko  ${normalise}`,
    );
  }
}

for (const ligne of lignes) console.log(ligne);
console.log(
  `\nTotal : ${(avant / 1048576).toFixed(1)} Mo → ${(apres / 1048576).toFixed(1)} Mo ` +
    `(${Math.round((1 - apres / avant) * 100)} % de moins, ${lignes.length} fichiers)`,
);
