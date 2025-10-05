import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowIWork from './components/HowIWork';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import ProjectDetail from './components/ProjectDetail';
import { portfolioData } from './data';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  demo?: string;
  fullDescription: string;
  features: string[];
  challenges: string;
  outcome: string;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar name={portfolioData.name} />
      <Hero name={portfolioData.name} {...portfolioData.hero} />
      <HowIWork {...portfolioData.about} />
      <Skills skills={portfolioData.skills} />
      <Projects 
        projects={portfolioData.projects} 
        onProjectSelect={setSelectedProject}
      />
      <Contact email={portfolioData.email} social={portfolioData.social} />
      <footer className="py-8 text-center text-text-secondary text-sm border-t border-border-dark">
        © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
      </footer>
      <Terminal />
      
      {selectedProject && (
        <ProjectDetail 
          {...selectedProject} 
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
