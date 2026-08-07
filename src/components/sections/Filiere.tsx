import { ETAPES } from "@/data/siccam";

export function Filiere() {
  return (
    <section
      id="filiere"
      className="section-compacte surface-inverse"
      style={{ paddingTop: "clamp(56px,7vw,96px)" }}
    >
      <div className="conteneur">
        <div style={{ maxWidth: 700, marginBottom: 48 }}>
          <p className="surtitre surtitre-clair">Notre procédé</p>
          <h2 className="titre-1 texte-clair">
            Six étapes, de la plantation au navire.
          </h2>
          <p className="chapeau chapeau-clair">
            Chaque lot conserve son identifiant d&apos;origine jusqu&apos;au
            connaissement.
          </p>
        </div>

        {/* Le procédé est une séquence réelle : la numérotation encode l'ordre.
            Rendu en tableau plutôt qu'en grille de six blocs — c'est un relevé,
            pas une galerie. */}
        <ol className="etapes">
          {ETAPES.map((etape) => (
            <li key={etape.numero} className="etape">
              <span className="etape-numero">{etape.numero}</span>
              <h3 className="titre-4 texte-clair">{etape.titre}</h3>
              <p>{etape.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
