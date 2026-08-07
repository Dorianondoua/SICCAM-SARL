import { Etoile } from "@/components/Icone";
import { REFERENCES, TEMOIGNAGES } from "@/data/siccam";

export function Temoignages() {
  return (
    <section className="section surface-tiede" aria-label="Témoignages clients">
      <div className="conteneur">
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <p className="surtitre">Ce qu&apos;en disent nos clients</p>
          <h2 className="titre-1">
            Des lots réguliers, campagne après campagne.
          </h2>
        </div>

        <div className="grille grille-3">
          {TEMOIGNAGES.map((temoignage) => (
            <figure
              key={temoignage.auteur}
              className="carte temoignage"
              style={{ margin: 0 }}
            >
              <div className="etoiles" aria-label="Noté 5 sur 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Etoile key={i} />
                ))}
              </div>
              <blockquote style={{ margin: 0 }}>
                <p>{temoignage.citation}</p>
              </blockquote>
              <figcaption>
                <div className="temoignage-auteur">{temoignage.auteur}</div>
                <div className="temoignage-role">{temoignage.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function References() {
  return (
    <section
      id="references"
      className="section-compacte surface-douce"
      aria-label="Références et certifications"
    >
      <div className="conteneur references">
        <p className="etiquette-champ" style={{ marginBottom: 0 }}>
          Ils nous font confiance
        </p>
        <div className="references-liste">
          {REFERENCES.map((nom) => (
            <span key={nom}>{nom}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
