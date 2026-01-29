import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { useRepositories, usePortfolioTags } from "../hooks/useWordPressData";
import { ExternalLink, GitBranch, Star, Link as LinkIcon, Lock, Unlock, Folder, ChevronDown, ChevronUp } from "lucide-react";

// Platform Logo Components
function GitHubIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function GitLabIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.919 1.263c-.135-.423-.73-.423-.867 0L1.388 9.452.046 13.587c-.121.375.014.789.331 1.023L12 23.054l11.623-8.443c.318-.235.453-.647.332-1.024"/>
    </svg>
  );
}

function BitbucketIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.132.085.132.085.328.455.83.704 1.416.704h13.457c.216 0 .512-.023.74-.164.202-.123.372-.332.44-.574l3.262-19.811a.768.768 0 00-.768-.891L.778 1.213zM14.52 15.53H9.522L8.17 8.466h7.561l-1.211 7.064z"/>
    </svg>
  );
}

function AzureIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 2.5L1.5 21.5h22L12.5 2.5zm0 4.3L18.2 19.5H6.8L12.5 6.8z"/>
      <path d="M12.5 8.8l-4.2 8.4h8.4l-4.2-8.4z"/>
    </svg>
  );
}

function PlatformIcon({ platform, isRepository, className = "w-6 h-6" }) {
  if (!isRepository) {
    return <LinkIcon className={className} />;
  }

  switch (platform) {
    case "github":
      return <GitHubIcon className={className} />;
    case "gitlab":
      return <GitLabIcon className={className} />;
    case "bitbucket":
      return <BitbucketIcon className={className} />;
    case "azure":
      return <AzureIcon className={className} />;
    default:
      return <LinkIcon className={className} />;
  }
}

