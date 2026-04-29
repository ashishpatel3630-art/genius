import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const tiers = [
  {
    name: 'Basic',
    price: '$0',
    description: 'Perfect for individuals getting started with AI.',
    features: ['1,000 messages/month', 'Standard response time', 'Web access', 'Basic image generation'],
    cta: 'Get Started',
    popular: false,
    delay: 0.1,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Advanced features for power users and professionals.',
    features: ['Unlimited messages', 'Priority response time', 'Advanced RAG (PDF uploads)', '4K image generation', 'API access'],
    cta: 'Try Pro Free',
    popular: true,
    delay: 0.2,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Scalable solutions for teams and organizations.',
    features: ['Custom AI training', 'Dedicated account manager', 'SSO & advanced security', 'Unlimited team members', 'Custom integrations'],
    cta: 'Contact Sales',
    popular: false,
    delay: 0.3,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight font-display"
          >
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-slate-600"
          >
            Choose the plan that's right for you and start building with Genius AI today.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: tier.delay, duration: 0.5 }}
              className={`relative p-10 rounded-[3rem] border transition-all duration-500 ${
                tier.popular 
                  ? 'border-primary shadow-[0_40px_80px_-15px_rgba(37,99,235,0.2)] scale-105 z-10 bg-white animate-glow' 
                  : 'border-slate-200 shadow-sm bg-white/50 hover:bg-white hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-primary/30 flex items-center gap-2">
                  <Sparkles size={14} />
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-slate-500 font-medium">/month</span>}
              </div>
              <p className="text-slate-600 mb-10 leading-relaxed">{tier.description}</p>
              
              <div className="space-y-5 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4 text-slate-700 font-medium">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 active:scale-95 ${
                  tier.popular 
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20' 
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
