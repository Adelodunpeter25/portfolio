import { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string[];
}

const commands: Record<string, string[]> = {
  help: [
    'Certainly. Here are the available commands:',
    '',
    '  about    - Learn about Mr. Adelodun\'s approach',
    '  skills   - Review his technical expertise',
    '  projects - Examine his portfolio work',
    '  contact  - Obtain contact information',
    '  tour     - Take a guided orientation',
    '  clear    - Clear terminal display',
    '  help     - Display this message',
    '',
  ],
  about: [
    'Ah yes, let me tell you about Mr. Adelodun\'s approach.',
    '',
    '═══════════════════════════════════════════════════════════',
    '                    BUILDING SYSTEMS THAT LAST',
    '═══════════════════════════════════════════════════════════',
    '',
    'Mr. Adelodun builds software that is technically strong,',
    'scalable, and rooted in real-world relevance. His focus is',
    'on delivering solutions that are both functional and',
    'impactful, ensuring that every aspect of the product is',
    'designed with the end-user in mind.',
    '',
    'For him, successful software goes beyond mere functionality;',
    'it must perform reliably in the real world.',
    '',
    'HIS CORE PRINCIPLES:',
    '',
    '  → Listen First',
    '    He begins by understanding challenges and goals,',
    '    ensuring solutions are clear, sound, and aligned with',
    '    what truly matters.',
    '',
    '  → Production Mindset',
    '    He builds for real-world reliability, not just',
    '    development. He doesn\'t just build, he ships.',
    '',
    '  → Clear Communication',
    '    His code, documentation, and conversations are all',
    '    designed to be easily understood.',
    '',
    '  → Build for Growth',
    '    He designs with the future in mind, not just today.',
    '',
    'DISTINGUISHING FEATURES:',
    '',
    '  🎯 User-Centered Approach',
    '     Every feature he creates is shaped with real people',
    '     in mind, ensuring clarity, accessibility, and impact.',
    '',
    '  📈 Complete Involvement',
    '     He stays involved at every stage — from design to',
    '     deployment, monitoring, and continuous improvement.',
    '',
    'Quite impressive, if I may say so.',
    '',
  ],
  skills: [
    'Allow me to present Mr. Adelodun\'s technical proficiencies.',
    '',
    '═══════════════════════════════════════════════════════════',
    '                    TECHNICAL EXPERTISE',
    '═══════════════════════════════════════════════════════════',
    '',
    '  ▸ Python                        [█████████░] 90%',
    '  ▸ Django                        [█████████░] 90%',
    '  ▸ FastAPI                       [████████░░] 88%',
    '  ▸ React                         [████████░░] 84%',
    '  ▸ CSS                           [████████░░] 85%',
    '  ▸ HTML                          [█████████░] 90%',
    '  ▸ PostgreSQL                    [████████░░] 87%',
    '  ▸ SQLite                        [████████░░] 85%',
    '  ▸ Git                           [█████████░] 90%',
    '',
    'He is particularly proficient in Python-based frameworks',
    'and modern web technologies, as you can see.',
    '',
  ],
  projects: [
    'Here is a selection of Mr. Adelodun\'s notable work.',
    '',
    '═══════════════════════════════════════════════════════════',
    '                    PORTFOLIO PROJECTS',
    '═══════════════════════════════════════════════════════════',
    '',
    '[1] Project One',
    '    He developed a modern web application using React',
    '    and TypeScript with a focus on type safety.',
    '    Tech: React, TypeScript, Tailwind',
    '    → github.com/Adelodunpeter25/project1',
    '',
    '[2] Project Two',
    '    A full-stack application featuring real-time',
    '    capabilities and robust backend architecture.',
    '    Tech: Node.js, Express, MongoDB',
    '    → github.com/Adelodunpeter25/project2',
    '',
    '[3] Project Three',
    '    He created a mobile-first responsive design that',
    '    adapts seamlessly across all device sizes.',
    '    Tech: React, CSS3, Vite',
    '    → github.com/Adelodunpeter25/project3',
    '',
    '[4] Project Four',
    '    This project demonstrates his API integration skills',
    '    and data visualization capabilities.',
    '    Tech: Python, FastAPI, Chart.js',
    '    → github.com/Adelodunpeter25/project4',
    '',
    '[5] Project Five',
    '    An e-commerce platform with secure payment processing',
    '    and comprehensive database management.',
    '    Tech: Next.js, Stripe, PostgreSQL',
    '    → github.com/Adelodunpeter25/project5',
    '',
    '[6] Project Six',
    '    A real-time chat application showcasing his expertise',
    '    in WebSocket technology and containerization.',
    '    Tech: Socket.io, Redis, Docker',
    '    → github.com/Adelodunpeter25/project6',
    '',
    'Each project demonstrates his commitment to quality and',
    'practical problem-solving.',
    '',
  ],
  contact: [
    'Of course. Here is how you may reach Mr. Adelodun.',
    '',
    '═══════════════════════════════════════════════════════════',
    '                    CONTACT INFORMATION',
    '═══════════════════════════════════════════════════════════',
    '',
    '  📧 Email',
    '     adelodunpeter24@gmail.com',
    '',
    '  💻 GitHub',
    '     github.com/Adelodunpeter25',
    '',
    '  💼 LinkedIn',
    '     linkedin.com/in/adelodun-peter',
    '',
    'He is quite responsive to inquiries regarding collaboration',
    'opportunities, project discussions, or professional',
    'networking.',
    '',
    'Shall I assist you with anything else?',
    '',
  ],
  tour: [
    'Excellent choice. Allow me to guide you through this interface.',
    '',
    '═══════════════════════════════════════════════════════════',
    '                    ORIENTATION TOUR',
    '═══════════════════════════════════════════════════════════',
    '',
    '1. Navigation',
    '   You may use the menu at the top to navigate the site,',
    '   or simply use commands here in the terminal.',
    '',
    '2. About Section',
    '   Type "about" to learn about Mr. Adelodun\'s approach',
    '   and development philosophy.',
    '',
    '3. Skills Assessment',
    '   Type "skills" to review his technical proficiencies',
    '   and areas of expertise.',
    '',
    '4. Portfolio Review',
    '   Type "projects" to examine his work samples and',
    '   completed projects.',
    '',
    '5. Contact Information',
    '   Type "contact" when you wish to reach out to him',
    '   for collaboration or inquiries.',
    '',
    'I am at your service. Type any command to continue.',
    '',
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [terminalPosition, setTerminalPosition] = useState({ x: 0, y: 0 });
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  const typeOutput = async (output: string[]) => {
    setIsTyping(true);
    const fullText = output.join('\n');
    const tempHistory = [...history];
    let currentText = '';
    
    for (let i = 0; i < fullText.length; i++) {
      currentText += fullText[i];
      await new Promise(resolve => setTimeout(resolve, 7));
      tempHistory[tempHistory.length - 1].output = currentText.split('\n');
      setHistory([...tempHistory]);
    }
    
    setIsTyping(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !windowRef.current) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setTerminalPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    // Add to command history
    if (trimmed) {
      setCommandHistory(prev => [...prev, trimmed]);
      setHistoryIndex(-1);
    }

    // Navigate to section if applicable
    const sectionMap: Record<string, string> = {
      about: 'about',
      skills: 'skills',
      projects: 'projects',
      contact: 'contact',
    };
    
    if (sectionMap[trimmed]) {
      setTimeout(() => {
        document.getElementById(sectionMap[trimmed])?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    const output = commands[trimmed] || [
      `I'm afraid I don't recognize that command: "${cmd}"`,
      '',
      'Perhaps you meant one of these? Type "help" to see all',
      'available commands.',
    ];
    
    setHistory([...history, { input: cmd, output: [] }]);
    typeOutput(output);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory([...history, { 
          input: '', 
          output: matches.map(cmd => `  ${cmd}`).concat(['']) 
        }]);
      }
    }
    
    // Command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTerminalPosition({ x: 0, y: 0 });
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
            right: terminalPosition.x === 0 && terminalPosition.y === 0 ? '2rem' : 'auto',
            bottom: terminalPosition.x === 0 && terminalPosition.y === 0 ? '6rem' : 'auto',
            left: terminalPosition.x !== 0 || terminalPosition.y !== 0 ? `${terminalPosition.x}px` : 'auto',
            top: terminalPosition.x !== 0 || terminalPosition.y !== 0 ? `${terminalPosition.y}px` : 'auto',
            cursor: isDragging ? 'grabbing' : 'default',
          }}
          className="z-50 select-none animate-terminal-open"
        >
          <div className={`bg-black border border-primary/30 rounded-lg shadow-2xl transition-all duration-300 ${
            isExpanded ? 'w-[90vw] h-[90vh]' : 'w-[750px] max-w-[calc(100vw-4rem)]'
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
              <>
                {/* Fixed JARVIS Header */}
                <div className="px-4 pt-4 pb-2 border-b border-primary/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary tracking-[0.3rem]" style={{ textShadow: '0 0 10px rgba(2, 132, 199, 0.5)' }}>
                      J.A.R.V.I.S
                    </div>
                    <div className="text-text-secondary text-xs mt-1 tracking-[0.1rem]">
                      Just A Rather Very Intelligent System
                    </div>
                  </div>
                </div>

                <div 
                  ref={terminalRef}
                  onClick={() => inputRef.current?.focus()}
                  className={`p-4 font-mono text-sm cursor-text transition-all duration-300 ${
                    isExpanded ? 'h-[calc(90vh-8rem)]' : 'h-[540px]'
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
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                    className="flex-1 bg-transparent outline-none text-white terminal-cursor terminal-input disabled:opacity-50"
                    spellCheck={false}
                  />
                </form>
              </div>
              </>
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
