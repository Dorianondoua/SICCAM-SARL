import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Bricolage_Grotesque, IBM_Plex_Mono, Public_Sans } from "next/font/google";

/**
 * Substitution Google Fonts assumée par le design system : aucune police de
 * marque n'a été fournie par SICCAM.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--police-display",
  display: "swap",
});

const texte = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--police-texte",
  display: "swap",
});

/**
 * Police utilitaire du langage documentaire : bandes d'analyse, spécifications,
 * incoterms, références de lot. IBM Plex Mono est dessinée pour la
 * documentation technique — pas une police de code, pas une police décorative.
 */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--police-mono",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`racine ${display.variable} ${texte.variable} ${mono.variable}`}
    >
      <Component {...pageProps} />
    </div>
  );
}
