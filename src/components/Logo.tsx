/**
 * Logo SICCAM SARL — piste 2b retenue.
 *
 * Construction : un S brique posé à cheval sur le bord gauche d'un bandeau
 * ocre biseauté en bas à droite, qui porte « ICCAM SARL ». La raison sociale
 * en capitales espacées vient sous le verrouillage.
 *
 * Toutes les dimensions sont exprimées en `em` et dérivent de `taille`, de
 * sorte que le logo se met à l'échelle sans jamais se déformer. Les rapports
 * sont ceux de la maquette (76/54 en version principale, 50/36 en courte).
 *
 * Le composant porte `role="img"` et un libellé : sans cela un lecteur
 * d'écran énoncerait « S ICCAM SARL » en morceaux.
 */

export type VarianteLogo = "principal" | "court" | "symbole";
export type TonLogo = "clair" | "sombre" | "brique" | "mono";

interface LogoProps {
  variante?: VarianteLogo;
  ton?: TonLogo;
  /** Hauteur de référence du S, en px. Tout le reste en découle. */
  taille?: number;
  className?: string;
}

export function Logo({
  variante = "court",
  ton = "clair",
  taille,
  className,
}: LogoProps) {
  const tailleParDefaut = variante === "principal" ? 76 : variante === "symbole" ? 88 : 50;
  const fontSize = taille ?? tailleParDefaut;
  const classes = ["logo", `logo-${ton}`, className].filter(Boolean).join(" ");

  if (variante === "symbole") {
    return (
      <span
        className={`logo-symbole logo-${ton} ${className ?? ""}`.trim()}
        style={{ fontSize }}
        role="img"
        aria-label="SICCAM SARL"
      >
        <span className="logo-symbole-s">S</span>
      </span>
    );
  }

  return (
    <span
      className={classes}
      style={{ fontSize }}
      role="img"
      aria-label="SICCAM SARL"
    >
      <span className="logo-lockup">
        <span className="logo-bande" />
        <span className="logo-texte">
          <span className="logo-s">S</span>
          <span className="logo-iccam">ICCAM</span>
          <span className="logo-ecart" />
          <span className="logo-sarl">SARL</span>
        </span>
      </span>

      {variante === "principal" ? (
        <span className="logo-raison">
          Société industrielle et
          <br />
          commerciale du Cameroun
        </span>
      ) : null}
    </span>
  );
}
