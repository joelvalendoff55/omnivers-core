/**
 * Brique partagee OmniVers : identite commune pour toute API ou endpoint MCP
 * expose par l'un des trois projets. L'objectif est qu'un client (humain,
 * agent IA, autre service) qui appelle n'importe quelle surface OmniVers
 * (API REST, edge function, endpoint MCP) puisse reconnaitre immediatement
 * qu'il s'agit du meme systeme, quel que soit le territoire ou l'application.
 */

export const OMNIVERS_APPS = [
    "nutri-glow-kit",
    "mon-docteur-virtuel",
    "omnisoin-sant",
  ] as const;

export type OmniversAppName = (typeof OMNIVERS_APPS)[number];

export interface OmniversIdentity {
    system: "OmniVers";
    app: OmniversAppName;
    version: string;
    tenant?: string;
}

/**
 * Construit le manifeste d'identite a renvoyer par toute API ou endpoint MCP
 * du projet (par exemple sur une route /api/health, /mcp, ou en en-tete de
 * reponse). "version" doit correspondre a la version de l'app appelante,
 * pas a celle de ce package.
 */
export function buildOmniversIdentity(
    app: OmniversAppName,
    version: string,
    tenant?: string
  ): OmniversIdentity {
    return { system: "OmniVers", app, version, tenant };
}
