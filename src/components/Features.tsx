import React, { useState } from 'react';
import { Image, Mic, BookOpen, Settings, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import ImageGen from './FeatureModals/ImageGen';
import Multimodal from './FeatureModals/Multimodal';
import Knowledge from './FeatureModals/Knowledge';
import AgentActions from './FeatureModals/AgentActions';

const features = [
  {
    id: 'image',
    icon: <Image size={28} />,
    title: 'Image Generation',
    description: 'Create stunning visuals instantly from simple prompts with our advanced diffusion models.',
    color: 'from-purple-500 to-indigo-600',
    delay: 0.1,
  },
  {
    id: 'multimodal',
    icon: <Mic size={28} />,
    title: 'Voice & Multimodal',
    description: 'Interact using voice, text, images, and files for a truly natural communication experience.',
    color: 'from-blue-500 to-cyan-600',
    delay: 0.2,
  },
  {
    id: 'knowledge',
    icon: <BookOpen size={28} />,
    title: 'Knowledge Integration',
    description: 'Upload PDFs and documents for real-time intelligent answers using RAG technology.',
    color: 'from-emerald-500 to-teal-600',
    delay: 0.3,
  },
  {
    id: 'agent',
    icon: <Settings size={28} />,
    title: 'AI Agent Actions',
    description: 'Automate workflows, connect APIs, send emails, and book services with smart agents.',
    color: 'from-orange-500 to-red-600',
    delay: 0.4,
  },
];

export default function Features() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles size={12} />
            <span>Powerful Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight font-display"
          >
            Transform Your <span className="text-gradient">Workflow</span> with AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-slate-600"
          >
            Genius AI provides a comprehensive suite of tools designed to enhance your creativity and efficiency.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
              className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => setActiveModal(feature.id)}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-current/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                {feature.description}
              </p>
              <button className="flex items-center gap-2 text-primary text-sm font-black group-hover:gap-4 transition-all">
                Explore More <ChevronRight size={18} />
              </button>
              
              {/* Animated hover background glow */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.05] blur-2xl transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ImageGen isOpen={activeModal === 'image'} onClose={() => setActiveModal(null)} />
      <Multimodal isOpen={activeModal === 'multimodal'} onClose={() => setActiveModal(null)} />
      <Knowledge isOpen={activeModal === 'knowledge'} onClose={() => setActiveModal(null)} />
      <AgentActions isOpen={activeModal === 'agent'} onClose={() => setActiveModal(null)} />
    </section>
  );
}
