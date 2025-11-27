import { useRef, useEffect, useMemo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();
  const duplicatedProjects = useMemo(() => [...projects, ...projects], [projects]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isVisible) return;

    let userInteracted = false;
    let scrollInterval: number;
    let initialDelay: number;

    const handleUserScroll = () => {
      userInteracted = true;
      setTimeout(() => { userInteracted = false; }, 3000);
    };

    scrollContainer.addEventListener('scroll', handleUserScroll, { passive: true });

    initialDelay = setTimeout(() => {
      scrollInterval = setInterval(() => {
        if (userInteracted) return;
        
        const cardWidth = 420;
        const totalWidth = cardWidth * projects.length;
        
        if (scrollContainer.scrollLeft >= totalWidth) {
          scrollContainer.scrollLeft = 0;
        }
        
        scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }, 3000);
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener('scroll', handleUserScroll);
    };
  }, [isVisible, projects.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="projects" 
      className={`py-24 px-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-6xl md:text-7xl font-bold mb-4">Projects</h2>
          <p className="text-2xl text-text-secondary">Building solutions that make a difference</p>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto py-4 pb-8 snap-x snap-mandatory scrollbar-hide mb-8"
        >
          {duplicatedProjects.map((project, index) => (
            <div key={`${project.id}-${index}`} className="min-w-[350px] md:min-w-[400px] snap-start">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => scroll('left')}
            className="p-3 border border-border-dark text-white rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 border border-border-dark text-white rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
