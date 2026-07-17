/**
 * Brique partagee OmniVers : contrat de theme.
 * La substance (echelles, motion, couleurs semantiques cliniques) est
 * invariante entre les trois apps. Les attributs (primaire, accent, fond,
 * polices) sont themables par tenant/territoire.
 */

/** Tokens de substance, identiques dans toutes les apps OmniVers. */
export const OMNIVERS_SUBSTANCE = {
    spacing: [4, 8, 12, 16, 24, 32, 48, 64],
    fontSizePx: [12.8, 16, 20, 25, 31.25, 39],
    radiusRem: 0.75,
    motionMs: { micro: 150, transition: 250, max: 400 },
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    touchTargetPx: 44,
    /** Couleurs semantiques cliniques, invariantes (format HSL "H S% L%"). */
    semanticHsl: {
          success: "142 60% 38%",
          warning: "35 90% 44%",
          destructive: "4 72% 45%",
          info: "210 80% 45%",
          ai: "265 55% 52%",
    },
    /** Memes couleurs en oklch (apps Tailwind 4). */
    semanticOklch: {
          success: "oklch(0.55 0.13 155)",
          warning: "oklch(0.68 0.15 65)",
          destructive: "oklch(0.55 0.19 25)",
          info: "oklch(0.58 0.13 245)",
          ai: "oklch(0.55 0.17 295)",
    },
} as const;

/** Variables CSS qu'un tenant a le droit de definir. Rien d'autre. */
export interface OmniversTenantTheme {
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    card: string;
    fontHeading?: string;
    fontBody?: string;
}

const VAR_MAP: Record<string, string> = {
    primary: "--primary",
    primaryForeground: "--primary-foreground",
    accent: "--accent",
    accentForeground: "--accent-foreground",
    background: "--background",
    card: "--card",
    fontHeading: "--font-heading",
    fontBody: "--font-body",
};

/**
 * Injecte le theme du tenant dans :root a l'execution.
 * Ne touche qu'aux variables du contrat : un tenant ne peut pas
 * redefinir les couleurs semantiques cliniques ni les echelles.
 */
export function applyTenantTheme(
    theme: OmniversTenantTheme,
    root: { style: { setProperty(name: string, value: string): void } }
  ): void {
    for (const key of Object.keys(VAR_MAP)) {
          const value = (theme as Record<string, string | undefined>)[key];
          if (value) root.style.setProperty(VAR_MAP[key], value);
    }
}

/** Theme d'exemple : tenant Conakry (omnisoin-sant), derive de l'existant. */
export const TENANT_THEME_CONAKRY: OmniversTenantTheme = {
    primary: "224 69% 33%",
    primaryForeground: "0 0% 100%",
    accent: "43 76% 53%",
    accentForeground: "222 47% 11%",
    background: "220 30% 97%",
    card: "0 0% 100%",
    fontHeading: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
};
