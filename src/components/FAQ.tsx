import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: 'What is Genius AI Chatbot?',
    answer: 'Genius AI is a next-generation AI platform that uses advanced large language models to understand context, solve problems, and automate workflows.',
  },
  {
    question: 'How does it work?',
    answer: 'It uses a combination of deep learning, natural language processing, and RAG (Retrieval-Augmented Generation) to provide accurate and context-aware responses.',
  },
  {
    question: 'Can I use multiple languages?',
    answer: 'Yes! Genius AI supports over 50 languages including English, Hindi, Spanish, Chinese, and French with high accuracy.',
  },
  {
    question: 'What tasks can it perform?',
    answer: 'From coding and content creation to data analysis and workflow automation, Genius AI can handle a wide variety of professional and creative tasks.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption and follow strict data privacy protocols to ensure your information is always protected.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight font-display"
          >
            Got <span className="text-gradient">Questions?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-600 font-medium"
          >
            Everything you need to know about Genius AI.
          </motion.p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-[2.5rem] border transition-all duration-500 ${
                openIndex === index ? 'bg-white border-primary shadow-xl shadow-primary/5' : 'bg-white/50 border-slate-100 hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left transition-colors group"
              >
                <span className={`text-xl font-bold tracking-tight transition-colors ${openIndex === index ? 'text-primary' : 'text-slate-900 group-hover:text-primary'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openIndex === index ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 text-lg text-slate-600 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
