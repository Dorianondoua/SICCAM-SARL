import type { GetServerSideProps } from "next";
import { SITE_URL } from "@/data/siccam";

/**
 * robots.txt servi dynamiquement plutôt que déposé dans `public/`.
 *
 * L'adresse du plan de site doit être absolue, et elle change le jour du
 * basculement sur le nom de domaine définitif. La générer ici évite d'avoir
 * une seconde adresse écrite en dur quelque part, qu'on oublierait de mettre
 * à jour.
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const contenu = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.write(contenu);
  res.end();

  return { props: {} };
};

export default function Robots() {
  return null;
}
