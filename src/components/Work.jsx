import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { useWebProjects, useDesignProjects, usePortfolioTags } from "../hooks/useWordPressData";
import { ChevronDown, ChevronUp } from "lucide-react";

function ProjectCard({ project, index, isDesignProject = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const details = project.webProjectDetails || project.designProjectDetails || {};
  const featuredImage = project.featuredImage?.node;
  const galleryConnection = details.screenshots || details.gallery;
  const gallery = galleryConnection?.nodes || galleryConnection || [];
  const firstImage = gallery[0] || featuredImage;
  const techStack = details.techStack || [];
  const description = project.content || project.excerpt || "";
  const contributionTypeTags = details.contributionTypeTags || [];
  const portfolioTags = project.portfolioTags?.nodes || [];
  const category = details.category;
  
  const getContributionTypeTagLabel = (tag) => {
    switch (tag) {
      case "software_web":
        return "Software/Web";
      case "ux_ui_design":
        return "UX/UI Design";
      default:
        return tag;
    }
  };

  const getContributionTypeTagColor = (tag) => {
    switch (tag) {
      case "software_web":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "ux_ui_design":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      default:
        return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md"
    >
      <div className="relative overflow-hidden mb-4 aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
        {firstImage ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <img
              src={firstImage.sourceUrl || firstImage.url}
              alt={firstImage.altText || project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
            <span>No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-white/0 dark:bg-zinc-900/0 group-hover:bg-white/20 dark:group-hover:bg-zinc-900/20 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl md:text-2xl font-semibold">{project.title}</h3>
          {details.year && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{details.year}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {techStack.length > 0 && techStack.map((techItem, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400"
            >
              {techItem.tech || techItem}
            </span>
          ))}
          {/* Design Project Category */}
          {isDesignProject && category && (
            <span 
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium"
            >
              {category}
            </span>
          )}
          {/* Contribution Type Tags */}
          {contributionTypeTags && Array.isArray(contributionTypeTags) && contributionTypeTags.length > 0 && (
            contributionTypeTags.map((tag, idx) => (
              <span 
                key={`tag-${idx}`}
                className={`px-3 py-1 text-xs font-medium ${getContributionTypeTagColor(tag)}`}
              >
                {getContributionTypeTagLabel(tag)}
              </span>
            ))
          )}
          {/* Portfolio Tags */}
          {portfolioTags && portfolioTags.length > 0 && (
            portfolioTags.map((tag) => (
              <span 
                key={tag.id}
                className="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
              >
                {tag.name}
              </span>
            ))
          )}
        </div>
        
        {/* Collapsible Metadata */}
        {(description || techStack.length > 0) && (
          <div className="mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-ds-terminal"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show Details
                </>
              )}
            </button>
            
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-3 overflow-hidden"
              >
                {description && (
                  <div 
                    className="text-zinc-600 dark:text-zinc-400 text-sm"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                {techStack.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2 font-ds-terminal">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((techItem, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400"
                        >
                          {techItem.tech || techItem}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
        
        {!isExpanded && project.excerpt && (
          <p 
            className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: project.excerpt }}
          />
        )}
        <div className="flex gap-3 pt-2">
          {details.projectUrl && (
            <a
              href={details.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Project <span>›</span>
            </a>
          )}
          {details.githubUrl && (
            <a
              href={details.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub <span>›</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { projects: webProjects, loading: webLoading, error: webError } = useWebProjects();
  const { projects: designProjects, loading: designLoading, error: designError } = useDesignProjects();
  const { tags: portfolioTags, loading: tagsLoading } = usePortfolioTags();
  const [selectedTags, setSelectedTags] = useState([]);
  
  const loading = webLoading || designLoading;
  const error = webError || designError;

  // Filter projects by selected tags
  const filteredWebProjects = useMemo(() => {
    if (selectedTags.length === 0) return webProjects;
    return webProjects.filter(project => {
      const projectTags = project.portfolioTags?.nodes || [];
      const projectTagSlugs = projectTags.map(tag => tag.slug);
      return selectedTags.some(selectedSlug => projectTagSlugs.includes(selectedSlug));
    });
  }, [webProjects, selectedTags]);

  const filteredDesignProjects = useMemo(() => {
    if (selectedTags.length === 0) return designProjects;
    return designProjects.filter(project => {
      const projectTags = project.portfolioTags?.nodes || [];
      const projectTagSlugs = projectTags.map(tag => tag.slug);
      return selectedTags.some(selectedSlug => projectTagSlugs.includes(selectedSlug));
    });
  }, [designProjects, selectedTags]);

  const toggleTag = (tagSlug) => {
    setSelectedTags(prev => 
      prev.includes(tagSlug) 
        ? prev.filter(slug => slug !== tagSlug)
        : [...prev, tagSlug]
    );
  };

  return (
    <section id="work" ref={ref} className="min-h-screen px-6 md:px-16 lg:px-24 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4">
          Selected Work
        </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl font-ds-terminal">
          A curated collection of web development and software projects
        </p>
      </motion.div>

      {/* Tag Filter */}
      {!tagsLoading && portfolioTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mr-2">Filter by tag:</span>
            {portfolioTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.slug)}
                className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                  selectedTags.includes(tag.slug)
                    ? 'bg-green-500 text-white dark:bg-green-600'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {tag.name}
                {tag.count && <span className="ml-1 opacity-75">({tag.count})</span>}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-zinc-600 dark:text-zinc-400">Loading projects...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20">
          <div className="text-red-500">
            Error loading projects: {error}
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Web Projects Section */}
          {filteredWebProjects.length > 0 && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12"
              >
                <h3 className="text-2xl md:text-3xl mb-4 text-zinc-800 dark:text-zinc-200">
                  Software / Web Development
                </h3>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
                {filteredWebProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} isDesignProject={false} />
                ))}
              </div>
            </div>
          )}

          {/* Design Projects Section */}
          {filteredDesignProjects.length > 0 && (
            <div className="mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <h3 className="text-2xl md:text-3xl mb-4 text-zinc-800 dark:text-zinc-200">
                  UX/UI Design
                </h3>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
                {filteredDesignProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} isDesignProject={true} />
                ))}
              </div>
            </div>
          )}

          {filteredWebProjects.length === 0 && filteredDesignProjects.length === 0 && webProjects.length + designProjects.length > 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-zinc-600 dark:text-zinc-400">
                No projects match the selected filters.
              </div>
            </div>
          )}

          {webProjects.length === 0 && designProjects.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-zinc-600 dark:text-zinc-400">
                No projects found. Check back soon!
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

