import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAboutPage, usePortfolioTags } from "../hooks/useWordPressData";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { aboutPage } = useAboutPage("about");
  const { tags: portfolioTags, loading: tagsLoading } = usePortfolioTags();

  const SKILLS_PAGE_SIZE = 10;
  const [skillsPage, setSkillsPage] = useState(0);

  const bioHtml = useMemo(() => {
    const acfBio = aboutPage?.aboutPageDetails?.bio ?? aboutPage?.aboutpagedetails?.bio;
    if (acfBio && String(acfBio).trim() !== "") return acfBio;
    const pageContent = aboutPage?.content;
    if (pageContent && String(pageContent).trim() !== "") return pageContent;
    return "";
  }, [aboutPage]);

  const featuredImageUrl = aboutPage?.featuredImage?.node?.sourceUrl ?? aboutPage?.featuredimage?.node?.sourceurl;

  const experienceItems = useMemo(() => {
    const fromWp = aboutPage?.aboutPageDetails?.experience ?? aboutPage?.aboutpagedetails?.experience;
    if (Array.isArray(fromWp) && fromWp.length > 0) return fromWp;
    return [
      { title: "Freelance Full-Stack Developer", company: "Mishap Creative Works", startYear: "2019", endYear: "Present" },
      { title: "Software Developer", company: "Matraex", startYear: "2024", endYear: "2025" },
      { title: "Software Developer, UX/UI Designer & Project Manager", company: "Almanac Systems", startYear: "2020", endYear: "2023" },
    ];
  }, [aboutPage]);

  useEffect(() => {
    // Reset to first page when tags finish loading or change
    setSkillsPage(0);
  }, [tagsLoading, portfolioTags.length]);

  const pageCount = useMemo(() => {
    if (tagsLoading) return 0;
    return Math.max(1, Math.ceil(portfolioTags.length / SKILLS_PAGE_SIZE));
  }, [tagsLoading, portfolioTags.length]);

  const showPagination = !tagsLoading && portfolioTags.length > SKILLS_PAGE_SIZE;
  const canPageLeft = showPagination && skillsPage > 0;
  const canPageRight = showPagination && skillsPage < pageCount - 1;

  const pagedSkills = useMemo(() => {
    if (tagsLoading) return [];
    if (!showPagination) return portfolioTags;
    const start = skillsPage * SKILLS_PAGE_SIZE;
    return portfolioTags.slice(start, start + SKILLS_PAGE_SIZE);
  }, [tagsLoading, showPagination, portfolioTags, skillsPage]);

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-stretch">
        {/* Left: Featured image (B&W, full height) - matches hardcoded layout */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative min-h-[300px] md:min-h-[500px] overflow-hidden"
        >
          {featuredImageUrl ? (
            <img
              src={featuredImageUrl}
              alt={aboutPage?.featuredImage?.node?.altText ?? aboutPage?.featuredimage?.node?.alttext ?? "About me"}
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
          )}
        </motion.div>

        {/* Right: About Me title, bio, button, Skills, Experience */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            About Me
          </h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400 flex-1">
            {bioHtml ? (
              <div
                className="space-y-4 [&_a]:text-zinc-600 [&_a]:dark:text-zinc-400 [&_a]:underline hover:[&_a]:text-zinc-800 dark:hover:[&_a]:text-zinc-200"
                dangerouslySetInnerHTML={{ __html: bioHtml }}
              />
            ) : (
              <>
                <p>
                  Software developer with over 5 years of professional experience building scalable,
                  user-centric applications across diverse technology stacks. Expertise in full-stack
                  development with C#/.NET, React, Vue.js, and modern JavaScript frameworks.
                </p>
                <p>
                  Proven track record of enhancing application usability through RESTful APIs,
                  microservices architecture, and responsive UI design. Skilled in Agile methodologies,
                  automated testing, and cross-functional team leadership.
                </p>
                <p>
                  Passionate about creating intuitive user experiences while maintaining clean,
                  efficient, and maintainable code.
                </p>
              </>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 mb-8"
            >
              <a
                href="#resume"
                className="square-button green-button-glow px-3 md:px-5 py-1.5 md:py-2.5 border transition-all inline-block font-ds-terminal text-xs md:text-sm glitch-effect glitch-layers"
                data-text="See full resume..."
              >
                See full resume...
              </a>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="about-section-heading text-xs md:text-sm uppercase tracking-wider font-ds-terminal">Skills</h3>

                {showPagination && (
                  <div className="flex items-center gap-2">
                    {canPageLeft && (
                      <motion.button
                        type="button"
                        onClick={() => setSkillsPage((p) => Math.max(0, p - 1))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-2 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 relative"
                        aria-label="Previous skills"
                      >
                        <motion.div
                          animate={{ x: [0, -4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="arrow-btn-icon-left font-ds-terminal header-style leading-none">v</span>
                        </motion.div>
                      </motion.button>
                    )}

                    <motion.button
                      type="button"
                      onClick={() => setSkillsPage((p) => Math.min(pageCount - 1, p + 1))}
                      whileHover={canPageRight ? { scale: 1.1 } : undefined}
                      whileTap={canPageRight ? { scale: 0.9 } : undefined}
                      disabled={!canPageRight}
                      className={`cursor-pointer project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-2 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 relative ${
                        canPageRight ? "" : "opacity-40 cursor-not-allowed"
                      }`}
                      aria-label="Next skills"
                    >
                      <motion.div
                        animate={canPageRight ? { x: [0, 4, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="arrow-btn-icon-right font-ds-terminal header-style leading-none">v</span>
                      </motion.div>
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Skills (Portfolio Tags) */}
              {tagsLoading ? (
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Loading skills...</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {pagedSkills.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-sm inline-flex"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="about-section-heading text-xs md:text-sm uppercase tracking-wider mb-4 font-ds-terminal">Experience</h3>
              <div className="space-y-4">
                {experienceItems.map((item, idx) => {
                  const title = item?.title || "";
                  const company = item?.company || "";
                  const start = item?.startYear || item?.start_year || item?.startyear || "";
                  const end = item?.endYear || item?.end_year || item?.endyear || "";
                  const years = [start, end].filter(Boolean).join(" - ");

                  return (
                    <div key={`${title}-${company}-${idx}`} className="space-y-0.5">
                      <div className="flex justify-between items-baseline gap-4">
                        <p className="font-semibold text-zinc-700 dark:text-zinc-300">{title}</p>
                        {years && (
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{years}</p>
                        )}
                      </div>
                      {company && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{company}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


