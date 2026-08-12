import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icone } from "@/components/Icone";
import { Logo } from "@/components/Logo";
import { NAVIGATION, versAncre } from "@/data/siccam";

/**
 * Barre de navigation collante, hauteur 76 px — seul élément fixe de la page.
 * Sous 900 px le menu bascule en panneau déroulant (bascule gérée en CSS).
 */
export function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  // Les liens de sections sont des ancres : hors accueil, il faut les préfixer.
  const surAccueil = useRouter().pathname === "/";

  return (
    <header className="entete">
      <div className="conteneur-large entete-barre">
        <Link
          href={surAccueil ? "#hero" : "/"}
          className="lien-logo"
          aria-label="SICCAM SARL — accueil"
        >
          <Logo variante="court" taille={34} />
        </Link>

        <nav className="nav-large" aria-label="Navigation principale">
          {NAVIGATION.map((lien) => (
            <Link
              key={lien.href}
              href={versAncre(lien.href, surAccueil)}
              className="nav-lien"
            >
              {lien.libelle}
            </Link>
          ))}
        </nav>

        <Link
          href={versAncre("#contact", surAccueil)}
          className="bouton bouton-sm bouton-primaire nav-cta"
        >
          Demander un devis
          <Icone name="fleche-droite" size={18} />
        </Link>

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
            <Link
              key={lien.href}
              href={versAncre(lien.href, surAccueil)}
              onClick={() => setOuvert(false)}
            >
              {lien.libelle}
            </Link>
          ))}
          <Link
            href={versAncre("#contact", surAccueil)}
            className="bouton bouton-primaire"
            onClick={() => setOuvert(false)}
          >
            Demander un devis
            <Icone name="fleche-droite" size={18} />
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
