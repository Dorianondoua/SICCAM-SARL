import type { NomIcone } from "@/components/Icone";

/** Coordonnées de l'entreprise. */
export const CONTACT = {
  telephones: ["+237 690 498 465", "+237 622 548 649"],
  courriel: "siccamsarl@yahoo.com",
  adresse: "Olembé, Yaoundé — Cameroun",
  /** Numéro recevant les demandes de devis par WhatsApp (choix SICCAM). */
  whatsapp: "+237 690 498 465",
} as const;

/** Numéro au format `tel:` (sans espaces). */
export const versTel = (numero: string) => `tel:${numero.replace(/\s/g, "")}`;

/**
 * Lien WhatsApp avec message pré-rempli.
 *
 * `wa.me` attend le numéro international sans « + » ni séparateur. Le texte
 * passe en paramètre encodé : l'acheteur ouvre une conversation où sa demande
 * est déjà écrite, il n'a plus qu'à envoyer.
 */
export const versWhatsApp = (numero: string, texte: string) =>
  `https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(texte)}`;

/**
 * Les sections de l'accueil sont atteintes par ancre. Depuis une autre page,
 * l'ancre seule ne mène nulle part : elle doit être préfixée par la racine.
 */
export const versAncre = (href: string, surAccueil: boolean) =>
  href.startsWith("#") && !surAccueil ? `/${href}` : href;

/**
 * Chiffres validés par SICCAM le 10 août 2026.
 *
 * Le volume minimum d'un conteneur 20 pieds a été retiré à cette occasion :
 * l'entreprise n'impose pas de plancher. Toute mention d'un lot minimum a donc
 * disparu du site — bande du héros, fiche de destination, chiffres-clés.
 */
export const CHIFFRES = [
  { valeur: "20+", libelle: "partenaires commerciaux" },
  { valeur: "4", libelle: "filières exportées" },
  { valeur: "24 h", libelle: "délai de réponse à une demande" },
] as const;

/**
 * Une fiche produit.
 *
 * Seuls `id`, `nom`, `image` et `alt` sont obligatoires. Les quatre champs
 * commerciaux — origine, étiquette, description, spécification — sont
 * facultatifs, et c'est délibéré : ils ne sont renseignés que pour les
 * produits dont les données figurent au cahier des charges §3.1. Une carte
 * sans ces champs affiche « Spécifications sur demande » plutôt qu'une valeur
 * inventée. Une spécification publiée est un engagement opposable : il vaut
 * mieux ne rien annoncer que d'annoncer un chiffre que SICCAM n'a pas validé.
 */
export interface Produit {
  id: string;
  nom: string;
  origine?: string;
  etiquette?: string;
  /** L'étiquette IGP passe en vert forêt, les autres restent blanches. */
  etiquetteIgp?: boolean;
  description?: string;
  /** Spécification portée par la bande d'analyse, telle qu'elle figure au certificat. */
  spec?: string;
  image: string;
  alt: string;
}

