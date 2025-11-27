import { useState, useEffect, memo } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

function DesktopNavbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-10% 0px -70% 0px' }
    );

    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      isScrolled ? 'top-6 w-auto' : 'top-0 w-full'
    }`}>
      <div className={`bg-black/90 backdrop-blur-md border border-border-dark px-6 py-3 flex items-center gap-6 md:w-auto w-80 transition-all duration-500 ${
        isScrolled ? 'rounded-full' : 'rounded-none border-x-0 border-t-0'
      }`}>
        {/* Mobile: Show name and theme toggle */}
        <div className="md:hidden flex items-center justify-between w-full">
          <a 
            href="#home" 
            className={`text-lg font-bold transition-colors ${
              activeSection ? 'text-primary' : 'text-white'
            }`}
          >
            Adelodun Peter
          </a>
          <ThemeToggle />
        </div>
        
        {/* Desktop: Show full navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              className={`text-base px-4 py-2 rounded-full transition-all duration-200 ${
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

export default memo(DesktopNavbar);