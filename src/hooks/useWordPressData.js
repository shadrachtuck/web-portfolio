import { useState, useEffect } from "react";
import { graphqlRequest, GET_WEB_PROJECTS, GET_REPOSITORIES, GET_DESIGN_PROJECTS, GET_PORTFOLIO_TAGS, INTROSPECT_WEB_PROJECT } from "../lib/graphql.js";
import { IS_DEVELOPMENT, WP_GRAPHQL_URL } from "../lib/config.js";

export function useWebProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        
        // Only run introspection in development (disabled in production for security)
        // NEVER run introspection if using production URL - this is the most reliable check
        const isProductionUrl = WP_GRAPHQL_URL.includes('shadrach-tuck.dev');
        const shouldRunIntrospection = !isProductionUrl && IS_DEVELOPMENT;
        
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWordPressData.js:17',message:'Introspection check',data:{isDevelopment:IS_DEVELOPMENT,wpGraphQLUrl:WP_GRAPHQL_URL,isProductionUrl:isProductionUrl,shouldRunIntrospection:shouldRunIntrospection},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
        // #endregion
        
        // Skip introspection entirely if using production URL
        if (shouldRunIntrospection) {
          // #region agent log
          fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWordPressData.js:21',message:'Fetching WebProject introspection',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
          // #endregion
          
          // First, introspect the WebProject type to see available fields
          try {
            const introspectionData = await graphqlRequest(INTROSPECT_WEB_PROJECT);
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWordPressData.js:25',message:'WebProject introspection result',data:{typeName:introspectionData?.__type?.name,fields:introspectionData?.__type?.fields?.map(f=>f.name),hasPortfolioTags:introspectionData?.__type?.fields?.some(f=>f.name==='portfolioTags')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
            // #endregion
          } catch (introspectErr) {
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWordPressData.js:29',message:'Introspection failed',data:{error:introspectErr.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
            // #endregion
          }
        }
        
        const data = await graphqlRequest(GET_WEB_PROJECTS, { first: 100 });
        const fetchedProjects = data?.webProjects?.nodes || [];
        setProjects(fetchedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching web projects:", err);
        setError(err.message || "Failed to load projects");
        setLoading(false);
        // Set empty array on error so UI doesn't break
        setProjects([]);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export function useRepositories() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await graphqlRequest(GET_REPOSITORIES, { first: 100 });
        const fetchedRepositories = data?.repositories?.nodes || [];
        setRepositories(fetchedRepositories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError(err.message || "Failed to load repositories");
        setLoading(false);
        // Set empty array on error so UI doesn't break
        setRepositories([]);
      }
    }

    fetchRepositories();
  }, []);

  return { repositories, loading, error };
}

export function useDesignProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await graphqlRequest(GET_DESIGN_PROJECTS, { first: 100 });
        const fetchedProjects = data?.designProjects?.nodes || [];
        setProjects(fetchedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching design projects:", err);
        setError(err.message || "Failed to load design projects");
        setLoading(false);
        setProjects([]);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export function usePortfolioTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await graphqlRequest(GET_PORTFOLIO_TAGS);
        const fetchedTags = data?.portfolioTags?.nodes || [];
        setTags(fetchedTags);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching portfolio tags:", err);
        setError(err.message || "Failed to load tags");
        setLoading(false);
        setTags([]);
      }
    }

    fetchTags();
  }, []);

  return { tags, loading, error };
}
