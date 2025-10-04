import { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string[];
}

const commands: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  about    - Navigate to About section',
    '  skills   - Navigate to Skills section',
    '  projects - Navigate to Projects section',
    '  contact  - Navigate to Contact section',
    '  tour     - Take a guided orientation',
    '  clear    - Clear terminal',
    '  help     - Show this message',
  ],
  about: [
    'ADELODUN PETER',
    'FullStack Developer & Problem Solver',
    '',
    'Mr. Adelodun creates robust, scalable solutions that solve',
    'real-world problems. From concept to deployment, he focuses',
    'on building software that works reliably and makes an impact.',
  ],
  skills: [
    'TECHNICAL EXPERTISE:',
    '  ▸ Python (Django, FastAPI)      [████████░░] 90%',
    '  ▸ React & TypeScript            [████████░░] 84%',
    '  ▸ PostgreSQL & SQLite           [████████░░] 87%',
    '  ▸ Git & Version Control         [█████████░] 90%',
    '  ▸ HTML & CSS                    [████████░░] 88%',
  ],
  projects: [
    'PORTFOLIO PROJECTS:',
    '  [1] Project One - React & TypeScript',
    '  [2] Project Two - Node.js & MongoDB',
    '  [3] Project Three - Mobile-first design',
    '',
    'Scroll down the page to view detailed project information.',
  ],
  contact: [
    'CONTACT INFORMATION:',
    '  Email     : adelodunpeter24@gmail.com',
    '  GitHub    : github.com/Adelodunpeter25',
    '  LinkedIn  : linkedin.com/in/adelodunpeter',
    '',
    'Feel free to reach out for collaboration opportunities.',
  ],
  tour: [
    'ORIENTATION TOUR:',
    '',
    '1. Navigate using the menu at the top',
    '2. Explore the About section to learn about the approach',
    '3. Review Skills to see technical proficiency',
    '4. Browse Projects to see work samples',
    '5. Use Contact form to get in touch',
    '',
    'Type any command to continue exploring.',
  ],
};

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<Command[]>([
    { 
      input: '', 
      output: [
        '<div style="text-align: center; margin: 20px 0 5px 0;">',
        '<span style="font-size: 2.5rem; font-weight: bold; color: #0284c7; letter-spacing: 0.3rem; text-shadow: 0 0 10px rgba(2, 132, 199, 0.5);">J.A.R.V.I.S</span>',
        '<div style="color: #94A3B8; font-size: 0.75rem; margin-top: 8px; letter-spacing: 0.1rem;">Just A Rather Very Intelligent System</div>',
        '</div>',
        'Good day. I am JARVIS, the digital assistant to Mr. Adelodun Peter.',
        '',
        'Welcome to the portfolio interface. I am here to assist you in',
        'navigating Mr. Adelodun\'s professional profile and technical expertise.',
        '',
        'Should you require an orientation tour, simply type "tour".',
        'Otherwise, you may proceed at your discretion using "help" to',
        'view available commands.',
        '',
        'At your service.',
      ] 
    },
  ]);
  const [input, setInput] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return;
      
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      
      windowRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      
      // Only update position if we actually moved
      if (Math.abs(newX) > 1 || Math.abs(newY) > 1) {
        setPosition({ x: newX, y: newY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't drag if clicking on input, buttons, or interactive elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    
    if (!windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setIsDragging(true);
    e.preventDefault();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    // Handle navigation commands
    if (trimmed === 'about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      setHistory([...history, { input: cmd, output: ['Navigating to About section...'] }]);
      return;
    }

    if (trimmed === 'skills') {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      setHistory([...history, { input: cmd, output: ['Navigating to Skills section...'] }]);
      return;
    }

    if (trimmed === 'projects') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      setHistory([...history, { input: cmd, output: ['Navigating to Projects section...'] }]);
      return;
    }

    if (trimmed === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      setHistory([...history, { input: cmd, output: ['Navigating to Contact section...'] }]);
      return;
    }

    const output = commands[trimmed] || [`Command not found: ${cmd}. Type "help" for available commands.`];
    setHistory([...history, { input: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setPosition({ x: 0, y: 0 });
    if (windowRef.current) {
      windowRef.current.style.transform = 'none';
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Terminal Window */}
      {isOpen && (
        <div
          ref={windowRef}
          style={{
            position: 'fixed',
            left: !position.x && !position.y ? 'auto' : '0',
            top: !position.x && !position.y ? 'auto' : '0',
            right: !position.x && !position.y ? '2rem' : 'auto',
            bottom: !position.x && !position.y ? '6rem' : 'auto',
            transform: position.x || position.y ? `translate3d(${position.x}px, ${position.y}px, 0)` : 'none',
            cursor: isDragging ? 'grabbing' : 'default',
          }}
          className="z-50 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className={`bg-black border border-primary/30 rounded-lg shadow-2xl transition-all duration-300 ${
            isExpanded ? 'w-[90vw] h-[90vh]' : 'w-[650px] max-w-[calc(100vw-4rem)]'
          }`}>
            {/* Header */}
            <div
              onMouseDown={handleMouseDown}
              onClick={() => isMinimized && setIsMinimized(false)}
              className="flex items-center justify-between bg-neutral-900 px-4 py-2 rounded-t-lg border-b border-primary/30 select-none cursor-grab"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer group"
                    aria-label="Close"
                  >
                    <div className="w-3 h-3 rounded-full bg-red-500 group-hover:bg-red-600 transition-colors flex items-center justify-center">
                      <svg className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={handleMinimize}
                    className="p-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer group"
                    aria-label="Minimize"
                  >
                    <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:bg-yellow-600 transition-colors flex items-center justify-center">
                      <svg className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M20 12H4" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer group"
                    aria-label="Expand"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors flex items-center justify-center">
                      <svg className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </button>
                </div>
                <span className="text-text-secondary text-sm ml-2">terminal</span>
              </div>
            </div>

            {/* Terminal Content */}
            {!isMinimized && (
              <div 
                ref={terminalRef}
                onClick={() => inputRef.current?.focus()}
                className={`p-4 font-mono text-sm cursor-text transition-all duration-300 ${
                  isExpanded ? 'h-[calc(90vh-3rem)]' : 'h-[500px]'
                } overflow-y-auto terminal-scroll`}
              >
                {history.map((cmd, i) => (
                  <div key={i} className="mb-4">
                    {cmd.input && (
                      <div className="flex gap-2">
                        <span className="text-green-400">peter@portfolio</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white">$</span>
                        <span className="text-white">{cmd.input}</span>
                      </div>
                    )}
                    <div 
                      className="text-text-secondary whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: cmd.output.join('\n') }}
                    />
                  </div>
                ))}
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <span className="text-green-400">peter@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white terminal-cursor terminal-input"
                    spellCheck={false}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-[#0369a1] hover:scale-110 transition-all duration-300 z-40"
        aria-label="Toggle terminal"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </>
  );
}
