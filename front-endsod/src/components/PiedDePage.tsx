import { Logo } from "@/components/Logo";
import { CONTACT, PRODUITS, versTel } from "@/data/siccam";

export function PiedDePage() {
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
              {PRODUITS.map((produit) => (
                <a key={produit.id} href="#produits">
                  {produit.nom}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="pied-titre">Société</div>
            <div className="pied-liens">
              <a href="#savoir-faire">Savoir-faire</a>
              <a href="#filiere">Notre procédé</a>
              <a href="#destinations">Destinations</a>
              <a href="#references">Références</a>
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
