import React from 'react';
import { UserPlus, LayoutGrid, Database, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: <UserPlus size={32} />,
    title: 'Sign Up',
    description: 'Create your account in seconds and get immediate access to our platform.',
  },
  {
    icon: <LayoutGrid size={32} />,
    title: 'Choose Feature',
    description: 'Select from our wide range of AI tools tailored for your specific needs.',
  },
  {
    icon: <Database size={32} />,
    title: 'Input Your Data',
    description: 'Provide text, images, or documents for the AI to process and analyze.',
  },
  {
    icon: <CheckCircle size={32} />,
    title: 'Get Result',
    description: 'Receive high-quality, intelligent outputs instantly and boost your productivity.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -mr-64 -mt-64 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -ml-64 -mb-64 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-slate-400"
          >
            Get started with Genius AI in four simple steps and transform the way you work.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-slate-800 z-0">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 1, ease: "easeInOut" }}
                    className="w-full h-full bg-gradient-to-r from-primary/50 via-blue-400 to-primary/50 origin-left"
                  />
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-800/50 backdrop-blur-xl rounded-3xl flex items-center justify-center text-primary mb-8 border border-slate-700 group-hover:border-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl">
                  {step.icon}
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-4 shadow-lg shadow-primary/20">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
