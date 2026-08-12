import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

/**
 * Réception des demandes de devis.
 *
 * Cette route corrige la réserve R1 du cahier des charges : jusqu'ici le
 * formulaire affichait « Demande envoyée » sans rien envoyer. Elle valide la
 * demande côté serveur — la validation du navigateur ne protège de rien, elle
 * se contourne en trois clics — puis l'expédie par SMTP.
 *
 * Le transport est volontairement générique : n'importe quel fournisseur SMTP
 * convient (Brevo, Gmail, mot de passe d'application Yahoo). Aucun service
 * propriétaire, aucune dépendance à un compte particulier. Si la configuration
 * manque, la route répond 503 et l'interface bascule sur WhatsApp plutôt que
 * de mentir au visiteur.
 */

const LIMITES = {
  nom: 120,
  societe: 160,
  pays: 80,
  courriel: 160,
  produit: 120,
  quantite: 120,
  message: 4000,
} as const;

export interface DemandeDevis {
  nom?: string;
  societe?: string;
  pays?: string;
  courriel?: string;
  produit?: string;
  quantite?: string;
  message?: string;
  /** Champ piège, invisible pour l'humain : rempli, la demande est un robot. */
  site?: string;
}

type Reponse =
  | { ok: true }
  | { ok: false; erreur: string; champs?: Record<string, string> };

/**
 * Limitation de débit en mémoire : cinq demandes par adresse et par quart
 * d'heure. Suffisant contre un script naïf.
 *
 * Réserve connue : en hébergement sans état (Vercel, Netlify), chaque instance
 * a sa propre mémoire et le compteur se réinitialise à froid. Pour un vrai
 * plafond il faudrait un stockage partagé. À ce volume de trafic, le champ
 * piège fait l'essentiel du travail.
 */
const RECENTES = new Map<string, number[]>();
const FENETRE_MS = 15 * 60 * 1000;
const MAX_PAR_FENETRE = 5;

function tropDeDemandes(ip: string) {
  const maintenant = Date.now();
  const precedentes = (RECENTES.get(ip) ?? []).filter(
    (t) => maintenant - t < FENETRE_MS,
  );
  precedentes.push(maintenant);
  RECENTES.set(ip, precedentes);
  return precedentes.length > MAX_PAR_FENETRE;
}

const COURRIEL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function nettoyer(valeur: unknown, max: number) {
  if (typeof valeur !== "string") return "";
  // Les retours à la ligne dans un en-tête de courriel permettent d'en injecter
  // d'autres : on les supprime partout sauf dans le corps du message.
  return valeur.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function valider(corps: DemandeDevis) {
  const champs: Record<string, string> = {};

  const societe = nettoyer(corps.societe, LIMITES.societe);
  const courriel = nettoyer(corps.courriel, LIMITES.courriel);

  if (!societe) champs.societe = "Indiquez la raison sociale.";
  if (!courriel) champs.courriel = "Indiquez une adresse de courriel.";
  else if (!COURRIEL_VALIDE.test(courriel))
    champs.courriel = "Cette adresse de courriel n'est pas valide.";

  return {
    champs,
    demande: {
      nom: nettoyer(corps.nom, LIMITES.nom),
      societe,
      pays: nettoyer(corps.pays, LIMITES.pays),
      courriel,
      produit: nettoyer(corps.produit, LIMITES.produit),
      quantite: nettoyer(corps.quantite, LIMITES.quantite),
      message:
        typeof corps.message === "string"
          ? corps.message.trim().slice(0, LIMITES.message)
          : "",
    },
  };
}

function enTexte(d: ReturnType<typeof valider>["demande"]) {
  return [
    "Nouvelle demande de devis — site SICCAM SARL",
    "",
    `Société    : ${d.societe}`,
    `Nom        : ${d.nom || "—"}`,
    `Courriel   : ${d.courriel}`,
    `Pays       : ${d.pays || "—"}`,
    `Produit    : ${d.produit || "—"}`,
    `Quantité   : ${d.quantite || "—"}`,
    "",
    "Message :",
    d.message || "—",
  ].join("\n");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Reponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, erreur: "methode" });
  }

  const corps = (req.body ?? {}) as DemandeDevis;

  // Champ piège : on répond 200 sans rien envoyer. Un robot averti qu'il a été
  // repéré adapte sa prochaine tentative.
  if (typeof corps.site === "string" && corps.site.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "inconnue";

  if (tropDeDemandes(ip)) {
    return res.status(429).json({ ok: false, erreur: "trop-de-demandes" });
  }

  const { champs, demande } = valider(corps);
  if (Object.keys(champs).length > 0) {
    return res.status(400).json({ ok: false, erreur: "validation", champs });
  }

  const hote = process.env.SMTP_HOTE;
  const utilisateur = process.env.SMTP_UTILISATEUR;
  const motDePasse = process.env.SMTP_MOTDEPASSE;
  const destinataire = process.env.DEVIS_DESTINATAIRE;

  // Configuration absente : on le dit franchement plutôt que d'afficher une
  // confirmation mensongère. L'interface bascule alors sur WhatsApp.
  if (!hote || !utilisateur || !motDePasse || !destinataire) {
    console.error(
      "[devis] SMTP non configuré — demande reçue mais non transmise.",
    );
    return res.status(503).json({ ok: false, erreur: "non-configure" });
  }

  const port = Number(process.env.SMTP_PORT ?? 587);

  try {
    const transport = nodemailer.createTransport({
      host: hote,
      port,
      // 465 est le port TLS implicite ; 587 passe par STARTTLS.
      secure: port === 465,
      auth: { user: utilisateur, pass: motDePasse },
    });

    /**
     * Répondre au courriel devrait répondre à l'acheteur plutôt qu'à la boîte
     * technique. Mais Yahoo rejette tout `Reply-To` qui ne correspond pas au
     * compte authentifié — « 550 No MIME Reply-To header matches auth
     * mailboxes » —, une protection anti-usurpation qu'aucun en-tête ne
     * contourne. D'où ce réglage, à désactiver sur Yahoo et à laisser actif
     * partout ailleurs. L'adresse de l'acheteur figure de toute façon en clair
     * dans le corps du message.
     */
    const replyToAcheteur = process.env.DEVIS_REPLYTO_ACHETEUR !== "0";

    await transport.sendMail({
      from: process.env.DEVIS_EXPEDITEUR ?? utilisateur,
      to: destinataire,
      ...(replyToAcheteur
        ? { replyTo: `${demande.societe} <${demande.courriel}>` }
        : {}),
      subject: `Demande de devis — ${demande.societe}${
        demande.produit ? ` — ${demande.produit}` : ""
      }`,
      text: enTexte(demande),
    });

    return res.status(200).json({ ok: true });
  } catch (erreur) {
    console.error("[devis] échec de l'envoi :", erreur);
    return res.status(502).json({ ok: false, erreur: "envoi" });
  }
}
