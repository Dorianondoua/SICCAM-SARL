import Image from "next/image";
import { Icone } from "@/components/Icone";
import { PRODUITS } from "@/data/siccam";

export function Produits() {
  return (
    <section id="produits" className="section surface-douce">
      <div className="conteneur">
        <div className="entete-section">
          <div style={{ maxWidth: 640 }}>
            <p className="surtitre">Nos produits</p>
            <h2 className="titre-1">
              Quatre filières, une même exigence de tri.
            </h2>
            <p className="chapeau">
              Fiches techniques, échantillons et certificats d&apos;analyse
              disponibles sur demande.
            </p>
          </div>
          <a href="#contact" className="bouton bouton-md bouton-contour">
            Demander le catalogue
            <Icone name="fleche-droite" size={18} />
          </a>
        </div>

        <div className="grille grille-4">
          {PRODUITS.map((produit) => (
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
                <span
                  className={
                    produit.etiquetteIgp
                      ? "produit-etiquette produit-etiquette-igp"
                      : "produit-etiquette"
                  }
                >
                  {produit.etiquette}
                </span>
              </div>
              <div className="produit-corps">
                <div className="produit-origine">
                  <Icone name="localisation" size={16} />
                  {produit.origine}
                </div>
                <h3 className="titre-3">{produit.nom}</h3>
                <p className="produit-description">{produit.description}</p>
                {/* Ligne d'analyse : la spécification telle qu'elle figure au certificat. */}
                <div className="produit-spec donnee">{produit.spec}</div>
                <span className="lien-fleche">
                  Fiche technique
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
