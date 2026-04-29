import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Zap, Shield, Globe, Sparkles, Code, Database, Search } from 'lucide-react';

const logs = [
  { type: 'info', message: 'Initializing Genius AI Neural Engine v2.5...', delay: 0 },
  { type: 'success', message: 'Connection established with global edge nodes.', delay: 800 },
  { type: 'process', message: 'Analyzing current market trends and user behavior data...', delay: 1500 },
  { type: 'info', message: 'Scanning 1.2M documents for relevant context...', delay: 2200 },
  { type: 'success', message: 'Context synthesis complete. Confidence score: 98.4%', delay: 3000 },
  { type: 'process', message: 'Generating optimized workflow automation scripts...', delay: 3800 },
  { type: 'code', message: 'const optimize = (data) => data.map(item => ({ ...item, ai_enhanced: true }));', delay: 4500 },
  { type: 'success', message: 'Automation deployed to production environment.', delay: 5200 },
  { type: 'info', message: 'Monitoring system performance in real-time...', delay: 6000 },
];

export default function LiveDemo() {
  const [visibleLogs, setVisibleLogs] = useState<typeof logs>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs(prev => [...prev, logs[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, logs[currentIndex].delay - (currentIndex > 0 ? logs[currentIndex-1].delay : 0));
      return () => clearTimeout(timer);
    } else {
      // Reset after a delay to loop
      const resetTimer = setTimeout(() => {
        setVisibleLogs([]);
        setCurrentIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex]);

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse-neural" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-[0.2em] border border-primary/20"
            >
              <Zap size={14} className="animate-pulse" />
              <span>Live System Monitor</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]"
            >
              Watch the <br />
              <span className="text-gradient">Intelligence</span> <br />
              in Action
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl"
            >
              Genius AI isn't just a chatbot. It's a complex neural network that processes millions of data points to deliver human-like reasoning and autonomous execution.
            </motion.p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              {[
                { icon: <Cpu size={24} />, label: 'Neural Processing', value: '2.4 PFLOPS' },
                { icon: <Globe size={24} />, label: 'Global Latency', value: '< 45ms' },
                { icon: <Shield size={24} />, label: 'Security Level', value: 'Military Grade' },
                { icon: <Database size={24} />, label: 'Data Analyzed', value: '1.2 PB/day' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-primary">{stat.icon}</div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Terminal Window */}
            <div className="bg-slate-950 rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden aspect-square md:aspect-[4/3] flex flex-col">
              <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-6 gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <Terminal size={12} />
                    <span>genius-ai-core-v2.5.sh</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-8 font-mono text-sm overflow-y-auto space-y-3 scrollbar-hide">
                <AnimatePresence mode="popLayout">
                  {visibleLogs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4"
                    >
                      <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                      <span className={`
                        ${log.type === 'success' ? 'text-green-400' : ''}
                        ${log.type === 'process' ? 'text-blue-400' : ''}
                        ${log.type === 'code' ? 'text-purple-400 bg-purple-400/10 px-2 rounded' : ''}
                        ${log.type === 'info' ? 'text-slate-300' : ''}
                      `}>
                        {log.type === 'success' && '✓ '}
                        {log.type === 'process' && '⚡ '}
                        {log.message}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {currentIndex < logs.length && (
                  <div className="flex gap-4">
                    <span className="text-slate-600">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span className="w-2 h-5 bg-primary animate-pulse" />
                  </div>
                )}
              </div>

              <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-slate-400">System Ready</span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-primary" />
                    <span className="text-[10px] font-black uppercase text-slate-400">AI Active</span>
                  </div>
                </div>
                <div className="text-[10px] font-black uppercase text-slate-600">
                  CPU: 12.4% | RAM: 4.2GB
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"
            />
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
