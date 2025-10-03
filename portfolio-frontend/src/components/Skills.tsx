import { useState } from 'react';

interface SkillCategory {
  name: string;
  icon: string;
  proficiency: number;
  skills: string[];
}

interface SkillsProps {
  categories: {
    [key: string]: SkillCategory;
  };
}

export default function Skills({ categories }: SkillsProps) {
  const [activeTab, setActiveTab] = useState('Languages');
  const tabs = Object.keys(categories);

  return (
    <section id="skills" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Technical Infrastructure</h2>
          <p className="text-xl text-text-secondary">
            My Stack for Reliable, Usable and Scalable Software
          </p>
        </div>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-transparent border-border-dark text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              <span className="text-lg">{categories[tab].icon}</span>
              <span className="text-sm">{tab}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{categories[activeTab].icon}</span>
            <h3 className="text-2xl md:text-3xl font-semibold">{activeTab}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-secondary">Proficiency</span>
            <div className="w-28 h-2 bg-border-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${categories[activeTab].proficiency}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-primary">
              {categories[activeTab].proficiency}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories[activeTab].skills.map((skill) => (
            <div
              key={skill}
              className="bg-black border border-border-dark rounded-lg px-5 py-4 text-center hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-200"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
