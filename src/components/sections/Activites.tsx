import { ACTIVITES } from "@/data/siccam";

/**
 * Domaines d'intervention — relevé numéroté.
 *
 * Volontairement sans description : l'en-tête officiel de SICCAM ne donne que
 * les intitulés, et un domaine glosé au jugé engagerait l'entreprise sur une
 * activité qu'elle n'exerce peut-être pas comme on l'a écrit. Le numéro en
 * monospace reprend la grammaire du procédé en six étapes ; la liste se lit
 * comme un extrait de registre, ce qu'elle est.
 */
export function Activites() {
  return (
    <section
      id="activites"
      className="section surface-douce"
      aria-labelledby="titre-activites"
    >
      <div className="conteneur">
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <p className="surtitre">Nos activités</p>
          <h2 id="titre-activites" className="titre-1">
            Sept domaines d&apos;intervention.
          </h2>
          <p className="chapeau">
            L&apos;agriculture et l&apos;export en constituent le cœur. Nous
            intervenons également en négoce, en import-distribution, en commerce
            général et en prestation de services.
          </p>
        </div>

        <ol className="activites">
          {ACTIVITES.map((activite, index) => (
            <li key={activite} className="activite">
              <span className="activite-index donnee" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="activite-nom">{activite}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
