import { useEffect } from 'react';

interface ProjectDetailProps {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  features: string[];
  challenges: string;
  outcome: string;
  link: string;
  demo?: string;
  onClose: () => void;
}

export default function ProjectDetail({ 
  title, 
  fullDescription, 
  tech, 
  features, 
  challenges, 
  outcome, 
  link, 
  demo, 
  onClose 
}: ProjectDetailProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-black border border-border-dark rounded-xl max-w-4xl w-full my-4 md:my-8 animate-terminal-open max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-black border-b border-border-dark p-4 md:p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl md:text-3xl font-bold pr-4">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6 md:space-y-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">Overview</h3>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">{fullDescription}</p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <span key={t} className="px-3 md:px-4 py-1.5 md:py-2 text-base md:text-lg bg-border-dark text-primary rounded border border-primary/30">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">Key Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 md:gap-3 text-lg md:text-xl text-text-secondary">
                  <span className="text-primary mt-1">▸</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">Challenges</h3>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">{challenges}</p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">Outcome</h3>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">{outcome}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-base md:text-lg border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors text-center"
            >
              View Code
            </a>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-base md:text-lg bg-primary text-white rounded-md hover:bg-[#0369a1] transition-colors text-center"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
