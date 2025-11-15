import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-border-dark z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <a href="#home" className="text-lg font-bold text-primary">{name}</a>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ name, href }) => (
                <a
                  key={href}
                  href={href}
                  className={`text-sm transition-all duration-200 ${
                    activeSection === href.slice(1) 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-white hover:text-primary'
                  }`}
                >
                  {name}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-black border-l border-border-dark z-50 transform transition-transform duration-300 md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-end p-6">
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col px-8">
          {navLinks.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="py-4 text-white hover:text-primary transition-colors border-b border-border-dark"
            >
              {name}
            </a>
          ))}
          <div className="mt-6">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
