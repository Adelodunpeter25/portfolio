import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
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
    <motion.nav
      className="fixed left-1/2 transform -translate-x-1/2 z-50"
      initial={{ top: 0, width: '100%' }}
      animate={{
        top: isScrolled ? 24 : 0,
        width: isScrolled ? 'auto' : '100%',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className={`bg-black/90 backdrop-blur-md px-6 py-3 flex items-center gap-6 md:w-auto w-full overflow-hidden ${
          isScrolled ? '' : 'justify-center'
        }`}
        style={{
          boxShadow: isScrolled ? '0 0 0 1px rgb(30, 41, 59)' : 'none',
        }}
        animate={{
          borderRadius: isScrolled ? 9999 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Mobile: Show name and theme toggle */}
        <div className={`md:hidden flex items-center w-full ${
          isScrolled ? 'justify-between' : 'justify-center gap-8'
        }`}>
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
              className={`text-lg px-4 py-2 rounded-full transition-all duration-200 ${
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
      </motion.div>
    </motion.nav>
  );
}

export default memo(DesktopNavbar);