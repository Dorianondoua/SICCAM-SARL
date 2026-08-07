import { useState } from "react";
import { Icone } from "@/components/Icone";
import { Logo } from "@/components/Logo";
import { NAVIGATION } from "@/data/siccam";

/**
 * Barre de navigation collante, hauteur 76 px — seul élément fixe de la page.
 * Sous 900 px le menu bascule en panneau déroulant (bascule gérée en CSS).
 */
export function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <header className="entete">
      <div className="conteneur-large entete-barre">
        <a href="#hero" className="lien-logo" aria-label="SICCAM SARL — accueil">
          <Logo variante="court" taille={34} />
        </a>

        <nav className="nav-large" aria-label="Navigation principale">
          {NAVIGATION.map((lien) => (
            <a key={lien.href} href={lien.href} className="nav-lien">
              {lien.libelle}
            </a>
          ))}
        </nav>

        <a href="#contact" className="bouton bouton-sm bouton-primaire nav-cta">
          Demander un devis
          <Icone name="fleche-droite" size={18} />
        </a>

        <button
          type="button"
          className="bouton-menu"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={ouvert}
          aria-controls="menu-compact"
          onClick={() => setOuvert((v) => !v)}
        >
          <Icone name={ouvert ? "fermer" : "menu"} />
        </button>
      </div>

      {ouvert ? (
        <nav
          id="menu-compact"
          className="nav-compacte"
          aria-label="Navigation principale"
        >
          {NAVIGATION.map((lien) => (
            <a key={lien.href} href={lien.href} onClick={() => setOuvert(false)}>
              {lien.libelle}
            </a>
          ))}
          <a
            href="#contact"
            className="bouton bouton-primaire"
            onClick={() => setOuvert(false)}
          >
            Demander un devis
            <Icone name="fleche-droite" size={18} />
          </a>
        </nav>
      ) : null}
    </header>
  );
}
