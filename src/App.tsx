import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesktopNavbar from './components/DesktopNavbar';
import MobileBottomBar from './components/MobileBottomBar';
import Hero from './components/Hero';
import { portfolioData } from './data';
import type { Project } from './types';

const HowIWork = lazy(() => import('./components/HowIWork'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Terminal = lazy(() => import('./components/Terminal'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const NotFound = lazy(() => import('./components/NotFound'));

function Home({
  onProjectSelect,
}: {
  onProjectSelect: (project: Project) => void;
}) {
  return (
    <>
      <Hero name={portfolioData.name} {...portfolioData.hero} />
      <Suspense fallback={<div />}>
        <HowIWork {...portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} onProjectSelect={onProjectSelect} />
        <Contact email={portfolioData.email} social={portfolioData.social} />
      </Suspense>
      <footer className="py-8 pb-20 md:pb-8 text-center text-text-secondary text-lg border-t border-border-dark">
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
        <Suspense fallback={<div />}>
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
