/**
 * Application Configuration
 * Centralized configuration using environment variables
 * Accessible across the entire codebase
 */

/**
 * Get the WordPress GraphQL API endpoint
 * Falls back to production if not set
 */
export const WP_GRAPHQL_URL = import.meta.env.VITE_WP_GRAPHQL_URL || 'https://backend.shadrach-tuck.dev/graphql';

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
  env: ENV,
  isDevelopment: IS_DEVELOPMENT,
  isProduction: IS_PRODUCTION,
};

export default config;
