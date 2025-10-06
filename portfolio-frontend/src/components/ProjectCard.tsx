interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  demo?: string;
  image?: string;
  onViewDetails: () => void;
}

export default function ProjectCard({
  title,
  description,
  tech,
  link,
  demo,
  image,
  onViewDetails,
}: ProjectCardProps) {
  return (
    <div className="h-full flex flex-col p-10 bg-black border border-border-dark rounded-xl hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all duration-300 min-h-[480px]">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-6"
          loading="lazy"
        />
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-text-secondary mb-6 leading-relaxed flex-grow">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-border-dark text-primary text-sm rounded border border-primary/30"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onViewDetails}
          className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors duration-200 text-sm"
        >
          View Details
        </button>

        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-[#0369a1] transition-colors duration-200 text-sm"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
