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
  return (
    <section id="home" className="min-h-screen flex items-center px-8 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div className="inline-block bg-neutral-900 text-neutral-300 px-3 py-1 rounded-full text-sm uppercase tracking-wide mb-6">
          {tagline}
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {name}
          <br />
          <span className="text-primary">{mission}</span>
        </h1>
        
        <p className="text-lg text-neutral-400 mb-8 max-w-2xl leading-relaxed">
          {subtext}
        </p>
        
        <div className="flex gap-4 flex-wrap mb-16">
          <a
            href="#skills"
            className="px-5 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            View Skills
          </a>
          <a
            href="#contact"
            className="px-5 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors duration-200"
          >
            Contact Me
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black border border-neutral-800 rounded-lg p-6 hover:border-primary/50 transition-colors duration-200"
            >
              <div className="text-3xl text-primary mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-neutral-100 mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
