import { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string[];
}

const commands: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  about    - Learn about me',
    '  skills   - View my technical skills',
    '  projects - See my projects',
    '  contact  - Get contact information',
    '  clear    - Clear terminal',
    '  help     - Show this message',
  ],
  about: [
    'Adelodun Peter - FullStack Developer',
    '',
    'I create robust, scalable solutions that solve real-world problems.',
    'From concept to deployment, I focus on building software that works',
    'reliably and makes an impact.',
  ],
  skills: [
    'Technical Skills:',
    '  • Python (Django, FastAPI)',
    '  • React & TypeScript',
    '  • PostgreSQL & SQLite',
    '  • Git & Version Control',
    '  • HTML & CSS',
  ],
  projects: [
    'Featured Projects:',
    '  1. Project One - React & TypeScript',
    '  2. Project Two - Node.js & MongoDB',
    '  3. Project Three - Mobile-first design',
    '',
    'Type "projects <number>" for details or scroll down to view all.',
  ],
  contact: [
    'Contact Information:',
    '  Email: adelodunpeter24@gmail.com',
    '  GitHub: github.com/Adelodunpeter25',
    '  LinkedIn: linkedin.com/in/adelodunpeter',
  ],
};

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<Command[]>([
    { input: '', output: ['Welcome! Type "help" for available commands.'] },
  ]);
  const [input, setInput] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 500);
      const maxY = window.innerHeight - (windowRef.current?.offsetHeight || 400);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([]);
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
            left: position.x ? `${position.x}px` : 'auto',
            top: position.y ? `${position.y}px` : 'auto',
            right: !position.x && !position.y ? '2rem' : 'auto',
            bottom: !position.x && !position.y ? '6rem' : 'auto',
            cursor: isDragging ? 'grabbing' : 'default',
          }}
          className="z-50 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className={`bg-black border border-primary/30 rounded-lg shadow-2xl transition-all duration-300 ${
            isExpanded ? 'w-[90vw] h-[90vh]' : 'w-[500px] max-w-[calc(100vw-4rem)]'
          }`}>
            {/* Header */}
            <div
              onMouseDown={handleMouseDown}
              onClick={() => isMinimized && setIsMinimized(false)}
              className="flex items-center justify-between bg-neutral-900 px-4 py-2 rounded-t-lg border-b border-primary/30 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1" onMouseDown={(e) => e.stopPropagation()}>
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
                className={`p-4 font-mono text-sm overflow-y-auto cursor-text transition-all duration-300 ${
                  isExpanded ? 'h-[calc(90vh-3rem)]' : 'h-80'
                }`}
              >
                {history.map((cmd, i) => (
                  <div key={i} className="mb-4">
                    {cmd.input && (
                      <div className="flex gap-2 text-primary">
                        <span>$</span>
                        <span>{cmd.input}</span>
                      </div>
                    )}
                    <div className="text-text-secondary whitespace-pre-line">
                      {cmd.output.join('\n')}
                    </div>
                  </div>
                ))}
                
                <form onSubmit={handleSubmit} className="flex gap-2 text-primary">
                  <span>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
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
