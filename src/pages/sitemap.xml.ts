import type { GetServerSideProps } from "next";
import { SITE_URL } from "@/data/siccam";

/**
 * Plan de site.
 *
 * Deux pages seulement : Google les trouverait sans doute en suivant les
 * liens, mais un plan de site déclaré accélère nettement la première
 * indexation d'un site neuf, qu'aucun lien externe ne pointe encore.
 *
 * `priority` et `changefreq` sont volontairement omis : Google les ignore
 * depuis des années, les publier n'apporte rien.
 */
const PAGES = [
  { chemin: "/", modifie: "2026-08-12" },
  { chemin: "/produits", modifie: "2026-08-12" },
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = PAGES.map(
    ({ chemin, modifie }) =>
      `  <url>\n    <loc>${SITE_URL}${chemin}</loc>\n    <lastmod>${modifie}</lastmod>\n  </url>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
