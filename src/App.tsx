import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesktopNavbar from './components/DesktopNavbar';
import MobileBottomBar from './components/MobileBottomBar';
import Hero from './components/Hero';
import HowIWork from './components/HowIWork';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import ProjectDetail from './components/ProjectDetail';
import NotFound from './components/NotFound';
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

function Home({
  onProjectSelect,
}: {
  onProjectSelect: (project: Project) => void;
}) {
  return (
    <>
      <Hero name={portfolioData.name} {...portfolioData.hero} />
      <HowIWork {...portfolioData.about} />
      <Skills skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} onProjectSelect={onProjectSelect} />
      <Contact email={portfolioData.email} social={portfolioData.social} />
      <footer className="py-8 text-center text-text-secondary text-lg border-t border-border-dark">
        © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
      </footer>
    </>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <DesktopNavbar />
      <MobileBottomBar />
        <Routes>
          <Route path="/" element={<Home onProjectSelect={setSelectedProject} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Terminal />

        {selectedProject && (
          <ProjectDetail
            {...selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}