function RepositoryCard({ repository, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const details = repository.repositoryDetails || {};
  const featuredImage = repository.featuredImage?.node;
  const description = repository.content || repository.excerpt || "";
  const linkType = details.linkType || "repository";
  const isRepository = linkType === "repository";
  const platform = details.platform || "github";
  // Handle both camelCase and snake_case field names from GraphQL
  // Also handle potential string/number conversion issues
  const contributionMetaRaw = details.contributionMeta || details.contribution_meta;
  const contributionMeta = contributionMetaRaw ? String(contributionMetaRaw).toLowerCase().trim() : "public_repo";
  // ACF image fields return as ConnectionEdge, so we access node directly
  const customLogo = details.customLogo?.node || details.customLogo;
  const contributionTypeTags = details.contributionTypeTags || [];
  const portfolioTags = repository.portfolioTags?.nodes || [];
  
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
  
  // Debug logging to help identify the issue
  if (process.env.NODE_ENV === 'development' && contributionMetaRaw) {
    console.log(`[${repository.title}] Contribution Meta - Raw:`, contributionMetaRaw, 'Processed:', contributionMeta, 'All details:', details);
  }
  
  const getContributionMetaLabel = () => {
    // Normalize the value to handle any case or whitespace issues
    const normalized = String(contributionMeta).toLowerCase().trim();
    switch (normalized) {
      case "private_repo":
      case "privaterepo":
      case "private":
        return "Private Repo";
      case "public_repo":
      case "publicrepo":
      case "public":
        return "Public Repo";
      case "site":
        return "Site";
      case "project":
        return "Project";
      default:
        // Log unexpected values for debugging
        console.warn('Unexpected contributionMeta value:', contributionMeta, 'for repository:', repository.title);
        return "Public Repo";
    }
  };

  const getContributionMetaIcon = () => {
    // Normalize the value to handle any case or whitespace issues
    const normalized = String(contributionMeta).toLowerCase().trim();
    switch (normalized) {
      case "private_repo":
      case "privaterepo":
      case "private":
        return <Lock className="w-3.5 h-3.5" />;
      case "public_repo":
      case "publicrepo":
      case "public":
        return <GitBranch className="w-3.5 h-3.5" />;
      case "site":
        return <LinkIcon className="w-3.5 h-3.5" />;
      case "project":
        return <Folder className="w-3.5 h-3.5" />;
      default:
        return <GitBranch className="w-3.5 h-3.5" />;
    }
  };

  const getContributionMetaColor = () => {
    // Normalize the value to handle any case or whitespace issues
    const normalized = String(contributionMeta).toLowerCase().trim();
    switch (normalized) {
      case "private_repo":
      case "privaterepo":
      case "private":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      case "public_repo":
      case "publicrepo":
      case "public":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "site":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "project":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300";
      default:
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300";
    }
  };

  const platformColors = {
    github: "bg-zinc-800 dark:bg-zinc-700",
    gitlab: "bg-orange-600 dark:bg-orange-700",
    bitbucket: "bg-blue-600 dark:bg-blue-700",
    azure: "bg-blue-500 dark:bg-blue-600",
    other: "bg-zinc-600 dark:bg-zinc-700",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md"
    >
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                {customLogo ? (
                  <div className="flex-shrink-0">
                    <img 
                      src={customLogo.sourceUrl} 
                      alt={customLogo.altText || repository.title}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-zinc-700 dark:text-zinc-300 flex-shrink-0">
                    <PlatformIcon platform={platform} isRepository={isRepository} className="w-7 h-7" />
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-semibold">{repository.title}</h3>
                {isRepository && details.isFork && (
                  <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
                    Fork
                  </span>
                )}
              </div>
              {details.year && (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{details.year}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {isRepository && details.contributionType && (
                <span className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">
                  {details.contributionType.replace("_", " ")}
                </span>
              )}
              {/* Platform tag for repositories */}
              {isRepository && (
                <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded font-medium text-white ${platformColors[platform] || platformColors.other}`}>
                  <PlatformIcon platform={platform} isRepository={true} className="w-3.5 h-3.5" />
                  <span>{platform === "azure" ? "Azure" : platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                </span>
              )}
              <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded font-medium ${getContributionMetaColor()}`}>
                {getContributionMetaIcon()}
                <span>{getContributionMetaLabel()}</span>
              </span>
              {/* Contribution Type Tags */}
              {contributionTypeTags && Array.isArray(contributionTypeTags) && contributionTypeTags.length > 0 && (
                <>
                  {contributionTypeTags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className={`text-xs px-2 py-1 rounded font-medium ${getContributionTypeTagColor(tag)}`}
                    >
                      {getContributionTypeTagLabel(tag)}
                    </span>
                  ))}
                </>
              )}
              {/* Portfolio Tags */}
              {portfolioTags && portfolioTags.length > 0 && (
                portfolioTags.map((tag) => (
                  <span 
                    key={tag.id}
                    className="text-xs px-2 py-1 rounded font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  >
                    {tag.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Collapsible Metadata */}
        {(description || (isRepository && (details.language || details.stars !== null && details.stars !== undefined))) && (
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
                {isRepository && (
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {details.language && (
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>{details.language}</span>
                      </div>
                    )}
                    {details.stars !== null && details.stars !== undefined && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{details.stars}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {!isExpanded && description && (
          <p
            className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {(details.repositoryUrl || details.siteUrl) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {details.repositoryUrl && (
              <a
                href={details.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                View Repository
              </a>
            )}
            {details.siteUrl && (
              <a
                href={details.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                Visit Site
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Repositories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { repositories, loading, error } = useRepositories();
  const { tags: portfolioTags, loading: tagsLoading } = usePortfolioTags();
  const [selectedTags, setSelectedTags] = useState([]);

  // Filter repositories by selected tags
  const filteredRepositories = useMemo(() => {
    if (selectedTags.length === 0) return repositories;
    return repositories.filter(repository => {
      const repoTags = repository.portfolioTags?.nodes || [];
      const repoTagSlugs = repoTags.map(tag => tag.slug);
      return selectedTags.some(selectedSlug => repoTagSlugs.includes(selectedSlug));
    });
  }, [repositories, selectedTags]);

  const toggleTag = (tagSlug) => {
    setSelectedTags(prev => 
      prev.includes(tagSlug) 
        ? prev.filter(slug => slug !== tagSlug)
        : [...prev, tagSlug]
    );
  };

  return (
    <section id="repositories" ref={ref} className="min-h-screen px-6 md:px-16 lg:px-24 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4">
          Other Contributions
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl font-ds-terminal">
          Repositories and other site links I've contributed to for open source and other projects
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
          <div className="text-zinc-600 dark:text-zinc-400">Loading contributions...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20">
          <div className="text-red-500">
            Error loading contributions: {error}
          </div>
        </div>
      )}

      {!loading && !error && filteredRepositories.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {filteredRepositories.map((repository, index) => (
            <RepositoryCard key={repository.id} repository={repository} index={index} />
          ))}
        </div>
      )}

      {!loading && !error && filteredRepositories.length === 0 && repositories.length > 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-zinc-600 dark:text-zinc-400">
            No repositories match the selected filters.
          </div>
        </div>
      )}

      {!loading && !error && repositories.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-zinc-600 dark:text-zinc-400">
            No contributions found. Check back soon!
          </div>
        </div>
      )}
    </section>
  );
}
