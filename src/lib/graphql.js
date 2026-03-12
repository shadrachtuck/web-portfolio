/**
 * GraphQL client for WordPress WPGraphQL
 * Web Development Portfolio - Web Projects Only
 *
 * Field names match mishap-creative-works plugin ACF (wp-content/plugins/mishap-creative-works/acf-json/).
 * See src/lib/mishap-types.js for type definitions and accessor helpers.
 */

import { WP_GRAPHQL_URL } from './config.js';

// WP_GRAPHQL_URL is now imported from config.js which uses environment variables
// Set VITE_WP_GRAPHQL_URL in .env.local for local development
// Set VITE_WP_GRAPHQL_URL in Vercel for production

/**
 * Execute a GraphQL query
 */
export async function graphqlRequest(query, variables = {}) {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  } catch (error) {
    console.error('GraphQL request error:', error);
    throw error;
  }
}

/**
 * Fetch all web projects
 */
export const GET_WEB_PROJECTS = `
  query GetWebProjects($first: Int, $after: String) {
    webProjects(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        webProjectDetails {
          techStack {
            tech
          }
          client
          year
          projectUrl
          githubUrl
          screenshots {
            nodes {
              sourceUrl
              altText
            }
          }
          contributionTypeTags
        }
        portfolioTags {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * Fetch all repositories
 */
export const GET_REPOSITORIES = `
  query GetRepositories($first: Int, $after: String) {
    repositories(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        repositoryDetails {
          linkType
          contributionMeta
          repositoryUrl
          siteUrl
          platform
          language
          stars
          contributionType
          isFork
          year
          contributionTypeTags
          customLogo {
            node {
              sourceUrl
              altText
            }
          }
        }
        portfolioTags {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * Fetch all design projects
 */
export const GET_DESIGN_PROJECTS = `
  query GetDesignProjects($first: Int, $after: String) {
    designProjects(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        designProjectDetails {
          category
          client
          year
          projectUrl
          gallery {
            nodes {
              sourceUrl
              altText
            }
          }
          contributionTypeTags
        }
        portfolioTags {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * Fetch all portfolio tags
 */
export const GET_PORTFOLIO_TAGS = `
  query GetPortfolioTags($first: Int) {
    portfolioTags(first: $first) {
      nodes {
        id
        name
        slug
        count
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * Fetch site settings (social links, etc.)
 * Note: ACF field names are converted to camelCase in GraphQL
 * github_url -> githubUrl, linkedin_url -> linkedinUrl, email_address -> emailAddress
 * Options pages are accessed via acfOptions with the field group name
 */
export const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    siteSettings {
      githubUrl
      linkedinUrl
      emailAddress
      resumePdfUrl
      resumePdfDownloadUrl
    }
  }
`;

/**
 * Fetch About page content + ACF fields by URI
 */
export const GET_ABOUT_PAGE = `
  query GetAboutPage($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      aboutPageDetails {
        bio
        experience {
          title
          company
          startYear
          endYear
        }
      }
    }
  }
`;

