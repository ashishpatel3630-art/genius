import React, { useState } from 'react';
import { Globe, Zap, Star, UserCheck, Send } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { icon: <Globe size={20} />, text: 'Multilingual support (English, Hindi, Spanish, etc.)' },
  { icon: <Zap size={20} />, text: '70% efficiency improvement' },
  { icon: <Star size={20} />, text: '4.8 rating from 5000+ users' },
  { icon: <UserCheck size={20} />, text: 'User-friendly interface' },
];

export default function WhyChoose() {
  const [input, setInput] = useState('');

  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight font-display leading-tight"
          >
            Why Choose <span className="text-gradient">Genius?</span>
          </motion.h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium">
            Genius AI isn't just another chatbot. It's a comprehensive intelligence layer 
            that integrates seamlessly into your life and business.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col gap-4 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                  {stat.icon}
                </div>
                <span className="font-bold text-slate-800 leading-snug">{stat.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
          <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight font-display">Try it yourself</h3>
          <div className="space-y-6">
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you want to build..."
                className="w-full h-48 p-8 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none text-slate-700 text-lg font-medium shadow-inner group-hover:bg-white"
              />
              <div className="absolute bottom-6 right-6 flex gap-3">
                <button 
                  onClick={() => setInput('')}
                  className="px-4 py-2 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                >
                  Clear
                </button>
              </div>
            </div>
            <button className="btn-primary w-full flex items-center justify-center gap-3 py-6 text-xl shadow-2xl shadow-primary/30 group">
              <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Generate Now
            </button>
            <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-4">
              Experience the power of Genius AI in real-time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
