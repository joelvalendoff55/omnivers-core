/**
 * Brique partagee OmniVers : configuration multi-tenant.
 * Generalise le pattern .env.tenant.example deja utilise dans omnisoin-sant
 * (un meme noyau applicatif, redeploye pour chaque territoire/etablissement
 * avec juste ces valeurs qui changent).
 */

export interface OmniversTenantConfig {
    name: string;
    subtitle: string;
    emailPlaceholder: string;
    supportUrl: string;
}

export type TenantEnv = Record<string, string | undefined>;

const DEFAULTS: OmniversTenantConfig = {
    name: "OmniVers",
    subtitle: "",
    emailPlaceholder: "vous@exemple.com",
    supportUrl: "",
};

/**
 * Lit la configuration du tenant courant depuis les variables d'environnement
 * VITE_TENANT_NAME, VITE_TENANT_SUBTITLE, VITE_TENANT_EMAIL_PLACEHOLDER,
 * VITE_TENANT_SUPPORT_URL. Toute valeur absente retombe sur un defaut neutre,
 * jamais sur une erreur : le noyau doit rester deployable meme sans config
 * tenant explicite.
 */
export function readTenantConfig(env: TenantEnv): OmniversTenantConfig {
    return {
          name: env.VITE_TENANT_NAME || DEFAULTS.name,
          subtitle: env.VITE_TENANT_SUBTITLE || DEFAULTS.subtitle,
          emailPlaceholder: env.VITE_TENANT_EMAIL_PLACEHOLDER || DEFAULTS.emailPlaceholder,
          supportUrl: env.VITE_TENANT_SUPPORT_URL || DEFAULTS.supportUrl,
    };
}