export const PRODUITS: Produit[] = [
  {
    id: "cacao",
    nom: "Cacao",
    origine: "Sud, Centre, Littoral",
    etiquette: "Grade I",
    description:
      "Fèves fermentées six jours, séchées au soleil. Humidité ≤ 7,5 %, grainage 95 à 105 fèves aux 100 g.",
    spec: "HUM. ≤ 7,5 % · 95–105 FÈVES/100 G",
    image: "/images/accueil/cacao.webp",
    alt: "Fèves de cacao en cours de séchage sur claies de bois",
  },
  {
    id: "cafe",
    nom: "Café",
    origine: "Ouest, Nord-Ouest, Moungo",
    etiquette: "Screen 15+",
    description:
      "Arabica lavé d'altitude et robusta du Moungo, triés densimétriquement. Humidité 10 à 12 %.",
    // La pastille porte déjà « Screen 15+ » : la ligne d'analyse ne la répète pas.
    spec: "HUM. 10–12 % · ARABICA & ROBUSTA",
    image: "/images/accueil/cafe.webp",
    alt: "Sacs de jute remplis de café vert dans un entrepôt",
  },
  {
    id: "soja",
    nom: "Soja grain",
    origine: "Nord, Adamaoua, Est",
    etiquette: "Non-OGM",
    description:
      "Variétés conventionnelles pour trituration et alimentation animale. Protéines ≥ 36 %, impuretés ≤ 2 %.",
    spec: "PROT. ≥ 36 % · IMPUR. ≤ 2 %",
    image: "/images/accueil/soja.webp",
    alt: "Grains de soja en tas dans une caisse de tri",
  },
  {
    id: "poivre",
    nom: "Poivre blanc de Penja",
    origine: "Penja, vallée du Moungo",
    etiquette: "IGP",
    etiquetteIgp: true,
    description:
      "Indication géographique protégée. Sols volcaniques, rouissage puis séchage. Calibre 4 à 5 mm.",
    // La pastille porte déjà « IGP » : la ligne d'analyse ne la répète pas.
    spec: "CALIBRE 4–5 MM · VALLÉE DU MOUNGO",
    image: "/images/accueil/poivre.webp",
    alt: "Grains de poivre blanc de Penja dans un panier tressé",
  },
];

/* ==========================================================================
   Catalogue complet — page /produits
   --------------------------------------------------------------------------
   RÈGLE DE VÉRACITÉ. Une seule source fait foi pour les données commerciales :
   le cahier des charges §3.1, qui ne couvre que les quatre filières d'export
   (cacao, café, soja grain, poivre blanc de Penja). Ces quatre-là portent leur
   origine, leur étiquette et leur ligne d'analyse.

   Les dix-sept autres produits ne sont documentés nulle part : SICCAM n'a
   fourni que leur nom. Ils n'affichent donc ni origine, ni étiquette, ni
   spécification — la carte renvoie vers une demande de devis. Ne pas remplir
   ces champs « pour faire joli » : une spécification publiée est un engagement
   opposable, et un chiffre inventé se retourne contre l'entreprise au premier
   litige de lot.

   Pour compléter une fiche : demander à SICCAM l'origine réelle, l'étiquette
   de qualité pratiquée et la spécification portée au certificat, puis ajouter
   les champs. Le gabarit de carte s'adapte tout seul.
   ========================================================================== */

