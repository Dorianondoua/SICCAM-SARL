/**
 * Bande d'analyse — signature du site.
 *
 * Filet pleine largeur en monospace reprenant l'en-tête d'un certificat
 * d'analyse. Chaque bande porte les données réelles de la section qui suit :
 * le séparateur informe au lieu de décorer. Elle remplace les séparateurs
 * ondulés du design system, qui ne portaient rien.
 *
 * La première donnée est la clé de lecture et passe en brique.
 *
 * `aria-hidden` est délibéré : chaque donnée de bande est déjà énoncée en
 * toutes lettres dans la section correspondante. La bande est une reprise
 * visuelle, et ses abréviations en capitales (« HUM. », « PROT. ») seraient
 * lues de travers par un lecteur d'écran.
 */
export function Bande({
  donnees,
  ton = "clair",
}: {
  donnees: readonly string[];
  ton?: "clair" | "sombre" | "tiede";
}) {
  const tons = {
    clair: "bande",
    sombre: "bande bande-sombre",
    tiede: "bande bande-tiede",
  } as const;

  return (
    <div className={tons[ton]} aria-hidden="true">
      <div className="bande-interieur donnee">
        {donnees.map((donnee) => (
          <span key={donnee}>{donnee}</span>
        ))}
      </div>
    </div>
  );
}
