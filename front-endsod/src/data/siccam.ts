import type { NomIcone } from "@/components/Icone";

/** Coordonnées de l'entreprise. */
export const CONTACT = {
  telephones: ["+237 690 498 465", "+237 622 548 649"],
  courriel: "siccamsarl@yahoo.com",
  adresse: "Olembé, Yaoundé — Cameroun",
} as const;

/** Numéro au format `tel:` (sans espaces). */
export const versTel = (numero: string) => `tel:${numero.replace(/\s/g, "")}`;

export const CHIFFRES = [
  { valeur: "20+", libelle: "partenaires commerciaux" },
  { valeur: "4", libelle: "filières exportées" },
  { valeur: "24 h", libelle: "délai de réponse à une demande" },
  { valeur: "20'", libelle: "volume minimum, un conteneur" },
] as const;

export interface Produit {
  id: string;
  nom: string;
  origine: string;
  etiquette: string;
  /** L'étiquette IGP passe en vert forêt, les autres restent blanches. */
  etiquetteIgp?: boolean;
  description: string;
  /** Spécification portée par la bande d'analyse, telle qu'elle figure au certificat. */
  spec: string;
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
    image: "/images/accueil/cacao.png",
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
    image: "/images/accueil/cafe.png",
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
    image: "/images/accueil/soja.png",
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
    image: "/images/accueil/poivre.png",
    alt: "Grains de poivre blanc de Penja dans un panier tressé",
  },
];

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

export const TEMOIGNAGES = [
  {
    citation:
      "« Trois campagnes consécutives sans un seul lot refusé à l'arrivée. C'est rare sur cette origine. »",
    auteur: "Acheteur cacao",
    role: "Négociant, Rotterdam",
  },
  {
    citation:
      "« La documentation arrive complète, du certificat d'analyse au connaissement. Aucun conteneur bloqué en douane. »",
    auteur: "Importateur",
    role: "Émirats arabes unis",
  },
  {
    citation:
      "« Le poivre de Penja qu'ils nous fournissent tient la comparaison avec les meilleurs lots que nous ayons goûtés. »",
    auteur: "Épicerie fine",
    role: "Lyon, France",
  },
] as const;

export const REFERENCES = [
  "CICC",
  "GICAM",
  "IGP Penja",
  "Port de Douala",
  "ANOR",
] as const;

export const PRODUITS_DEVIS = [
  "Cacao",
  "Café arabica",
  "Café robusta",
  "Soja grain",
  "Poivre blanc de Penja",
] as const;

/**
 * Bandes d'analyse — filets pleine largeur en monospace qui séparent les
 * sections. Chacune porte les données réelles de la section qui suit : le
 * séparateur informe au lieu de décorer. Remplace les séparateurs ondulés.
 */
export const BANDE_HERO = [
  "CAMPAGNE 2025–2026",
  "DÉPART FOB DOUALA / KRIBI",
  "LOT MINIMUM 1 × 20'",
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
  { href: "#produits", libelle: "Produits" },
  { href: "#savoir-faire", libelle: "Savoir-faire" },
  { href: "#filiere", libelle: "Notre procédé" },
  { href: "#destinations", libelle: "Destinations" },
] as const;
