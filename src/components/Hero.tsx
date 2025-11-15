import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ParticlesBackground from './ParticlesBackground';

interface HeroProps {
  name: string;
  tagline: string;
  mission: string;
  subtext: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function Hero({ name, tagline, mission, subtext, features }: HeroProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="home" 
      className={`min-h-screen flex items-center px-8 py-24 transition-all duration-1000 relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <ParticlesBackground />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="inline-block bg-neutral-900 text-neutral-300 px-3 py-1 rounded-full text-base uppercase tracking-wide mb-6">
          {tagline}
        </div>
        
        <h1 className="text-7xl md:text-8xl font-bold mb-2 leading-tight">
          {name}
        </h1>
        <div className="text-3xl md:text-4xl font-medium text-primary mb-6 font-sans tracking-tight leading-snug">
          {mission}
        </div>
        
        <p className="text-xl text-neutral-400 mb-8 max-w-2xl leading-relaxed">
          {subtext}
        </p>
        
        <div className="flex gap-4 flex-wrap mb-16">
          <a
            href="#skills"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-[#0369a1] transition-colors duration-200 text-base"
          >
            View Skills
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors duration-200 text-base"
          >
            Contact Me
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black border border-neutral-800 rounded-lg p-8 hover:border-primary/50 transition-all duration-300"
              style={{ 
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
              }}
            >
              <div className="text-3xl text-primary mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-neutral-100 mb-3">{feature.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