export const PRODUITS_LOCAUX: Produit[] = [
  // --- Les quatre filières d'export : données validées (cahier §3.1) ---
  {
    id: "cacao",
    nom: "Cacao",
    origine: "Sud, Centre, Littoral",
    etiquette: "Grade I",
    description:
      "Fèves fermentées six jours, séchées au soleil. Humidité ≤ 7,5 %, grainage 95 à 105 fèves aux 100 g.",
    spec: "HUM. ≤ 7,5 % · 95–105 FÈVES/100 G",
    image: "/images/produits/locaux/cacao.webp",
    alt: "Fèves de cacao en cours de séchage sur claies de bois",
  },
  {
    id: "cafe",
    nom: "Café arabica et robusta",
    origine: "Ouest, Nord-Ouest, Moungo",
    etiquette: "Screen 15+",
    description:
      "Arabica lavé d'altitude et robusta du Moungo, triés densimétriquement. Humidité 10 à 12 %.",
    spec: "HUM. 10–12 % · ARABICA & ROBUSTA",
    image: "/images/produits/locaux/cafe.webp",
    alt: "Sacs de jute remplis de café vert dans un entrepôt",
  },
  {
    id: "poivre",
    nom: "Poivre blanc de Penja",
    origine: "Penja, vallée du Moungo",
    etiquette: "IGP",
    etiquetteIgp: true,
    description:
      "Indication géographique protégée. Sols volcaniques, rouissage puis séchage. Calibre 4 à 5 mm.",
    spec: "CALIBRE 4–5 MM · VALLÉE DU MOUNGO",
    image: "/images/produits/locaux/poivre.webp",
    alt: "Grains de poivre blanc de Penja dans un panier tressé",
  },
  {
    id: "soja",
    nom: "Soja grain",
    origine: "Nord, Adamaoua, Est",
    etiquette: "Non-OGM",
    description:
      "Variétés conventionnelles pour trituration et alimentation animale. Protéines ≥ 36 %, impuretés ≤ 2 %.",
    spec: "PROT. ≥ 36 % · IMPUR. ≤ 2 %",
    image: "/images/produits/locaux/soja.webp",
    alt: "Grains de soja en tas dans une caisse de tri",
  },

  // --- Le reste du terroir : nom et visuel seulement, en attente de SICCAM ---
  {
    id: "mais",
    nom: "Maïs",
    image: "/images/produits/locaux/mais.webp",
    alt: "Grains de maïs jaune séchés versés dans un panier tressé",
  },
  {
    id: "riz",
    nom: "Riz local",
    image: "/images/produits/locaux/riz.webp",
    alt: "Riz blanc long grain versé dans un panier tressé",
  },
  {
    id: "manioc",
    nom: "Manioc",
    image: "/images/produits/locaux/manioc.webp",
    alt: "Racines de manioc fraîchement récoltées empilées dans une caisse",
  },
  {
    id: "mil-rouge",
    nom: "Mil rouge",
    image: "/images/produits/locaux/mil-rouge.webp",
    alt: "Mil rouge dans une calebasse devant des épis de mil séchés",
  },
  {
    id: "farine",
    nom: "Farine",
    image: "/images/produits/locaux/farine.webp",
    alt: "Farine blanche en sac de jute ouvert avec une pelle en bois",
  },
  {
    id: "tourteau-arachide",
    nom: "Tourteau d'arachide",
    image: "/images/produits/locaux/tourteau-arachide.webp",
    alt: "Tourteau d'arachide en granulés ocre sortant d'un sac de jute",
  },
  {
    id: "banane-plantain",
    nom: "Banane plantain",
    image: "/images/produits/locaux/banane-plantain.webp",
    alt: "Régime de bananes plantains vertes posé sur des feuilles de bananier",
  },
  {
    id: "fruits-legumes",
    nom: "Fruits et légumes",
    image: "/images/produits/locaux/fruits-legumes.webp",
    alt: "Étal de fruits et légumes frais dans des paniers tressés",
  },
  {
    id: "elevage",
    nom: "Produits d'élevage",
    image: "/images/produits/locaux/elevage.webp",
    alt: "Troupeau de zébus et de chèvres dans un enclos au coucher du soleil",
  },
  {
    id: "intrants-agricoles",
    nom: "Intrants agricoles",
    image: "/images/produits/locaux/intrants-agricoles.webp",
    alt: "Sacs d'engrais et de semences empilés sur palettes dans un entrepôt",
  },
];

/**
 * Les sept denrées d'import-distribution. La liste est celle du cahier des
 * charges §1.1, mot pour mot. Origines et spécifications non communiquées.
 */
export const PRODUITS_IMPORTES: Produit[] = [
  {
    id: "riz-importe",
    nom: "Riz",
    image: "/images/produits/importes/riz.webp",
    alt: "Sacs de riz empilés sur palettes dans un entrepôt",
  },
  {
    id: "mais-importe",
    nom: "Maïs",
    image: "/images/produits/importes/mais.webp",
    alt: "Maïs jaune en vrac et sac ouvert dans un entrepôt",
  },
  {
    id: "farine-importee",
    nom: "Farine",
    image: "/images/produits/importes/farine.webp",
    alt: "Sacs de farine blanche palettisés dans un entrepôt",
  },
  {
    id: "pates-alimentaires",
    nom: "Pâtes alimentaires",
    image: "/images/produits/importes/pates-alimentaires.webp",
    alt: "Pâtes sèches longues et courtes présentées dans des caisses en bois",
  },
  {
    id: "sucre",
    nom: "Sucre",
    image: "/images/produits/importes/sucre.webp",
    alt: "Sucre blanc cristallisé s'écoulant d'un sac ouvert",
  },
  {
    id: "sardines",
    nom: "Sardines",
    image: "/images/produits/importes/sardines.webp",
    alt: "Boîtes de conserve de sardines empilées dans un entrepôt",
  },
  {
    id: "tourteau-soja",
    nom: "Tourteau de soja",
    image: "/images/produits/importes/tourteau-soja.webp",
    alt: "Tourteau de soja en granulés clairs sortant d'un sac de vrac",
  },
];

