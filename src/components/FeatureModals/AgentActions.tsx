import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, Play, CheckCircle2, Loader2, AlertCircle, Mail, Calendar, Database, Globe, ArrowRight, Sparkles } from 'lucide-react';

interface AgentActionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const tasks = [
  {
    id: 'email',
    icon: <Mail size={24} />,
    title: 'Automated Email Outreach',
    description: 'Draft and send personalized emails to leads based on CRM data.',
    status: 'idle',
    color: 'text-blue-500 bg-blue-50',
  },
  {
    id: 'meeting',
    icon: <Calendar size={24} />,
    title: 'Smart Meeting Scheduler',
    description: 'Analyze calendars and find optimal meeting times for all participants.',
    status: 'idle',
    color: 'text-purple-500 bg-purple-50',
  },
  {
    id: 'data',
    icon: <Database size={24} />,
    title: 'Database Synchronization',
    description: 'Sync data between multiple platforms and resolve conflicts automatically.',
    status: 'idle',
    color: 'text-emerald-500 bg-emerald-50',
  },
  {
    id: 'web',
    icon: <Globe size={24} />,
    title: 'Web Scraping & Analysis',
    description: 'Gather market data from competitor websites and generate a report.',
    status: 'idle',
    color: 'text-orange-500 bg-orange-50',
  },
];

export default function AgentActions({ isOpen, onClose }: AgentActionsProps) {
  const [activeTasks, setActiveTasks] = useState<typeof tasks>(tasks);
  const [isAllRunning, setIsAllRunning] = useState(false);

  const runTask = async (taskId: string) => {
    setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'running' } : t));
    
    // Simulate task execution
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
  };

  const runAllTasks = async () => {
    setIsAllRunning(true);
    for (const task of activeTasks) {
      if (task.status !== 'completed') {
        await runTask(task.id);
      }
    }
    setIsAllRunning(false);
  };

  const resetTasks = () => {
    setActiveTasks(tasks);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <Settings size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">AI Agent Actions</h3>
                  <p className="text-xs text-slate-500 font-medium">Autonomous Workflow Automation</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={resetTasks}
                  className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest"
                >
                  Reset
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto flex-1 space-y-8">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Available Agents</h4>
                <button 
                  onClick={runAllTasks}
                  disabled={isAllRunning}
                  className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg"
                >
                  {isAllRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                  Run All Agents
                </button>
              </div>

              <div className="grid gap-4">
                {activeTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    className={`p-6 rounded-[2rem] border transition-all duration-300 flex items-center gap-6 ${
                      task.status === 'completed' ? 'bg-emerald-50 border-emerald-100' : 
                      task.status === 'running' ? 'bg-white border-primary shadow-xl scale-[1.02]' : 
                      'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${task.color}`}>
                      {task.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-lg font-bold text-slate-900 mb-1">{task.title}</h5>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{task.description}</p>
                    </div>
                    <div className="shrink-0">
                      {task.status === 'completed' ? (
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                          <CheckCircle2 size={20} />
                          Done
                        </div>
                      ) : task.status === 'running' ? (
                        <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                          <Loader2 size={20} className="animate-spin" />
                          Running
                        </div>
                      ) : (
                        <button 
                          onClick={() => runTask(task.id)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all group"
                        >
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status Summary */}
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Sparkles size={64} />
                </div>
                <div className="relative z-10">
                  <h5 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">System Status</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Agents</p>
                      <p className="text-3xl font-black">{activeTasks.filter(t => t.status === 'running').length}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Tasks Completed</p>
                      <p className="text-3xl font-black">{activeTasks.filter(t => t.status === 'completed').length}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Efficiency Gain</p>
                      <p className="text-3xl font-black text-emerald-400">+85%</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">API Latency</p>
                      <p className="text-3xl font-black text-blue-400">12ms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium">
                Genius AI Agents can be configured to trigger complex multi-step workflows across 5,000+ apps.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
