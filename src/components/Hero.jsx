import { motion } from "motion/react";
import { useState, useEffect, useRef, useMemo } from "react";

export function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const heroRef = useRef(null);
  const imageLoadCountRef = useRef(0);
  const imageSrc = "/assets/img/head-shot-bit-map-dos.png"; // Stable reference
  const imageLoadedRef = useRef(false);
  const imageRef = useRef(null);
  
  // Memoize the image element to prevent React from recreating it
  const headShotImage = useMemo(() => (
    <img 
      ref={imageRef}
      src={imageSrc}
      alt="Shadrach Tuck" 
      className="w-[12%] sm:w-[15%] h-auto max-w-full glitch-effect"
      onLoad={(e) => {
        // Only log the first load to prevent spam
        if (!imageLoadedRef.current) {
          imageLoadedRef.current = true;
          imageLoadCountRef.current += 1;
          // #region agent log
          fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Hero.jsx:img-onLoad',message:'Image onLoad fired (first time)',data:{loadCount:imageLoadCountRef.current,complete:e.target.complete},sessionId:'debug-session',runId:'run1',hypothesisId:'B',timestamp:Date.now()})}).catch(()=>{});
          // #endregion
        } else {
          // Log subsequent loads (shouldn't happen)
          imageLoadCountRef.current += 1;
          // #region agent log
          fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Hero.jsx:img-onLoad',message:'Image onLoad fired (REPEATED)',data:{loadCount:imageLoadCountRef.current,complete:e.target.complete},sessionId:'debug-session',runId:'run1',hypothesisId:'C',timestamp:Date.now()})}).catch(()=>{});
          // #endregion
        }
      }}
      onError={(e) => {
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Hero.jsx:img-onError',message:'Image onError fired',data:{src:e.target.src},sessionId:'debug-session',runId:'run1',hypothesisId:'D',timestamp:Date.now()})}).catch(()=>{});
        // #endregion
      }}
    />
  ), []); // Empty dependency array - create once and never recreate
  
  const promptChar = ">";
  const fullText = "Hello world, I'm Shadrach Tuck!";
  const typingSpeed = 150; // milliseconds per character
  const loopDelay = 15000; // Delay before restarting animation (15 seconds)
  const contentDelay = 2000; // Delay before showing content after typing completes

  useEffect(() => {
    if (!showName && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!showName && displayedText.length === fullText.length) {
      // Show content after typing completes
      const contentTimeout = setTimeout(() => {
        setShowContent(true);
      }, contentDelay);
      
      // Keep cursor visible and flashing, wait then reset animation
      const resetTimeout = setTimeout(() => {
        setShowName(false);
        setDisplayedText("");
        setShowCursor(true);
        setShowContent(false); // Hide content but image stays mounted (visibility hidden)
      }, loopDelay);
      return () => {
        clearTimeout(contentTimeout);
        clearTimeout(resetTimeout);
      };
    }
  }, [displayedText, fullText, showName]); // Removed showCursor from dependencies - it's not used in the logic

  // Get current section based on scroll position
  const getCurrentSection = () => {
    const sections = [
      { id: null, element: heroRef.current }, // Hero
      { id: "work", element: document.querySelector("#work") },
      { id: "about", element: document.querySelector("#about") },
      { id: "resume", element: document.querySelector("#resume") },
      { id: "contact", element: document.querySelector("#contact") },
    ].filter(s => s.element);

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.element && section.element.offsetTop <= scrollPosition) {
        return { index: i, sections };
      }
    }
    return { index: 0, sections };
  };

  // Scroll to next section
  const scrollToNext = () => {
    const { index, sections } = getCurrentSection();
    const nextIndex = Math.min(index + 1, sections.length - 1);
    const nextSection = sections[nextIndex];
    if (nextSection && nextSection.element) {
      nextSection.element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to previous section
  const scrollToPrevious = () => {
    const { index, sections } = getCurrentSection();
    const prevIndex = Math.max(index - 1, 0);
    const prevSection = sections[prevIndex];
    if (prevSection && prevSection.element) {
      prevSection.element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll detection for navigation arrows
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsPastHero(window.scrollY > heroBottom - window.innerHeight / 2);
        
        // Check if at bottom section (Contact)
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          const contactBottom = contactSection.offsetTop + contactSection.offsetHeight;
          const scrollPosition = window.scrollY + window.innerHeight;
          setIsAtBottom(scrollPosition >= contactBottom - 50); // 50px threshold
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard bindings for navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" && !e.target.matches("input, textarea")) {
        e.preventDefault();
        if (isAtBottom) {
          // Return to top when at bottom
          if (heroRef.current) {
            heroRef.current.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          scrollToNext();
        }
      } else if (e.key === "ArrowUp" && !e.target.matches("input, textarea")) {
        e.preventDefault();
        scrollToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAtBottom]);

  return (
    <>
      <section ref={heroRef} className="flex flex-col items-center justify-center px-0 relative overflow-x-hidden hero-section min-h-screen pt-[150px] md:pt-[60px]">
        {/* Content Container */}
        <div className="w-full flex flex-col items-center relative mx-auto">
          {/* CRT Frame - Full Screen */}
          <div className="crt-frame-container relative w-full flex items-center justify-center">
            <img 
              src="/assets/img/crt-frame.png" 
              alt="CRT Frame" 
              className="w-full h-full object-contain"
            />
            
            {/* CRT Monitor Screen (fits inside frame) */}
            <div className="crt-monitor crt-screen-area">
              {/* White glitch lines */}
              <div className="crt-glitch-lines">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`crt-line line-${i}`} />
                ))}
              </div>
              
              <div className="crt-content lg:px-4 w-full flex flex-col relative z-10">
                {/* Text - Caret fixed to top left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex-shrink-0 sm:pt-2 p-4 md:p-4"
                >
                  <h2 
                    className="hero hero-text glitch-effect glitch-layers font-ds-terminal text-green-400"
                    data-text={`${promptChar} ${displayedText}${showCursor ? '_' : ''}`}
                    style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2.2rem)', letterSpacing: '0.05em' }}
                  >
                    <span className="inline-flex items-baseline">
                      <span className="inline-block">{promptChar} </span>
                      <span className="inline-block">
                        {displayedText}
                      </span>
                      {showCursor && <span className="typing-cursor" />}
                    </span>
                  </h2>
                </motion.div>

                {/* Bitmap Image - Center - Memoized to prevent React from recreating it */}
                <div
                  className="flex justify-center glitch-effect items-center flex-shrink-0"
                  style={{ 
                    visibility: showContent ? 'visible' : 'hidden',
                    opacity: showContent ? 1 : 0,
                    transition: 'opacity 0.6s ease-in 0.6s'
                  }}
                >
                  {headShotImage}
                </div>

                {/* Subtitle - Right below image */}
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center flex-shrink-0 flex-grow py-4 md:py-6"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6}}
                      className="hero-subtext text-green-400  text-center font-ds-terminal logo-glow-container w-full glitch-effect glitch-layers"
                      data-text="Software Developer | Full-Stack Engineer | UX/UI Designer"
                    >
                      <span className="logo-glow">
                        Software Developer | Full-Stack Engineer | UX/UI Designer
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Buttons and Arrow - Positioned at bottom of frame */}
            <div className="crt-screen-area-bottom absolute bottom-0 left-0 right-0 w-full">
              {/* Buttons - Above down arrow */}
              <motion.div
                data-hero-buttons
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-1 md:gap-2 flex-wrap justify-center px-2 md:px-4 w-full mb-1 md:mb-4"
              >
                <a
                  href="#work"
                  className="square-button green-button-glow px-6 md:px-10 py-3 md:py-5 border transition-all font-ds-terminal text-base md:text-2xl flex-shrink-0 cursor-pointer glitch-effect glitch-layers"
                  data-text="View Work"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="square-button green-button-glow px-6 md:px-10 py-3 md:py-5 border transition-all font-ds-terminal text-base md:text-2xl flex-shrink-0 cursor-pointer glitch-effect glitch-layers"
                  data-text="Get in Touch"
                >
                  Get in Touch
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex justify-center cursor-pointer"
                onClick={scrollToNext}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-8xl font-ds-terminal header-style">v</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Navigation Arrows - Right Side */}
      {isPastHero && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-8 bottom-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-[150] flex flex-col gap-4 items-end"
        >
          <motion.button
            onClick={scrollToPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-3 md:p-4 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 relative"
            aria-label="Scroll to previous section"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="arrow-btn-icon-up md:text-6xl font-ds-terminal header-style leading-none">v</span>
            </motion.div>
          </motion.button>
          <span className="text-xs font-ds-terminal text-[#12490d] dark:text-green-400">Jump to section</span>
          {isAtBottom ? (
            <motion.button
              onClick={() => {
                if (heroRef.current) {
                  heroRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-2 flex items-center justify-center font-ds-terminal text-[#12490d] dark:text-green-400 text-xs md:text-sm"
              aria-label="Return to top"
            >
              Return to top
            </motion.button>
          ) : (
            <motion.button
              onClick={scrollToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-3 md:p-4 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 relative"
              aria-label="Scroll to next section"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="arrow-btn-icon-down md:text-6xl font-ds-terminal header-style leading-none">v</span>
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Keyboard Shortcut Instructions - Bottom of Screen */}
      {isPastHero && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-[150] project-card-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 items-center gap-2"
        >
          <span className="text-xs font-ds-terminal text-[#12490d] dark:text-green-400">Navigate sections:</span>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 project-card-border bg-white/50 dark:bg-zinc-800/50 text-[10px] font-ds-terminal text-[#12490d] dark:text-green-400">↑</kbd>
            <span className="text-[10px] font-ds-terminal text-[#12490d] dark:text-green-400">Previous</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 project-card-border bg-white/50 dark:bg-zinc-800/50 text-[10px] font-ds-terminal text-[#12490d] dark:text-green-400">↓</kbd>
            <span className="text-[10px] font-ds-terminal text-[#12490d] dark:text-green-400">Next</span>
          </div>
        </motion.div>
      )}
    </>
  );
}

