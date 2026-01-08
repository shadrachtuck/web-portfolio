import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    "React.js", "Vue.js", "Next.js", "C#/.NET", "TypeScript", 
    "Node.js", "PHP", "MySQL", "PostgreSQL", "MongoDB",
    "TailwindCSS", "Figma", "Agile/Scrum", "RESTful APIs", 
    "Microservices", "Docker", "Azure Cloud", "WordPress", "Shopify"
  ];

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8">
            About Me
          </h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div>
              <h3 className="about-section-heading text-xs md:text-sm uppercase tracking-wider mb-4 font-ds-terminal">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="about-section-heading text-xs md:text-sm uppercase tracking-wider mb-4 font-ds-terminal">Experience</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">Freelance Full-Stack Developer</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">2019 - Present</p>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Mishap Creative Works</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">Software Developer</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">2024 - 2025</p>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Matraex</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">Software Developer, UX/UI Designer & Project Manager</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">2020 - 2023</p>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Almanac Systems</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

