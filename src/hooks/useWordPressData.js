import { useState, useEffect } from 'react';
import { graphqlRequest, GET_WEB_PROJECTS } from '../lib/graphql';

/**
 * Hook to fetch web projects from WordPress
 */
export function useWebProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await graphqlRequest(GET_WEB_PROJECTS, { first: 100 });
        setProjects(data.webProjects?.nodes || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching web projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

