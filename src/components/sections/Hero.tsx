import Image from "next/image";
import { Icone } from "@/components/Icone";
import { BANDE_HERO, CHIFFRES } from "@/data/siccam";

export function Hero() {
  return (
    <section id="hero" className="hero">
      <Image
        src="/images/accueil/hero.webp"
        alt="Plantation de cacao au Sud-Cameroun, cabosses mûres sous le feuillage"
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      {/* Voile de protection obligatoire dès qu'un texte est posé sur photo. */}
      <div className="hero-voile" />
      <div className="hero-degrade" />

      <div className="hero-contenu">
        <div className="hero-texte">
          <p className="surtitre surtitre-hero">
            Exportateur agricole camerounais
          </p>
          <h1 className="display-1 texte-clair">
            Le meilleur du terroir camerounais, livré dans les délais.
          </h1>
          <p className="hero-chapeau">
            Cacao, café, soja grain et poivre blanc de Penja. Chaque lot est
            collecté auprès de producteurs identifiés, trié puis contrôlé avant
            départ de Douala.
          </p>
          <div className="hero-actions">
            <a href="#produits" className="bouton bouton-primaire">
              Voir nos produits
              <Icone name="fleche-droite" />
            </a>
            <a href="#contact" className="bouton bouton-clair">
              Demander un devis
            </a>
          </div>

          {/* Première bande d'analyse : la campagne en cours. */}
          <div className="bande-hero donnee" aria-hidden="true">
            {BANDE_HERO.map((donnee) => (
              <span key={donnee}>{donnee}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Chiffres() {
  return (
    <section
      aria-label="Chiffres-clés"
      style={{ padding: "clamp(40px,5vw,64px) var(--marge-page)" }}
    >
      <div className="conteneur chiffres">
        {CHIFFRES.map((chiffre) => (
          <div key={chiffre.libelle} className="chiffre">
            <div className="chiffre-valeur">{chiffre.valeur}</div>
            <div className="chiffre-libelle">{chiffre.libelle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
