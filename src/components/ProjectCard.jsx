import React from 'react';

const ProjectCard = ({ project }) => {
  const details = project.webProjectDetails || {};
  const featuredImage = project.featuredImage?.node;
  const galleryConnection = details.screenshots;
  const gallery = galleryConnection?.nodes || galleryConnection || [];
  const firstImage = gallery[0] || featuredImage;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {firstImage && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={firstImage.sourceUrl || firstImage.url}
            alt={firstImage.altText || project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          {project.title}
        </h3>
        
        {details.techStack && details.techStack.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {details.techStack.map((techItem, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {techItem.tech || techItem}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {details.client && (
          <div className="mb-2 text-gray-600">
            <span className="font-semibold">Client: </span>
            {details.client}
          </div>
        )}
        
        {details.year && (
          <div className="mb-4 text-gray-600">
            <span className="font-semibold">Year: </span>
            {details.year}
          </div>
        )}
        
        {project.excerpt && (
          <div 
            className="mb-4 text-gray-600 text-sm"
            dangerouslySetInnerHTML={{ __html: project.excerpt }}
          />
        )}
        
        <div className="flex gap-3 flex-wrap">
          {details.projectUrl && (
            <a
              href={details.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Project
            </a>
          )}
          
          {details.githubUrl && (
            <a
              href={details.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

