import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesktopNavbar from './components/DesktopNavbar';
import MobileBottomBar from './components/MobileBottomBar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { useContentfulData } from './hooks/useContentfulData';

const HowIWork = lazy(() => import('./components/HowIWork'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Terminal = lazy(() => import('./components/Terminal'));
const NotFound = lazy(() => import('./components/NotFound'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));

function Home({ portfolioData }: { portfolioData: any }) {
  return (
    <>
      <Hero name={portfolioData.name} {...portfolioData.hero} />
      <Suspense fallback={<div />}>
        <HowIWork {...portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Contact email={portfolioData.email} social={portfolioData.social} />
      </Suspense>
      <Footer name={portfolioData.name} social={portfolioData.social} />
    </>
  );
}

export default function App() {
  const { data: portfolioData, loading } = useContentfulData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <ScrollProgress />
        <DesktopNavbar />
        <MobileBottomBar />
        <Suspense fallback={<div />}>
          <Routes>
            <Route path="/" element={<Home portfolioData={portfolioData} />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Terminal />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
