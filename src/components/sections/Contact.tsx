import { useState, type FormEvent } from "react";
import { Icone } from "@/components/Icone";
import {
  CONTACT,
  PRODUITS_DEVIS,
  versTel,
  versWhatsApp,
} from "@/data/siccam";

/** Ce que le formulaire tient à jour, exactement les champs envoyés. */
const VIDE = {
  nom: "",
  societe: "",
  pays: "",
  courriel: "",
  produit: `${PRODUITS_DEVIS[0].famille} — ${PRODUITS_DEVIS[0].options[0]}`,
  quantite: "",
  message: "",
};

type Champs = typeof VIDE;
type Etat = "saisie" | "envoi" | "envoye" | "echec";

/** Le message que l'acheteur retrouve déjà écrit dans WhatsApp. */
function enMessage(c: Champs) {
  return [
    "Bonjour SICCAM SARL, je souhaite un devis.",
    "",
    `Société : ${c.societe || "—"}`,
    c.nom ? `Nom : ${c.nom}` : null,
    `Produit : ${c.produit}`,
    c.quantite ? `Quantité : ${c.quantite}` : null,
    c.pays ? `Pays de destination : ${c.pays}` : null,
    c.courriel ? `Courriel : ${c.courriel}` : null,
    c.message ? `\n${c.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function Contact() {
  const [champs, setChamps] = useState<Champs>(VIDE);
  const [etat, setEtat] = useState<Etat>("saisie");
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [motif, setMotif] = useState<string>("");

  const modifier =
    (nom: keyof Champs) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setChamps((c) => ({ ...c, [nom]: e.target.value }));

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    setErreurs({});

    try {
      const donnees = new FormData(e.currentTarget);
      const reponse = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `site` est le champ piège : un humain le laisse toujours vide.
        body: JSON.stringify({ ...champs, site: donnees.get("site") ?? "" }),
      });
      const resultat = await reponse.json().catch(() => ({}));

      if (reponse.ok) {
        setEtat("envoye");
        return;
      }

      // L'échec est dit, jamais masqué : un visiteur qui croit sa demande
      // transmise alors qu'elle est perdue est pire qu'un visiteur averti.
      if (resultat?.champs) setErreurs(resultat.champs);
      setMotif(String(resultat?.erreur ?? "envoi"));
      setEtat(resultat?.champs ? "saisie" : "echec");
    } catch {
      setMotif("reseau");
      setEtat("echec");
    }
  }

  const lienWhatsApp = versWhatsApp(CONTACT.whatsapp, enMessage(champs));

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
          {etat === "envoye" ? (
            <div className="confirmation" role="status">
              <span className="confirmation-pastille">
                <Icone name="check" size={26} />
              </span>
              <h3 className="titre-3">Demande envoyée</h3>
              <p>Nous revenons vers vous sous 24 h ouvrées.</p>
              <button
                type="button"
                className="bouton bouton-md bouton-contour"
                onClick={() => {
                  setChamps(VIDE);
                  setEtat("saisie");
                }}
              >
                Nouvelle demande
              </button>
            </div>
          ) : etat === "echec" ? (
            /* La demande n'est pas perdue : elle est déjà écrite dans le lien
               WhatsApp, l'acheteur n'a plus qu'à l'envoyer. */
            <div className="confirmation" role="alert">
              <span className="confirmation-pastille confirmation-pastille-echec">
                <Icone name="fermer" size={26} />
              </span>
              <h3 className="titre-3">L&apos;envoi n&apos;a pas abouti</h3>
              <p>
                {motif === "trop-de-demandes"
                  ? "Trop de demandes envoyées depuis cet appareil. Réessayez dans un quart d'heure, ou passez par WhatsApp."
                  : "Votre demande n'a pas pu être transmise. Elle n'est pas perdue : le bouton ci-dessous l'ouvre déjà rédigée dans WhatsApp."}
              </p>
              <div className="formulaire-secours">
                <a
                  href={lienWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bouton bouton-md bouton-primaire"
                >
                  Envoyer par WhatsApp
                  <Icone name="fleche-droite" size={18} />
                </a>
                <button
                  type="button"
                  className="bouton bouton-md bouton-contour"
                  onClick={() => setEtat("saisie")}
                >
                  Réessayer
                </button>
              </div>
              <p className="formulaire-mention">
                Ou écrivez-nous directement à{" "}
                <a href={`mailto:${CONTACT.courriel}`}>{CONTACT.courriel}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={soumettre}>
              {/* Champ piège : masqué à l'œil comme au lecteur d'écran, seul un
                  robot le remplit. */}
              <div className="piege" aria-hidden="true">
                <label>
                  Ne remplissez pas ce champ
                  <input type="text" name="site" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="formulaire-grille">
                <label className="champ">
                  <span className="champ-libelle">Nom</span>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Votre nom"
                    value={champs.nom}
                    onChange={modifier("nom")}
                  />
                </label>
                <label className="champ">
                  <span className="champ-libelle">Société</span>
                  <input
                    type="text"
                    name="societe"
                    placeholder="Raison sociale"
                    required
                    value={champs.societe}
                    onChange={modifier("societe")}
                    aria-invalid={Boolean(erreurs.societe)}
                  />
                  {erreurs.societe ? (
                    <span className="champ-erreur">{erreurs.societe}</span>
                  ) : null}
                </label>
                <label className="champ">
                  <span className="champ-libelle">Pays</span>
                  <input
                    type="text"
                    name="pays"
                    placeholder="Pays de destination"
                    value={champs.pays}
                    onChange={modifier("pays")}
                  />
                </label>
                <label className="champ">
                  <span className="champ-libelle">Courriel</span>
                  <input
                    type="email"
                    name="courriel"
                    placeholder="vous@entreprise.com"
                    required
                    value={champs.courriel}
                    onChange={modifier("courriel")}
                    aria-invalid={Boolean(erreurs.courriel)}
                  />
                  {erreurs.courriel ? (
                    <span className="champ-erreur">{erreurs.courriel}</span>
                  ) : null}
                </label>
                <label className="champ">
                  <span className="champ-libelle">Produit</span>
                  {/* Groupé par famille : « Riz », « Maïs » et « Farine »
                      existent en local et à l'import, le groupe lève
                      l'ambiguïté. */}
                  <select
                    name="produit"
                    value={champs.produit}
                    onChange={modifier("produit")}
                  >
                    {PRODUITS_DEVIS.map((groupe) => (
                      <optgroup key={groupe.famille} label={groupe.famille}>
                        {groupe.options.map((produit) => (
                          <option
                            key={produit}
                            value={`${groupe.famille} — ${produit}`}
                          >
                            {produit}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Fournitures de bureau">
                      Fournitures de bureau
                    </option>
                    <option value="Autre">Autre produit</option>
                  </select>
                </label>
                <label className="champ">
                  <span className="champ-libelle">Quantité</span>
                  <input
                    type="text"
                    name="quantite"
                    placeholder="Ex. 5 t, 40 t, 2 conteneurs"
                    value={champs.quantite}
                    onChange={modifier("quantite")}
                  />
                </label>
              </div>

              <label className="champ champ-message">
                <span className="champ-libelle">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Décrivez votre besoin : spécifications, calendrier, port de destination…"
                  value={champs.message}
                  onChange={modifier("message")}
                />
              </label>

              <div className="formulaire-pied">
                <span className="formulaire-mention">
                  Réponse sous 24 h ouvrées.
                </span>
                <div className="formulaire-actions">
                  <a
                    href={lienWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bouton bouton-md bouton-contour"
                  >
                    WhatsApp
                  </a>
                  <button
                    type="submit"
                    className="bouton bouton-primaire"
                    disabled={etat === "envoi"}
                  >
                    {etat === "envoi" ? "Envoi…" : "Envoyer la demande"}
                    <Icone name="fleche-droite" />
                  </button>
                </div>
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
