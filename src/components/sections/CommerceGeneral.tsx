import Image from "next/image";
import { Icone } from "@/components/Icone";
import { FOURNITURES } from "@/data/siccam";

/**
 * Commerce général — fournitures de bureau.
 *
 * Gabarit délibérément différent de celui des deux familles agricoles : pas
 * d'étiquette de qualité, pas d'origine, pas de ligne d'analyse. Ce n'est pas
 * une omission, c'est la nature de l'activité — on ne certifie pas un cahier
 * comme on certifie un lot de cacao, et calquer le vocabulaire du certificat
 * sur de la papeterie affaiblirait les deux.
 *
 * La photo de rayon ouvre la section : pour une offre qu'on ne peut pas
 * énumérer, montrer le stock vaut mieux qu'aligner cinq articles.
 */
export function CommerceGeneral() {
  return (
    <section
      id="bureau"
      className="section famille"
      aria-labelledby="titre-bureau"
    >
      <div className="conteneur">
        <div
          className="grille grille-2 bureau-intro"
          style={{ alignItems: "center" }}
        >
          {/* Média propre à la section : pas de `savoir-media`, dont le débord
              jusqu'au bord de fenêtre n'est rattrapé que par l'`overflow-x:
              clip` de la section savoir-faire. Le réutiliser ici provoquerait
              un défilement horizontal. */}
          <div className="bureau-media">
            <Image
              src="/images/produits/bureau/rayon.webp"
              alt="Rayon de fournitures de bureau : étagères en bois garnies de cahiers, de ramettes et de boîtes d'archives"
              fill
              sizes="(max-width: 900px) 100vw, 570px"
            />
          </div>

          <div>
            <p className="surtitre">Commerce général</p>
            <h2 id="titre-bureau" className="titre-1">
              Les fournitures de bureau.
            </h2>
            <p className="chapeau">
              Au-delà de l&apos;agricole, SICCAM approvisionne entreprises,
              administrations et établissements scolaires en fournitures de
              bureau et de papeterie.
            </p>
            <a href="#contact" className="bouton bouton-md bouton-contour">
              Demander un devis
              <Icone name="fleche-droite" size={18} />
            </a>
          </div>
        </div>

        <div className="grille grille-4 bureau-grille">
          {FOURNITURES.map((fourniture) => (
            <a
              key={fourniture.id}
              href="#contact"
              className="carte carte-cliquable"
              aria-label={`${fourniture.nom} — nous consulter`}
            >
              <div className="produit-media">
                <Image
                  src={fourniture.image}
                  alt={fourniture.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 285px"
                />
              </div>
              <div className="fourniture-corps">
                <h3 className="titre-4">{fourniture.nom}</h3>
                <p className="fourniture-exemples donnee">
                  {fourniture.exemples}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