/* --------------------------------------------------------------------------
   Commerce général — fournitures de bureau

   « Commerce général » figure aux domaines d'intervention de l'en-tête
   officiel ; SICCAM a confirmé le 10 août 2026 y vendre des fournitures de
   bureau. C'est tout ce qui est établi : aucune autre famille de commerce
   général n'est annoncée ici tant qu'elle n'est pas confirmée.

   Ces cinq entrées sont des rubriques, pas des références. Une papeterie ne
   s'énumère pas article par article, et une liste de cinq articles ferait
   passer une offre large pour une offre pauvre.
   -------------------------------------------------------------------------- */

export interface Fourniture {
  id: string;
  nom: string;
  exemples: string;
  image: string;
  alt: string;
}

export const FOURNITURES: Fourniture[] = [
  {
    id: "cahiers",
    nom: "Cahiers et papeterie scolaire",
    exemples: "Cahiers, blocs, carnets",
    image: "/images/produits/bureau/cahiers.webp",
    alt: "Piles de cahiers à couverture kraft sur un comptoir en bois, un cahier ouvert sur des pages lignées",
  },
  {
    id: "ramettes",
    nom: "Ramettes de papier",
    exemples: "Papier A4, papier listing",
    image: "/images/produits/bureau/ramettes.webp",
    alt: "Ramettes de papier blanc empilées sur une étagère en bois",
  },
  {
    id: "ecriture",
    nom: "Matériel d'écriture",
    exemples: "Stylos, crayons, marqueurs",
    image: "/images/produits/bureau/ecriture.webp",
    alt: "Stylos, crayons et marqueurs rangés dans un panier tressé sur un plan de travail en bois",
  },
  {
    id: "classement",
    nom: "Articles de classement",
    exemples: "Chemises, classeurs, boîtes d'archives",
    image: "/images/produits/bureau/classement.webp",
    alt: "Chemises cartonnées, classeurs et boîtes d'archives kraft rangés sur une étagère",
  },
  {
    id: "petit-materiel",
    nom: "Petit matériel de bureau",
    exemples: "Agrafeuses, perforateurs, ciseaux",
    image: "/images/produits/bureau/petit-materiel.webp",
    alt: "Agrafeuse, perforateur, ciseaux et trombones disposés sur un bureau en bois",
  },
];

export interface Famille {
  id: string;
  nom: string;
  surtitre: string;
  titre: string;
  chapeau: string;
  produits: Produit[];
}

export const FAMILLES: Famille[] = [
  {
    id: "locaux",
    nom: "Produits locaux",
    surtitre: "Terroir camerounais",
    titre: "Quatorze produits collectés au Cameroun.",
    // Formulation reprise du cahier des charges §1.1 : collecte auprès de
    // producteurs identifiés, conditionnement, contrôle qualité, mise à FOB.
    // Aucune affirmation qui n'y figure pas.
    chapeau:
      "Collecte auprès de producteurs identifiés, conditionnement et contrôle qualité. Nos quatre filières d'export portent leurs spécifications ; pour les autres produits, demandez-nous la fiche.",
    produits: PRODUITS_LOCAUX,
  },
  {
    id: "importes",
    nom: "Produits importés",
    surtitre: "Négoce et import-distribution",
    titre: "Sept denrées stratégiques.",
    chapeau:
      "Négoce et import-distribution de denrées de grande consommation. Origines, conditionnements et disponibilités communiqués sur demande.",
    produits: PRODUITS_IMPORTES,
  },
];

