import { useState, type FormEvent } from "react";
import { Icone } from "@/components/Icone";
import { CONTACT, PRODUITS_DEVIS, versTel } from "@/data/siccam";

export function Contact() {
  const [envoye, setEnvoye] = useState(false);

  function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO — brancher l'envoi réel (API SICCAM). Pour l'instant la demande
    // n'est pas transmise : seul l'écran de confirmation est affiché.
    setEnvoye(true);
  }

  return (
    <section id="contact" className="section">
      <div className="conteneur contact">
        <div>
          <p className="surtitre">Contact</p>
          <h2 className="titre-1">Demandez votre devis.</h2>
          <p className="chapeau" style={{ maxWidth: "60ch" }}>
            Indiquez le produit, le volume et la destination. Nous répondons
            sous 24 h avec un prix, un calendrier d&apos;expédition et un
            échantillon.
          </p>

          <div className="coordonnees">
            <div className="coordonnee">
              <span className="pastille">
                <Icone name="telephone" />
              </span>
              <div>
                <div className="etiquette-champ">Téléphone</div>
                {CONTACT.telephones.map((numero) => (
                  <a
                    key={numero}
                    href={versTel(numero)}
                    className="coordonnee-valeur"
                  >
                    {numero}
                  </a>
                ))}
              </div>
            </div>

            <div className="coordonnee">
              <span className="pastille pastille-foret">
                <Icone name="courriel" />
              </span>
              <div>
                <div className="etiquette-champ">Courriel</div>
                <a
                  href={`mailto:${CONTACT.courriel}`}
                  className="coordonnee-valeur"
                >
                  {CONTACT.courriel}
                </a>
              </div>
            </div>

            <div className="coordonnee">
              <span className="pastille">
                <Icone name="localisation" />
              </span>
              <div>
                <div className="etiquette-champ">Adresse</div>
                <div className="coordonnee-valeur">{CONTACT.adresse}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="carte formulaire">
          {envoye ? (
            <div className="confirmation" role="status">
              <span className="confirmation-pastille">
                <Icone name="check" size={26} />
              </span>
              <h3 className="titre-3">Demande envoyée</h3>
              <p>Nous revenons vers vous sous 24 h ouvrées.</p>
              <button
                type="button"
                className="bouton bouton-md bouton-contour"
                onClick={() => setEnvoye(false)}
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={soumettre} noValidate={false}>
              <div className="formulaire-grille">
                <label className="champ">
                  <span className="champ-libelle">Nom</span>
                  <input type="text" name="nom" placeholder="Votre nom" />
                </label>
                <label className="champ">
                  <span className="champ-libelle">Société</span>
                  <input
                    type="text"
                    name="societe"
                    placeholder="Raison sociale"
                    required
                  />
                </label>
                <label className="champ">
                  <span className="champ-libelle">Pays</span>
                  <input
                    type="text"
                    name="pays"
                    placeholder="Pays de destination"
                  />
                </label>
                <label className="champ">
                  <span className="champ-libelle">Courriel</span>
                  <input
                    type="email"
                    name="courriel"
                    placeholder="vous@entreprise.com"
                    required
                  />
                </label>
                <label className="champ">
                  <span className="champ-libelle">Produit</span>
                  <select name="produit" defaultValue={PRODUITS_DEVIS[0]}>
                    {PRODUITS_DEVIS.map((produit) => (
                      <option key={produit}>{produit}</option>
                    ))}
                  </select>
                </label>
                <label className="champ">
                  <span className="champ-libelle">Quantité</span>
                  <input
                    type="text"
                    name="quantite"
                    placeholder="Ex. 2 conteneurs 20', 40 t"
                  />
                </label>
              </div>

              <label className="champ champ-message">
                <span className="champ-libelle">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Décrivez votre besoin : spécifications, calendrier, port de destination…"
                />
              </label>

              <div className="formulaire-pied">
                <span className="formulaire-mention">
                  Réponse sous 24 h ouvrées.
                </span>
                <button type="submit" className="bouton bouton-primaire">
                  Envoyer la demande
                  <Icone name="fleche-droite" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function AppelAction() {
  return (
    <section
      className="section-compacte surface-primaire"
      aria-label="Production sur cahier des charges"
    >
      <div className="conteneur appel-action">
        <div className="appel-action-texte">
          <h2 className="titre-2 texte-clair">
            Un besoin précis ? Nous produisons sur cahier des charges.
          </h2>
          <p>
            Échantillon expédié sous 5 jours ouvrés après accord sur les
            spécifications.
          </p>
        </div>
        <a href="#contact" className="bouton bouton-sur-brique">
          Demander un devis
          <Icone name="fleche-droite" />
        </a>
      </div>
    </section>
  );
}
