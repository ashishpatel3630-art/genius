import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'John Smith',
    role: 'Product Manager',
    location: 'USA',
    content: 'Genius AI has completely transformed our product development cycle. The RAG capabilities allow us to query our entire documentation instantly.',
    avatar: 'JS',
  },
  {
    name: 'Priya Sharma',
    role: 'Student',
    location: 'India',
    content: 'The multilingual support is incredible. I can study complex topics in my native language and get accurate translations and explanations.',
    avatar: 'PS',
  },
  {
    name: 'Liu Wei',
    role: 'Developer',
    location: 'China',
    content: 'As a developer, the coding assistant is a game-changer. It understands context better than any other tool I have used before.',
    avatar: 'LW',
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight font-display"
          >
            What Our <span className="text-gradient">Users</span> Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-600 font-medium"
          >
            Join thousands of satisfied users who are already boosting their productivity with Genius AI.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative group"
            >
              <Quote size={60} className="text-primary/5 absolute top-8 right-10 group-hover:text-primary/10 transition-colors" />
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg tracking-tight">{t.name}</h4>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.role} • {t.location}</p>
                </div>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
                "{t.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
