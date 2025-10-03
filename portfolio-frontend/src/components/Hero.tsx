export default function Hero({ name, tagline }: { name: string; tagline: string }) {
  return (
    <section id="home" className="min-h-screen flex items-center px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl">
          {tagline}
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-110 transition-all duration-200 flex items-center gap-2"
          >
            View Projects
            <span>→</span>
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-200"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
