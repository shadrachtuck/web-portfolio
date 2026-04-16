/**
 * Application configuration (env).
 * GraphQL: see graphql.js — WPGraphQL for ACF field naming can differ by host (camelCase vs all-lowercase).
 */

/**
 * Get the WordPress GraphQL API endpoint
 * Falls back to production if not set
 */
export const WP_GRAPHQL_URL = import.meta.env.VITE_WP_GRAPHQL_URL || 'https://backend.shadrach-tuck.dev/graphql';

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
