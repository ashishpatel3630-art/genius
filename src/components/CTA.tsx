import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-primary p-12 md:p-20 overflow-hidden text-center text-white shadow-[0_50px_100px_-20px_rgba(37,99,235,0.4)]"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -mr-32 -mb-32 animate-pulse" />

          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter font-display"
            >
              Elevate Your <br /> <span className="text-blue-200">Intelligence</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-blue-100 mb-12 font-medium leading-relaxed"
            >
              Join 50,000+ innovators building the next generation of AI. Experience the power of 
              intelligent automation and creative assistance.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="px-12 py-6 bg-white text-primary rounded-full font-black text-xl hover:bg-blue-50 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:shadow-[0_30px_60px_rgba(255,255,255,0.4)] active:scale-95 flex items-center gap-3 mx-auto group"
            >
              Get Started Free
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
