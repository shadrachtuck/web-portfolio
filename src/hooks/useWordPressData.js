import { useState, useEffect } from "react";
import { graphqlRequest, GET_WEB_PROJECTS, GET_REPOSITORIES, GET_DESIGN_PROJECTS } from "../lib/graphql.js";

export function useWebProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        
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
