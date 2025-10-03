import { useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  demo?: string;
}

export default function Projects({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollBy({ left: 420, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

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
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Projects</h2>
          <p className="text-xl text-text-secondary">Building solutions that make a difference</p>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto py-4 pb-8 snap-x snap-mandatory scrollbar-hide mb-8"
        >
          {projects.map((project) => (
            <div key={project.title} className="min-w-[350px] md:min-w-[400px] snap-start">
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
