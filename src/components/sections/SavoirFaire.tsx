import Image from "next/image";
import { Icone } from "@/components/Icone";
import { POINTS_FORTS } from "@/data/siccam";

export function SavoirFaire() {
  return (
    <section id="savoir-faire" className="section savoir-faire">
      <div
        className="conteneur grille grille-2 savoir-grille"
        style={{ alignItems: "center" }}
      >
        <div className="savoir-media">
          <Image
            src="/images/accueil/savoir-faire.webp"
            alt="Entrepôt de tri SICCAM : pesée et calibrage des sacs"
            fill
            sizes="(max-width: 900px) 100vw, 570px"
          />
        </div>

        <div>
          <p className="surtitre">Notre savoir-faire</p>
          <h2 className="titre-1">Du planteur au port de Douala.</h2>
          <p className="chapeau">
            Nous achetons directement auprès de producteurs identifiés, traitons
            les lots dans nos entrepôts et assurons le transit jusqu&apos;au
            navire. Un seul interlocuteur sur toute la chaîne.
          </p>

          <div className="points-forts">
            {POINTS_FORTS.map((point) => (
              <div key={point.titre} className="point-fort">
                <span
                  className={
                    point.ton === "foret" ? "pastille pastille-foret" : "pastille"
                  }
                >
                  <Icone name={point.icone} size={22} />
                </span>
                <div>
                  <h3 className="titre-4">{point.titre}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Pic typographique — le seul moment de la page où la typographie devient une
 * image. Rien d'autre à l'écran : ni photo, ni bouton, ni carte. Une seule
 * fois dans la page, sinon l'effet devient un tic.
 */
export function Citation() {
  return (
    <section className="citation" aria-label="Citation de la direction">
      <div className="citation-interieur">
        <blockquote style={{ margin: 0 }}>
          <p className="citation-texte">
            Un lot refusé à l&apos;arrivée coûte plus cher qu&apos;un lot
            contrôlé au départ.
          </p>
          <footer className="surtitre surtitre-discret" style={{ margin: 0 }}>
            Direction générale, SICCAM SARL
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
