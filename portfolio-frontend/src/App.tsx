import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowIWork from './components/HowIWork';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import { portfolioData } from './data';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar name={portfolioData.name} />
      <Hero name={portfolioData.name} {...portfolioData.hero} />
      <HowIWork {...portfolioData.about} />
      <Skills skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} />
      <Contact email={portfolioData.email} social={portfolioData.social} />
      <footer className="py-8 text-center text-text-secondary text-sm border-t border-border-dark">
        © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
      </footer>
      <Terminal />
    </div>
  );
}
