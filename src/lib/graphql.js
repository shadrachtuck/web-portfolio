/**
 * GraphQL client for WordPress WPGraphQL
 * Web Development Portfolio - Web Projects Only
 */

// Update this URL to match your WordPress installation
// Production endpoint: https://backend.shadrach-tuck.dev/graphql
// Local default: http://portfolio-backend.local/graphql
// 
// HARDCODED FOR PRODUCTION: Environment variable is being set incorrectly in Vercel
// To use local development, temporarily change this value or use VITE_WP_GRAPHQL_URL

// #region agent log
console.log('graphql.js loaded - checking env var');
console.log('Raw VITE_WP_GRAPHQL_URL:', import.meta.env.VITE_WP_GRAPHQL_URL);
console.log('Type:', typeof import.meta.env.VITE_WP_GRAPHQL_URL);
// #endregion

// Hardcode production URL - Vercel env var is causing issues
const WP_GRAPHQL_URL = 'https://backend.shadrach-tuck.dev/graphql';

// #region agent log
console.log('=== GRAPHQL CONFIG LOADED ===');
console.log('Hardcoded WP_GRAPHQL_URL:', WP_GRAPHQL_URL);
console.log('File: graphql.js');
console.log('Build timestamp check');
// #endregion

// Debug: Log the actual URL being used
if (typeof window !== 'undefined') {
  console.log('✅ GraphQL URL (for requests):', WP_GRAPHQL_URL);
  console.log('✅ Should NOT see portfolio-backend.local');
  // #region agent log
  if (WP_GRAPHQL_URL.includes('portfolio-backend.local')) {
    console.error('❌ ERROR: Still using old URL!', WP_GRAPHQL_URL);
  } else {
    console.log('✅ Correct URL:', WP_GRAPHQL_URL);
  }
  // #endregion
}

/**
 * Execute a GraphQL query
 */
export async function graphqlRequest(query, variables = {}) {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'H1',
      location: 'portfolio-webdev/src/lib/graphql.js:graphqlRequest:entry',
      message: 'graphqlRequest entry',
      data: {
        hasIntrospection: typeof query === 'string' && query.includes('__schema'),
        querySample: typeof query === 'string' ? query.slice(0, 120) : 'non-string',
        variablesSample: variables ? Object.keys(variables).slice(0, 5) : [],
        endpoint: WP_GRAPHQL_URL,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  try {
    // #region agent log
    console.log('Making GraphQL request to:', WP_GRAPHQL_URL);
    // #endregion
    
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
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'H2',
        location: 'portfolio-webdev/src/lib/graphql.js:graphqlRequest:response',
        message: 'graphqlRequest response status',
        data: {
          status: response.status,
          statusText: response.statusText,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'H3',
        location: 'portfolio-webdev/src/lib/graphql.js:graphqlRequest:post-parse',
        message: 'graphqlRequest parsed payload',
        data: {
          hasErrors: !!data?.errors,
          errorMessages: data?.errors ? data.errors.map((e) => e.message).slice(0, 3) : [],
          keys: data ? Object.keys(data).slice(0, 5) : [],
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'H4',
        location: 'portfolio-webdev/src/lib/graphql.js:graphqlRequest:catch',
        message: 'graphqlRequest caught error',
        data: {
          message: error?.message,
          stack: error?.stack ? error.stack.slice(0, 300) : '',
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

