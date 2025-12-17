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
    'Quite the thinker, I must say.',
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
    '  ▸ Django                        [████████░░] 85%',
    '  ▸ SQLite                        [████████░░] 85%',
    '  ▸ HTML/CSS                      [████████░░] 80%',
    '  ▸ Git/GitHub                    [████████░░] 80%',
    '  ▸ FastAPI                       [███████░░░] 70%',
    '  ▸ PostgreSQL                    [███████░░░] 70%',
    '  ▸ JavaScript                    [██████░░░░] 65%',
    '  ▸ Redis                         [█████░░░░░] 55%',
    '  ▸ React                         [█████░░░░░] 50%',
    '  ▸ Supabase                      [█████░░░░░] 50%',
    '',
    'He is particularly proficient in Python-based frameworks',
    'and modern web technologies, as you can see.',
    '',
    'A thoughtful approach to mastering his craft.',
    '',
  ],
  projects: [
    'Here is a selection of Mr. Adelodun\'s notable work.',
    'Quite the thinker, this one.',
    '',
    '═══════════════════════════════════════════════════════════',
    '                    PORTFOLIO PROJECTS',
    '═══════════════════════════════════════════════════════════',
    '',
    '[1] ContactFast',
    '    A rather clever solution, if I may say. He built a',
    '    FastAPI-powered email endpoint for frontend-only portfolios.',
    '    Simply add a snippet to your contact form and receive',
    '    messages directly. No backend setup, no hassle.',
    '    Tech: FastAPI, Resend, PostgreSQL',
    '    → https://github.com/Adelodunpeter25/ContactFast',
    '',
    '[3] Resumade',
    '    A modern resume builder with',
    '    real-time preview, ATS optimization, and responsive design.',
    '    Free, seamless access to professional-grade resume tools.',
    '    Showcasing his problem-solving skills.',
    '    Tech: FastAPI, React, Supabase, Gemini, Google Oauth',
    '    → https://github.com/Adelodunpeter25/Resumade',
    '',
    '[4] Image-Processor-API',
    '    A showcase of his analytical thinking. A Flask-based',
    '    image processing service with authentication and',
    '    transformation capabilities. Efficient and reliable.',
    '    Tech: Flask, Pillow, Supabase',
    '    → https://github.com/Adelodunpeter25/image-processor-api',
    '',
    '[5] Content-Hub',
    '    Quite ingenious. A personal feed aggregator that collects',
    '    content from RSS feeds, web scraping, and social media with',
    '    intelligent recommendations and user personalization.',
    '    Tech: Flask, React, Supabase',
    '    → https://github.com/Adelodunpeter25/content-hub',
    '',
    '[5] Price Insight',
    '    A comprehensive price tracking and deal aggregation system',
    '    that monitors prices across multiple categories including',
    '    e-commerce, travel, real estate, and utility services with',
    '    automated web scraping, intelligent deal detection, and email',
    '    alerts when prices drop or deals become available.',
    '    Tech: FastAPI, PostgreSQL, APScheduler, Resend API',
    '    → https://github.com/Adelodunpeter25/price-insight',
    '',
    '[6] Migrator',
    '    A lightweight, framework-agnostic database migration tool',
    '    that simplifies SQLAlchemy migrations by wrapping Alembic',
    '    with a Django-like developer experience. Zero-config setup',
    '    reduces migration setup time from 30 minutes to 30 seconds.',
    '    Tech: Python, SQLAlchemy, Alembic',
    '    → https://github.com/Adelodunpeter25/migrator',
    '',
    '[7] DB Toolkit',
    '    A modern cross-platform database management application',
    '    with database exploration, query execution, automated',
    '    backups, AI query assistant, and multi-workspace support',
    '    for managing up to 20 simultaneous database connections.',
    '    Tech: React, Node.js, Electron',
    '    → https://github.com/db-toolkit/db-toolkit',
    '',
    '[8] Smart Assistant',
    '    An AI-powered personal assistant with natural language',
    '    processing, task automation, intelligent conversation,',
    '    web search, and smart reminders.',
    '    Tech: FastAPI, React, PostgreSQL, Workers AI',
    '    → https://github.com/Adelodunpeter25/smart-assistant',
    '',
    'Each project demonstrates his thoughtful approach to',
    'problem-solving and commitment to quality.',
    'A true thinker, indeed.',
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
    '     https://github.com/Adelodunpeter25',
    '',
    '  💼 LinkedIn',
    '     https://linkedin.com/in/adelodun-peter',
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
        'Good day. I am JARVIS, a personal assistant to Mr. Adelodun Peter.',
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
      await new Promise(resolve => setTimeout(resolve, 10));
      tempHistory[tempHistory.length - 1].output = currentText.split('\n');
      setHistory([...tempHistory]);
    }
    
    setIsTyping(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!windowRef.current) return;
    
    // Don't drag if clicking on input, buttons, or interactive elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    
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
      setTimeout(() => {
        const output = [
          'Ah!, a fresh start. How refreshing.',
          '',
          'Terminal display cleared. All systems nominal.',
          'Ready for your next command, sir!.',
        ];
        setHistory([{ input: '', output: [] }]);
        typeOutput(output);
      }, 100);
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
      {/* Minimized Terminal Bar */}
      {isMinimized && (
        <div
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-8 left-8 z-50 bg-neutral-900 border border-primary/30 rounded-lg px-6 py-3 cursor-pointer hover:bg-neutral-800 transition-all duration-200 animate-terminal-open"
        >
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-mono text-base">Terminal</span>
          </div>
        </div>
      )}

      {/* Terminal Window */}
      {isOpen && !isMinimized && (
        <div
          ref={windowRef}
          onMouseDown={handleMouseDown}
          style={{
            position: 'fixed',
            ...(isExpanded ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            } : {
              right: terminalPosition.x === 0 && terminalPosition.y === 0 ? '2rem' : 'auto',
              bottom: terminalPosition.x === 0 && terminalPosition.y === 0 ? '6rem' : 'auto',
              left: terminalPosition.x !== 0 || terminalPosition.y !== 0 ? `${terminalPosition.x}px` : 'auto',
              top: terminalPosition.x !== 0 || terminalPosition.y !== 0 ? `${terminalPosition.y}px` : 'auto',
            }),
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          className="z-50 select-none animate-terminal-open"
        >
          <div className={`bg-black border border-primary/30 shadow-2xl transition-all duration-300 ${
            isExpanded ? 'w-full h-full rounded-none' : 'w-[750px] max-w-[calc(100vw-4rem)] rounded-lg'
          }`}>
            {/* Header */}
            <div
              className="flex items-center justify-between bg-neutral-900 px-4 py-2 rounded-t-lg border-b border-primary/30 select-none"
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
                <span className="text-text-secondary text-sm ml-2">Terminal</span>
              </div>
            </div>

            {/* Terminal Content */}
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
                    isExpanded ? 'h-[calc(100vh-8rem)]' : 'h-[540px]'
                  } overflow-y-auto terminal-scroll`}
                  onMouseDown={(e) => e.stopPropagation()}
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
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-[#0369a1] hover:scale-110 transition-all duration-300 z-40"
        aria-label="Toggle terminal"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </>
  );
}
