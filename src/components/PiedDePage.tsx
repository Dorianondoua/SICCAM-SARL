import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "@/components/Logo";
import { CONTACT, FAMILLES, versAncre, versTel } from "@/data/siccam";

export function PiedDePage() {
  const surAccueil = useRouter().pathname === "/";

  return (
    <footer className="pied">
      <div className="conteneur">
        <div className="pied-grille">
          <div className="pied-marque">
            {/* Version principale : le pied de page est le seul endroit du site
                où la raison sociale complète doit figurer. */}
            <Logo variante="principal" ton="sombre" taille={38} />
            <p>
              Production, commercialisation et exportation de produits
              agricoles camerounais. Cacao, café, soja grain et poivre blanc de
              Penja.
            </p>
          </div>

          <div>
            <div className="pied-titre">Produits</div>
            <div className="pied-liens">
              <Link href="/produits">Catalogue complet</Link>
              {FAMILLES.map((famille) => (
                <Link key={famille.id} href={`/produits#${famille.id}`}>
                  {famille.nom}
                </Link>
              ))}
              <Link href="/produits#bureau">Fournitures de bureau</Link>
            </div>
          </div>

          <div>
            <div className="pied-titre">Société</div>
            <div className="pied-liens">
              <Link href={versAncre("#activites", surAccueil)}>Activités</Link>
              <Link href={versAncre("#savoir-faire", surAccueil)}>
                Savoir-faire
              </Link>
              <Link href={versAncre("#filiere", surAccueil)}>
                Notre procédé
              </Link>
              <Link href={versAncre("#destinations", surAccueil)}>
                Destinations
              </Link>
              <Link href={versAncre("#contact", surAccueil)}>Contact</Link>
            </div>
          </div>

          <div>
            <div className="pied-titre">Contact</div>
            <div className="pied-liens">
              {CONTACT.telephones.map((numero) => (
                <a key={numero} href={versTel(numero)}>
                  {numero}
                </a>
              ))}
              <a href={`mailto:${CONTACT.courriel}`}>{CONTACT.courriel}</a>
              <span>Olembé, Yaoundé, Cameroun</span>
            </div>
          </div>
        </div>

        <div className="pied-bas">
          <span>© {new Date().getFullYear()} SICCAM SARL. Tous droits réservés.</span>
          <span>Yaoundé · Douala · Cameroun</span>
        </div>
      </div>
    </footer>
  );
}
