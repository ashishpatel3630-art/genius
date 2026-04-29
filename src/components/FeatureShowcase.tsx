import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const detailedFeatures = [
  {
    title: 'Advanced Image Generation',
    subtitle: 'From imagination to reality in seconds.',
    description: 'Our state-of-the-art diffusion models allow you to generate hyper-realistic images, digital art, and professional illustrations using simple natural language prompts.',
    points: [
      'High-fidelity 4K resolution output',
      'Multiple artistic style presets',
      'Advanced in-painting and out-painting',
      'Commercial usage rights included'
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    color: 'purple',
    reversed: false
  },
  {
    title: 'Seamless Multimodal Intelligence',
    subtitle: 'See, hear, and speak with Genius AI.',
    description: 'Experience a truly natural interface. Upload images for instant analysis, use voice commands for hands-free operation, and process complex video data in real-time.',
    points: [
      'Real-time visual recognition',
      'Low-latency voice processing',
      'Multilingual translation & transcription',
      'Context-aware video analysis'
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    color: 'blue',
    reversed: true
  },
  {
    title: 'Enterprise Knowledge RAG',
    subtitle: 'Your data, made intelligent.',
    description: 'Connect your entire document library. Our Retrieval-Augmented Generation (RAG) technology allows the AI to provide accurate, cited answers based solely on your private data.',
    points: [
      'Secure PDF and document processing',
      'Instant semantic search capability',
      'Source attribution for every answer',
      'Private and encrypted data handling'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    color: 'emerald',
    reversed: false
  },
  {
    title: 'Autonomous Agent Actions',
    subtitle: 'Let the AI do the heavy lifting.',
    description: 'Deploy smart agents that can browse the web, connect to your favorite APIs, schedule meetings, and automate repetitive workflows across your entire tech stack.',
    points: [
      'Custom API integration support',
      'Autonomous multi-step workflows',
      'Smart scheduling and outreach',
      '24/7 background task execution'
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    color: 'orange',
    reversed: true
  }
];

export default function FeatureShowcase() {
  return (
    <section className="py-32 overflow-hidden bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={14} />
            <span>Deep Dive</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
          >
            Experience the <span className="text-gradient">Future</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-600 font-medium"
          >
            Explore the cutting-edge capabilities that make Genius AI the most powerful assistant platform in the world.
          </motion.p>
        </div>

        <div className="space-y-40">
          {detailedFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className={`flex flex-col ${feature.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
            >
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: feature.reversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 relative group w-full"
              >
                <div className={`absolute -inset-4 bg-gradient-to-br ${
                  feature.color === 'purple' ? 'from-purple-500/20 to-indigo-500/20' :
                  feature.color === 'blue' ? 'from-blue-500/20 to-cyan-500/20' :
                  feature.color === 'emerald' ? 'from-emerald-500/20 to-teal-500/20' :
                  'from-orange-500/20 to-red-500/20'
                } rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl aspect-[4/3]">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60" />
                </div>

                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -right-8 glass p-6 rounded-3xl shadow-2xl border border-white/40 hidden md:block"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-${feature.color}-500 flex items-center justify-center text-white shadow-lg`}>
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Feature Status</div>
                      <div className="text-sm font-bold text-slate-900">Live & Optimized</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: feature.reversed ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 space-y-8"
              >
                <div className="space-y-4">
                  <h3 className={`text-sm font-black uppercase tracking-[0.3em] text-${feature.color}-500`}>
                    {feature.subtitle}
                  </h3>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    {feature.title}
                  </h2>
                </div>
                
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {feature.points.map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full bg-${feature.color}-500/10 flex items-center justify-center text-${feature.color}-500`}>
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <button className={`btn-primary bg-${feature.color}-600 hover:bg-${feature.color}-700 shadow-${feature.color}-500/20 group`}>
                    Learn More
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
