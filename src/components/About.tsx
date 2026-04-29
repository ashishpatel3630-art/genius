import React from 'react';
import { Target, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="section-padding bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight font-display"
          >
            Innovating the <span className="text-gradient">Future</span> with AI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-600 font-medium leading-relaxed"
          >
            We are dedicated to building intelligent systems that understand, learn, and evolve, 
            transforming everyday interactions into smart, meaningful experiences.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -15, scale: 1.02 }}
            className="p-12 bg-white rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Target size={40} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight font-display">🎯 Mission</h3>
            <p className="text-slate-600 text-xl leading-relaxed font-medium">
              Our mission is to build AI that simplifies complex tasks and boosts productivity, 
              empowering users with adaptive AI that works for them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -15, scale: 1.02 }}
            className="p-12 bg-white rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group"
          >
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Rocket size={40} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight font-display">🚀 Vision</h3>
            <p className="text-slate-600 text-xl leading-relaxed font-medium">
              We envision AI as a trusted digital partner that thinks, learns, and acts, 
              making advanced technology accessible and intuitive for everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
