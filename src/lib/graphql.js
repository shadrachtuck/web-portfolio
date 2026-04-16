/**
 * GraphQL client for WordPress (WPGraphQL + WPGraphQL for ACF).
 *
 * ACF subfield names in GraphQL can be camelCase (projectUrl) or all-lowercase (projecturl)
 * depending on WPGraphQL for ACF version / host. We pick the query shape via
 * config.WP_GRAPHQL_ACF_FIELD_CASING (auto: lowercase only for backend.shadrach-tuck.dev).
 * Aliases map lowercase schema fields to camelCase response keys when needed.
 *
 * ACF: mishap-creative-works acf-json/ · helpers: src/lib/mishap-types.js
 */

import { WP_GRAPHQL_URL, WP_GRAPHQL_ACF_FIELD_CASING } from './config.js';

const ACF_LOWER = WP_GRAPHQL_ACF_FIELD_CASING === 'lowercase';

/** @returns {string} */
function graphqlHostForLog() {
  try {
    return new URL(WP_GRAPHQL_URL).host;
  } catch {
    return '';
  }
}

const WEB_PROJECT_DETAILS = ACF_LOWER
  ? `
        webProjectDetails {
          techStack {
            tech
          }
          client
          year
          projectUrl: projecturl
          githubUrl: githuburl
          screenshots {
            nodes {
              sourceUrl
              altText
            }
          }
          contributionTypeTags: contributiontypetags
        }
`
  : `
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
`;

const REPOSITORY_DETAILS = ACF_LOWER
  ? `
        repositoryDetails {
          linkType: linktype
          contributionMeta: contributionmeta
          repositoryUrl: repositoryurl
          siteUrl: siteurl
          platform
          language
          stars
          contributionType: contributiontype
          isFork: isfork
          year
          contributionTypeTags: contributiontypetags
          customLogo: customlogo {
            node {
              sourceUrl
              altText
            }
          }
        }
`
  : `
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
`;

const DESIGN_PROJECT_DETAILS = ACF_LOWER
  ? `
        designProjectDetails {
          client
          year
          projectUrl: projecturl
          gallery {
            nodes {
              sourceUrl
              altText
            }
          }
          contributionTypeTags: contributiontypetags
        }
`
  : `
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
`;

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
      // #region agent log
      fetch('http://127.0.0.1:7813/ingest/ef19e9e2-6782-48b1-b9f7-f518dd022b13',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'da0f54'},body:JSON.stringify({sessionId:'da0f54',location:'graphql.js:errors',message:'GraphQL errors in response',data:{acfCasing:WP_GRAPHQL_ACF_FIELD_CASING,graphqlHost:graphqlHostForLog(),first:data.errors?.[0]?.message,errorCount:data.errors?.length},timestamp:Date.now(),hypothesisId:'H3',runId:'verify2'})}).catch(()=>{});
      // #endregion
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    // #region agent log
    const firstWeb = data.data?.webProjects?.nodes?.[0]?.webProjectDetails;
    fetch('http://127.0.0.1:7813/ingest/ef19e9e2-6782-48b1-b9f7-f518dd022b13',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'da0f54'},body:JSON.stringify({sessionId:'da0f54',location:'graphql.js:ok',message:'GraphQL ok',data:{acfCasing:WP_GRAPHQL_ACF_FIELD_CASING,graphqlHost:graphqlHostForLog(),hasData:!!data.data,webDetailsKeys:firstWeb?Object.keys(firstWeb):null},timestamp:Date.now(),hypothesisId:'H2',runId:'verify2'})}).catch(()=>{});
    // #endregion

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
        ${WEB_PROJECT_DETAILS}
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
        ${REPOSITORY_DETAILS}
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
        ${DESIGN_PROJECT_DETAILS}
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
