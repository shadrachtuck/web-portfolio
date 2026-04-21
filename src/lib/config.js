/**
 * Application configuration (env).
 * GraphQL: see graphql.js — WPGraphQL for ACF field naming can differ by host (camelCase vs all-lowercase).
 *
 * Vite embeds VITE_* at build time. If you run `npm run build` with only .env pointing at
 * portfolio-backend.local, the shipped bundle would call that host from users' browsers (wrong).
 * resolveWpGraphqlUrl() forces the public WordPress GraphQL URL in production builds when the env URL is dev-only.
 */

const DEFAULT_REMOTE_GRAPHQL_URL = 'https://backend.shadrach-tuck.dev/graphql';

/** True for hostnames that must never be used in a production browser bundle */
function isDevOnlyGraphqlUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  try {
    const h = new URL(urlString.trim()).hostname.toLowerCase();
    return h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0' || h.endsWith('.local');
  } catch {
    return false;
  }
}

/**
 * WordPress GraphQL endpoint the browser will call.
 * - development: uses VITE_WP_GRAPHQL_URL from .env / .env.local (typically local WP).
 * - production build: uses VITE_WP_GRAPHQL_URL unless it points at a dev-only host; then uses the remote default.
 */
function resolveWpGraphqlUrl() {
  const raw = import.meta.env.VITE_WP_GRAPHQL_URL;
  const fromEnv = raw != null && String(raw).trim() !== '' ? String(raw).trim() : null;
  if (fromEnv) {
    if (import.meta.env.PROD && isDevOnlyGraphqlUrl(fromEnv)) {
      return DEFAULT_REMOTE_GRAPHQL_URL;
    }
    return fromEnv;
  }
  return DEFAULT_REMOTE_GRAPHQL_URL;
}

/** @type {string} */
export const WP_GRAPHQL_URL = resolveWpGraphqlUrl();

/**
 * How ACF subfields appear in the GraphQL schema for this WPGraphQL URL.
 * - camelCase: projectUrl, linkType (common with newer WPGraphQL for ACF / local)
 * - lowercase: projecturl, linktype (aliases used in queries; seen on some production hosts)
 * Set VITE_WP_GRAPHQL_ACF_FIELD_CASING=camelCase|lowercase to override auto-detection.
 *
 * @returns {'camelCase' | 'lowercase'}
 */
export function resolveWpGraphqlAcfFieldCasing() {
  const raw = import.meta.env.VITE_WP_GRAPHQL_ACF_FIELD_CASING;
  if (raw === 'camelCase' || raw === 'lowercase') {
    return raw;
  }
  const url = WP_GRAPHQL_URL || '';
  // Production GraphQL host has historically exposed lowercase ACF field names.
  if (/backend\.shadrach-tuck\.dev/i.test(url)) {
    return 'lowercase';
  }
  return 'camelCase';
}

/** Resolved once at module load for query strings */
export const WP_GRAPHQL_ACF_FIELD_CASING = resolveWpGraphqlAcfFieldCasing();

/**
 * Get the current environment
 * Returns 'development' or 'production'
 */
export const ENV = import.meta.env.VITE_ENV || import.meta.env.MODE || 'production';

/**
 * Check if we're in development mode
 * More explicit check: must be explicitly set to 'development' AND not in production build
 */
export const IS_DEVELOPMENT = (ENV === 'development' && import.meta.env.DEV) || 
                               (import.meta.env.DEV && !import.meta.env.PROD);

/**
 * Check if we're in production mode
 * Explicit check: explicitly set to 'production' OR in production build
 */
export const IS_PRODUCTION = ENV === 'production' || 
                             (import.meta.env.PROD && !import.meta.env.DEV) ||
                             WP_GRAPHQL_URL.includes('shadrach-tuck.dev');

/**
 * Configuration object for easy access
 */
export const config = {
  wpGraphQLUrl: WP_GRAPHQL_URL,
  wpGraphqlAcfFieldCasing: WP_GRAPHQL_ACF_FIELD_CASING,
  env: ENV,
  isDevelopment: IS_DEVELOPMENT,
  isProduction: IS_PRODUCTION,
};

export default config;
