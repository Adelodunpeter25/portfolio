import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home', icon: '🏠' },
  { name: 'About', href: '#about', icon: '👤' },
  { name: 'Skills', href: '#skills', icon: '⚡' },
  { name: 'Projects', href: '#projects', icon: '💼' },
  { name: 'Contact', href: '#contact', icon: '📧' },
];

export default function MobileBottomBar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-black/95 light:bg-white/95 backdrop-blur-md border-t border-border-dark light:border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          {navLinks.map(({ name, href, icon }) => (
            <a
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeSection === href.slice(1)
                  ? 'text-primary bg-primary/10'
                  : 'text-white light:text-gray-900 hover:text-primary'
              }`}
            >
              <span className="text-lg mb-1">{icon}</span>
              <span className="text-xs">{name}</span>
            </a>
          ))}
          <div className="flex flex-col items-center py-2 px-3">
            <ThemeToggle />
            <span className="text-xs text-white light:text-gray-900 mt-1">Theme</span>
          </div>
        </div>
      </div>
    </nav>
  );
}