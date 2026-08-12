/**
 * Vérifie que les identifiants SMTP de .env.local fonctionnent, et envoie un
 * courriel d'essai à l'adresse de destination.
 *
 *   npm run verifier-smtp
 *
 * Écrit pour être lancé avant la mise en ligne, puis à chaque changement de
 * mot de passe d'application. Diagnostiquer ici prend dix secondes ; le faire
 * à travers le formulaire en prend dix minutes.
 */
import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";

function lireEnv(chemin) {
  try {
    const variables = {};
    for (const ligne of readFileSync(chemin, "utf8").split("\n")) {
      const nettoyee = ligne.trim();
      if (!nettoyee || nettoyee.startsWith("#")) continue;
      const separateur = nettoyee.indexOf("=");
      if (separateur === -1) continue;
      variables[nettoyee.slice(0, separateur).trim()] = nettoyee
        .slice(separateur + 1)
        .trim();
    }
    return variables;
  } catch {
    return {};
  }
}

const env = { ...lireEnv(".env.local"), ...process.env };

const hote = env.SMTP_HOTE;
const utilisateur = env.SMTP_UTILISATEUR;
const motDePasse = env.SMTP_MOTDEPASSE;
const destinataire = env.DEVIS_DESTINATAIRE;
const port = Number(env.SMTP_PORT ?? 587);

const manquantes = Object.entries({
  SMTP_HOTE: hote,
  SMTP_UTILISATEUR: utilisateur,
  SMTP_MOTDEPASSE: motDePasse,
  DEVIS_DESTINATAIRE: destinataire,
})
  .filter(([, valeur]) => !valeur)
  .map(([nom]) => nom);

if (manquantes.length > 0) {
  console.error("✗ Variables manquantes dans .env.local :");
  for (const nom of manquantes) console.error(`  - ${nom}`);
  console.error(
    "\nAvec Brevo : SMTP_UTILISATEUR est l'adresse du compte, SMTP_MOTDEPASSE",
    "\nest la clé SMTP générée dans « SMTP & API » — pas le mot de passe de",
    "\nconnexion à Brevo.",
  );
  process.exit(1);
}

const transport = nodemailer.createTransport({
  host: hote,
  port,
  secure: port === 465,
  auth: { user: utilisateur, pass: motDePasse },
});

try {
  console.log(`… connexion à ${hote}:${port} en tant que ${utilisateur}`);
  await transport.verify();
  console.log("✓ Connexion et authentification acceptées.");

  const envoi = await transport.sendMail({
    from: env.DEVIS_EXPEDITEUR || utilisateur,
    to: destinataire,
    subject: "Essai — formulaire de devis SICCAM SARL",
    text:
      "Si vous lisez ce message, le formulaire de devis du site est en état " +
      "de fonctionner.\n\nCe courriel a été envoyé par npm run verifier-smtp.",
  });

  console.log(`✓ Courriel d'essai envoyé à ${destinataire} (${envoi.messageId})`);
  console.log("  Vérifiez la boîte de réception, et le dossier indésirables.");
} catch (erreur) {
  console.error("✗ Échec :", erreur.message);
  if (/invalid|credential|auth/i.test(erreur.message)) {
    console.error(
      "\n  Cause la plus fréquente : le mot de passe du compte a été utilisé",
      "\n  à la place d'un mot de passe d'application.",
    );
  }
  process.exit(1);
}
