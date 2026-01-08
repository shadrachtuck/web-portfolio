import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    { name: "Email", icon: Mail, href: "mailto:shadrachtuck@gmail.com" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ];

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-10">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8">
            Let's Work Together
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12 font-ds-terminal">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Get in Touch
              </h3>
              <a
                href="mailto:shadrachtuck@gmail.com"
                className="text-2xl md:text-3xl hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors inline-block mb-4 font-ds-terminal"
              >
                shadrachtuck@gmail.com
              </a>
              <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>208.283.3045</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>2723 N Cole Rd, Boise, USA, 83704</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Connect
              </h3>
              <div className="flex gap-6">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 border theme-toggle-border green-button-glow flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all glitch-effect glitch-layers"
                    data-text={social.name}
                  >
                    <social.icon className="w-5 h-5 text-[#12490d] dark:text-green-400" />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <p>© 2025 Shadrach Tuck. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

