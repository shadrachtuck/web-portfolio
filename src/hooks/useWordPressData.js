import { useState, useEffect } from "react";
import { graphqlRequest, GET_WEB_PROJECTS, GET_REPOSITORIES, GET_DESIGN_PROJECTS, GET_PORTFOLIO_TAGS } from "../lib/graphql.js";

export function useWebProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        
        // Introspection disabled - was causing errors in production
        // GraphQL introspection is not allowed for public requests by default
        // If needed for debugging, enable it in WPGraphQL Settings on the WordPress backend
        
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
