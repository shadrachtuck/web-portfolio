import React from 'react';
import { useWebProjects } from '../hooks/useWordPressData';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { projects, loading, error } = useWebProjects();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-xl">
          Error loading projects: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Web Development Portfolio
          </h1>
          <p className="text-lg text-gray-600">
            A collection of web and software development projects
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-600">
            No projects found. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

