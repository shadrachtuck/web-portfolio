import { motion } from "motion/react";

/**
 * Shared tag filter for Work and Repositories sections.
 * Renders once to avoid duplicate fetches and UI.
 */
export function TagFilter({ tags = [], loading, selectedTags = [], onToggleTag }) {
  if (loading || !tags?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-8 px-6 md:px-16 lg:px-24"
    >
      <div className="flex flex-wrap gap-2 items-center font-sans">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mr-2">
          Filter by tag:
        </span>
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => onToggleTag(tag.slug)}
            className={`font-sans rounded-md px-4 py-2 text-sm inline-flex items-center justify-center content-center transition-colors antialiased ${
              selectedTags.includes(tag.slug)
                ? "bg-zinc-200 dark:bg-zinc-700 ring-1 ring-zinc-400 dark:ring-zinc-500"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {tag.name}
            {tag.count != null && <span className="ml-1 opacity-75">({tag.count})</span>}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={() => onToggleTag(null)}
            className="font-sans rounded-md px-4 py-2 text-sm inline-flex items-center justify-center content-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 antialiased"
          >
            Clear filters
          </button>
        )}
      </div>
    </motion.div>
  );
}
