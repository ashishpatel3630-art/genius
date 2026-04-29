import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, Zap, MessageSquare, Image as ImageIcon, BookOpen, Settings, X, ArrowRight } from 'lucide-react';

const actions = [
  { id: 'chat', icon: <MessageSquare size={18} />, title: 'Open AI Chat', shortcut: 'C', description: 'Talk to Genius AI assistant' },
  { id: 'image', icon: <ImageIcon size={18} />, title: 'Generate Image', shortcut: 'G', description: 'Create visuals from text' },
  { id: 'knowledge', icon: <BookOpen size={18} />, title: 'Search Knowledge', shortcut: 'K', description: 'Query your documents' },
  { id: 'agent', icon: <Settings size={18} />, title: 'Run AI Agent', shortcut: 'A', description: 'Automate a workflow' },
  { id: 'pricing', icon: <Zap size={18} />, title: 'View Pricing', shortcut: 'P', description: 'Check our plans' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        executeAction(filteredActions[selectedIndex].id);
      }
    }
  };

  const executeAction = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (id === 'chat') {
        // Trigger chat open event if needed
      }
    }
  };

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
        >
          <Search size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
          <span className="text-sm font-bold text-slate-500">Search actions...</span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-black text-slate-400">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <Search size={24} className="text-primary" />
                <input 
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What would you like to do?"
                  className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-slate-900 placeholder:text-slate-300"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-4">
                {filteredActions.length > 0 ? (
                  <div className="space-y-2">
                    {filteredActions.map((action, index) => (
                      <button
                        key={action.id}
                        onClick={() => executeAction(action.id)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                          index === selectedIndex ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            index === selectedIndex ? 'bg-white/20' : 'bg-slate-100 text-primary'
                          }`}>
                            {action.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-bold">{action.title}</div>
                            <div className={`text-xs ${index === selectedIndex ? 'text-blue-100' : 'text-slate-400'}`}>
                              {action.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {index === selectedIndex && <ArrowRight size={18} className="animate-pulse" />}
                          <div className={`px-2 py-1 rounded text-[10px] font-black ${
                            index === selectedIndex ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {action.shortcut}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="text-slate-300 mb-2">No results found for "{query}"</div>
                    <div className="text-xs text-slate-400">Try searching for "chat" or "image"</div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm">↑↓</div>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm">Enter</div>
                    <span>Select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm">Esc</div>
                  <span>Close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
