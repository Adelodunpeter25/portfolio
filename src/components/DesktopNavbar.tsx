import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function DesktopNavbar() {
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
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 backdrop-blur-md border border-border-dark rounded-full px-6 py-3 flex items-center gap-6">
        {/* Mobile: Show only name with active section highlighting */}
        <div className="md:hidden">
          <a 
            href="#home" 
            className={`text-lg font-bold transition-colors ${
              activeSection === 'home' ? 'text-primary' : 'text-white'
            }`}
          >
            Adelodun Peter
          </a>
        </div>
        
        {/* Desktop: Show full navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                activeSection === href.slice(1)
                  ? 'bg-primary text-white'
                  : 'text-white hover:text-primary hover:bg-primary/10'
              }`}
            >
              {name}
            </a>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}