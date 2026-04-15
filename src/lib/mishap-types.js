/**
 * Mishap Creative Works — types and helpers for WPGraphQL + ACF (camelCase field names).
 *
 * ACF JSON: wp-content/plugins/mishap-creative-works/acf-json/
 * Helpers assume camelCase GraphQL fields (aligned WPGraphQL for ACF versions).
 */

/** @typedef {'software_web' | 'ux_ui_design'} ContributionTypeTagSlug */

/**
 * Web Project Details (ACF: group_web_project_fields)
 * @typedef {Object} WebProjectDetails
 * @property {{ tech: string }[]} [techStack]
 * @property {string} [client]
 * @property {number} [year]
 * @property {string} [projectUrl]
 * @property {string} [githubUrl]
 * @property {{ nodes: { sourceUrl: string; altText?: string }[] }} [screenshots]
 * @property {ContributionTypeTagsData} [contributionTypeTags]
 */

/**
 * Contribution type tags - ACF checkbox returns [String]; some configs use AcfTermNodeConnection
 * @typedef {string[] | { nodes: { id: string; name: string; slug: string }[] }} ContributionTypeTagsData
 */

/**
 * Design Project Details (ACF: group_design_project_fields)
 * @typedef {Object} DesignProjectDetails
 * @property {string} [client]
 * @property {number} [year]
 * @property {string} [projectUrl]
 * @property {{ nodes: { sourceUrl: string; altText?: string }[] }} [gallery]
 * @property {ContributionTypeTagsData} [contributionTypeTags]
 */

/**
 * Repository Details (ACF: group_repository_fields)
 * @typedef {Object} RepositoryDetails
 * @property {string} [linkType]
 * @property {string} [contributionMeta]
 * @property {string} [repositoryUrl]
 * @property {string} [siteUrl]
 * @property {string} [platform]
 * @property {string} [language]
 * @property {number} [stars]
 * @property {string} [contributionType]
 * @property {boolean} [isFork]
 * @property {number} [year]
 * @property {{ node?: { sourceUrl: string; altText?: string } }} [customLogo]
 * @property {ContributionTypeTagsData} [contributionTypeTags]
 */

/**
 * Normalize contribution type tags from either [String] or { nodes: [...] }
 * @param {ContributionTypeTagsData | null | undefined} raw
 * @returns {string[]} Slugs for rendering
 */
export function normalizeContributionTypeTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  const nodes = raw?.nodes || [];
  return nodes.map((n) => (typeof n === 'string' ? n : n?.slug)).filter(Boolean);
}

/** @param {{ projectUrl?: string }} details */
export function getProjectUrl(details) {
  return details?.projectUrl;
}

/** @param {{ githubUrl?: string }} details */
export function getGithubUrl(details) {
  return details?.githubUrl;
}

/** @param {{ repositoryUrl?: string }} details */
export function getRepositoryUrl(details) {
  return details?.repositoryUrl;
}

/** @param {{ siteUrl?: string }} details */
export function getSiteUrl(details) {
  return details?.siteUrl;
}

/**
 * Get display label for contribution type tag slug
 * @param {string} tag
 * @returns {string}
 */
export function getContributionTypeTagLabel(tag) {
  switch (tag) {
    case "software_web":
      return "Software/Web";
    case "ux_ui_design":
      return "UX/UI Design";
    default:
      return tag;
  }
}

/**
 * Get Tailwind classes for contribution type tag badge
 * @param {string} tag
 * @returns {string}
 */
export function getContributionTypeTagColor(tag) {
  switch (tag) {
    case "software_web":
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
    case "ux_ui_design":
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
    default:
      return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300";
  }
}