/**
 * Le certificat d'analyse par lot ne vaut que pour les quatre filières
 * d'export : la bande du catalogue ne le promet donc pas sur les vingt et une
 * références, elle renvoie à la demande.
 */
export const BANDE_CATALOGUE = [
  "21 DENRÉES · 5 RUBRIQUES DE BUREAU",
  "14 LOCALES · 7 IMPORTÉES",
  "SPÉCIFICATIONS SUR DEMANDE",
] as const;

/**
 * Domaines d'intervention de SICCAM SARL.
 *
 * SOURCE : en-tête de courrier officiel SICCAM SARL, Yaoundé, 3 août 2026.
 * La liste est reprise telle quelle, dans l'ordre du document — aucun domaine
 * ajouté, aucun retiré, aucune description inventée. Le cahier des charges
 * §1.1 la recoupe pour la partie agricole.
 *
 * L'en-tête porte « Agriculture bio et » et « Industrielle » sur deux puces
 * successives : c'est bien un seul domaine coupé par le retour à la ligne.
 * Confirmé par SICCAM le 10 août 2026 — l'entreprise est industrielle et
 * pratique aussi l'agriculture biologique.
 */
export const ACTIVITES = [
  "Commercialisation",
  "Agriculture bio et industrielle",
  "Produits agro-pastoraux",
  "Commerce général",
  "Import-export",
  "Prestation de services",
  "Négoce",
] as const;

export interface PointFort {
  icone: NomIcone;
  ton: "brique" | "foret";
  titre: string;
  description: string;
}

export const POINTS_FORTS: PointFort[] = [
  {
    icone: "bouclier",
    ton: "brique",
    titre: "Contrôle qualité",
    description:
      "Humidité, grainage et corps étrangers analysés avant chaque chargement.",
  },
  {
    icone: "pousse",
    ton: "foret",
    titre: "Achat direct",
    description: "Prix annoncé en début de campagne, paiement à l'enlèvement.",
  },
  {
    icone: "document",
    ton: "brique",
    titre: "Documentation complète",
    description:
      "Certificat d'analyse, phytosanitaire et connaissement fournis avec chaque lot.",
  },
  {
    icone: "ancre",
    ton: "foret",
    titre: "Départ Douala et Kribi",
    description:
      "Empotage, transit douanier et suivi jusqu'au port de destination.",
  },
];

export const ETAPES = [
  {
    numero: "01",
    titre: "Producteur",
    description: "Parcelles identifiées, appui technique et contrat de campagne.",
  },
  {
    numero: "02",
    titre: "Collecte",
    description: "Ramassage en zone, pesée contradictoire, enregistrement du lot.",
  },
  {
    numero: "03",
    titre: "Traitement",
    description: "Séchage, tri densimétrique et calibrage en entrepôt ventilé.",
  },
  {
    numero: "04",
    titre: "Contrôle qualité",
    description: "Échantillon scellé par lot, analyse et certificat avant départ.",
  },
  {
    numero: "05",
    titre: "Logistique",
    description: "Empotage conteneur, transit douanier, acheminement au port.",
  },
  {
    numero: "06",
    titre: "Export",
    description: "Départ FOB Douala ou Kribi, suivi jusqu'au port de destination.",
  },
] as const;

export interface Zone {
  id: string;
  nom: string;
  compteur: string;
  transit: string;
  ports: string[];
  incoterms: string;
  produits: string;
}

