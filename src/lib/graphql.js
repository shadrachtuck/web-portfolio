/**
 * GraphQL client for WordPress WPGraphQL
 * Web Development Portfolio - Web Projects Only
 */

// Update this URL to match your WordPress installation
// Production endpoint: https://backend.shadrach-tuck.dev/graphql
// Local default: http://portfolio-backend.local/graphql
// Set VITE_WP_GRAPHQL_URL environment variable to override

// #region agent log
fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:12','message':'Raw env var check',data:{rawEnvUrl:String(import.meta.env.VITE_WP_GRAPHQL_URL),envUrlType:typeof import.meta.env.VITE_WP_GRAPHQL_URL,envUrlTruthy:!!import.meta.env.VITE_WP_GRAPHQL_URL},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

// Force production URL - environment variable might be overriding with wrong value
const envUrl = import.meta.env.VITE_WP_GRAPHQL_URL;

// #region agent log
fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:18','message':'Env var after assignment',data:{envUrl:String(envUrl),envUrlLength:envUrl?.length,containsLocal:envUrl?.includes('portfolio-backend.local'),isTruthy:!!envUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const WP_GRAPHQL_URL = 
  (envUrl && envUrl.trim() && !envUrl.includes('portfolio-backend.local')) 
    ? envUrl.trim() 
    : 'https://backend.shadrach-tuck.dev/graphql';

// #region agent log
fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:26','message':'Final URL decision',data:{finalUrl:WP_GRAPHQL_URL,usedEnvVar:!!(envUrl && envUrl.trim() && !envUrl.includes('portfolio-backend.local')),fellBackToProduction:WP_GRAPHQL_URL === 'https://backend.shadrach-tuck.dev/graphql'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

// Debug: Log the actual URL being used
if (typeof window !== 'undefined') {
  console.log('GraphQL URL:', WP_GRAPHQL_URL);
  console.log('Env var value:', envUrl);
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:34','message':'Console log confirmation',data:{wpGraphqlUrl:WP_GRAPHQL_URL,envUrl:envUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
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
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'graphql.js:52','message':'About to fetch GraphQL',data:{url:WP_GRAPHQL_URL,urlType:typeof WP_GRAPHQL_URL,isProduction:WP_GRAPHQL_URL.includes('backend.shadrach-tuck.dev'),isLocal:WP_GRAPHQL_URL.includes('portfolio-backend.local')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
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

