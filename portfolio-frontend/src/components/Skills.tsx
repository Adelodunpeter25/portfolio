export default function Skills({ skills }: { skills: string[] }) {
  return (
    <section id="skills" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-black border border-border-dark text-white rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
