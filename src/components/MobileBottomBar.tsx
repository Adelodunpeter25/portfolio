import { useState, useEffect } from 'react';
import { Home, User, Zap, Briefcase, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', Icon: Home },
  { name: 'About', href: '#about', Icon: User },
  { name: 'Skills', href: '#skills', Icon: Zap },
  { name: 'Projects', href: '#projects', Icon: Briefcase },
  { name: 'Contact', href: '#contact', Icon: Mail },
];

export default function MobileBottomBar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.id;
          }
        });
        
        if (mostVisible) {
          setActiveSection(mostVisible);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7], rootMargin: '-10% 0px -70% 0px' }
    );

    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-black/95 backdrop-blur-md border-t border-border-dark px-4 py-2">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          {navLinks.map(({ name, href, Icon }) => (
            <a
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeSection === href.slice(1)
                  ? 'text-primary bg-primary/10'
                  : 'text-white hover:text-primary'
              }`}
            >
              <Icon size={18} className="mb-1" />
              <span className="text-xs">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}