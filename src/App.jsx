import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { About } from "./components/About";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors">
        <Navigation />
        <Hero />
        <Work />
        <About />
        <Resume />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;

