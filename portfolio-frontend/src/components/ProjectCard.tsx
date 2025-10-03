interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export default function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-8 bg-black border border-border-dark rounded-xl hover:border-primary hover:scale-[1.02] transition-all duration-300"
    >
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-text-secondary mb-6 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="px-3 py-1 bg-border-dark text-primary text-sm rounded border border-primary/30">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
