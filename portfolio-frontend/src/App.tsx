<<<<<<< HEAD
import { useState } from 'react';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
>>>>>>> 9b04bbd1d9cfcb160f4a8416a6b812abe7c6b644
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowIWork from './components/HowIWork';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
<<<<<<< HEAD
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

=======
import NotFound from './components/NotFound';
import { portfolioData } from './data';

function Home() {
>>>>>>> 9b04bbd1d9cfcb160f4a8416a6b812abe7c6b644
  return (
    <>
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
<<<<<<< HEAD
      <Terminal />
      
      {selectedProject && (
        <ProjectDetail 
          {...selectedProject} 
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
=======
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar name={portfolioData.name} />
              <Home />
              <Terminal />
            </>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
>>>>>>> 9b04bbd1d9cfcb160f4a8416a6b812abe7c6b644
  );
}
