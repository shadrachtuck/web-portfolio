/**
 * GraphQL client for WordPress (WPGraphQL + WPGraphQL for ACF).
 *
 * ACF subfields use camelCase in GraphQL (e.g. projectUrl). Keep WordPress plugin
 * versions aligned across environments so the schema matches — no alternate query shapes here.
 *
 * ACF: mishap-creative-works acf-json/ · helpers: src/lib/mishap-types.js
 */

import { WP_GRAPHQL_URL } from './config.js';

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
      body: JSON.stringify({ query, variables }),
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
