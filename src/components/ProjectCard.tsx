import { motion } from 'framer-motion';
import { memo } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
  image?: string;
}

function ProjectCard({
  title,
  description,
  tech,
  link,
  demo,
  image,
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
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-text-secondary mb-6 leading-relaxed flex-grow">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-border-dark text-primary text-base rounded border border-primary/30"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-primary text-primary rounded-md text-base"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            View Code
          </motion.a>
        )}

        {demo && (
          <motion.a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-white rounded-md text-base"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Live Demo
          </motion.a>
        )}
      </div>
    </div>
  );
}

export default memo(ProjectCard);
