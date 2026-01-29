/**
 * GraphQL client for WordPress WPGraphQL
 * Web Development Portfolio - Web Projects Only
 */

import { WP_GRAPHQL_URL } from './config.js';

// WP_GRAPHQL_URL is now imported from config.js which uses environment variables
// Set VITE_WP_GRAPHQL_URL in .env.local for local development
// Set VITE_WP_GRAPHQL_URL in Vercel for production

/**
 * Execute a GraphQL query
 */
export async function graphqlRequest(query, variables = {}) {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:19',message:'GraphQL request entry',data:{url:WP_GRAPHQL_URL,query:query.substring(0,200),hasVariables:Object.keys(variables).length>0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
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

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:32',message:'GraphQL response received',data:{status:response.status,statusText:response.statusText,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:36',message:'GraphQL response parsed',data:{hasErrors:!!data.errors,errors:data.errors,hasData:!!data.data,queryContainsPortfolioTags:query.includes('portfolioTags')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    if (data.errors) {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:38',message:'GraphQL errors detected',data:{errors:data.errors,errorCount:data.errors.length,firstError:data.errors[0]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:44',message:'GraphQL request exception',data:{errorMessage:error.message,errorName:error.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
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
  query GetPortfolioTags {
    portfolioTags {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

/**
 * Introspect WebProject type to see available fields
 */
export const INTROSPECT_WEB_PROJECT = `
  query IntrospectWebProject {
    __type(name: "WebProject") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;
