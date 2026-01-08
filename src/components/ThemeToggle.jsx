import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 border theme-toggle-border" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 border theme-toggle-border green-button-glow flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors glitch-effect glitch-layers"
      data-text={theme === "dark" ? "Light Mode" : "Dark Mode"}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-green-400" />
      ) : (
        <Moon className="w-5 h-5 text-[#12490d]" />
      )}
    </motion.button>
  );
}

