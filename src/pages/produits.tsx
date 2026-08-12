import Head from "next/head";
import Image from "next/image";
import { EnTete } from "@/components/EnTete";
import { PiedDePage } from "@/components/PiedDePage";
import { Bande } from "@/components/Bande";
import { Icone } from "@/components/Icone";
import { Catalogue } from "@/components/sections/Catalogue";
import { CommerceGeneral } from "@/components/sections/CommerceGeneral";
import { AppelAction, Contact } from "@/components/sections/Contact";
import {
  BANDE_CATALOGUE,
  FAMILLES,
  FOURNITURES,
  SITE_URL,
} from "@/data/siccam";

export default function PageProduits() {
  return (
    <>
      <Head>
        <title>
          Catalogue produits — SICCAM SARL | Terroir camerounais et import
        </title>
        <meta
          name="description"
          content="Catalogue SICCAM SARL : 14 produits du terroir camerounais (cacao, café, poivre blanc de Penja IGP, soja grain, maïs, manioc, plantain, élevage), 7 denrées d'import-distribution (riz, farine, pâtes, sucre, sardines, tourteau de soja) et les fournitures de bureau."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Catalogue produits — SICCAM SARL"
        />
        <meta
          property="og:description"
          content="Produits locaux du terroir camerounais et denrées importées. Spécifications et échantillons sur demande."
        />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/produits/locaux/cacao.webp`}
        />
        <meta property="og:url" content={`${SITE_URL}/produits`} />
        <meta property="og:site_name" content="SICCAM SARL" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${SITE_URL}/produits`} />
        <meta property="og:image" content="/images/produits/locaux/cacao.webp" />
        <meta property="og:locale" content="fr_FR" />
      </Head>

      <EnTete />

      <main>
        {/* Héros de page intérieure : moitié moins haut que celui de
            l'accueil, la grille produit doit arriver vite. */}
        <section className="hero hero-page">
          <Image
            src="/images/produits/locaux/cacao.webp"
            alt="Cabosses de cacao ouvertes sur des feuilles de bananier"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-voile" />
          <div className="hero-degrade" />

          <div className="hero-contenu">
            <div className="hero-texte">
              <p className="surtitre surtitre-hero">Catalogue</p>
              <h1 className="display-1 texte-clair">
                Le terroir, l&apos;import, et les fournitures.
              </h1>
              <p className="hero-chapeau">
                Les produits que nous collectons au Cameroun, les denrées que
                nous importons, et les fournitures de bureau. Nos quatre
                filières d&apos;export portent leurs spécifications ; pour le
                reste, écrivez-nous.
              </p>

              <div className="familles-liens">
                {FAMILLES.map((famille) => (
                  <a
                    key={famille.id}
                    href={`#${famille.id}`}
                    className="famille-lien"
                  >
                    {famille.nom}
                    <span className="famille-lien-compte">
                      {famille.produits.length}
                    </span>
                  </a>
                ))}
                <a href="#bureau" className="famille-lien">
                  Fournitures de bureau
                  <span className="famille-lien-compte">
                    {FOURNITURES.length}
                  </span>
                </a>
                <a href="#contact" className="famille-lien">
                  Demander un devis
                  <Icone name="fleche-droite" size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Bande donnees={BANDE_CATALOGUE} />

        <Catalogue />

        {/* Troisième bloc, gabarit distinct : le commerce général ne se
            présente pas comme une filière d'export. */}
        <CommerceGeneral />

        <Contact />
        <AppelAction />
      </main>

      <PiedDePage />
    </>
  );
}
