interface HowIWorkProps {
  subheading: string;
  approach: string;
  principles: string[];
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function HowIWork({ subheading, approach, principles, features }: HowIWorkProps) {
  return (
    <section id="about" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            How I Build Systems That <span className="text-primary">Matter</span>
          </h2>
          <p className="text-xl text-text-secondary">{subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="bg-black border border-border-dark rounded-xl p-10">
            <h3 className="text-2xl text-primary font-semibold mb-6">The Approach</h3>
            <div className="text-text-secondary leading-relaxed space-y-4">
              {approach.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="bg-black border border-border-dark rounded-xl p-10">
            <h3 className="text-2xl text-primary font-semibold mb-6">My Guiding Values</h3>
            <ul className="space-y-5">
              {principles.map((principle, index) => (
                <li key={index} className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-text-secondary">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black border border-border-dark rounded-xl p-8 hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all duration-300"
            >
              <div className="text-4xl mb-5">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
