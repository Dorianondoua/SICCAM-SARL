import { useState } from "react";
import { ZONES } from "@/data/siccam";

export function Destinations() {
  const [zoneActive, setZoneActive] = useState("europe");
  const zone = ZONES.find((z) => z.id === zoneActive) ?? ZONES[1];

  return (
    <section id="destinations" className="section">
      <div className="conteneur">
        <div style={{ maxWidth: 700, marginBottom: 48 }}>
          <p className="surtitre">Nos destinations</p>
          <h2 className="titre-1">
            Quinze ports desservis au départ de Douala.
          </h2>
          <p className="chapeau">
            Sélectionnez une zone pour voir les ports, les délais de transit et
            les incoterms proposés.
          </p>
        </div>

        <div className="destinations">
          <div
            className="zones-onglets"
            role="tablist"
            aria-label="Zones de destination"
          >
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                role="tab"
                id={`onglet-${z.id}`}
                aria-selected={z.id === zoneActive}
                aria-controls="fiche-zone"
                className="zone-onglet"
                onClick={() => setZoneActive(z.id)}
              >
                <span className="zone-nom">{z.nom}</span>
                <span className="zone-compteur">{z.compteur}</span>
              </button>
            ))}
          </div>

          {/* La `key` change avec la zone : React remonte la fiche, ce qui
              rejoue l'animation de bascule. Sans elle, le contenu serait
              remplacé sans qu'aucun mouvement ne le signale. */}
          <div
            key={zone.id}
            id="fiche-zone"
            role="tabpanel"
            aria-labelledby={`onglet-${zone.id}`}
            className="carte zone-fiche"
          >
            <div className="zone-fiche-entete">
              <div>
                <div className="etiquette-champ">Ports desservis</div>
                <div className="ports">
                  {zone.ports.map((port) => (
                    <span key={port} className="port">
                      {port}
                    </span>
                  ))}
                </div>
              </div>
              <div className="zone-transit">
                <div className="etiquette-champ">Transit depuis Douala</div>
                <div className="zone-transit-valeur">{zone.transit}</div>
              </div>
            </div>

            <div className="zone-fiche-details">
              <div>
                <div className="etiquette-champ">Incoterms</div>
                <div>{zone.incoterms}</div>
              </div>
              <div>
                <div className="etiquette-champ">Produits expédiés</div>
                <div>{zone.produits}</div>
              </div>
              {/* Le volume minimum a été retiré le 10 août 2026 : SICCAM
                  n'impose pas de plancher de commande. */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