export const ZONES: Zone[] = [
  {
    id: "afrique",
    nom: "Afrique",
    compteur: "4 ports",
    transit: "7 à 18 j",
    ports: ["Lagos", "Libreville", "Le Cap", "Durban"],
    incoterms: "EXW, FOB, CFR",
    produits: "Soja, café, cacao",
  },
  {
    id: "europe",
    nom: "Europe",
    compteur: "4 ports",
    transit: "18 à 24 j",
    ports: ["Rotterdam", "Anvers", "Le Havre", "Gênes"],
    incoterms: "FOB, CFR, CIF",
    produits: "Cacao, café, poivre",
  },
  {
    id: "asie",
    nom: "Asie",
    compteur: "4 ports",
    transit: "26 à 34 j",
    ports: ["Singapour", "Shanghai", "Hô-Chi-Minh-Ville", "Karachi"],
    incoterms: "FOB, CFR",
    produits: "Cacao, soja, poivre",
  },
  {
    id: "moyen-orient",
    nom: "Moyen-Orient",
    compteur: "3 ports",
    transit: "20 à 26 j",
    ports: ["Jebel Ali", "Dammam", "Mersin"],
    incoterms: "FOB, CIF",
    produits: "Café, soja, poivre",
  },
];

/* --------------------------------------------------------------------------
   Témoignages et références sectorielles — RETIRÉS le 10 août 2026.

   Les trois témoignages venaient de la maquette et n'ont jamais correspondu à
   des clients réels : un faux avis est une pratique commerciale trompeuse, et
   le premier prospect qui demande une référence vérifiable met l'entreprise en
   difficulté. Le bandeau CICC · GICAM · IGP Penja · Port de Douala · ANOR est
   retiré pour la même raison : afficher un organisme suggère une adhésion ou
   un agrément, et aucun n'est établi à ce jour.

   Pour les remettre : de vrais verbatims avec l'accord écrit de leurs auteurs,
   et pour chaque organisme la preuve de l'adhésion ou de l'agrément. Le code
   de la section est récupérable dans l'historique git
   (src/components/sections/Temoignages.tsx).
   -------------------------------------------------------------------------- */

/**
 * Liste déroulante du formulaire de devis : le catalogue complet, groupé par
 * famille, plus une entrée libre pour les demandes hors catalogue.
 */
export const PRODUITS_DEVIS = FAMILLES.map((famille) => ({
  famille: famille.nom,
  options: famille.produits.map((produit) => produit.nom),
}));

/**
 * Bandes d'analyse — filets pleine largeur en monospace qui séparent les
 * sections. Chacune porte les données réelles de la section qui suit : le
 * séparateur informe au lieu de décorer. Remplace les séparateurs ondulés.
 */
// ⚠ « CAMPAGNE 2025–2026 » : millésime hérité de la maquette. À reprendre à
// chaque ouverture de campagne, sinon la bande date le site.
export const BANDE_HERO = [
  "CAMPAGNE 2025–2026",
  "DÉPART FOB DOUALA / KRIBI",
  "RÉPONSE SOUS 24 H",
] as const;

export const BANDE_PRODUITS = [
  "4 FILIÈRES",
  "CERTIFICAT D'ANALYSE PAR LOT",
  "ÉCHANTILLON SUR DEMANDE",
] as const;

export const BANDE_FILIERE = [
  "TRAÇABILITÉ",
  "IDENTIFIANT DE LOT CONSERVÉ JUSQU'AU CONNAISSEMENT",
  "6 ÉTAPES",
] as const;

export const BANDE_DESTINATIONS = [
  "15 PORTS DESSERVIS",
  "EXW / FOB / CFR / CIF",
  "TRANSIT 7–34 J",
] as const;

export const NAVIGATION = [
  { href: "#activites", libelle: "Activités" },
  { href: "/produits", libelle: "Produits" },
  { href: "#savoir-faire", libelle: "Savoir-faire" },
  { href: "#filiere", libelle: "Notre procédé" },
  { href: "#destinations", libelle: "Destinations" },
] as const;
