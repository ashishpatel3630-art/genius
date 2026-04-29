import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Cpu, Bold, Italic, Code as CodeIcon, Copy, Check, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getGeminiResponse } from '@/src/lib/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isThinking?: boolean;
}

const thinkingSteps = [
  'Analyzing context...',
  'Searching knowledge base...',
  'Synthesizing information...',
  'Optimizing response...',
  'Finalizing answer...'
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am Genius AI. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setThinkingStep((prev) => (prev + 1) % thinkingSteps.length);
      }, 1500);
    } else {
      setThinkingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(input);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const applyFormat = (prefix: string, suffix: string) => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    const selectedText = input.substring(start, end);
    const newText = input.substring(0, start) + prefix + selectedText + suffix + input.substring(end);
    setInput(newText);
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newPos = start + prefix.length + selectedText.length + suffix.length;
        inputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  return (
    <div id="chat" className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="absolute bottom-24 right-0 w-[380px] md:w-[450px] h-[650px] bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-white/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                  <Cpu size={24} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tight">Genius AI</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    <span className="text-[10px] text-blue-100 uppercase font-black tracking-widest">Neural Network Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`group relative max-w-[85%] p-4 rounded-3xl text-sm prose prose-sm prose-slate ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none prose-invert shadow-xl shadow-primary/20'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-xl shadow-slate-200/20'
                    }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="absolute -right-10 top-0 p-2 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    )}

                    <div className={`text-[10px] mt-2 font-black opacity-40 uppercase tracking-widest ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-5 rounded-3xl rounded-tl-none border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-3 min-w-[200px]">
                    <div className="flex items-center gap-3 text-primary">
                      <Loader2 size={18} className="animate-spin" />
                      <span className="text-xs font-black uppercase tracking-widest animate-pulse">
                        {thinkingSteps[thinkingStep]}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 bg-primary rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Toolbar & Field */}
            <div className="p-6 bg-white/50 backdrop-blur-xl border-t border-slate-100">
              <div className="flex gap-3 mb-4">
                {[
                  { icon: <Bold size={14} />, action: () => applyFormat('**', '**'), label: 'Bold' },
                  { icon: <Italic size={14} />, action: () => applyFormat('*', '*'), label: 'Italic' },
                  { icon: <CodeIcon size={14} />, action: () => applyFormat('```\n', '\n```'), label: 'Code' },
                  { icon: <Sparkles size={14} />, action: () => setInput(prev => prev + ' ✨ '), label: 'Magic' }
                ].map((tool, i) => (
                  <button
                    key={i}
                    onClick={tool.action}
                    className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl text-slate-400 transition-all active:scale-90"
                    title={tool.label}
                  >
                    {tool.icon}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative group">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask Genius anything..."
                    rows={1}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none max-h-32 min-h-[56px] shadow-sm group-hover:shadow-md"
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-14 h-14 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-90 group"
                >
                  <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center font-black uppercase tracking-widest">
                Shift + Enter for new line • Genius AI v2.5
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 text-white rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X size={32} /> : <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />}
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-4 border-white rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
