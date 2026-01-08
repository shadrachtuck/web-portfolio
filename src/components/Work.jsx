import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { useWebProjects } from "../hooks/useWordPressData";
import { ChevronDown, ChevronUp } from "lucide-react";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const details = project.webProjectDetails || {};
  const featuredImage = project.featuredImage?.node;
  const galleryConnection = details.screenshots;
  const gallery = galleryConnection?.nodes || galleryConnection || [];
  const firstImage = gallery[0] || featuredImage;
  const techStack = details.techStack || [];
  const description = project.content || project.excerpt || "";

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
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {techStack.map((techItem, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400"
              >
                {techItem.tech || techItem}
              </span>
            ))}
          </div>
        )}
        
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
  const { projects, loading, error } = useWebProjects();

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

      {!loading && !error && projects.length > 0 && (
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-zinc-600 dark:text-zinc-400">
            No projects found. Check back soon!
          </div>
        </div>
      )}
    </section>
  );
}

