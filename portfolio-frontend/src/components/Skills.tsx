import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="skills" 
      className={`py-32 px-8 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Technical <span className="text-primary">Infrastructure</span>
          </h2>
          <p className="text-xl text-text-secondary">
            Tools and technologies I use to build production-grade solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group"
              style={{ 
                animation: isVisible ? `fadeInUp 0.4s ease-out ${index * 0.1}s both` : 'none'
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-medium group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className="text-sm text-text-secondary">
                  {skill.proficiency}%
                </span>
              </div>
              <div className="h-3 bg-border-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? `${skill.proficiency}%` : '0%',
                    transitionDelay: `${index * 0.1}s`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
