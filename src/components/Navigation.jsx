import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoImageError, setLogoImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          isScrolled ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="px-6 md:px-16 lg:px-24 py-6 flex justify-between items-center">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="flex items-center logo-glow-container glitch-effect glitch-layers"
            data-text="shadrach-tuck.dev"
          >
            {!logoImageError ? (
              <img 
                src="/assets/img/logo-shadrach-tuck-dev.png" 
                alt="shadrach-tuck.dev" 
                className="md:h-40 w-auto logo-glow"
                style={{ height: '102.4px' }}
                onError={() => setLogoImageError(true)}
              />
            ) : (
              <span className="text-xl tracking-tight">shadrach-tuck.dev</span>
            )}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-sm uppercase tracking-wider hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[150px] left-0 right-0 bg-white dark:bg-zinc-900 shadow-lg z-[250] md:hidden"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-wider hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

