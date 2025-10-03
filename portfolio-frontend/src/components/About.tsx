export default function About({ about }: { about: string }) {
  return (
    <section id="about" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
        <p className="text-lg text-text-secondary leading-relaxed">{about}</p>
      </div>
    </section>
  );
}
