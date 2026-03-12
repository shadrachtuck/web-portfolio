import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { TagFilter } from "./components/TagFilter";
import { Work } from "./components/Work";
import { Repositories } from "./components/Repositories";
import { About } from "./components/About";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { usePortfolioTags } from "./hooks/useWordPressData";

function App() {
  const { tags: portfolioTags, loading: tagsLoading } = usePortfolioTags();
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tagSlug) => {
    if (tagSlug == null) {
      setSelectedTags([]);
      return;
    }
    setSelectedTags((prev) =>
      prev.includes(tagSlug)
        ? prev.filter((slug) => slug !== tagSlug)
        : [...prev, tagSlug]
    );
  };

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors">
        <Navigation />
        <Hero />
        <TagFilter
          tags={portfolioTags}
          loading={tagsLoading}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />
        <Work
          portfolioTags={portfolioTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />
        <Repositories
          portfolioTags={portfolioTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />
        <About />
        <Resume />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
