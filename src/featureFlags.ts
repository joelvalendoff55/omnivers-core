/**
 * Brique partagee OmniVers : lecture de feature flags via variables d'environnement.
 * Chaque projet (nutri-glow-kit, mon-docteur-virtuel, omnisoin-sant) definit ses propres
 * flags via VITE_FEATURE_<NOM>. Un flag absent ou mal renseigne reste desactive par defaut
 * (fail-closed) : c'est la garantie qu'une fonctionnalite payante ou sensible ne s'active
 * jamais par accident sur un territoire qui ne l'a pas explicitement demandee.
 */

export type FeatureFlagEnv = Record<string, string | boolean | undefined>;

export function readFeatureFlag(env: FeatureFlagEnv, key: string): boolean {
    const raw = env[key];
    if (raw === undefined) return false;
    if (typeof raw === "boolean") return raw;
    return raw.trim().toLowerCase() === "true";
}

export function buildFeatureFlags(env, mapping) {
    const result = {};
    for (const key of Object.keys(mapping)) {
          result[key] = readFeatureFlag(env, mapping[key]);
    }
    return result;
}
