interface ContactProps {
  email: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export default function Contact({ email, social }: ContactProps) {
  return (
    <section id="contact" className="py-24 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
        <p className="text-lg text-text-secondary mb-12 leading-relaxed">
          I'm always open to new opportunities and collaborations. Let's build something amazing together.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={`mailto:${email}`}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-110 transition-all duration-200 flex items-center gap-2"
          >
            Email Me
            <span>→</span>
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-200"
          >
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
