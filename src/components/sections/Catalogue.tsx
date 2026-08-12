import Image from "next/image";
import { Icone } from "@/components/Icone";
import { FAMILLES, type Famille } from "@/data/siccam";

/**
 * Une famille du catalogue : locaux ou importés. Les deux alternent de surface
 * — blanc puis fond doux — ce qui sépare les familles sans filet en plus.
 */
function SectionFamille({
  famille,
  index,
}: {
  famille: Famille;
  index: number;
}) {
  return (
    <section
      id={famille.id}
      className={index % 2 === 1 ? "section surface-douce famille" : "section famille"}
      aria-labelledby={`titre-${famille.id}`}
    >
      <div className="conteneur">
        <div className="entete-section">
          <div style={{ maxWidth: 640 }}>
            <p className="surtitre">{famille.surtitre}</p>
            <h2 id={`titre-${famille.id}`} className="titre-1">
              {famille.titre}
            </h2>
            <p className="chapeau">{famille.chapeau}</p>
          </div>
          <a href="#contact" className="bouton bouton-md bouton-contour">
            Demander un devis
            <Icone name="fleche-droite" size={18} />
          </a>
        </div>

        <div className="grille grille-4">
          {famille.produits.map((produit) => (
            <a
              key={produit.id}
              href="#contact"
              className="carte carte-cliquable"
              aria-label={`${produit.nom} — demander la fiche technique`}
            >
              <div className="produit-media">
                <Image
                  src={produit.image}
                  alt={produit.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 285px"
                />
                {/* Pas d'étiquette inventée : la pastille n'apparaît que si
                    SICCAM a validé une qualité pour ce produit. */}
                {produit.etiquette ? (
                  <span
                    className={
                      produit.etiquetteIgp
                        ? "produit-etiquette produit-etiquette-igp"
                        : "produit-etiquette"
                    }
                  >
                    {produit.etiquette}
                  </span>
                ) : null}
              </div>
              <div className="produit-corps">
                {produit.origine ? (
                  <div className="produit-origine">
                    <Icone name="localisation" size={16} />
                    {produit.origine}
                  </div>
                ) : null}
                <h3 className="titre-3">{produit.nom}</h3>
                {produit.description ? (
                  <p className="produit-description">{produit.description}</p>
                ) : (
                  <p className="produit-description">
                    Origine, conditionnement et disponibilité communiqués à la
                    demande.
                  </p>
                )}
                {/* Ligne d'analyse : la spécification telle qu'elle figure au
                    certificat. Absente tant qu'aucune n'est validée — mieux
                    vaut ne rien annoncer qu'annoncer un chiffre non tenu. */}
                {produit.spec ? (
                  <div className="produit-spec donnee">{produit.spec}</div>
                ) : (
                  <div className="produit-spec donnee produit-spec-vide">
                    SPÉCIFICATIONS SUR DEMANDE
                  </div>
                )}
                <span className="lien-fleche">
                  {produit.spec ? "Fiche technique" : "Nous consulter"}
                  <Icone name="fleche-droite" size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Catalogue() {
  return (
    <>
      {FAMILLES.map((famille, index) => (
        <SectionFamille key={famille.id} famille={famille} index={index} />
      ))}
    </>
  );
}
