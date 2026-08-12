import Head from "next/head";
import { EnTete } from "@/components/EnTete";
import { PiedDePage } from "@/components/PiedDePage";
import { Chiffres, Hero } from "@/components/sections/Hero";
import { Activites } from "@/components/sections/Activites";
import { Produits } from "@/components/sections/Produits";
import { Citation, SavoirFaire } from "@/components/sections/SavoirFaire";
import { Filiere } from "@/components/sections/Filiere";
import { Destinations } from "@/components/sections/Destinations";
import { AppelAction, Contact } from "@/components/sections/Contact";
import { Bande } from "@/components/Bande";
import {
  BANDE_DESTINATIONS,
  BANDE_FILIERE,
  BANDE_PRODUITS,
} from "@/data/siccam";

export default function Accueil() {
  return (
    <>
      <Head>
        <title>
          SICCAM SARL — Export de cacao, café, soja et poivre de Penja
        </title>
        <meta
          name="description"
          content="SICCAM SARL, exportateur agricole camerounais : cacao, café arabica et robusta, soja grain et poivre blanc de Penja IGP. Collecte, tri, contrôle qualité et expédition depuis Douala et Kribi."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="SICCAM SARL — Exportateur agricole camerounais"
        />
        <meta
          property="og:description"
          content="Cacao, café, soja grain et poivre blanc de Penja. Chaque lot est collecté auprès de producteurs identifiés, trié puis contrôlé avant départ de Douala."
        />
        <meta property="og:image" content="/images/accueil/hero.png" />
        <meta property="og:locale" content="fr_FR" />
      </Head>

      <EnTete />

      <main>
        <Hero />
        <Chiffres />

        {/* Ce que fait l'entreprise, avant de montrer ce qu'elle vend : les
            sept domaines de l'en-tête officiel. */}
        <Activites />

        {/* Les bandes d'analyse remplacent les séparateurs ondulés : chacune
            porte les données réelles de la section qu'elle introduit. */}
        <Bande donnees={BANDE_PRODUITS} />
        <Produits />

        <SavoirFaire />
        <Citation />

        <Bande donnees={BANDE_FILIERE} ton="sombre" />
        <Filiere />

        <Bande donnees={BANDE_DESTINATIONS} />
        <Destinations />

        {/* Témoignages et références sectorielles retirés : aucun des deux
            n'était vérifiable. Voir le commentaire dans src/data/siccam.ts. */}
        <Contact />
        <AppelAction />
      </main>

      <PiedDePage />
    </>
  );
}
