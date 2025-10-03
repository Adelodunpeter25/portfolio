interface SkillsProps {
  skills: string[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-32 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Technical <span className="text-primary">Infrastructure</span>
          </h2>
          <p className="text-xl text-text-secondary">
            Tools and technologies I use to build production-grade solutions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill}
              className="group bg-black border border-border-dark rounded-lg px-6 py-5 text-center hover:border-primary hover:bg-primary/5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(2,132,199,0.15)] transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-base font-medium group-hover:text-primary transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
