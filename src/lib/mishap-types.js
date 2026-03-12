/**
 * Mishap Creative Works Portfolio - Type Definitions
 *
 * Source of truth: mishap-creative-works plugin (portfolio-backend).
 * ACF field definitions: wp-content/plugins/mishap-creative-works/acf-json/
 *
 * GraphQL field names: WPGraphQL for ACF exposes ACF fields; some use lowercase
 * (projecturl, githuburl) vs snake_case (project_url). Components handle both.
 */

/** @typedef {'software_web' | 'ux_ui_design'} ContributionTypeTagSlug */

/**
 * Web Project Details (ACF: group_web_project_fields)
 * @typedef {Object} WebProjectDetails
 * @property {{ tech: string }[]} [techStack] - Repeater; sub-field: tech
 * @property {string} [client]
 * @property {number} [year]
 * @property {string} [projecturl] - ACF: project_url
 * @property {string} [projectUrl] - Alternative camelCase
 * @property {string} [githuburl] - ACF: github_url
 * @property {string} [githubUrl] - Alternative camelCase
 * @property {{ nodes: { sourceUrl: string; altText?: string }[] }} [screenshots] - Gallery
 * @property {ContributionTypeTagsData} [contributionTypeTags] - ACF: checkbox [String] or AcfTermNodeConnection
 */

/**
 * Contribution type tags - ACF checkbox returns [String]; some configs use AcfTermNodeConnection
 * @typedef {string[] | { nodes: { id: string; name: string; slug: string }[] }} ContributionTypeTagsData
 */

/**
 * Design Project Details (ACF: group_design_project_fields)
 * @typedef {Object} DesignProjectDetails
 * @property {string} [category] - branding | print | digital | packaging | other
 * @property {string} [client]
 * @property {number} [year]
 * @property {string} [projecturl] - ACF: project_url
 * @property {string} [projectUrl] - Alternative camelCase
 * @property {{ nodes: { sourceUrl: string; altText?: string }[] }} [gallery]
 * @property {ContributionTypeTagsData} [contributionTypeTags]
 */

/**
 * Repository Details (ACF: group_repository_fields)
 * @typedef {Object} RepositoryDetails
 * @property {string} [linktype] - ACF: link_type - repository | site
 * @property {string} [contributionmeta] - ACF: contribution_meta
 * @property {string} [repositoryurl] - ACF: repository_url
 * @property {string} [siteurl] - ACF: site_url
 * @property {string} [platform] - github | gitlab | bitbucket | azure | other
 * @property {string} [language]
 * @property {number} [stars]
 * @property {string} [contributiontype] - ACF: contribution_type
 * @property {boolean} [isFork] - ACF: is_fork
 * @property {number} [year]
 * @property {{ node: { sourceUrl: string; altText?: string } }} [customlogo] - ACF: custom_logo
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

/**
 * Get project URL from details (handles projecturl / projectUrl)
 * @param {{ projecturl?: string; projectUrl?: string }} details
 * @returns {string | undefined}
 */
export function getProjectUrl(details) {
  return details?.projecturl || details?.projectUrl;
}

/**
 * Get GitHub URL from details (handles githuburl / githubUrl)
 * @param {{ githuburl?: string; githubUrl?: string }} details
 * @returns {string | undefined}
 */
export function getGithubUrl(details) {
  return details?.githuburl || details?.githubUrl;
}

/**
 * Get repository URL from details (handles repositoryurl / repositoryUrl)
 * @param {{ repositoryurl?: string; repositoryUrl?: string }} details
 * @returns {string | undefined}
 */
export function getRepositoryUrl(details) {
  return details?.repositoryurl || details?.repositoryUrl;
}

/**
 * Get site URL from details (handles siteurl / siteUrl)
 * @param {{ siteurl?: string; siteUrl?: string }} details
 * @returns {string | undefined}
 */
export function getSiteUrl(details) {
  return details?.siteurl || details?.siteUrl;
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
