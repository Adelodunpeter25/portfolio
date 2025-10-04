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
    '  GitHub: htts://github.com/Adelodunpeter25',
    '  LinkedIn: linkedin.com/in/adelodun-peter',
  ],
};

export default function Terminal() {
  const [history, setHistory] = useState<Command[]>([
    { input: '', output: ['Welcome! Type "help" for available commands.'] },
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

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

  return (
    <section id="terminal" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Interactive <span className="text-primary">Terminal</span>
        </h2>
        
        <div 
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          className="bg-black border border-primary/30 rounded-lg p-6 font-mono text-sm h-96 overflow-y-auto cursor-text"
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
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
        
        <p className="text-text-secondary text-sm mt-4 text-center">
          Try typing "help" to see available commands
        </p>
      </div>
    </section>
  );
}
